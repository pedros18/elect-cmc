import { getDoc, doc } from "firebase/firestore";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { db } from "./firebase";
import { ProductProps } from "../../type";

interface CartProduct extends ProductProps {
    quantity: number;
}

interface UserType {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    avatar: string;
    id: string;
}

interface StoreType {
    // user
    currentUser: UserType | null;
    isLoading: boolean;
    getUserInfo: (uid: string) => Promise<void>;
    // cart
    cartProduct: CartProduct[];
    addToCart: (product: ProductProps) => Promise<void>;
    decreaseQuantity: (productId: string) => void;
    removeFromCart: (productId: string) => void;
    resetCart: () => void;
    // favorite
    favoriteProduct: ProductProps[];
    addToFavorite: (product: ProductProps) => void;
    removeFromFavorite: (productId: string) => void;
    resetFavorite: () => void;
}

const customStorage = {
    getItem: (name: string) => {
        const item = localStorage.getItem(name);
        return item ? JSON.parse(item) : null;
    },
    setItem: (name: string, value: any) => {
        localStorage.setItem(name, JSON.stringify(value));
    },
    removeItem: (name: string) => {
        localStorage.removeItem(name);
    },
};

export const store = create<StoreType>()(
    persist(
        (set) => ({
            currentUser: null,
            isLoading: true,
            cartProduct: [],
            favoriteProduct: [],

            getUserInfo: async (uid: string) => {
                if (!uid) return set({ currentUser: null, isLoading: false });
                const docRef = doc(db, 'users', uid);
                const docSnap = await getDoc(docRef);
                try {
                    if (docSnap.exists()) {
                        set({
                            currentUser: docSnap.data() as UserType,
                            isLoading: false,
                        });
                    }
                } catch (error) {
                    console.log("getUserInfo error", error);
                    set({ currentUser: null, isLoading: false });
                }
            },

            addToCart: (product: ProductProps) => {
                return new Promise<void>((resolve) => {
                    set((state) => {
                        const existingProduct = state.cartProduct.find(
                            (p) => p._id === product._id
                        );

                        if (existingProduct) {
                            return {
                                cartProduct: state.cartProduct.map((p) =>
                                    p._id === product._id
                                        ? { ...p, quantity: (p.quantity || 0) + 1 }
                                        : p
                                ),
                            };
                        } else {
                            return {
                                cartProduct: [
                                    ...state.cartProduct,
                                    { ...product, quantity: 1 },
                                ],
                            };
                        }
                    });
                    resolve();
                });
            },

            decreaseQuantity: (productId: string) => {
                set((state) => ({
                    cartProduct: state.cartProduct
                        .map((p) =>
                            p._id === productId && p.quantity > 1
                                ? { ...p, quantity: p.quantity - 1 }
                                : p
                        )
                        .filter((p) => p.quantity > 0),
                }));
            },

            removeFromCart: (productId: string) => {
                set((state) => ({
                    cartProduct: state.cartProduct.filter(
                        (p) => p._id !== productId
                    ),
                }));
            },

            resetCart: () => {
                set({ cartProduct: [] });
            },

            addToFavorite: (product: ProductProps) => {
                set((state) => ({
                    favoriteProduct: [
                        ...state.favoriteProduct,
                        product,
                    ],
                }));
            },

            removeFromFavorite: (productId: string) => {
                set((state) => ({
                    favoriteProduct: state.favoriteProduct.filter(
                        (p) => p._id !== productId
                    ),
                }));
            },

            resetFavorite: () => {
                set({ favoriteProduct: [] });
            },
        }),
        {
            name: 'e-commerce-storage',
            storage: customStorage,
        }
    )
);
