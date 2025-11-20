import { useMemo, useState } from "react";
import {
  FlatList,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";

const APARTMENTS = [
  {
    id: "apartment-1",
    name: "Azure Heights Studio",
    location: "Orchid, Lekki",
    price: "₦65,000",
    points: 120,
    rating: 4.8,
    guests: 2,
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
    type: "Studio",
    amenities: ["wifi", "ac", "smart tv", "balcony"],
  },
  {
    id: "apartment-2",
    name: "Lagoon View Duplex",
    location: "Victoria Island, Lagos",
    price: "₦150,000",
    points: 260,
    rating: 4.9,
    guests: 6,
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
    type: "4 bed",
    amenities: ["wifi", "pool", "gym", "cinema"],
  },
  {
    id: "apartment-3",
    name: "Palm Crest Loft",
    location: "Ikate, Lekki",
    price: "₦85,000",
    points: 170,
    rating: 4.7,
    guests: 4,
    image:
      "https://images.unsplash.com/photo-1505692794400-4d1d82cd5d05?auto=format&fit=crop&w=1200&q=80",
    type: "2 bed",
    amenities: ["wifi", "ac", "gym"],
  },
  {
    id: "apartment-4",
    name: "Skyline Executive Suite",
    location: "Eko Atlantic, Lagos",
    price: "₦210,000",
    points: 340,
    rating: 5,
    guests: 3,
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    type: "1 bed",
    amenities: ["wifi", "ac", "smart tv", "balcony"],
  },
];

const TYPES = [
  "Single shared",
  "Studio",
  "1 bed",
  "2 bed",
  "3 bed",
  "4 bed",
  "5 bed",
];

const AMENITIES = [
  "wifi",
  "swimming pool",
  "ac",
  "dining area",
  "fans",
  "smart tv",
  "cinema",
  "balcony",
  "gym",
];

const INITIAL_FILTER_STATE = {
  minBudget: "",
  maxBudget: "",
  type: "",
  guests: "",
  amenities: [] as string[],
};

const MIN_BUDGET_OPTIONS = ["40000", "60000", "80000", "100000"];
const MAX_BUDGET_OPTIONS = ["80000", "120000", "150000", "250000"];
const GUEST_OPTIONS = ["1", "2", "3", "4", "5", "6+"];

const parsePrice = (price: string) =>
  Number(price.replace(/[^\d]/g, ""));

export default function HomeScreen() {
  const router = useRouter();
  const [filters, setFilters] = useState(INITIAL_FILTER_STATE);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);

  const filteredApartments = useMemo(() => {
    return APARTMENTS.filter((apartment) => {
      if (filters.type && apartment.type !== filters.type) return false;
      if (filters.guests) {
        const guestLimit =
          filters.guests === "6+" ? 6 : Number(filters.guests);
        if (apartment.guests < guestLimit) return false;
      }
      const nightlyRate = parsePrice(apartment.price);
      if (filters.minBudget && nightlyRate < Number(filters.minBudget))
        return false;
      if (filters.maxBudget && nightlyRate > Number(filters.maxBudget))
        return false;
      if (filters.amenities.length > 0) {
        const hasAll = filters.amenities.every((a) =>
          apartment.amenities.includes(a)
        );
        if (!hasAll) return false;
      }
      return true;
    });
  }, [filters]);

  const toggleAmenity = (amenity: string) => {
    setFilters((prev) => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== amenity)
          : [...prev.amenities, amenity],
      };
    });
  };

  const resetFilters = () => setFilters(INITIAL_FILTER_STATE);

  const renderApartment = ({ item }: { item: (typeof APARTMENTS)[0] }) => (
    <View className="mb-6 overflow-hidden rounded-[32px] bg-white shadow-lg shadow-slate-200">
      <ImageBackground
        source={{ uri: item.image }}
        className="h-56 w-full overflow-hidden"
        imageStyle={{ borderTopLeftRadius: 32, borderTopRightRadius: 32 }}
      >
        <View className="flex-1 flex-row items-start justify-between p-4">
          <Text className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-800">
            {item.type}
          </Text>
          <View className="flex-row items-center gap-1 rounded-full bg-slate-900/60 px-3 py-1">
            <Feather name="star" size={14} color="#fde047" />
            <Text className="text-xs font-semibold text-white">
              {item.rating.toFixed(1)}
            </Text>
          </View>
        </View>
      </ImageBackground>

      <View className="space-y-2 px-5 py-5">
        <View className="flex-row items-center justify-between">
          <Text className="text-xl font-semibold text-slate-900">
            {item.name}
          </Text>
          <Text className="text-base font-semibold text-blue-600">
            {item.price}
            <Text className="text-xs font-medium text-slate-500"> / night</Text>
          </Text>
        </View>
        <Text className="text-sm text-slate-500">{item.location}</Text>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Feather name="users" size={16} color="#64748b" />
            <Text className="text-sm font-medium text-slate-600">
              Up to {item.guests} guests
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Feather name="award" size={16} color="#0f172a" />
            <Text className="text-sm font-semibold text-slate-800">
              +{item.points} pts/night
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="flex-row items-center justify-between px-6 pt-4">
        <View>
          <Text className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-500">
            Safarihills
          </Text>
          <Text className="mt-1 text-3xl font-bold text-slate-900">
            Welcome back, Adim
          </Text>
        </View>
        <Pressable
          className="size-12 items-center justify-center rounded-full bg-blue-100"
          onPress={() => router.push("/(tabs)/profile")}
        >
          <Text className="text-lg font-bold text-blue-900">AE</Text>
        </Pressable>
      </View>

      <View className="mt-6 px-6">
        <Pressable
          className="flex-row items-center justify-between rounded-3xl border border-blue-100 bg-white px-5 py-4 shadow-sm shadow-blue-50"
          onPress={() => setFilterSheetOpen((prev) => !prev)}
        >
          <View>
            <Text className="text-xs uppercase tracking-[0.3em] text-blue-500">
              Filters
            </Text>
            <Text className="text-base font-semibold text-slate-900">
              Budget, type, amenities
            </Text>
          </View>
          <Feather name="sliders" size={22} color="#1d4ed8" />
        </Pressable>

        {filterSheetOpen && (
          <View className="mt-4 rounded-3xl border border-slate-200 bg-white p-5">
            <View className="flex-row items-center justify-between">
              <Text className="text-base font-semibold text-slate-900">
                Quick filters
              </Text>
              <Pressable onPress={resetFilters}>
                <Text className="text-sm font-semibold text-blue-600">
                  Reset
                </Text>
              </Pressable>
            </View>

            <View className="mt-4">
              <Text className="text-xs font-semibold uppercase text-slate-400">
                Budget per night (₦)
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mt-3"
              >
                <View className="flex-row gap-3">
                  {MIN_BUDGET_OPTIONS.map((value) => {
                    const isActive = filters.minBudget === value;
                    return (
                      <Pressable
                        key={`min-${value}`}
                        className={`rounded-full px-4 py-2 ${
                          isActive
                            ? "bg-blue-600"
                            : "border border-slate-200 bg-white"
                        }`}
                        onPress={() =>
                          setFilters((prev) => ({
                            ...prev,
                            minBudget: isActive ? "" : value,
                          }))
                        }
                      >
                        <Text
                          className={`text-sm font-semibold ${
                            isActive ? "text-white" : "text-slate-600"
                          }`}
                        >
                          Min ₦{Number(value).toLocaleString()}
                        </Text>
                      </Pressable>
                    );
                  })}
                  {MAX_BUDGET_OPTIONS.map((value) => {
                    const isActive = filters.maxBudget === value;
                    return (
                      <Pressable
                        key={`max-${value}`}
                        className={`rounded-full px-4 py-2 ${
                          isActive
                            ? "bg-blue-600"
                            : "border border-slate-200 bg-white"
                        }`}
                        onPress={() =>
                          setFilters((prev) => ({
                            ...prev,
                            maxBudget: isActive ? "" : value,
                          }))
                        }
                      >
                        <Text
                          className={`text-sm font-semibold ${
                            isActive ? "text-white" : "text-slate-600"
                          }`}
                        >
                          Max ₦{Number(value).toLocaleString()}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </ScrollView>
            </View>

            <View className="mt-5">
              <Text className="text-xs font-semibold uppercase text-slate-400">
                Apartment type
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mt-3"
              >
                <View className="flex-row gap-3">
                  {TYPES.map((type) => {
                    const isActive = filters.type === type;
                    return (
                      <Pressable
                        key={type}
                        className={`rounded-full px-4 py-2 ${
                          isActive
                            ? "bg-blue-600"
                            : "border border-slate-200 bg-white"
                        }`}
                        onPress={() =>
                          setFilters((prev) => ({
                            ...prev,
                            type: isActive ? "" : type,
                          }))
                        }
                      >
                        <Text
                          className={`text-sm font-semibold ${
                            isActive ? "text-white" : "text-slate-600"
                          }`}
                        >
                          {type}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </ScrollView>
            </View>

            <View className="mt-5">
              <Text className="text-xs font-semibold uppercase text-slate-400">
                Guests
              </Text>
              <View className="mt-3 flex-row flex-wrap gap-3">
                {GUEST_OPTIONS.map((option) => {
                  const isActive = filters.guests === option;
                  return (
                    <Pressable
                      key={option}
                      className={`rounded-full border px-4 py-2 ${
                        isActive
                          ? "border-blue-600 bg-blue-50"
                          : "border-slate-200 bg-white"
                      }`}
                      onPress={() =>
                        setFilters((prev) => ({
                          ...prev,
                          guests: isActive ? "" : option,
                        }))
                      }
                    >
                      <Text
                        className={`text-sm font-semibold ${
                          isActive ? "text-blue-700" : "text-slate-600"
                        }`}
                      >
                        {option} guests
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <View className="mt-5">
              <Text className="text-xs font-semibold uppercase text-slate-400">
                Amenities
              </Text>
              <View className="mt-3 flex-row flex-wrap gap-3">
                {AMENITIES.map((amenity) => {
                  const isActive = filters.amenities.includes(amenity);
                  return (
                    <Pressable
                      key={amenity}
                      className={`rounded-full border px-4 py-2 ${
                        isActive
                          ? "border-blue-600 bg-blue-50"
                          : "border-slate-200 bg-white"
                      }`}
                      onPress={() => toggleAmenity(amenity)}
                    >
                      <Text
                        className={`text-sm font-semibold ${
                          isActive ? "text-blue-700" : "text-slate-600"
                        }`}
                      >
                        {amenity}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </View>
        )}
      </View>

      <FlatList
        data={filteredApartments}
        renderItem={renderApartment}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 24, paddingTop: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
