import {
  WeddingSettings,
  CeremonyItem,
  StoryMilestone,
  WeddingPhoto,
  RSVPSubmission,
} from "./types";

export const initialWeddingSettings: WeddingSettings = {
  groom: {
    nameBn: "অর্ঘ্য",
    nameEn: "Argha De",
    // subTitleBn: 'বি.টেক (কম্পিউটার সায়েন্স), সফটওয়্যার আর্কিটেক্ট',
    // subTitleEn: 'B.Tech (CSE), Software Architect',
    fatherBn: "শ্রী রঘুনাথ দে",
    fatherEn: "Sri Raghunath De",
    motherBn: "শ্রীমতি মৌসুমি দে",
    motherEn: "Smt. Mousumi De",
    grandfatherBn: "স্বর্গীয় শিশির কুমার দে",
    grandfatherEn: "Late Sisir Kumar De",
    grandmotherBn: "স্বর্গীয় কান্তা দে",
    grandmotherEn: "Late Kanta De",
    addressBn: "“আমাদপুর, মেমারি, পূর্ব বর্ধমান",
    addressEn: '"Amadpur, Memari, Purba Bardhaman',
    bioBn: "শান্ত, সংস্কৃতিমনা ও স্বপ্নবান। পরিবার ও সঙ্গীতকে ভালোবাসেন।",
    bioEn:
      "Cultured, gentle, and passionate about technology, Indian classical music, and family values.",
    photoUrl:
      "../Public/Image/boy.jpg",
  },
  bride: {
    nameBn: "অর্পিতা",
    nameEn: "Arpita Basu",
    // subTitleBn: 'এম.এ. (ইংরেজি সাহিত্য), সহকারি অধ্যাপিকা',
    // subTitleEn: 'M.A. (English Literature), Assistant Professor',
    fatherBn: "শ্রী সোমনাথ বসু",
    fatherEn: "Sri Somnath Basu",
    motherBn: "শ্রীমতি লিপিকা বসু",
    motherEn: "Smt. Lipika Basu",
    grandfatherBn: "স্বর্গীয় বসন্ত কুমার বসু",
    grandfatherEn: "Late Basanta Kumar Basu",
    grandmotherBn: "স্বর্গীয় রিনা বসু",
    grandmotherEn: "Late Rina Basu",
    addressBn: "“মাতিশ্বর বসুপাড়া পূর্ব বর্ধমান",
    addressEn: '"Matishwar Basupara East Burdwan',
    bioBn: "হাসিখুশি, সাহিত্যপ্রেমী এবং রবীন্দ্রসঙ্গীতের অনুরক্ত সাধক।",
    bioEn:
      "Cheerful, bibliophile, lover of Rabindra Sangeet, literature, and timeless Bengali traditions.",
    photoUrl:
      "../Public/Image/girl.png",
  },
  weddingDate: "2026-12-13T19:30:00",
  weddingDateBn: "২৬শে অগ্রহায়ণ, ১৪৩৩ বঙ্গাব্দ (১৩ই ডিসেম্বর, ২০২৬)",
  weddingDateEn: "Friday, 13th December, 2026 (26th Agrahayana, 1433)",
  venueNameBn: "বসু বাড়ি (Basu Bari)",
  venueNameEn: "Basu Bari",
  venueAddressBn: "মাতিশ্বর বসুপাড়া পূর্ব বর্ধমান",
  venueAddressEn: "Matishwar Basupara East Burdwan",
  venueMapsUrl: "https://maps.app.goo.gl/pNfPZdbKAZdeDfx66",
  googleSheetsWebhookUrl: import.meta.env.VITE_GOOGLE_SHEETS_URL,
  contactPhones: [
    {
      // labelBn: "বরের পরিবার (শ্রী সুভাষ রায়)",
      // labelEn: "Groom's Family (Sri Subhash Roy)",
      number: "+91 83274 83600",
    },
    {
      // labelBn: "কনের পরিবার (শ্রী রথীন মুখার্জী)",
      // labelEn: "Bride's Family (Sri Rathin Mukherjee)",
      number: "+91 94344 37373",
    },
    {
      // labelBn: "অতিথি অভ্যর্থনা ও রুট সহায়তা",
      // labelEn: "Guest Hospitality & Route Help",
      number: "+91 87774 32181",
    },
    {
      // labelBn: "অতিথি অভ্যর্থনা ও রুট সহায়তা",
      // labelEn: "Guest Hospitality & Route Help",
      number: "+91 90931 03123",
    },
  ],
};

