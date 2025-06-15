import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  type ReactNode,
  useEffect,
} from "react";
import type { Categories } from "~/types/category";

const loadCartFromStorage = (): CartState => {
  try {
    const savedCart = sessionStorage.getItem("cart");
    return savedCart
      ? JSON.parse(savedCart)
      : {
          restaurantId: null,
          items: {},
        };
  } catch {
    return {
      restaurantId: null,
      items: {},
    };
  }
};

export type CartMenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Categories;
  count: number;
};

type CartItemsMap = Record<string, CartMenuItem>;

export type CartState = {
  restaurantId: string | null;
  items: CartItemsMap;
};

type CartContextType = {
  cart: CartState;
  addToCart: (
    item: Omit<CartMenuItem, "count">,
    restaurantId: string,
    quantity?: number
  ) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  isItemInCart: (id: string) => boolean;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

type Action =
  | {
      type: "ADD";
      item: Omit<CartMenuItem, "count">;
      restaurantId: string;
      quantity?: number;
    }
  | { type: "REMOVE"; id: string }
  | { type: "INCREASE"; id: string }
  | { type: "DECREASE"; id: string }
  | { type: "CLEAR" };

function cartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD": {
      if (state.restaurantId && state.restaurantId !== action.restaurantId) {
        return state;
      }
      const quantity = action.quantity ?? 1;
      const existing = state.items[action.item.id];
      return {
        restaurantId: action.restaurantId,
        items: {
          ...state.items,
          [action.item.id]: existing
            ? { ...existing, count: existing.count + quantity }
            : { ...action.item, count: quantity },
        },
      };
    }
    case "REMOVE": {
      const newItems = { ...state.items };
      delete newItems[action.id];
      const isEmpty = Object.keys(newItems).length === 0;
      return {
        restaurantId: isEmpty ? null : state.restaurantId,
        items: newItems,
      };
    }
    case "INCREASE": {
      const item = state.items[action.id];
      if (!item) return state;
      return {
        ...state,
        items: {
          ...state.items,
          [action.id]: { ...item, count: item.count + 1 },
        },
      };
    }
    case "DECREASE": {
      const item = state.items[action.id];
      if (!item || item.count <= 1) return state;
      return {
        ...state,
        items: {
          ...state.items,
          [action.id]: { ...item, count: item.count - 1 },
        },
      };
    }
    case "CLEAR":
      return {
        restaurantId: null,
        items: {},
      };
    default:
      return state;
  }
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, loadCartFromStorage());

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  const addToCart = (
    item: Omit<CartMenuItem, "count">,
    restaurantId: string,
    quantity = 1
  ) => {
    dispatch({ type: "ADD", item, restaurantId, quantity });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: "REMOVE", id });
  };

  const increaseQuantity = (id: string) => {
    dispatch({ type: "INCREASE", id });
  };

  const decreaseQuantity = (id: string) => {
    dispatch({ type: "DECREASE", id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR" });
  };

  const isItemInCart = (id: string) => {
    return Boolean(state.items[id]);
  };

  const totalPrice = useMemo(() => {
    const total = Object.values(state.items).reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );
    return Math.round(total * 100) / 100;
  }, [state]);

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        isItemInCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};
