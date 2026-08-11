/**
 * Laughreel mock catalogue.
 * Photos are real, freely-licensed images of the artists from Wikimedia Commons.
 */

export type Comedian = {
  slug: string;
  name: string;
  tagline: string;
  city: string;
  languages: string[];
  genres: string[];
  followers: string;
  photo: string;
  bio: string;
  credit: string;
};

export type Special = {
  id: string;
  title: string;
  comedian: string; // slug
  year: number;
  runtime: string;
  language: string;
  genre: string;
  score: number;
  views: string;
  synopsis: string;
  poster: string;
};

export type Clip = {
  id: string;
  title: string;
  comedian: string;
  views: string;
  duration: string;
  thumb: string;
};

export type TourDate = {
  id: string;
  comedian: string;
  show: string;
  city: string;
  venue: string;
  date: string; // "Oct 24"
  weekday: string;
  time: string;
  price: string;
  soldOut: boolean;
  poster: string;
};

const W = "https://upload.wikimedia.org/wikipedia/commons";

export const photos = {
  zakir: `${W}/5/5c/Zakir_Khan_Comedian_India.png`,
  bassi: `${W}/thumb/1/19/Anubhav_Singh_Bassi_in_Surat_for_Bas_Kar_Bassi_%28cropped%29.jpg/960px-Anubhav_Singh_Bassi_in_Surat_for_Bas_Kar_Bassi_%28cropped%29.jpg`,
  bassiWide: `${W}/thumb/8/8d/Anubhav_Singh_Bassi_in_Surat_for_Bas_Kar_Bassi_01.jpg/960px-Anubhav_Singh_Bassi_in_Surat_for_Bas_Kar_Bassi_01.jpg`,
  kanan: `${W}/3/3a/Kanan_Gill_trailer_launch_Noor_%28cropped%29.jpg`,
  kananWide: `${W}/a/ac/Kanan_Gill_trailer_launch_Noor.jpg`,
  aditi: `${W}/thumb/b/b0/Aditi_Mittal.png/960px-Aditi_Mittal.png`,
  biswa: `${W}/thumb/3/3c/Biswa_Kalyan_Rath_%28cropped%29.jpg/960px-Biswa_Kalyan_Rath_%28cropped%29.jpg`,
  biswaWide: `${W}/thumb/f/f2/Biswa_Kalyan_Rath.jpg/960px-Biswa_Kalyan_Rath.jpg`,
  sumukhi: `${W}/thumb/7/79/Sumukhi-4_%281%29_%281%29.jpg/960px-Sumukhi-4_%281%29_%281%29.jpg`,
  virdas: `${W}/7/7b/Vir_Das_introduce_standup_comedy_at_Apicus_03.jpg`,
  virdas2: `${W}/0/0c/Vir_Das_introduce_standup_comedy_at_Apicus_05.jpg`,
  virdas3: `${W}/f/fe/Vir_Das_introduce_standup_comedy_at_Apicus_08.jpg`,
  varun: `${W}/thumb/4/47/Varun_Grover_Stand-up.JPG/960px-Varun_Grover_Stand-up.JPG`,
  varun2: `${W}/thumb/3/36/Varun_Grover_in_Stockholm_2024.jpg/960px-Varun_Grover_in_Stockholm_2024.jpg`,
};

