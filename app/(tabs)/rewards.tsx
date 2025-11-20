import { Feather } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import Svg, { Circle } from "react-native-svg";

const QUESTS = [
  {
    id: "quest-1",
    name: "Silver Sprint",
    badge: "Silver",
    reward: 50000,
    requiredPoints: 100,
    description: "Close your first few referrals and collect the starter badge.",
  },
  {
    id: "quest-2",
    name: "Ruby Rise",
    badge: "Ruby",
    reward: 100000,
    requiredPoints: 200,
    description: "Keep the momentum and unlock the ruby tier of earners.",
  },
  {
    id: "quest-3",
    name: "Gold Rush",
    badge: "Gold",
    reward: 200000,
    requiredPoints: 400,
    description: "Lead the pack with consistent bookings and golden service.",
  },
  {
    id: "quest-4",
    name: "Diamond Dynasty",
    badge: "Diamond",
    reward: 500000,
    requiredPoints: 1000,
    description: "Elite level! Dominate the leaderboard and cash out big.",
  },
] as const;

const earnedBadgesThisMonth = ["Silver", "Ruby"];
const currentPoints = 260;
const currentMonthLabel = new Date().toLocaleDateString("en-US", {
  month: "long",
  year: "numeric",
});

const historicalBadges: Array<typeof QUESTS[number]["badge"]> = [
  "Silver",
  "Ruby",
  "Gold",
  "Silver",
  "Ruby",
  "Silver",
];

const currentQuestIndex = QUESTS.findIndex(
  (quest) => currentPoints < quest.requiredPoints
);
const currentQuest = currentQuestIndex === -1 ? QUESTS[QUESTS.length - 1] : QUESTS[currentQuestIndex];
const previousQuest = QUESTS[currentQuestIndex - 1];

const formatCurrency = (amount: number) =>
  `₦${amount.toLocaleString("en-NG", { maximumFractionDigits: 0 })}`;

const badgeColors: Record<typeof QUESTS[number]["badge"], string> = {
  Silver: "#c0c0c0",
  Ruby: "#e11d48",
  Gold: "#eab308",
  Diamond: "#38bdf8",
};

const medalEmoji: Record<typeof QUESTS[number]["badge"], string> = {
  Silver: "🥈",
  Ruby: "♦️",
  Gold: "🥇",
  Diamond: "💎",
};

const CircularProgress = ({
  percentage,
  current,
  target,
}: {
  percentage: number;
  current: number;
  target: number;
}) => {
  const size = 100;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - circumference * percentage;

  return (
    <View className="h-28 w-28 items-center justify-center">
      <Svg width={size} height={size} style={{ transform: [{ rotate: "-90deg" }] }}>
        <Circle
          stroke="#bfdbfe"
          fill="transparent"
          strokeWidth={strokeWidth}
          cx={size / 2}
          cy={size / 2}
          r={radius}
        />
        <Circle
          stroke="#1d4ed8"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
        />
      </Svg>
      <View className="absolute items-center">
        <Text className="text-lg font-bold text-slate-900">{current}</Text>
        <Text className="text-[10px] text-slate-500">of {target}</Text>
      </View>
    </View>
  );
};

