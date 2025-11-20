import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  View
} from "react-native";

type BookingStatus = "current" | "upcoming" | "past";

type Booking = {
  id: string;
  listingId: string;
  apartmentName: string;
  apartmentType: string;
  location: string;
  guestName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  amountPaid: number;
  cautionFee: number;
  pointsEarned: number;
  coverImage: string;
  avatar: string;
  status: BookingStatus;
  rating?: number;
};

const BOOKINGS: Booking[] = [
  {
    id: "booking-1",
    listingId: "apartment-1",
    apartmentName: "Azure Heights Studio",
    apartmentType: "Studio",
    location: "Orchid, Lekki",
    guestName: "Chioma Ikpe",
    guestEmail: "chioma@safarihills.com",
    checkIn: "2025-01-07",
    checkOut: "2025-01-09",
    amountPaid: 195000,
    cautionFee: 25000,
    pointsEarned: 160,
    coverImage:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
    avatar:
      "https://images.unsplash.com/photo-1505692794400-4d1d82cd5d05?auto=format&fit=crop&w=200&q=80",
    status: "current",
  },
  {
    id: "booking-2",
    listingId: "apartment-2",
    apartmentName: "Lagoon View Duplex",
    apartmentType: "4 bed",
    location: "Victoria Island, Lagos",
    guestName: "Remi Cole",
    guestEmail: "remi@safarihills.com",
    checkIn: "2025-02-15",
    checkOut: "2025-02-19",
    amountPaid: 600000,
    cautionFee: 50000,
    pointsEarned: 320,
    coverImage:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
    avatar:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=200&q=80",
    status: "upcoming",
  },
  {
    id: "booking-3",
    listingId: "apartment-3",
    apartmentName: "Palm Crest Loft",
    apartmentType: "2 bed",
    location: "Ikate, Lekki",
    guestName: "Lanre P.",
    guestEmail: "lanre@safarihills.com",
    checkIn: "2024-12-12",
    checkOut: "2024-12-15",
    amountPaid: 255000,
    cautionFee: 20000,
    pointsEarned: 140,
    coverImage:
      "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1200&q=80",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
    status: "past",
    rating: 4.8,
  },
  {
    id: "booking-4",
    listingId: "apartment-4",
    apartmentName: "Skyline Executive Suite",
    apartmentType: "1 bed",
    location: "Eko Atlantic, Lagos",
    guestName: "Adaobi K.",
    guestEmail: "adaobi@safarihills.com",
    checkIn: "2025-03-03",
    checkOut: "2025-03-05",
    amountPaid: 420000,
    cautionFee: 40000,
    pointsEarned: 230,
    coverImage:
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=80",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    status: "upcoming",
  },
  {
    id: "booking-5",
    listingId: "apartment-2",
    apartmentName: "Lagoon View Duplex",
    apartmentType: "4 bed",
    location: "Victoria Island, Lagos",
    guestName: "Jason N",
    guestEmail: "jason@safarihills.com",
    checkIn: "2024-11-26",
    checkOut: "2024-11-29",
    amountPaid: 450000,
    cautionFee: 50000,
    pointsEarned: 300,
    coverImage:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
    avatar:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80",
    status: "past",
    rating: 5,
  },
];

const FILTERS: { label: string; value: BookingStatus }[] = [
  { label: "Current", value: "current" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Past", value: "past" },
];

const formatCurrency = (value: number) =>
  `₦${value.toLocaleString("en-NG", { maximumFractionDigits: 0 })}`;

const formatDateRange = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
  };
  const startLabel = startDate.toLocaleDateString("en-US", options);
  const endLabel = endDate.toLocaleDateString("en-US", {
    ...options,
    year: startDate.getFullYear() === endDate.getFullYear() ? undefined : "numeric",
  });
  return `${startLabel} - ${endLabel}`;
};