export const comedians: Comedian[] = [
  {
    slug: "zakir-khan",
    name: "Zakir Khan",
    tagline: "Sakht Launda",
    city: "Indore",
    languages: ["Hindi", "Hinglish"],
    genres: ["Anecdotal", "Observational"],
    followers: "18.4M",
    photo: photos.zakir,
    bio: "Indore-born, Delhi-tempered. Zakir Khan turned shayari-tinged storytelling into a national dialect. He won Comedy Central's India's Best Stand Up in 2012 and has since sold out Royal Albert Hall, Madison Square Garden and every second auditorium between Bhopal and Bengaluru.",
    credit: "Photo: Wikimedia Commons",
  },
  {
    slug: "anubhav-singh-bassi",
    name: "Anubhav Singh Bassi",
    tagline: "The law-school dropout",
    city: "Meerut",
    languages: ["Hindi", "Hinglish"],
    genres: ["Storytelling", "Anecdotal"],
    followers: "9.2M",
    photo: photos.bassi,
    bio: "A lawyer who found better cross-examination material in his own life. Bassi's long-form college and family stories — Cheating, Bas Kar Bassi — routinely cross 50 million views and his tours sell out in minutes.",
    credit: "Photo: Wikimedia Commons",
  },
  {
    slug: "kanan-gill",
    name: "Kanan Gill",
    tagline: "Engineer turned absurdist",
    city: "Bengaluru",
    languages: ["English"],
    genres: ["Observational", "Absurdist"],
    followers: "3.1M",
    photo: photos.kanan,
    bio: "Ex-software engineer, co-creator of Pretentious Movie Reviews, and the man behind Keep It Real and Yours Sincerely. Kanan writes tightly-constructed sets that end where you least expect them.",
    credit: "Photo: Wikimedia Commons",
  },
  {
    slug: "aditi-mittal",
    name: "Aditi Mittal",
    tagline: "One of India's first women in stand-up",
    city: "Mumbai",
    languages: ["English", "Hinglish"],
    genres: ["Satire", "Character"],
    followers: "1.4M",
    photo: photos.aditi,
    bio: "Aditi Mittal has been on Indian stages since 2009 and was the first Indian woman with a Netflix stand-up special, Things They Wouldn't Let Me Say. Her characters — Dr. Mrs. Lutchuke chief among them — are cult favourites.",
    credit: "Photo: Wikimedia Commons",
  },
  {
    slug: "biswa-kalyan-rath",
    name: "Biswa Kalyan Rath",
    tagline: "Deadpan systems thinker",
    city: "Bhubaneswar",
    languages: ["Hinglish", "English"],
    genres: ["Observational", "Dark Humor"],
    followers: "4.6M",
    photo: photos.biswa,
    bio: "IIT Kharagpur graduate, co-creator of Pretentious Movie Reviews and creator of Laakhon Mein Ek. Biswa performs like he's debugging the universe out loud — Sushi, Biswa Mast Aadmi and Sitting are modern reference sets.",
    credit: "Photo: Wikimedia Commons",
  },
  {
    slug: "sumukhi-suresh",
    name: "Sumukhi Suresh",
    tagline: "Pushpavalli's creator",
    city: "Nagpur",
    languages: ["English", "Hinglish"],
    genres: ["Sketch", "Character"],
    followers: "2.2M",
    photo: photos.sumukhi,
    bio: "Writer, actor and stand-up who built Pushpavalli for Amazon Prime and Behti Naak for the internet. Sumukhi's comedy lives in uncomfortable characters played entirely straight.",
    credit: "Photo: Wikimedia Commons",
  },
  {
    slug: "vir-das",
    name: "Vir Das",
    tagline: "Two-time Emmy nominee",
    city: "Mumbai",
    languages: ["English", "Hinglish"],
    genres: ["Political Satire", "Observational"],
    followers: "12.8M",
    photo: photos.virdas,
    bio: "The most internationally-travelled Indian comic working today: six Netflix specials, an International Emmy for Landing, and a touring schedule that spans forty countries a year.",
    credit: "Photo: Wikimedia Commons",
  },
  {
    slug: "varun-grover",
    name: "Varun Grover",
    tagline: "Lyricist, satirist, poet",
    city: "Lucknow",
    languages: ["Hindi", "English"],
    genres: ["Political Satire", "Poetry"],
    followers: "1.9M",
    photo: photos.varun,
    bio: "National Award-winning lyricist for Dum Laga Ke Haisha, writer of Sacred Games, and a stand-up whose sets fold poetry, politics and Lucknow into the same breath.",
    credit: "Photo: Wikimedia Commons",
  },
];

