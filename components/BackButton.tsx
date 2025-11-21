import { Feather } from "@expo/vector-icons";
import { Pressable } from "react-native";

type BackButtonProps = {
  onPress: () => void;
  className?: string;
};

export function BackButton({ onPress, className }: BackButtonProps) {
  return (
    <Pressable
      className={`w-12 items-center justify-center rounded-full bg-white/85 py-3 ${className ?? ""}`}
      onPress={onPress}
      hitSlop={12}
      accessibilityLabel="Go back"
    >
      <Feather name="arrow-left" size={20} color="#0f172a" />
    </Pressable>
  );
}
