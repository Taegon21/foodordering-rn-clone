import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { View, Text, Button } from "react-native";
import { CartItem, Product } from "@/types";
import { randomUUID } from "expo-crypto";

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
};

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
});

export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const addItem = (product: Product, size: CartItem["size"]) => {
    // if already in cart인 경우
    const existingItem = items.find(item => item.product_id === product.id && item.size === size);

    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }


    const newCartItem: CartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };
    setItems([newCartItem, ...items]);
  };

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + amount };
      }
      return item;
    }).filter((item) => item.quantity > 0);
    setItems(updatedItems);
  };

  console.log("items", items);

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
