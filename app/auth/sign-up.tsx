import { Feather } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import { SafeAreaView } from "react-native-safe-area-context";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const toFlagEmoji = (countryCode: string) => {
  if (!countryCode) return "🌍";
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) =>
      String.fromCodePoint(char.charCodeAt(0) + 127397)
    );
};

export default function SignUpScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const [countryCode, setCountryCode] = useState<CountryCode>("NG");
  const [callingCode, setCallingCode] = useState("234");
  const [countryFlag, setCountryFlag] = useState(toFlagEmoji("NG"));
  const [countryName, setCountryName] = useState("Nigeria");
  const [pickerVisible, setPickerVisible] = useState(false);

  const isEmailValid = emailRegex.test(email.trim());
  const showEmailError = email.length > 0 && !isEmailValid;

  const isFormValid = useMemo(() => {
    return (
      firstName.trim().length > 0 &&
      lastName.trim().length > 0 &&
      phoneNumber.trim().length > 0 &&
      email.trim().length > 0 &&
      password.trim().length > 0 &&
      isEmailValid
    );
  }, [firstName, lastName, phoneNumber, email, password, isEmailValid]);

  const onSelectCountry = (country: Country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0] ?? callingCode);
    setCountryFlag(toFlagEmoji(country.cca2));
    if (typeof country.name === "string") {
      setCountryName(country.name);
    } else {
      const entries = Object.values(country.name);
      const derivedName =
        (country.name as Record<string, string>).common ??
        entries[0] ??
        country.cca2;
      setCountryName(derivedName);
    }
  };

  const handleCreateAccount = () => {
    if (!isFormValid) return;
    setServerError(null);

    // Simulate taken email for showcasing error banner
    if (email.trim().toLowerCase().includes("taken")) {
      setServerError("This email is already registered. Try signing in.");
      return;
    }

    Alert.alert(
      "Account created",
      `${firstName.trim()}, your Safarihills realtor profile is ready.`
    );
    router.push({
      pathname: "/auth/otp",
      params: { email: email.trim() },
    });
  };

  const inputWrapperClass =
    "rounded-2xl border border-slate-200 bg-slate-50/50 px-4";

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="px-6 pt-8">
            <Pressable
              className="mb-4 w-12 items-center justify-center rounded-full border border-blue-100 bg-white/80 py-3"
              onPress={() => router.back()}
            >
              <Feather name="arrow-left" size={20} color="#1d4ed8" />
            </Pressable>

          {serverError ? (
            <View className="mb-4 flex-row items-start gap-3 rounded-2xl border border-red-200 bg-red-50/70 p-4">
              <Feather name="alert-triangle" size={20} color="#dc2626" />
              <Text className="flex-1 text-sm font-medium text-red-600">
                {serverError}
              </Text>
            </View>
          ) : null}

            <Text className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-500">
              Safarihills
            </Text>
            <Text className="mt-3 text-4xl font-bold text-slate-900">
              Create an account
            </Text>
            <Text className="mt-2 text-base text-slate-500">
              Join the realtor network, unlock premium listings, and start
              earning rewards immediately.
            </Text>
          </View>

          <View className="mt-10 flex-col gap-5 px-6 pb-4">
            <View>
              <Text className="text-sm font-medium text-slate-600">
                First name
              </Text>
              <TextInput
                className={`mt-2 ${inputWrapperClass} py-4 text-base text-slate-900`}
                placeholder="Adim"
                placeholderTextColor="#94a3b8"
                value={firstName}
                onChangeText={(value) => {
                  setFirstName(value);
                  if (serverError) setServerError(null);
                }}
              />
            </View>

            <View>
              <Text className="text-sm font-medium text-slate-600">
                Last name
              </Text>
              <TextInput
                className={`mt-2 ${inputWrapperClass} py-4 text-base text-slate-900`}
                placeholder="Eze"
                placeholderTextColor="#94a3b8"
                value={lastName}
                onChangeText={(value) => {
                  setLastName(value);
                  if (serverError) setServerError(null);
                }}
              />
            </View>

            <View>
              <Text className="text-sm font-medium text-slate-600">
                Phone number
              </Text>
              <View className="mt-2 flex-row items-center rounded-2xl border border-slate-200 bg-slate-50/50">
                <Pressable
                  className="flex-row items-center gap-2 border-r border-slate-200 px-4 py-4"
                  onPress={() => setPickerVisible(true)}
                >
                  <Text className="text-xl">{countryFlag}</Text>
                  <View>
                    <Text className="text-sm font-semibold text-slate-900">
                      +{callingCode}
                    </Text>
                    <Text className="text-[10px] text-slate-400">
                      {countryName}
                    </Text>
                  </View>
                  <Feather name="chevron-down" size={18} color="#475569" />
                </Pressable>
                <TextInput
                  className="flex-1 px-4 py-4 text-base text-slate-900"
                  placeholder="812 345 6789"
                  placeholderTextColor="#94a3b8"
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={(value) => {
                    setPhoneNumber(value.replace(/[^\d]/g, ""));
                    if (serverError) setServerError(null);
                  }}
                />
              </View>
            </View>

            <View>
              <Text className="text-sm font-medium text-slate-600">Email</Text>
              <TextInput
                className={`mt-2 ${inputWrapperClass} py-4 text-base text-slate-900`}
                placeholder="you@example.com"
                placeholderTextColor="#94a3b8"
                autoCapitalize="none"
                inputMode="email"
                keyboardType="email-address"
                value={email}
                onChangeText={(value) => {
                  setEmail(value);
                  if (serverError) setServerError(null);
                }}
              />
              {showEmailError ? (
                <Text className="mt-2 text-sm font-medium text-red-500">
                  Enter a valid email address.
                </Text>
              ) : null}
            </View>

            <View>
              <Text className="text-sm font-medium text-slate-600">
                Password
              </Text>
              <View
                className={`mt-2 flex-row items-center ${inputWrapperClass} pr-2`}
              >
                <TextInput
                  className="flex-1 py-4 text-base text-slate-900"
                  placeholder="At least 6 characters"
                  placeholderTextColor="#94a3b8"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={(value) => {
                    setPassword(value);
                    if (serverError) setServerError(null);
                  }}
                />
                <Pressable
                  onPress={() => setShowPassword((prev) => !prev)}
                  className="ml-2 p-2"
                  hitSlop={12}
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

            <View>
              <Text className="text-sm font-medium text-slate-600">
                Referral code{" "}
                <Text className="text-xs text-slate-400">(optional)</Text>
              </Text>
              <TextInput
                className={`mt-2 ${inputWrapperClass} py-4 text-base text-slate-900`}
                placeholder="Enter referral code"
                placeholderTextColor="#94a3b8"
                autoCapitalize="characters"
                value={referralCode}
                onChangeText={setReferralCode}
              />
            </View>
          </View>

          <View className="px-6">
            <Pressable
              className={`mt-10 items-center justify-center rounded-full py-4 ${
                isFormValid ? "bg-blue-600" : "bg-blue-100"
              }`}
              disabled={!isFormValid}
              onPress={handleCreateAccount}
            >
              <Text
                className={`text-base font-semibold ${
                  isFormValid ? "text-white" : "text-blue-400"
                }`}
              >
                Create account
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <CountryPicker
        countryCode={countryCode}
        withFilter
        withFlag
        withCallingCode
        withEmoji
        withAlphaFilter
        visible={pickerVisible}
        onClose={() => setPickerVisible(false)}
        onSelect={(country) => {
          onSelectCountry(country);
          setPickerVisible(false);
        }}
        renderFlagButton={() => <View />}
      />
    </SafeAreaView>
  );
}
