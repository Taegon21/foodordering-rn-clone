import {
  StyleSheet,
  ScrollView,
  FlatList,
  View,
  ActivityIndicator,
  Text,
} from "react-native";
import products from "@assets/data/products";
import ProductListItem from "@components/ProductListItem";
import { useEffect } from "react";
import { supabase } from "@/lib/superbase";
import { useQuery } from "@tanstack/react-query";
import { useProductList } from "@/api";

const product = products[0];

export default function MenuScreen() {
  const { data: products, error, isLoading } = useProductList();

  if (error) {
    return <Text>{error.message}</Text>;
  }
  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