export const ceremoniesData: CeremonyItem[] = [
  {
    id: "aiburobhat",
    titleBn: "আইবুড়ো ভাত ও আশীর্বাদ",
    titleEn: "Aiburobhat (Pre-Wedding Blessing Feast)",
    subtitleBn: "কনে ও বরের অবিবাহিত জীবনের অন্তিম প্রীতিভোজ",
    subtitleEn:
      "The final pre-wedding feast filled with blessings and love from elders",
    dateBn: "২৫শে অগ্রহায়ণ, ১৪৩৩ (১২ই ডিসেম্বর, ২০২৬)",
    dateEn: "Saturday, 12th December, 2026",
    timeBn: "শুভ সময় ৭:৩০ ঘটিকা",
    timeEn: "7:30 PM Onwards",
    hallBn: "নিজ বাসভবন ( তারাকনাথ দে স্মৃতি ভবন ) ",
    hallEn: "Own Residence ( Tarakanath De Smriti Bhavan )",
    // dressBn: "ঐতিহ্যবাহী সুতি ধুতি-পাঞ্জাবি ও তাঁতের শাড়ি",
    // dressEn: "Traditional Dhoti-Panjabi & Bengali Cotton/Taant Saree",
    colorScheme: "from-amber-800 to-amber-950",
    icon: "utensils",
  },
  {
    id: "gaye_holud",
    titleBn: "গায়ে হলুদ",
    titleEn: "Gaye Holud (Turmeric & Haldi Blessing)",
    subtitleBn: "হরিতাল ও কাঁচা হলুদের সৌরভ এবং তত্ত্ব আদান-প্রদান",
    subtitleEn:
      "Applying sacred fragrant turmeric paste with traditional Tatwa gifts",
    dateBn: "২৬শে অগ্রহায়ণ, ১৪৩৩ (১৩ই ডিসেম্বর, ২০২৬)",
    dateEn: "Sunday, 13th December, 2026 (Evening)",
    timeBn: "সকাল ৯:০০ ঘটিকা",
    timeEn: "9:00 AM Sharp",
    hallBn: "উৎসব প্রাঙ্গণ ও অঙ্গন",
    hallEn: "Courtyard & Banquet Lawn",
    // dressBn: "বাসন্তী হলুদ পাঞ্জাবি ও হলুদ পাড় লাল শাড়ি",
    // dressEn: "Basanti Yellow Silk Kurta & Traditional Yellow Saree",
    colorScheme: "from-yellow-700 to-amber-900",
    icon: "sparkles",
  },
  {
    id: "bibaho",
    titleBn: "শুভ বিবাহ",
    titleEn: "Shubho Bibaho (The Holy Wedding Ceremony)",
    subtitleBn: "সাত পাক, সম্প্রদান, শুভদৃষ্টি ও সিঁদুর দান",
    subtitleEn:
      "Seven rounds around sacred agni, Saat Paak, Sindoor Daan & Vedic Vows",
    dateBn: "২৬শে অগ্রহায়ণ, ১৪৩৩ (১৩ই ডিসেম্বর, ২০২৬)",
    dateEn: "Sunday, 13th December, 2026 (Evening)",
    timeBn: "শুভ লগ্ন: সন্ধ্যে ৪:৩০-১২:৩০ (অতিথি সমাগম সন্ধ্যা ৬:০০)",
    timeEn: "Auspicious Muhurat: 8:30-12:30 PM (Guest Reception from 6:00 PM)",
    hallBn: "“বসু বাড়ি মূল বিবাহ মণ্ডপ",
    hallEn: "Basu Bari Grand Heritage Mandap",
    // dressBn: "রাজকীয় বেনারসী শাড়ি ও তসর সিল্কের জোড়-ধুতি",
    // dressEn: "Royal Red Benarasi Silk & Cream Tussar Silk Dhoti-Kurta",
    colorScheme: "from-red-900 to-red-950",
    icon: "heart-handshake",
  },
  {
    id: "boubhat",
    titleBn: "বৌভাত",
    titleEn: "Boubhat",
    subtitleBn: "নববধূর ভাত-কাপড় প্রদান",
    subtitleEn:
      "Welcoming the new bride into the groom’s home with a grand gala banquet",
    dateBn: "২৭শে অগ্রহায়ণ, ১৪৩৩ (১৪ই ডিসেম্বর, ২০২৬)",
    dateEn: "Monday, 14th December, 2026",
    timeBn: "দুপুর ২:০০ ঘটিকা হইতে",
    timeEn: "2:00 PM Onwards",
    hallBn: "নিজ বাসভবন ( তারাকনাথ দে স্মৃতি ভবন ) ",
    hallEn: "Own Residence ( Tarakanath De Smriti Bhavan )",
    // dressBn: "উৎসবের অভিজাত পোশাক (ইন্ডো-ওয়েস্টার্ন বা সিল্ক)",
    // dressEn: "Festive Royal Attire (Indo-Western / Tuxedo / Silk Lehengas)",
    colorScheme: "from-purple-900 to-indigo-950",
    icon: "crown",
  },
  {
    id: "reception",
    titleBn: "প্রীতিভোজ (রিসেপশন)",
    titleEn: "Grand Wedding Reception",
    subtitleBn: "নবদম্পতির নতুন জীবনের শুভসূচনা ও আনন্দঘন সন্ধ্যা",
    subtitleEn:
      "Welcoming the new bride into the groom’s home with a grand gala banquet",
    dateBn: "২৮শে অগ্রহায়ণ, ১৪৩৩ (১৫ই ডিসেম্বর, ২০২৬)",
    dateEn: "Tuesday, 15th December, 2026",
    timeBn: "সন্ধ্যা ৬:০০ ঘটিকা হইতে",
    timeEn: "6:00 PM Onwards",
    hallBn: "নিজ বাসভবন ( তারাকনাথ দে স্মৃতি ভবন ) ",
    hallEn: "Own Residence ( Tarakanath De Smriti Bhavan )",
    // dressBn: "উৎসবের অভিজাত পোশাক (ইন্ডো-ওয়েস্টার্ন বা সিল্ক)",
    // dressEn: "Festive Royal Attire (Indo-Western / Tuxedo / Silk Lehengas)",
    colorScheme: "from-purple-900 to-indigo-950",
    icon: "crown",
  },
];

