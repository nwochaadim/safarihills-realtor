import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Text } from "react-native";
import "../../global.css";

const TAB_ITEMS = [
  { name: "home", title: "Home", icon: "home" },
  { name: "bookings", title: "Bookings", icon: "calendar" },
  { name: "rewards", title: "Rewards", icon: "gift" },
  { name: "profile", title: "Profile", icon: "user" },
];

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#1d4ed8",
        tabBarInactiveTintColor: "#94a3b8",
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopColor: "#e2e8f0",
          paddingTop: 4,
          paddingBottom: 12,
          height: 70,
        },
        tabBarLabel: ({ color, children }) => (
          <Text className="text-xs font-semibold" style={{ color }}>
            {children}
          </Text>
        ),
      }}
    >
      {TAB_ITEMS.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, size }) => (
              <Feather name={tab.icon as any} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
