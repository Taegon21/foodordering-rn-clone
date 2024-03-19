import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import orders from "@assets/data/orders";
import OrderListItem from "@components/OrderListItem";

const OrderScreen = () => {
  return (
    <View style={{ padding: 10 }}>
      <FlatList
        style={{ gap: 10 }}
        data={orders}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