export default function RewardsScreen() {
  const progress = useMemo(() => {
    const base = previousQuest ? previousQuest.requiredPoints : 0;
    const target = currentQuest.requiredPoints;
    return Math.min(1, (currentPoints - base) / (target - base));
  }, [currentPoints, currentQuest, previousQuest]);

  const [actionsVisible, setActionsVisible] = useState(false);
  const [showHistorical, setShowHistorical] = useState(false);
  const badgeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    historicalBadges.forEach((badge) => {
      counts[badge] = (counts[badge] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 80, paddingHorizontal: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="pt-6">
          <Text className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-500">
            Safarihills
          </Text>
          <Text className="mt-1 text-3xl font-bold text-slate-900">
            Your Rewards
          </Text>
          <Text className="mt-1 text-sm text-slate-500">
            {currentMonthLabel} • {currentPoints} pts
          </Text>
        </View>

        <View className="mt-6 rounded-3xl border border-blue-100 bg-white p-5 shadow-sm shadow-blue-50">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 pr-4">
              <Text className="text-xs uppercase tracking-[0.3em] text-blue-500">
                Current quest
              </Text>
              <Text className="text-2xl font-bold text-slate-900">
                {currentQuest.name}
              </Text>
              <Text className="text-sm text-slate-500">
                Unlock the {currentQuest.badge} badge for{" "}
                {formatCurrency(currentQuest.reward)}
              </Text>
            </View>
            <CircularProgress
              percentage={progress}
              current={currentPoints}
              target={currentQuest.requiredPoints}
            />
          </View>
          <Text className="mt-2 text-xs text-slate-500">
            {Math.max(
              0,
              currentQuest.requiredPoints - currentPoints
            )}{" "}
            more points to win the {currentQuest.badge} badge.
          </Text>

          <Pressable
            className="mt-4 flex-row items-center justify-center rounded-full bg-blue-600 py-3"
            onPress={() => setActionsVisible(true)}
          >
            <Feather name="target" size={16} color="#fff" />
            <Text className="ml-2 text-sm font-semibold text-white">
              See actions to earn points
            </Text>
          </Pressable>
        </View>

        <View className="mt-8">
          <Text className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Badges earned
          </Text>
          <View className="mt-4 flex-row flex-wrap gap-3">
            {QUESTS.map((quest) => {
              const unlocked = earnedBadgesThisMonth.includes(quest.badge);
              return (
                <View
                  key={quest.id}
                  className={`w-[48%] rounded-3xl border px-4 py-4 ${
                    unlocked ? "border-blue-100 bg-white" : "border-slate-100 bg-slate-50"
                  }`}
                >
                  <View className="flex-row items-center justify-between">
                    <Text className="text-lg font-bold text-slate-900">
                      {quest.badge}
                    </Text>
                    <Text className="text-2xl">{medalEmoji[quest.badge]}</Text>
                  </View>
                  <Text className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    {quest.name}
                  </Text>
                  <Text className="mt-2 text-xs text-slate-500">
                    Reward {formatCurrency(quest.reward)}
                  </Text>
                  {unlocked ? (
                    <Text className="mt-1 text-xs font-semibold text-blue-600">
                      Earned this month
                    </Text>
                  ) : (
                    <Text className="mt-1 text-xs text-slate-400">
                      Reach {quest.requiredPoints} pts
                    </Text>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        <View className="mt-8">
          <Text className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Quest roadmap
          </Text>
          <View className="mt-4 space-y-4">
            {QUESTS.map((quest, index) => {
              const unlocked = earnedBadgesThisMonth.includes(quest.badge);
              const next =
                index === currentQuestIndex ||
                (currentQuestIndex === -1 && index === QUESTS.length - 1);
              return (
                <View
                  key={quest.id}
                  className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm shadow-slate-50"
                >
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-3">
                      <Text className="text-2xl">{medalEmoji[quest.badge]}</Text>
                      <View>
                        <Text className="text-base font-semibold text-slate-900">
                          {quest.name}
                        </Text>
                        <Text className="text-xs uppercase tracking-[0.3em] text-slate-400">
                          {quest.badge} badge
                        </Text>
                      </View>
                    </View>
                    <View className="items-end">
                      <Text className="text-xs text-slate-400">Reward</Text>
                      <Text className="text-sm font-semibold text-blue-600">
                        {formatCurrency(quest.reward)}
                      </Text>
                    </View>
                  </View>
                  <Text className="mt-2 text-sm text-slate-500">
                    {quest.description}
                  </Text>
                  <View className="mt-3 flex-row items-center justify-between">
                    <Text className="text-xs text-slate-400">
                      Requires {quest.requiredPoints} pts
                    </Text>
                    {unlocked ? (
                      <View className="flex-row items-center gap-1 rounded-full bg-green-50 px-3 py-1">
                        <Feather name="check" size={14} color="#16a34a" />
                        <Text className="text-xs font-semibold text-green-700">
                          Completed
                        </Text>
                      </View>
                    ) : next ? (
                      <View className="flex-row items-center gap-1 rounded-full bg-blue-50 px-3 py-1">
                        <Feather name="trending-up" size={14} color="#2563eb" />
                        <Text className="text-xs font-semibold text-blue-700">
                          In progress
                        </Text>
                      </View>
                    ) : (
                      <View className="flex-row items-center gap-1 rounded-full bg-slate-100 px-3 py-1">
                        <Feather name="lock" size={14} color="#94a3b8" />
                        <Text className="text-xs font-semibold text-slate-500">
                          Locked
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        <Pressable
          className="mt-8 flex-row items-center justify-between rounded-3xl border border-slate-100 bg-white px-4 py-3 shadow-sm shadow-slate-50"
          onPress={() => setShowHistorical((prev) => !prev)}
        >
          <Text className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            All Badges Earned • 2025
          </Text>
          <Feather
            name={showHistorical ? "chevron-up" : "chevron-down"}
            size={18}
            color="#475569"
          />
        </Pressable>
        {showHistorical ? (
          <View className="mt-4 rounded-3xl border border-slate-100 bg-white p-4 shadow-sm shadow-slate-50">
            {Object.entries(badgeCounts).map(([badge, count]) => (
              <View
                key={badge}
                className="mb-3 flex-row items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3"
              >
                <View className="flex-row items-center gap-3">
                  <Text className="text-2xl">{medalEmoji[badge as keyof typeof medalEmoji]}</Text>
                  <Text className="text-sm font-semibold text-slate-900">
                    {badge} badge
                  </Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Text className="text-sm font-semibold text-blue-600">
                    ×{count}
                  </Text>
                  <Feather name="check-circle" size={18} color="#16a34a" />
                </View>
              </View>
            ))}
          </View>
        ) : null}
      </ScrollView>
      {actionsVisible ? (
        <View className="absolute inset-0 bg-black/40 px-6 pt-12">
          <View className="mt-auto rounded-t-[32px] bg-white px-6 pb-10 pt-6">
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-xl font-bold text-slate-900">
                Earn points faster
              </Text>
              <Pressable onPress={() => setActionsVisible(false)}>
                <Feather name="x" size={22} color="#0f172a" />
              </Pressable>
            </View>
            <View className="space-y-4">
              {[
                {
                  title: "Share 3 listings",
                  desc: "Send tailored listing links to potential buyers.",
                  points: "+30 pts",
                },
                {
                  title: "Close a referral",
                  desc: "Guide a guest from tour to signed agreement.",
                  points: "+80 pts",
                },
                {
                  title: "Host a showcase",
                  desc: "Arrange an in-person viewing for VIP prospects.",
                  points: "+120 pts",
                },
              ].map((action) => (
                <View
                  key={action.title}
                  className="rounded-3xl border border-slate-100 bg-slate-50/80 p-4"
                >
                  <View className="flex-row items-center justify-between">
                    <Text className="text-base font-semibold text-slate-900">
                      {action.title}
                    </Text>
                    <Text className="text-sm font-semibold text-blue-600">
                      {action.points}
                    </Text>
                  </View>
                  <Text className="mt-1 text-sm text-slate-500">
                    {action.desc}
                  </Text>
                </View>
              ))}
            </View>
            <Pressable
              className="mt-6 flex-row items-center justify-center rounded-full bg-blue-600 py-3"
              onPress={() => setActionsVisible(false)}
            >
              <Text className="text-sm font-semibold text-white">
                Got it, keep earning
              </Text>
            </Pressable>
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
}
