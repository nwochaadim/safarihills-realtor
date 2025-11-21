import { Pressable, SafeAreaView, Text, View } from "react-native";
import { useRouter } from "expo-router";

export default function TermsScreen() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="flex-1 px-6 py-8">
        <Pressable onPress={() => router.back()}>
          <Text className="text-sm font-semibold text-blue-600">‹ Back</Text>
        </Pressable>
        <Text className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-500">
          Legal
        </Text>
        <Text className="mt-2 text-3xl font-bold text-slate-900">
          Terms of use
        </Text>
        <Text className="mt-4 text-base leading-6 text-slate-600">
          Safarihills is drafting updated terms for its realtor network. Check
          back soon for the full document.
        </Text>
      </View>
    </SafeAreaView>
  );
}
