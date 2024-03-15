import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Product } from "@/types";

type ProductListItemProps = {
  product: Product;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image! }} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: "50%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  price: {
    fontSize: 15,
    fontWeight: "500",
    color: "#2e78b7",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});

export default ProductListItem;


