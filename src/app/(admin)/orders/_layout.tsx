import { Stack, Link } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable } from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";

export default function MenuStack() {
  return (
    <Stack>
      <Stack.Screen name="list" options={{ headerShown: false }} />
    </Stack>
  );
}
