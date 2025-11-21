import { useRouter } from "expo-router";
import { Pressable, SafeAreaView, Text, View } from "react-native";

export default function WalletScreen() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="flex-1 px-6 pt-6">
        <Pressable onPress={() => router.back()}>
          <Text className="text-sm font-semibold text-blue-600">‹ Back</Text>
        </Pressable>
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
