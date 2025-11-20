export type ListingReview = {
  id: string;
  guest: string;
  stay: string;
  comment: string;
  rating: number;
};

export type Listing = {
  id: string;
  name: string;
  location: string;
  pricePerNight: number;
  points: number;
  rating: number;
  guests: number;
  coverImage: string;
  gallery: string[];
  type: string;
  amenities: string[];
  description: string;
  reviews: ListingReview[];
};

const formatPrice = (value: number) => `₦${value.toLocaleString()}`;

export const LISTINGS: Listing[] = [
  {
    id: "apartment-1",
    name: "Azure Heights Studio",
    location: "Orchid, Lekki",
    pricePerNight: 65000,
    points: 120,
    rating: 4.8,
    guests: 2,
    coverImage:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505692794400-4d1d82cd5d05?auto=format&fit=crop&w=1200&q=80",
    ],
    type: "Studio",
    amenities: ["wifi", "ac", "smart tv", "balcony"],
    description:
      "Step into this sunlit studio featuring floor-to-ceiling windows, designer accents, and a convenient location in Orchid, Lekki.",
    reviews: [
      {
        id: "rev-1",
        guest: "Chioma I.",
        stay: "Jan 2025",
        rating: 5,
        comment:
          "Loved staying here! Fast Wi-Fi, peaceful environment, and the concierge was helpful.",
      },
      {
        id: "rev-2",
        guest: "Victor U.",
        stay: "Dec 2024",
        rating: 4.7,
        comment:
          "Perfect for business trips. The natural light and balcony view are amazing.",
      },
    ],
  },
  {
    id: "apartment-2",
    name: "Lagoon View Duplex",
    location: "Victoria Island, Lagos",
    pricePerNight: 150000,
    points: 260,
    rating: 4.9,
    guests: 6,
    coverImage:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505692794400-4d1d82cd5d05?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=80",
    ],
    type: "4 bed",
    amenities: ["wifi", "pool", "gym", "cinema"],
    description:
      "A chic multi-level duplex overlooking the Atlantic, with an infinity pool, private cinema, and tailored concierge services.",
    reviews: [
      {
        id: "rev-3",
        guest: "Adaobi K.",
        stay: "Feb 2025",
        rating: 5,
        comment:
          "The views are unreal. Every detail is premium and my clients loved it!",
      },
      {
        id: "rev-4",
        guest: "Lanre P.",
        stay: "Nov 2024",
        rating: 4.9,
        comment:
          "Spacious, clean, and ideal for high-profile guests. Highly recommend.",
      },
    ],
  },
  {
    id: "apartment-3",
    name: "Palm Crest Loft",
    location: "Ikate, Lekki",
    pricePerNight: 85000,
    points: 170,
    rating: 4.7,
    guests: 4,
    coverImage:
      "https://images.unsplash.com/photo-1505692794400-4d1d82cd5d05?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=80",
    ],
    type: "2 bed",
    amenities: ["wifi", "ac", "gym"],
    description:
      "Modern loft with tropical tones, a flexible workspace, and ultra-fast Wi-Fi. Minutes from top dining in Ikate.",
    reviews: [
      {
        id: "rev-5",
        guest: "Bolu F.",
        stay: "Oct 2024",
        rating: 4.5,
        comment:
          "Comfortable stay and responsive support team. The balcony sunsets are gorgeous.",
      },
    ],
  },
  {
    id: "apartment-4",
    name: "Skyline Executive Suite",
    location: "Eko Atlantic, Lagos",
    pricePerNight: 210000,
    points: 340,
    rating: 5,
    guests: 3,
    coverImage:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505692794400-4d1d82cd5d05?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1200&q=80",
    ],
    type: "1 bed",
    amenities: ["wifi", "ac", "smart tv", "balcony"],
    description:
      "Minimalist masterpiece perched above the city. Ideal for C-suite guests needing privacy and flawless service.",
    reviews: [
      {
        id: "rev-6",
        guest: "Jason N.",
        stay: "Aug 2024",
        rating: 5,
        comment:
          "My VIP client was impressed by the automation and concierge. Worth every naira.",
      },
    ],
  },
];

export const getListingById = (id: string) =>
  LISTINGS.find((listing) => listing.id === id);

export const formatListingPrice = (price: number) => formatPrice(price);