export const specials: Special[] = [
  {
    id: "tathastu",
    title: "Tathastu",
    comedian: "zakir-khan",
    year: 2022,
    runtime: "1h 34m",
    language: "Hinglish",
    genre: "Anecdotal",
    score: 98,
    views: "62.4M",
    synopsis:
      "The Sakht Launda returns with his most personal hour yet — a journey through family, fame, ageing parents and the art of saying 'Tathastu' to whatever life hands you.",
    poster: photos.zakir,
  },
  {
    id: "bas-kar-bassi",
    title: "Bas Kar Bassi",
    comedian: "anubhav-singh-bassi",
    year: 2024,
    runtime: "1h 12m",
    language: "Hindi",
    genre: "Storytelling",
    score: 95,
    views: "48.1M",
    synopsis:
      "Bassi unpacks a lifetime of near-misses: hostel escapades, an aborted legal career, and the specific humiliation of being the friend everyone tells their secrets to.",
    poster: photos.bassi,
  },
  {
    id: "yours-sincerely",
    title: "Yours Sincerely",
    comedian: "kanan-gill",
    year: 2020,
    runtime: "58m",
    language: "English",
    genre: "Absurdist",
    score: 91,
    views: "12.7M",
    synopsis:
      "Kanan reads out a letter he wrote to himself as a teenager and spends an hour failing to answer it. Tightly written, quietly devastating.",
    poster: photos.kanan,
  },
  {
    id: "things-they-wouldnt-let-me-say",
    title: "Things They Wouldn't Let Me Say",
    comedian: "aditi-mittal",
    year: 2017,
    runtime: "1h 02m",
    language: "English",
    genre: "Satire",
    score: 89,
    views: "8.9M",
    synopsis:
      "Aditi on periods, prudery and the peculiar Indian talent for pretending nothing is happening. Includes a full visit from Dr. Mrs. Lutchuke.",
    poster: photos.aditi,
  },
  {
    id: "biswa-mast-aadmi",
    title: "Biswa Mast Aadmi",
    comedian: "biswa-kalyan-rath",
    year: 2018,
    runtime: "1h 08m",
    language: "Hinglish",
    genre: "Observational",
    score: 93,
    views: "31.2M",
    synopsis:
      "Biswa dismantles the everyday — barbers, buses, the Indian obsession with 'settling down' — with the patience of a man reading out a bug report.",
    poster: photos.biswaWide,
  },
  {
    id: "dont-tell-amma",
    title: "Don't Tell Amma",
    comedian: "sumukhi-suresh",
    year: 2021,
    runtime: "54m",
    language: "English",
    genre: "Sketch",
    score: 88,
    views: "6.3M",
    synopsis:
      "Half stand-up, half character showcase. Sumukhi plays six people you have definitely met at a Bengaluru housewarming.",
    poster: photos.sumukhi,
  },
  {
    id: "landing",
    title: "Landing",
    comedian: "vir-das",
    year: 2022,
    runtime: "1h 05m",
    language: "English",
    genre: "Political Satire",
    score: 94,
    views: "27.8M",
    synopsis:
      "Written in the aftermath of Two Indias, Vir turns a global controversy into an hour about belonging, borders and what home costs.",
    poster: photos.virdas,
  },
  {
    id: "nothing-makes-sense",
    title: "Nothing Makes Sense",
    comedian: "varun-grover",
    year: 2023,
    runtime: "1h 21m",
    language: "Hindi",
    genre: "Political Satire",
    score: 92,
    views: "9.4M",
    synopsis:
      "Varun braids stand-up with poetry, walking from Lucknow's gullies to the national news cycle without ever raising his voice.",
    poster: photos.varun,
  },
];

export const clips: Clip[] = [
  {
    id: "c1",
    title: "The Water Bottle",
    comedian: "anubhav-singh-bassi",
    views: "1.2M",
    duration: "0:58",
    thumb: photos.bassiWide,
  },
  {
    id: "c2",
    title: "Amma on Speakerphone",
    comedian: "sumukhi-suresh",
    views: "850K",
    duration: "1:12",
    thumb: photos.sumukhi,
  },
  {
    id: "c3",
    title: "Airport Security, Globally",
    comedian: "vir-das",
    views: "2.4M",
    duration: "1:04",
    thumb: photos.virdas2,
  },
  {
    id: "c4",
    title: "Shayari For Nobody",
    comedian: "zakir-khan",
    views: "3.1M",
    duration: "0:47",
    thumb: photos.zakir,
  },
  {
    id: "c5",
    title: "Tech Support Karma",
    comedian: "kanan-gill",
    views: "900K",
    duration: "1:22",
    thumb: photos.kananWide,
  },
  {
    id: "c6",
    title: "Barber Shop Physics",
    comedian: "biswa-kalyan-rath",
    views: "1.6M",
    duration: "1:05",
    thumb: photos.biswaWide,
  },
  {
    id: "c7",
    title: "Lucknow Ki Sardi",
    comedian: "varun-grover",
    views: "620K",
    duration: "0:52",
    thumb: photos.varun2,
  },
  {
    id: "c8",
    title: "Dr. Mrs. Lutchuke Returns",
    comedian: "aditi-mittal",
    views: "740K",
    duration: "1:31",
    thumb: photos.aditi,
  },
  {
    id: "c9",
    title: "Two Passports",
    comedian: "vir-das",
    views: "1.9M",
    duration: "0:44",
    thumb: photos.virdas3,
  },
  {
    id: "c10",
    title: "Hostel Mess Diplomacy",
    comedian: "anubhav-singh-bassi",
    views: "2.8M",
    duration: "1:18",
    thumb: photos.bassi,
  },
];

