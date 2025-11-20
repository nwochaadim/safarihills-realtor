import { Pressable, SafeAreaView, Text, View } from "react-native";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 pt-10">
        <Text className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-500">
          Profile
        </Text>
        <Text className="mt-3 text-4xl font-bold text-slate-900">
          Adim Eze
        </Text>
        <Text className="mt-2 text-base text-slate-500">
          adim@gmail.com • Realtor tier: Elite Navigator
        </Text>
        <Pressable
          className="mt-8 rounded-full bg-blue-600 py-4"
          onPress={() => router.replace("/auth/login")}
        >
          <Text className="text-center text-base font-semibold text-white">
            Sign out
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
