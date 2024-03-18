// cartScreen.tsx
import React from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useCart } from "@/store/CartProvider";
import CartListItem from "@/components/CartListItem";

const cartScreen = () => {
  const { items } = useCart();

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ padding: 10, gap: 10 }}
      />

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default cartScreen;

const styles = StyleSheet.create({
  container: {},
});
