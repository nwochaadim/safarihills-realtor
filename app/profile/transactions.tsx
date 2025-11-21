import { BackButton } from "@/components/BackButton";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

const transactions = [
  {
    id: "t1",
    type: "credit" as const,
    title: "Booking payout",
    amount: 80000,
    date: "Mar 02, 2024 • 10:14 AM",
    reference: "SH-58402",
  },
  {
    id: "t2",
    type: "debit" as const,
    title: "Withdrawal to Zenith",
    amount: 45000,
    date: "Feb 28, 2024 • 4:22 PM",
    reference: "SH-57311",
  },
  {
    id: "t3",
    type: "credit" as const,
    title: "Booking payout",
    amount: 120000,
    date: "Feb 20, 2024 • 9:03 AM",
    reference: "SH-56109",
  },
  {
    id: "t4",
    type: "debit" as const,
    title: "Withdrawal to GTBank",
    amount: 30000,
    date: "Feb 12, 2024 • 1:45 PM",
    reference: "SH-55320",
  },
];

export default function TransactionsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView
        contentContainerStyle={{ padding: 24, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <BackButton onPress={() => router.back()} />
        <Text className="mt-2 text-xs font-semibold uppercase tracking-[0.4em] text-blue-500">
          Wallet
        </Text>
        <Text className="mt-2 text-3xl font-bold text-slate-900">
          Transactions
        </Text>
        <Text className="mt-1 text-sm text-slate-500">
          Review payouts, withdrawals, and other activity on your account.
        </Text>

        <View className="mt-6 rounded-3xl border border-slate-100 bg-white p-4 shadow-sm shadow-slate-100">
          {transactions.map((txn, index) => {
            const isCredit = txn.type === "credit";
            const amountColor = isCredit ? "text-green-600" : "text-rose-600";

            return (
              <View
                key={txn.id}
                className={`flex-row items-center justify-between py-4 ${
                  index !== 0 ? "border-t border-slate-100" : ""
                }`}
              >
                <View className="flex-row items-center gap-3">
                  <View
                    className={`rounded-full p-3 ${
                      isCredit ? "bg-green-50" : "bg-rose-50"
                    }`}
                  >
                    <Feather
                      name={isCredit ? "arrow-down-left" : "arrow-up-right"}
                      size={18}
                      color={isCredit ? "#16a34a" : "#e11d48"}
                    />
                  </View>
                  <View>
                    <Text className="text-base font-semibold text-slate-900">
                      {txn.title}
                    </Text>
                    <Text className="text-sm text-slate-500">{txn.date}</Text>
                    <Text className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      {txn.reference}
                    </Text>
                  </View>
                </View>
                <Text className={`text-base font-semibold ${amountColor}`}>
                  {isCredit ? "+" : "-"}₦{txn.amount.toLocaleString()}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
