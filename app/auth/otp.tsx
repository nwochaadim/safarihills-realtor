import { useEffect, useRef, useState } from "react";
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
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";

const OTP_LENGTH = 4;
const VALID_OTP = "0000";

export default function OtpScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email?: string }>();
  const [otpValues, setOtpValues] = useState(Array(OTP_LENGTH).fill(""));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [error, setError] = useState<string | null>(null);

  const inputsRef = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev === 0) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChange = (value: string, index: number) => {
    if (/^\d*$/.test(value)) {
      const digits = value.slice(-1);
      const nextValues = [...otpValues];
      nextValues[index] = digits;
      setOtpValues(nextValues);
      if (error) setError(null);

      if (digits && index < OTP_LENGTH - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !otpValues[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const otpCode = otpValues.join("");
  const isOtpComplete = otpCode.length === OTP_LENGTH;

  const handleVerify = () => {
    if (!isOtpComplete) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (otpCode !== VALID_OTP) {
        setError("The code you entered is incorrect. Please try again.");
        return;
      }
      Alert.alert("Verification complete", "Your account is now verified.");
      router.replace("/(tabs)/home");
    }, 800);
  };

  const handleResend = () => {
    if (resendTimer > 0) return;
    Alert.alert("New code sent", "Please check your inbox for the new code.");
    setError(null);
    setOtpValues(Array(OTP_LENGTH).fill(""));
    inputsRef.current[0]?.focus();
    setResendTimer(30);
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

          <Text className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-500">
            Safarihills
          </Text>
          <Text className="mt-3 text-4xl font-bold text-slate-900">
            Verify your email
          </Text>
          <Text className="mt-3 text-base text-slate-500">
            We sent a verification code to{" "}
            <Text className="font-semibold text-slate-800">
              {email || "your email"}
            </Text>
            . Enter it below to activate your account.
          </Text>

          <View className="mt-10 flex-row items-center justify-between">
            {otpValues.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputsRef.current[index] = ref)}
                className={`h-16 w-16 rounded-2xl border text-center text-2xl font-semibold ${
                  digit
                    ? "border-blue-500 bg-blue-50 text-slate-900"
                    : "border-slate-200 bg-white text-slate-900"
                }`}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(value) => handleChange(value, index)}
                onKeyPress={({ nativeEvent }) =>
                  handleKeyPress(nativeEvent.key, index)
                }
                returnKeyType="next"
                autoFocus={index === 0}
              />
            ))}
          </View>

          {error ? (
            <View className="mt-6 flex-row items-start gap-2">
              <Feather name="alert-circle" size={18} color="#dc2626" />
              <Text className="flex-1 text-sm font-medium text-red-600">
                {error}
              </Text>
            </View>
          ) : null}

          <View className="mt-6 flex-row items-center justify-between">
            <Text className="text-sm text-slate-500">
              Didn’t get it? Check spam or resend.
            </Text>
            <Pressable
              onPress={handleResend}
              disabled={resendTimer > 0}
            >
              <Text
                className={`text-sm font-semibold ${
                  resendTimer > 0 ? "text-slate-400" : "text-blue-600"
                }`}
              >
                {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend code"}
              </Text>
            </Pressable>
          </View>

          <Pressable
            className={`mt-10 items-center justify-center rounded-full py-4 ${
              isOtpComplete ? "bg-blue-600" : "bg-blue-100"
            }`}
            disabled={!isOtpComplete || isSubmitting}
            onPress={handleVerify}
          >
            <Text
              className={`text-base font-semibold ${
                isOtpComplete ? "text-white" : "text-blue-400"
              }`}
            >
              {isSubmitting ? "Verifying..." : "Verify account"}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
