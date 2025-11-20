import { Feather } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  ImageBackground,
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import { LISTINGS } from "../../lib/listings";

const { width } = Dimensions.get("window");
const IMAGE_HEIGHT = width * 0.9;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<string>);

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
  const scrollY = useRef(new Animated.Value(0)).current;

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

  const headerHeight = scrollY.interpolate({
    inputRange: [-100, 0, IMAGE_HEIGHT],
    outputRange: [IMAGE_HEIGHT + 120, IMAGE_HEIGHT, IMAGE_HEIGHT * 0.65],
    extrapolate: "clamp",
  });
  const headerTranslate = scrollY.interpolate({
    inputRange: [0, IMAGE_HEIGHT],
    outputRange: [0, -IMAGE_HEIGHT * 0.25],
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />

      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: headerHeight,
          transform: [{ translateY: headerTranslate }],
          zIndex: 10,
        }}
      >
        <AnimatedFlatList
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={{ flex: 1 }}
          data={listing.gallery}
          keyExtractor={(uri, index) => `${uri}-${index}`}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / width);
            setActiveImage(index);
          }}
          renderItem={({ item }) => (
            <View style={{ width, height: "100%" }}>
              <ImageBackground
                source={{ uri: item }}
                className="flex-1"
                imageStyle={{ opacity: 0.95 }}
              >
                <View className="absolute inset-0 bg-black/30" />
              </ImageBackground>
            </View>
          )}
        />
        <View
          style={{
            position: "absolute",
            top: 50,
            left: 15,
            right: 24,
          }}
        >
          <Pressable
            className="w-12 items-center justify-center rounded-full bg-white/85 py-3"
            onPress={() => router.back()}
            hitSlop={12}
          >
            <Feather name="arrow-left" size={20} color="#0f172a" />
          </Pressable>
        </View>
        <View
          className="flex-row items-center justify-center gap-2"
          style={{ position: "absolute", bottom: 16, left: 0, right: 0 }}
        >
          {listing.gallery.map((_, index) => (
            <View
              key={`${index}-dot`}
              className={`h-1.5 rounded-full ${
                index === activeImage ? "w-10 bg-white" : "w-4 bg-white/60"
              }`}
            />
          ))}
        </View>
      </Animated.View>

      <Animated.ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 160,
          paddingTop: IMAGE_HEIGHT + 48,
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View className="px-6">
          <View className="flex-row items-center justify-between">
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

          <View className="mt-8 rounded-3xl border border-blue-50 bg-blue-50/40 p-5 shadow-sm shadow-blue-100">
            <Text className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-500">
              Amenities
            </Text>
            <View className="mt-4 flex-row flex-wrap gap-3">
              {listing.amenities.map((amenity) => (
                <View
                  key={amenity}
                  className="rounded-full border border-blue-100 bg-white px-4 py-2"
                >
                  <Text className="text-sm font-semibold text-blue-700">
                    {amenity}
                  </Text>
                </View>
              ))}
            </View>
          </View>

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
      </Animated.ScrollView>

      <Animated.View
        className="absolute left-0 right-0 bg-white px-6 pb-10 pt-4 shadow-lg shadow-slate-200"
        style={{ bottom: 0 }}
      >
        <Pressable
          className="items-center justify-center rounded-full bg-blue-600 py-4"
          onPress={() => setRentSheetVisible(true)}
        >
          <Text className="text-base font-semibold text-white">Rent to Earn</Text>
        </Pressable>
      </Animated.View>

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