export const storyMilestones: StoryMilestone[] = [
  {
    year: "২০২১ (2021)",
    titleBn: "প্রথম দেখা: কফি হাউস ও বইয়ের গন্ধ",
    titleEn: "The First Encounter: College Street Coffee House",
    descBn:
      "কলকাতা আন্তর্জাতিক বইমেলায় সাহিত্য আলোচনার মাঝে আকস্মিক চোখাচোখি। সেই শুরু মিষ্টি বন্ধুত্বের।",
    descEn:
      "A serendipitous encounter amidst the smell of fresh books at the Kolkata Book Fair sparked a timeless conversation.",
    badgeBn: "সূচনা পর্ব",
    badgeEn: "The Beginning",
  },
  {
    year: "২০২৩ (2023)",
    titleBn: "পাহাড়ের দেশে সুরভিত প্রস্তাব",
    titleEn: "A Proposal in the Mist: Darjeeling Tea Gardens",
    descBn:
      "কাঞ্চনজঙ্ঘার সোনালী সূর্যোদয়ে শিমুল ফুলের লাল আভায় অয়ন জীবনের শ্রেষ্ঠ প্রশ্নটি করেছিল শ্রেয়াকে।",
    descEn:
      "Under the golden sunrise over Kanchenjunga, surrounded by tea plantations, Ayan asked the most beautiful question.",
    badgeBn: "হৃদয় বন্ধন",
    badgeEn: "The Yes Moment",
  },
  {
    year: "২০২৫ (2025)",
    titleBn: "দুই পরিবারের শুভ আশীর্বাদ",
    titleEn: "Two Families, One Harmonious Bond",
    descBn:
      "মিষ্টিমুখ ও শঙ্খধ্বনির মাধ্যমে দুই পরিবারের সম্মতিতে নির্ধারিত হলো জীবনের নতুন শুভ যাত্রা।",
    descEn:
      "With the blowing of the auspicious conch (Shankha) and blessings of elders, the two homes united with open hearts.",
    badgeBn: "পাকা দেখা",
    badgeEn: "Families United",
  },
  {
    year: "২০২৬ (2026)",
    titleBn: "অনন্তের পথে পদার্পণ",
    titleEn: "The Eternal Vow: Shubho Bibaho",
    descBn:
      "অগ্নিকে সাক্ষী রেখে শুরু হতে চলেছে আমাদের চিরন্তন পথচলা। আপনাদের আশীর্বাদ আমাদের পাথেয়।",
    descEn:
      "Stepping into forever together hand-in-hand with Vedic rituals, sacred fire, and your cherished blessings.",
    badgeBn: "শুভ বিবাহ",
    badgeEn: "Forever Begins",
  },
];

