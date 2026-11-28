import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, ProductVariant } from '@/data/products';
import { siteConfig } from '@/config/site';

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
  getSubtotalInr: () => number | null;
  getShippingFeeInr: () => number | null;
  getGrandTotalInr: () => number | null;
  getFreeShippingProgress: () => number | null;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      addItem: (product, variant, quantity = 1) => {
        if (product.comingSoon) return;
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
      getSubtotalInr: () => {
        const items = get().items;
        if (!siteConfig.featureFlags.showPrices || items.length === 0) return null;
        if (items.some((i) => i.variant.priceInr === null)) return null;
        return items.reduce((total, i) => total + (i.variant.priceInr ?? 0) * i.quantity, 0);
      },
      getShippingFeeInr: () => {
        const { freeShippingThresholdInr, standardShippingFeeInr } = siteConfig.operations;
        if (standardShippingFeeInr === null) return null;
        const subtotal = get().getSubtotalInr();
        if (subtotal === null) return null;
        if (subtotal === 0) return 0;
        if (freeShippingThresholdInr !== null && subtotal >= freeShippingThresholdInr) {
          return 0;
        }
        return standardShippingFeeInr;
      },
      getGrandTotalInr: () => {
        const subtotal = get().getSubtotalInr();
        if (subtotal === null) return null;
        const shipping = get().getShippingFeeInr();
        return subtotal + (shipping ?? 0);
      },
      getFreeShippingProgress: () => {
        const threshold = siteConfig.operations.freeShippingThresholdInr;
        const subtotal = get().getSubtotalInr();
        if (threshold === null || subtotal === null) return null;
        return Math.min(100, Math.round((subtotal / threshold) * 100));
      },
    }),
    {
      name: 'yagya-cart-storage',
      skipHydration: true,
    }
  )
);
