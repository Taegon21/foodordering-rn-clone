import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import products from "@assets/data/products";
import { useState } from "react";
import Button from "@/components/Button";

const sizes = ["S", "M", "L", "XL"];

const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const [selectedSize, setSelectedSize] = useState("M");
  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    return <Text>Product not found</Text>;
  }

  const isSelectedSize = (size: string) => selectedSize === size;

  const addToCart = () => {
    console.warn("Adding to cart, size:", selectedSize);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image source={{ uri: product.image! }} style={styles.image} />
      <Text style={styles.sizeHead}>Selected size</Text>

      <View style={styles.sizes}>
        {sizes.map((size) => (
          <TouchableOpacity
            key={size}
            style={[
              styles.size,
              isSelectedSize(size) ? styles.selectedSize : null,
            ]}
            onPress={() => setSelectedSize(size)}
          >
            <Text
              style={[
                styles.sizeText,
                isSelectedSize(size) ? { color: "#000" } : { color: "gray" },
              ]}
            >
              {size}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.price}>Price: ${product.price}</Text>
      <Button text="Add to cart" onPress={addToCart} />
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  sizeHead: {
    fontSize: 15,
    fontWeight: "bold",
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  size: {
    backgroundColor: "#fff",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedSize: {
    backgroundColor: "gainsboro",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
  },
  selectedText: {
    color: "gray",
  },
  unselectedText: {
    color: "red",
  },
  price: {
    fontSize: 19,
    fontWeight: "bold",
    marginTop: "auto",
  },
});
