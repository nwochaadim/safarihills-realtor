import { useEffect, useMemo, useState } from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { LISTINGS } from "../../lib/listings";

const { width } = Dimensions.get("window");
const IMAGE_HEIGHT = width * 0.7;

const formatCurrencyInput = (value: string) => {
  const digitsOnly = value.replace(/[^\d]/g, "");
  if (!digitsOnly) return "";
  return Number(digitsOnly).toLocaleString();
};

export default function ListingDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const listing = useMemo(
    () => LISTINGS.find((item) => item.id === id),
    [id]
  );

  const [activeImage, setActiveImage] = useState(0);
  const [rentSheetVisible, setRentSheetVisible] = useState(false);
  const [rentAmount, setRentAmount] = useState("0");
  const [shareLink, setShareLink] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (listing) {
      setRentAmount(listing.pricePerNight.toLocaleString());
      setShareLink("");
      setCopied(false);
    }
  }, [listing, rentSheetVisible]);

  if (!listing) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Stack.Screen options={{ headerShown: false }} />
        <Pressable
          className="rounded-full bg-blue-600 px-5 py-3"
          onPress={() => router.back()}
        >
          <Text className="text-base font-semibold text-white">
            Listing not found. Go back
          </Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const handleGenerateLink = () => {
    const amountValue = rentAmount
      ? Number(rentAmount.replace(/,/g, ""))
      : listing.pricePerNight;
    const link = `https://safarihills.app/rent/${listing.id}?rate=${amountValue}`;
    setShareLink(link);
    setCopied(false);
  };

  const handleCopyLink = async () => {
    if (!shareLink) return;
    await Clipboard.setStringAsync(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 pt-4">
          <Pressable
            className="mb-4 w-12 items-center justify-center rounded-full border border-slate-200 bg-white/90 py-3"
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={20} color="#0f172a" />
          </Pressable>
        </View>

        <View>
          <FlatList
            data={listing.gallery}
            horizontal
            pagingEnabled
            keyExtractor={(uri, index) => `${uri}-${index}`}
            renderItem={({ item }) => (
              <View style={{ width }}>
                <View
                  className="mx-6 overflow-hidden rounded-[32px]"
                  style={{ height: IMAGE_HEIGHT }}
                >
                  <ImageBackground
                    source={{ uri: item }}
                    className="flex-1"
                    imageStyle={{ borderRadius: 32 }}
                  />
                </View>
              </View>
            )}
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x / width
              );
              setActiveImage(index);
            }}
          />
          <View className="mt-3 flex-row items-center justify-center gap-2">
            {listing.gallery.map((_, index) => (
              <View
                key={index}
                className={`h-2 rounded-full ${
                  index === activeImage ? "w-8 bg-blue-600" : "w-3 bg-blue-200"
                }`}
              />
            ))}
          </View>
        </View>

        <View className="px-6">
          <View className="mt-6 flex-row items-center justify-between">
            <View>
              <Text className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-500">
                {listing.type}
              </Text>
              <Text className="mt-2 text-3xl font-bold text-slate-900">
                {listing.name}
              </Text>
              <Text className="mt-1 text-base text-slate-500">
                {listing.location}
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-lg font-semibold text-blue-600">
                ₦{listing.pricePerNight.toLocaleString()}
              </Text>
              <Text className="text-xs font-medium text-slate-500">per night</Text>
              <View className="mt-2 flex-row items-center gap-2">
                <Feather name="award" size={16} color="#0f172a" />
                <Text className="text-sm font-semibold text-slate-800">
                  +{listing.points} pts
                </Text>
              </View>
            </View>
          </View>

          <Text className="mt-6 text-base leading-6 text-slate-600">
            {listing.description}
          </Text>

          <View className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-100">
            <Text className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Past reviews
            </Text>
            {listing.reviews.map((review) => (
              <View key={review.id} className="mt-5">
                <View className="flex-row items-center justify-between">
                  <Text className="text-base font-semibold text-slate-900">
                    {review.guest}
                  </Text>
                  <View className="flex-row items-center gap-1">
                    <Feather name="star" size={16} color="#fbbf24" />
                    <Text className="text-sm font-semibold text-slate-700">
                      {review.rating.toFixed(1)}
                    </Text>
                  </View>
                </View>
                <Text className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  {review.stay}
                </Text>
                <Text className="mt-2 text-sm leading-6 text-slate-600">
                  {review.comment}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 bg-white px-6 pb-10 pt-4 shadow-lg shadow-slate-200">
        <Pressable
          className="items-center justify-center rounded-full bg-blue-600 py-4"
          onPress={() => setRentSheetVisible(true)}
        >
          <Text className="text-base font-semibold text-white">Rent to Earn</Text>
        </Pressable>
      </View>

      <Modal animationType="slide" transparent visible={rentSheetVisible}>
        <View className="flex-1 justify-end bg-black/40">
          <View className="rounded-t-[32px] bg-white px-6 pb-10 pt-6">
            <View className="mb-6 h-1 w-14 self-center rounded-full bg-slate-200" />
            <View className="flex-row items-start justify-between">
              <Text className="text-2xl font-bold text-slate-900">
                Share to earn
              </Text>
              <Pressable onPress={() => setRentSheetVisible(false)}>
                <Feather name="x" size={22} color="#0f172a" />
              </Pressable>
            </View>
            <Text className="mt-2 text-base text-slate-500">
              Set your nightly rent and share a booking link with guests.
            </Text>

            <View className="mt-8">
              <Text className="text-sm font-medium text-slate-600">
                How much do you want to rent for?
              </Text>
              <View className="mt-2 rounded-2xl border border-slate-200 bg-slate-50/80 px-4">
                <TextInput
                  className="py-4 text-xl font-semibold text-slate-900"
                  keyboardType="number-pad"
                  value={rentAmount}
                  onChangeText={(value) =>
                    setRentAmount(formatCurrencyInput(value))
                  }
                />
              </View>
              <Text className="mt-2 text-xs text-slate-400">
                Tip: keep the price competitive to secure more bookings and unlock
                higher rewards.
              </Text>
            </View>

            <Pressable
              className="mt-8 items-center justify-center rounded-full bg-blue-600 py-4"
              onPress={handleGenerateLink}
            >
              <Text className="text-base font-semibold text-white">
                Generate Share Link
              </Text>
            </Pressable>

            {shareLink ? (
              <View className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
                <Text className="text-xs uppercase tracking-[0.3em] text-blue-500">
                  Share link
                </Text>
                <View className="mt-2 flex-row items-center justify-between">
                  <Text className="flex-1 text-sm font-semibold text-slate-800">
                    {shareLink}
                  </Text>
                  <Pressable
                    className="ml-3 rounded-full bg-white/80 p-2"
                    onPress={handleCopyLink}
                  >
                    <Feather name="copy" size={18} color="#1d4ed8" />
                  </Pressable>
                </View>
                {copied ? (
                  <Text className="mt-2 text-xs font-semibold text-green-600">
                    Link copied to clipboard!
                  </Text>
                ) : null}
              </View>
            ) : null}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
