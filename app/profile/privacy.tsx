import { SafeAreaView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { BackButton } from "@/components/BackButton";

export default function PrivacyScreen() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="flex-1 px-6 py-8">
        <BackButton onPress={() => router.back()} />
        <Text className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-500">
          Legal
        </Text>
        <Text className="mt-2 text-3xl font-bold text-slate-900">
          Privacy policy
        </Text>
        <Text className="mt-4 text-base leading-6 text-slate-600">
          The updated privacy policy for Safarihills Realtors will be published
          soon. You will find details about how your data is handled here.
        </Text>
      </View>
    </SafeAreaView>
  );
}
