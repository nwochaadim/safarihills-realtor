import { SafeAreaView, Text, View } from "react-native";

export default function RewardsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-3xl font-bold text-slate-900">Rewards</Text>
        <Text className="mt-2 text-center text-base text-slate-500">
          Track missions, quests, and your earnings here. Coming soon.
        </Text>
      </View>
    </SafeAreaView>
  );
}
