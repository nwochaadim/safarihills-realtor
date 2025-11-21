import { Feather } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";

type LinkConfig = {
  label: string;
  href: string;
};

const medalEmoji: Record<string, string> = {
  Silver: "🥈",
  Ruby: "♦️",
  Gold: "🥇",
  Diamond: "💎",
};

const accountLinks: LinkConfig[] = [
  { label: "Personal details", href: "/profile/personal-details" },
  { label: "Wallet", href: "/profile/wallet" },
  { label: "Referrals", href: "/profile/referrals" },
];

const supportLinks: LinkConfig[] = [
  { label: "FAQs", href: "/profile/faqs" },
  { label: "Get help", href: "/profile/help" },
];

const legalLinks: LinkConfig[] = [
  { label: "Terms of use", href: "/profile/terms" },
  { label: "Privacy policy", href: "/profile/privacy" },
];

const renderLink = (router: ReturnType<typeof useRouter>) => (item: LinkConfig) =>
  (
    <Pressable
      key={item.label}
      className="flex-row items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-4 shadow-sm shadow-slate-50"
      onPress={() => router.push(item.href)}
    >
      <Text className="text-base font-semibold text-slate-900">{item.label}</Text>
      <Text className="text-xl text-slate-400">›</Text>
    </Pressable>
  );

export default function ProfileScreen() {
  const router = useRouter();
  const version =
    Constants.expoConfig?.version || Constants.manifest?.version || "1.0.0";
  const stats = {
    points: 260,
    bookings: 34,
    badges: {
      Silver: 5,
      Ruby: 3,
      Gold: 2,
      Diamond: 1,
    },
  };
  const [tooltip, setTooltip] = useState<string | null>(null);

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 120 }}
      >
        <View className="pt-2">
          <View className="mt-3 items-center">
            <View className="size-16 items-center justify-center rounded-full bg-blue-100">
              <Text className="text-xl font-bold text-blue-800">AE</Text>
            </View>
            <Text className="mt-4 text-center text-3xl font-bold text-slate-900">
              Adim Eze
            </Text>
            <Text className="mt-1 text-center text-sm text-slate-500">
              adim@gmail.com • Elite Navigator
            </Text>
          </View>
          <View className="mt-6 space-y-3">
            <View className="flex-row flex-wrap items-center justify-center gap-4">
              <Pressable
                className="flex-row items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2"
                onPress={() => setTooltip(`${stats.points} pts have been earned.`)}
              >
                <Feather name="award" size={14} color="#1d4ed8" />
                <Text className="text-sm font-semibold text-blue-700">
                  {stats.points} pts
                </Text>
              </Pressable>
              <Pressable
                className="flex-row items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2"
                onPress={() => setTooltip(`${stats.bookings} bookings recorded.`)}
              >
                <Feather name="briefcase" size={14} color="#0f172a" />
                <Text className="text-sm font-semibold text-slate-700">
                  {stats.bookings} bookings
                </Text>
              </Pressable>
            </View>
            <View className="mt-3 flex-row flex-wrap items-center justify-center gap-3">
              {Object.entries(stats.badges).map(([badge, count]) => (
                <Pressable
                  key={badge}
                  className="flex-row items-center gap-2 rounded-full border border-slate-100 bg-white px-4 py-2 shadow-sm shadow-slate-50"
                  onPress={() =>
                    setTooltip(
                      `${badge} medal has been won ${count} ${
                        count === 1 ? "time" : "times"
                      }.`
                    )
                  }
                >
                  <Text className="text-base font-semibold text-slate-900">
                    {count} {medalEmoji[badge]}
                  </Text>
                </Pressable>
              ))}
            </View>
            {tooltip ? (
              <View className="rounded-2xl border border-blue-100 bg-blue-50/60 px-4 py-3">
                <View className="flex-row items-start justify-between">
                  <Text className="flex-1 text-sm text-blue-700">{tooltip}</Text>
                  <Pressable onPress={() => setTooltip(null)}>
                    <Feather name="x" size={16} color="#1d4ed8" />
                  </Pressable>
                </View>
              </View>
            ) : null}
          </View>
        </View>

        <View className="mt-8 space-y-3">
          <Text className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Account
          </Text>
          {accountLinks.map(renderLink(router))}
        </View>

        <View className="mt-8 space-y-3">
          <Text className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Support
          </Text>
          {supportLinks.map(renderLink(router))}
        </View>

        <View className="mt-8 space-y-3">
          <Text className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Legal
          </Text>
          {legalLinks.map(renderLink(router))}
        </View>
      </ScrollView>

      <View className="items-center pb-6">
        <Text className="text-xs text-slate-400">Version {version}</Text>
      </View>
    </SafeAreaView>
  );
}
