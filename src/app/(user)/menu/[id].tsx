import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "@assets/data/products";
import { useState } from "react";
import Button from "@components/Button";
import { useCart } from "@/store/CartProvider";
import { PizzaSize } from "@/types";
import { useProduct } from "@/api";
import { defaultPizzaImage } from "@/components/ProductListItem";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
  const { addItem } = useCart();
  const router = useRouter();

  const { data: product, error, isLoading } = useProduct(id);

  if (error) {
    return <Text>{error.message}</Text>;
  }
  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (!product) {
    return <Text>Product not found</Text>;
  }

  const isSelectedSize = (size: string) => selectedSize === size;

  const addToCart = () => {
    if (!product) return;
    addItem(product, selectedSize);
    router.push("/cart");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
      />
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
