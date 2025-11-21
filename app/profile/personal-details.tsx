import { SafeAreaView, ScrollView, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";

const details = [
  { label: "First name", value: "Adim" },
  { label: "Last name", value: "Eze" },
  { label: "Phone number", value: "+234 812 345 6789" },
  { label: "Email", value: "adim@gmail.com" },
];

export default function PersonalDetailsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView
        contentContainerStyle={{ padding: 24, paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        <Pressable onPress={() => router.back()}>
          <Text className="text-sm font-semibold text-blue-600">‹ Back</Text>
        </Pressable>
        <Text className="mt-2 text-xs font-semibold uppercase tracking-[0.4em] text-blue-500">
          Profile
        </Text>
        <Text className="mt-2 text-3xl font-bold text-slate-900">
          Personal details
        </Text>
        <Text className="mt-1 text-sm text-slate-500">
          Update your contact details or manage your account.
        </Text>

        <View className="mt-6 rounded-3xl border border-slate-100 bg-white p-4 shadow-sm shadow-slate-50">
          {details.map((item, index) => (
            <View
              key={item.label}
              className={`py-3 ${index !== 0 ? "border-t border-slate-100" : ""}`}
            >
              <Text className="text-xs uppercase tracking-[0.3em] text-slate-400">
                {item.label}
              </Text>
              <Text className="mt-1 text-base font-semibold text-slate-900">
                {item.value}
              </Text>
            </View>
          ))}
        </View>

        <View className="mt-6 space-y-3">
          <Pressable
            className="rounded-full bg-blue-600 py-4"
            onPress={() => router.replace("/auth/login")}
          >
            <Text className="text-center text-base font-semibold text-white">
              Sign out
            </Text>
          </Pressable>
          <Pressable className="rounded-full border border-rose-200 py-4">
            <Text className="text-center text-base font-semibold text-rose-600">
              Delete account
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