export const galleryPhotos: WeddingPhoto[] = [
  {
    id: "p1",
    url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80",
    titleBn: "ভালোবাসার প্রথম হাসি",
    titleEn: "A Warm Smile Together",
    category: "prewedding",
  },
  {
    id: "p2",
    url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
    titleBn: "লাজুক দৃষ্টি ও আনন্দ",
    titleEn: "Grace and Joy",
    category: "prewedding",
  },
  {
    id: "p3",
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
    titleBn: "পাহাড়ের কোলে সূর্যাস্ত",
    titleEn: "Sunset in the Hills",
    category: "candid",
  },
  {
    id: "p4",
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80",
    titleBn: "দুই পরিবারের শুভ আশীর্বাদ",
    titleEn: "Blessings of Elders",
    category: "family",
  },
  {
    id: "p5",
    url: "https://images.unsplash.com/photo-1609151162377-794fa6ec9a3f?auto=format&fit=crop&w=1000&q=80",
    titleBn: "গায়ে হলুদের রঙ ও সুর",
    titleEn: "Colors of Haldi Ceremony",
    category: "ceremony",
  },
  {
    id: "p6",
    url: "https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1000&q=80",
    titleBn: "অনন্ত পথচলার প্রতীক্ষা",
    titleEn: "Waiting for the Big Day",
    category: "candid",
  },
];

export const initialGuestbookEntries: RSVPSubmission[] = [
  {
    id: "rsvp-1",
    guestName: "ড. শুভাশিস চক্রবর্তী ও পরিবার",
    contact: "+91 98300 11223",
    attending: "attending",
    guestCount: 3,
    ceremonies: ["bibaho", "boubhat"],
    mealPreference: "traditional_nonveg",
    blessingMessage:
      "অয়ন ও শ্রেয়া, তোমাদের ভবিষ্যৎ দাম্পত্য জীবন সুখ, সমৃদ্ধি ও ভালোবাসায় ভরপুর হোক। অন্তরের আশীর্বাদ রইল!",
    createdAt: "২০২৬-০৯-১৫",
    syncedToGoogleSheet: true,
  },
  {
    id: "rsvp-2",
    guestName: "সৌভিক ব্যানার্জী (বন্ধুমহল)",
    contact: "souvik.banerjee@gmail.com",
    attending: "attending",
    guestCount: 2,
    ceremonies: ["gaye_holud", "bibaho", "boubhat"],
    mealPreference: "traditional_nonveg",
    blessingMessage:
      "আমাদের প্রিয় অয়নের বিয়ে! দারুণ আনন্দ হবে। অনেক অনেক শুভেচ্ছা দুজনকে!",
    createdAt: "২০২৬-০৯-১৮",
    syncedToGoogleSheet: true,
  },
  {
    id: "rsvp-3",
    guestName: "শ্রীমতি অনুরাধা রায়চৌধুরী",
    contact: "+91 98745 54321",
    attending: "attending",
    guestCount: 2,
    ceremonies: ["bibaho"],
    mealPreference: "pure_veg",
    blessingMessage:
      "মা শ্রেয়া ও বাবা অয়নকে পরমেশ্বরের শ্রীচরণে শুভ আশীর্বাদ সমর্পণ করি। যুগল যেন সর্বদা সুস্থ থাকে।",
    createdAt: "২০২৬-০৯-২০",
    syncedToGoogleSheet: true,
  },
];
