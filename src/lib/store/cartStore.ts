import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, ProductVariant } from '@/lib/data/products';
import { siteConfig } from '@/lib/data/site';

export interface CartItem {
  id: string; // composite: `${product.id}-${variant.id}`
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getShippingFee: () => number;
  getGrandTotal: () => number;
  getFreeShippingProgress: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [
        // pre-seed with a default item for initial demo realism if empty
      ],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      addItem: (product, variant, quantity = 1) => {
        const compositeId = `${product.id}-${variant.id}`;
        set((state) => {
          const existing = state.items.find((i) => i.id === compositeId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === compositeId ? { ...i, quantity: i.quantity + quantity } : i
              ),
              isOpen: true,
            };
          }
          return {
            items: [...state.items, { id: compositeId, product, variant, quantity }],
            isOpen: true,
          };
        });
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
      },
      updateQuantity: (id, delta) => {
        set((state) => ({
          items: state.items
            .map((i) => {
              if (i.id === id) {
                const newQty = i.quantity + delta;
                return newQty > 0 ? { ...i, quantity: newQty } : null;
              }
              return i;
            })
            .filter((i): i is CartItem => i !== null),
        }));
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        return get().items.reduce((total, i) => total + i.quantity, 0);
      },
      getSubtotal: () => {
        return get().items.reduce((total, i) => total + i.variant.price * i.quantity, 0);
      },
      getShippingFee: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0 || subtotal >= siteConfig.freeShippingThreshold) return 0;
        return 70; // Standard nominal shipping
      },
      getGrandTotal: () => {
        return get().getSubtotal() + get().getShippingFee();
      },
      getFreeShippingProgress: () => {
        const subtotal = get().getSubtotal();
        return Math.min(100, Math.round((subtotal / siteConfig.freeShippingThreshold) * 100));
      },
    }),
    {
      name: 'botanica-cart-storage',
      skipHydration: true,
    }
  )
);
