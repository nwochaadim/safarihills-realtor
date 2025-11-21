import { useRouter } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";
import { BackButton } from "@/components/BackButton";

export default function WalletScreen() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="flex-1 px-6 pt-6">
        <BackButton onPress={() => router.back()} />
        <View className="flex-1 items-center justify-center">
          <Text className="text-3xl font-bold text-slate-900">Wallet</Text>
          <Text className="mt-2 text-center text-base text-slate-500">
            Track balances, withdrawals, and payouts here soon.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
