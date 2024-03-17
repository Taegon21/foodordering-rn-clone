import { StyleSheet, Text, View, Image } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import products from "@assets/data/products";

const sizes = ["S", "M", "L", "XL"];

const productDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image source={{ uri: product.image! }} style={styles.image} />
      <Text style={styles.sizeHead}>Selected size</Text>

      <View style={styles.sizes}>
        {sizes.map((size) => (
          <View style={styles.size} key={size}>
            <Text style={styles.sizeText}>{size}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.price}>price: ${product.price}</Text>
    </View>
  );
};

export default productDetailScreen;

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
    backgroundColor: "lightgrey",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
  },

  price: {
    fontSize: 19,
    fontWeight: "bold",
  },
});
