import { Platform, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

const cartScreen = () => {
  return (
    <View>
      <Text>cartScreen</Text>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default cartScreen;

const styles = StyleSheet.create({});
