export type Language = 'bn' | 'en';

export interface PersonInfo {
  nameBn: string;
  nameEn: string;
  subTitleBn: string;
  subTitleEn: string;
  fatherBn: string;
  fatherEn: string;
  motherBn: string;
  motherEn: string;
  grandfatherBn: string;
  grandfatherEn: string;
  addressBn: string;
  addressEn: string;
  bioBn: string;
  bioEn: string;
  photoUrl: string;
}

export interface CeremonyItem {
  id: string;
  titleBn: string;
  titleEn: string;
  subtitleBn: string;
  subtitleEn: string;
  dateBn: string;
  dateEn: string;
  timeBn: string;
  timeEn: string;
  hallBn: string;
  hallEn: string;
  dressBn: string;
  dressEn: string;
  colorScheme: string;
  icon: string;
}

export interface StoryMilestone {
  year: string;
  titleBn: string;
  titleEn: string;
  descBn: string;
  descEn: string;
  badgeBn: string;
  badgeEn: string;
}

export interface WeddingPhoto {
  id: string;
  url: string;
  titleBn: string;
  titleEn: string;
  category: 'prewedding' | 'ceremony' | 'candid' | 'family';
}

export interface RSVPSubmission {
  id: string;
  guestName: string;
  contact: string;
  attending: 'attending' | 'not_attending' | 'tentative';
  guestCount: number;
  ceremonies: string[];
  mealPreference: 'traditional_nonveg' | 'pure_veg' | 'jain_veg';
  blessingMessage: string;
  createdAt: string;
  syncedToGoogleSheet: boolean;
}

export interface WeddingSettings {
  groom: PersonInfo;
  bride: PersonInfo;
  weddingDate: string; // ISO date string e.g. "2026-12-11T20:25:00"
  weddingDateBn: string;
  weddingDateEn: string;
  venueNameBn: string;
  venueNameEn: string;
  venueAddressBn: string;
  venueAddressEn: string;
  venueMapsUrl: string;
  googleSheetsWebhookUrl: string;
  contactPhones: { labelBn: string; labelEn: string; number: string }[];
}
