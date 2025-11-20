import { Feather } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const VALID_EMAIL = "adim@gmail.com";
const VALID_PASSWORD = "adim";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (
      trimmedEmail !== VALID_EMAIL.toLowerCase() ||
      trimmedPassword !== VALID_PASSWORD
    ) {
      setError("Incorrect email or password. Please try again.");
      return;
    }

    setError(null);
    Alert.alert("Welcome back!", "You are now signed in to Safarihills Realtor");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View className="flex-1 px-6 pb-10 pt-8">
          <Pressable
            className="mb-4 w-12 items-center justify-center rounded-full border border-blue-100 bg-white/80 py-3"
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={20} color="#1d4ed8" />
          </Pressable>

          <Text className="text-base font-semibold uppercase tracking-[0.4em] text-blue-500">
            Safarihills Realtor
          </Text>
          <Text className="mt-3 text-4xl font-bold text-slate-900">
            Log in to continue
          </Text>
          <Text className="mt-2 text-base text-slate-500">
            Unlock listings, track rewards, and keep your deal flow moving.
          </Text>

          <View className="mt-10 flex-col gap-6">
            <View>
              <Text className="text-sm font-medium text-slate-600">Email</Text>
              <TextInput
                className="mt-2 rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-4 text-base text-slate-900"
                autoCapitalize="none"
                inputMode="email"
                keyboardType="email-address"
                placeholder="you@example.com"
                placeholderTextColor="#94a3b8"
                value={email}
                onChangeText={(value) => {
                  setEmail(value);
                  setError(null);
                }}
              />
            </View>

            <View>
              <Text className="text-sm font-medium text-slate-600">
                Password
              </Text>
              <View className="mt-2 flex-row items-center rounded-2xl border border-slate-200 bg-slate-50/50 px-4">
                <TextInput
                  className="flex-1 py-4 text-base text-slate-900"
                  secureTextEntry={!showPassword}
                  placeholder="Enter password"
                  placeholderTextColor="#94a3b8"
                  value={password}
                  onChangeText={(value) => {
                    setPassword(value);
                    setError(null);
                  }}
                />
                <Pressable
                  hitSlop={12}
                  onPress={() => setShowPassword((prev) => !prev)}
                  className="ml-2 p-1"
                  accessibilityLabel="Toggle password visibility"
                >
                  <Feather
                    name={showPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#1e3a8a"
                  />
                </Pressable>
              </View>
            </View>
          </View>

          <View className="mt-4 flex-row justify-end">
            <Pressable onPress={() => router.push("/auth/forgot-password")}>
              <Text className="text-sm font-semibold text-blue-600">
                Forgot password?
              </Text>
            </Pressable>
          </View>

          {error ? (
            <Text className="mt-4 text-center text-sm font-medium text-red-500">
              {error}
            </Text>
          ) : null}

          <Pressable
            className="mt-10 items-center justify-center rounded-full bg-blue-600 py-4"
            onPress={handleLogin}
          >
            <Text className="text-base font-semibold text-white">Log in</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
