import { BackButton } from "@/components/BackButton";
import { Feather } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Share,
  Text,
  View,
} from "react-native";

const referralCode = "SAF-2048";

const referralSteps = [
  { label: "Invite a friend", detail: "Share your code to fellow agents." },
  { label: "Friend earns 10pts on signup.", detail: "They get rewarded instantly." },
  { label: "After their first booking", detail: "Your rewards unlock automatically." },
  { label: "You earn NGN2,000", detail: "Cash reward paid directly to your wallet." },
  { label: "You earn 20pts", detail: "Points boost your tier and perks." },
];

const referralList = [
  { name: "Chika Okafor", date: "Signed up • Mar 1, 2024" },
  { name: "Ifeanyi Udo", date: "Signed up • Feb 26, 2024" },
  { name: "Adaeze Obi", date: "Signed up • Feb 20, 2024" },
  { name: "Seyi Adebayo", date: "Signed up • Feb 10, 2024" },
  { name: "Tosin Alabi", date: "Signed up • Feb 2, 2024" },
];

export default function ReferralsScreen() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [showReferrals, setShowReferrals] = useState(false);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Join me on Safarihills Realtor with my code ${referralCode} to earn rewards on your first booking.`,
      });
    } catch {
      // no-op on cancel or failure
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView
        contentContainerStyle={{ padding: 24, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <BackButton onPress={() => router.back()} />
        <Text className="mt-2 text-xs font-semibold uppercase tracking-[0.4em] text-blue-500">
          Referrals
        </Text>
        <Text className="mt-2 text-3xl font-bold text-slate-900">
          Grow your network
        </Text>
        <Text className="mt-1 text-sm text-slate-500">
          Invite realtors, unlock cash rewards, and earn points together.
        </Text>

        <View className="mt-6 rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-600 to-indigo-700 p-[1px] shadow-md shadow-blue-200">
          <View className="rounded-[26px] bg-white/95 p-5">
            <View>
              <Text className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-500">
                Your referral code
              </Text>
              <Text className="mt-2 text-4xl font-bold text-slate-900">
                {referralCode}
              </Text>
              <Text className="mt-1 text-sm text-slate-500">
                Share this code with fellow realtors to be used at signup to start earning.
              </Text>
            </View>
            <View className="mt-4 flex-row items-center gap-2">
              <Pressable
                className="rounded-full border border-blue-100 bg-blue-50 p-3"
                onPress={handleCopy}
              >
                <Feather name="copy" size={18} color="#1d4ed8" />
              </Pressable>
              <Pressable
                className="rounded-full border border-blue-100 bg-blue-50 p-3"
                onPress={handleShare}
              >
                <Feather name="share-2" size={18} color="#1d4ed8" />
              </Pressable>
            </View>
            {copied ? (
              <Text className="mt-2 text-xs font-semibold text-green-600">
                Code copied to clipboard
              </Text>
            ) : null}

            <View className="mt-5 flex-row gap-3">
              <Pressable
                className="flex-1 items-center justify-center rounded-full bg-blue-600 py-4 shadow-sm shadow-blue-300"
                onPress={handleShare}
              >
                <Text className="text-base font-semibold text-white">
                  Share your code
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View className="mt-8 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm shadow-slate-100">
          <View className="flex-row items-center justify-between">
            <Text className="text-base font-semibold text-slate-900">
              How it works
            </Text>
            <Pressable
              className="flex-row items-center gap-1 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5"
              onPress={() => setShowReferrals(true)}
            >
              <Feather name="users" size={16} color="#1d4ed8" />
              <Text className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                View referrals
              </Text>
            </Pressable>
          </View>
          <Text className="mt-1 text-sm text-slate-500">
            Simple steps for both you and the realtors you invite.
          </Text>

          <View className="mt-4 space-y-3">
            {referralSteps.map((step, index) => (
              <View
                key={step.label}
                className="flex-row items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3"
              >
                <View className="mt-1 rounded-full bg-blue-100 px-3 py-1">
                  <Text className="text-xs font-semibold text-blue-700">
                    {index + 1}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-slate-900">
                    {step.label}
                  </Text>
                  <Text className="text-sm text-slate-500">{step.detail}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent
        visible={showReferrals}
        onRequestClose={() => setShowReferrals(false)}
      >
        <View className="flex-1 justify-end bg-black/40">
          <View className="rounded-t-[32px] bg-white px-6 pb-10 pt-6">
            <View className="mb-6 h-1 w-14 self-center rounded-full bg-slate-200" />
            <View className="flex-row items-center justify-between">
              <Text className="text-2xl font-bold text-slate-900">
                Your referrals
              </Text>
              <Pressable onPress={() => setShowReferrals(false)}>
                <Feather name="x" size={22} color="#0f172a" />
              </Pressable>
            </View>
            <Text className="mt-1 text-sm text-slate-500">
              People who joined with your code and their signup dates.
            </Text>

            <View className="mt-4 rounded-2xl border border-slate-100 bg-slate-50/70">
              {referralList.map((person, index) => (
                <View
                  key={person.name}
                  className={`flex-row items-center justify-between px-4 py-3 ${
                    index !== 0 ? "border-t border-slate-100" : ""
                  }`}
                >
                  <View>
                    <Text className="text-base font-semibold text-slate-900">
                      {person.name}
                    </Text>
                    <Text className="text-sm text-slate-500">{person.date}</Text>
                  </View>
                  <Feather name="check-circle" size={18} color="#16a34a" />
                </View>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