export const tourDates: TourDate[] = [
  {
    id: "t1",
    comedian: "anubhav-singh-bassi",
    show: "Kisi Ko Bataana Mat",
    city: "New Delhi",
    venue: "Talkatora Indoor Stadium",
    date: "Oct 24",
    weekday: "Friday",
    time: "8:00 PM",
    price: "₹999",
    soldOut: false,
    poster: photos.bassiWide,
  },
  {
    id: "t2",
    comedian: "vir-das",
    show: "Mind Fool World Tour",
    city: "Mumbai",
    venue: "NSCI Dome, Worli",
    date: "Nov 02",
    weekday: "Sunday",
    time: "7:30 PM",
    price: "₹1,499",
    soldOut: false,
    poster: photos.virdas2,
  },
  {
    id: "t3",
    comedian: "zakir-khan",
    show: "Papa Yaar",
    city: "Bengaluru",
    venue: "Chowdiah Memorial Hall",
    date: "Nov 15",
    weekday: "Saturday",
    time: "6:00 PM",
    price: "₹1,200",
    soldOut: true,
    poster: photos.zakir,
  },
  {
    id: "t4",
    comedian: "kanan-gill",
    show: "Is This It?",
    city: "Pune",
    venue: "The Comedy Cellar",
    date: "Nov 21",
    weekday: "Friday",
    time: "9:00 PM",
    price: "₹850",
    soldOut: false,
    poster: photos.kananWide,
  },
  {
    id: "t5",
    comedian: "sumukhi-suresh",
    show: "Behti Naak Live",
    city: "Hyderabad",
    venue: "Shilpakala Vedika",
    date: "Dec 05",
    weekday: "Friday",
    time: "8:30 PM",
    price: "₹950",
    soldOut: false,
    poster: photos.sumukhi,
  },
  {
    id: "t6",
    comedian: "varun-grover",
    show: "Nothing Makes Sense",
    city: "Kolkata",
    venue: "GD Birla Sabhagar",
    date: "Dec 12",
    weekday: "Saturday",
    time: "7:00 PM",
    price: "₹799",
    soldOut: false,
    poster: photos.varun2,
  },
  {
    id: "t7",
    comedian: "biswa-kalyan-rath",
    show: "Sitting (Revisited)",
    city: "Chennai",
    venue: "Music Academy",
    date: "Dec 19",
    weekday: "Saturday",
    time: "8:00 PM",
    price: "₹1,100",
    soldOut: true,
    poster: photos.biswaWide,
  },
  {
    id: "t8",
    comedian: "aditi-mittal",
    show: "Mother of Invention",
    city: "Ahmedabad",
    venue: "Tagore Hall",
    date: "Jan 09",
    weekday: "Friday",
    time: "7:45 PM",
    price: "₹700",
    soldOut: false,
    poster: photos.aditi,
  },
];

export const subGenres = [
  "Observational",
  "Anecdotal",
  "Political Satire",
  "Sketch",
  "Absurdist",
  "Dark Humor",
  "Character",
  "Poetry",
  "Storytelling",
];

export const languages = ["Hindi", "Hinglish", "English"];

export function getComedian(slug: string) {
  return comedians.find((c) => c.slug === slug);
}

export function comedianName(slug: string) {
  return getComedian(slug)?.name ?? slug;
}

export function getSpecial(id: string) {
  return specials.find((s) => s.id === id);
}

export function specialsBy(slug: string) {
  return specials.filter((s) => s.comedian === slug);
}

export function toursBy(slug: string) {
  return tourDates.filter((t) => t.comedian === slug);
}

export function clipsBy(slug: string) {
  return clips.filter((c) => c.comedian === slug);
}