export default function BookingsScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<BookingStatus>("current");
  const [visibleCount, setVisibleCount] = useState(4);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const filteredBookings = useMemo(
    () => BOOKINGS.filter((booking) => booking.status === activeFilter),
    [activeFilter]
  );

  const displayedBookings = filteredBookings.slice(0, visibleCount);

  const handleLoadMore = () => {
    if (visibleCount < filteredBookings.length) {
      setVisibleCount((prev) => prev + 3);
    }
  };

  const handleChangeFilter = (status: BookingStatus) => {
    setActiveFilter(status);
    setVisibleCount(4);
  };

  const renderBookingCard = ({ item }: { item: Booking }) => (
    <Pressable
      className="mb-5 rounded-3xl border border-slate-100 bg-white p-4 shadow-sm shadow-slate-100"
      onPress={() => setSelectedBooking(item)}
    >
      <View className="flex-row items-center gap-4">
        <Image
          source={{ uri: item.avatar }}
          className="h-16 w-16 rounded-2xl"
          resizeMode="cover"
        />
        <View className="flex-1">
          <View className="flex-row items-center justify-between">
            <Text className="text-base font-semibold text-slate-900">
              {item.apartmentName}
            </Text>
            <Text className="text-xs font-semibold uppercase text-blue-500">
              {item.apartmentType}
            </Text>
          </View>
          <Text className="text-sm text-slate-500">{item.guestName}</Text>
          <Text className="text-xs text-slate-400">
            {formatDateRange(item.checkIn, item.checkOut)}
          </Text>
        </View>
      </View>
      <View className="mt-4 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Feather name="credit-card" size={16} color="#0f172a" />
          <Text className="text-sm font-semibold text-slate-800">
            {formatCurrency(item.amountPaid)}
          </Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Feather name="shield" size={16} color="#0f172a" />
          <Text className="text-xs font-semibold text-slate-500">
            Caution {formatCurrency(item.cautionFee)}
          </Text>
        </View>
      </View>
      <View className="mt-3 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Feather name="map-pin" size={16} color="#0f172a" />
          <Text className="text-sm font-semibold text-slate-600">
            {item.location}
          </Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Feather name="award" size={16} color="#0f172a" />
          <Text className="text-sm font-semibold text-slate-800">
            +{item.pointsEarned} pts
          </Text>
        </View>
      </View>
      {item.status === "past" && item.rating ? (
        <View className="mt-3 flex-row items-center justify-between rounded-2xl bg-amber-50/80 px-3 py-2">
          <Text className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
            Guest rating
          </Text>
          <View className="flex-row items-center gap-2">
            <Feather name="star" size={16} color="#b45309" />
            <Text className="text-sm font-semibold text-amber-700">
              {item.rating.toFixed(1)}
            </Text>
          </View>
        </View>
      ) : null}
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="px-6 pt-4">
        <Text className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-500">
          Safarihills
        </Text>
        <Text className="mt-1 text-3xl font-bold text-slate-900">
          Guest bookings
        </Text>
        <Text className="mt-1 text-sm text-slate-500">
          Track every stay you refer and monitor rewards in real time.
        </Text>
      </View>

      <View className="mt-5 px-6">
        <View className="flex-row justify-center gap-3">
          {FILTERS.map((filter) => {
            const isActive = filter.value === activeFilter;
            return (
              <Pressable
                key={filter.value}
                className={`min-w-[100px] rounded-full px-5 py-2 ${
                  isActive ? "bg-blue-600" : "border border-slate-200 bg-white"
                }`}
                onPress={() => handleChangeFilter(filter.value)}
              >
                <Text
                  className={`text-center text-sm font-semibold ${
                    isActive ? "text-white" : "text-slate-600"
                  }`}
                >
                  {filter.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <FlatList
        data={displayedBookings}
        keyExtractor={(item) => item.id}
        renderItem={renderBookingCard}
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 16 }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.6}
        ListEmptyComponent={
          <View className="mt-20 items-center">
            <Text className="text-sm text-slate-400">
              No bookings in this category yet.
            </Text>
          </View>
        }
      />

      <Modal visible={!!selectedBooking} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/40">
          <View className="rounded-t-[32px] bg-white px-6 pb-8 pt-6">
            {selectedBooking ? (
              <>
                <View className="mb-4 flex-row items-center justify-between">
                  <Text className="text-2xl font-bold text-slate-900">
                    {selectedBooking.apartmentName}
                  </Text>
                  <Pressable onPress={() => setSelectedBooking(null)}>
                    <Feather name="x" size={22} color="#0f172a" />
                  </Pressable>
                </View>
                <Image
                  source={{ uri: selectedBooking.coverImage }}
                  className="h-48 w-full rounded-3xl"
                  resizeMode="cover"
                />
                <View className="mt-4 flex-row items-center justify-between">
                  <View>
                    <Text className="text-xs uppercase tracking-[0.3em] text-blue-500">
                      Guest
                    </Text>
                    <Text className="text-base font-semibold text-slate-900">
                      {selectedBooking.guestName}
                    </Text>
                    <Text className="text-xs text-slate-400">
                      {selectedBooking.guestEmail}
                    </Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-xs uppercase tracking-[0.3em] text-blue-500">
                      Stay
                    </Text>
                    <Text className="text-base font-semibold text-slate-900">
                      {formatDateRange(
                        selectedBooking.checkIn,
                        selectedBooking.checkOut
                      )}
                    </Text>
                  </View>
                </View>
                <View className="mt-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-sm text-slate-500">Amount paid</Text>
                    <Text className="text-sm font-semibold text-slate-900">
                      {formatCurrency(selectedBooking.amountPaid)}
                    </Text>
                  </View>
                  <View className="mt-2 flex-row items-center justify-between">
                    <Text className="text-sm text-slate-500">Caution fee</Text>
                    <Text className="text-sm font-semibold text-slate-900">
                      {formatCurrency(selectedBooking.cautionFee)}
                    </Text>
                  </View>
                  <View className="mt-2 flex-row items-center justify-between">
                    <Text className="text-sm text-slate-500">Rewards</Text>
                    <Text className="text-sm font-semibold text-blue-600">
                      +{selectedBooking.pointsEarned} pts
                    </Text>
                  </View>
                </View>

                <Pressable
                  className="mt-6 flex-row items-center justify-center rounded-full bg-blue-600 py-4"
                  onPress={() => {
                    setSelectedBooking(null);
                    router.push(`/listing/${selectedBooking.listingId}`);
                  }}
                >
                  <Feather name="external-link" size={18} color="#fff" />
                  <Text className="ml-2 text-base font-semibold text-white">
                    View listing detail
                  </Text>
                </Pressable>
              </>
            ) : null}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
