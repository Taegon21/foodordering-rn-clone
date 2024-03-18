// cartScreen.tsx
import React from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useCart } from "@/store/CartProvider";
import CartListItem from "@/components/CartListItem";
import Button from "@/components/Button";

const cartScreen = () => {
  const { items, total } = useCart();

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
      <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 10 }}>
        Total: ${total}
      </Text>
      <Button text="Checkout" onPress={() => {}} />

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default cartScreen;

const styles = StyleSheet.create({
  container: { padding: 10 },
});
