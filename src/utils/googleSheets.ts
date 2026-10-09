import { RSVPSubmission } from '../types';

export const GOOGLE_APPS_SCRIPT_SAMPLE = `// --------------------------------------------------------------------------
// GOOGLE SHEETS WEDDING RSVP CONNECTOR
// 1. Open Google Sheets -> Extensions -> Apps Script
// 2. Paste this code and click Deploy -> New Deployment
// 3. Select type: 'Web App' -> Execute as: 'Me' -> Who has access: 'Anyone'
// 4. Copy the Web App URL and paste it into the Wedding Settings in this app!
// --------------------------------------------------------------------------

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Guest Name",
        "Contact",
        "Attendance Status",
        "Guests Count",
        "Ceremonies",
        "Meal Preference",
        "Blessing Message"
      ]);
      sheet.getRange(1, 1, 1, 8).setFontWeight("bold").setBackground("#f3e5ab");
    }
    
    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      new Date().toLocaleString(),
      data.guestName || "",
      data.contact || "",
      data.attending || "",
      data.guestCount || 1,
      (data.ceremonies || []).join(", "),
      data.mealPreference || "",
      data.blessingMessage || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "RSVP recorded in Google Sheet!" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

/**
 * Submit RSVP to configured Google Sheets webhook (or mock fallback if no URL)
 */
export async function sendRSVPToGoogleSheet(
  webhookUrl: string,
  rsvp: RSVPSubmission
): Promise<{ success: boolean; message: string }> {
  if (!webhookUrl || !webhookUrl.trim()) {
    // Stored locally, notify host that it's ready for Google Sheet sync
    return {
      success: true,
      message: 'লোকাল ডাটাবেসে সংরক্ষিত হয়েছে (Google Sheet URL কনফিগার থাকলে সরাসরি শিটেও যাবে)',
    };
  }

  try {
    const payload = {
      guestName: rsvp.guestName,
      contact: rsvp.contact,
      attending: rsvp.attending,
      guestCount: rsvp.guestCount,
      ceremonies: rsvp.ceremonies,
      mealPreference: rsvp.mealPreference,
      blessingMessage: rsvp.blessingMessage,
      timestamp: new Date().toISOString(),
    };

    // Google Apps Script requires no-cors or standard POST
    await fetch(webhookUrl.trim(), {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return {
      success: true,
      message: 'গুগল শিটে আপনার উপস্থিতি ও বার্তা সফলভাবে রেকর্ড করা হয়েছে!',
    };
  } catch (error) {
    console.error('Failed to submit to Google Sheet:', error);
    return {
      success: false,
      message: 'শিট কানেকশনে সমস্যা হয়েছে, তবে অ্যাপে সংরক্ষিত হয়েছে!',
    };
  }
}

/**
 * Export array of RSVPs as CSV ready for Google Sheets
 */
export function exportRSVPsToCSV(rsvps: RSVPSubmission[]) {
  const headers = ['Guest Name', 'Contact', 'Status', 'Count', 'Ceremonies', 'Meal Choice', 'Blessing Message', 'Date'];
  const rows = rsvps.map(r => [
    `"${r.guestName.replace(/"/g, '""')}"`,
    `"${r.contact.replace(/"/g, '""')}"`,
    `"${r.attending}"`,
    r.guestCount,
    `"${r.ceremonies.join(', ')}"`,
    `"${r.mealPreference}"`,
    `"${(r.blessingMessage || '').replace(/"/g, '""')}"`,
    `"${r.createdAt}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `Wedding_RSVP_GoogleSheets_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
