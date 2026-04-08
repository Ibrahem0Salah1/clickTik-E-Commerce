import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartProduct {
  id: number;
  title: string;
  price: number;
  discountPercentage?: number;
  thumbnail?: string;
  images?: string[];
  category?: string;
  stock?: number;
  brand?: string;
  description?: string;
}

export interface CartItem {
  product: CartProduct;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly storageKey = 'cart';

  private readonly cartItemsSubject = new BehaviorSubject<CartItem[]>(
    this.readFromStorage()
  );

  readonly cartItems$ = this.cartItemsSubject.asObservable();

  getCartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  getCartCount(): number {
    return this.cartItemsSubject.value.length;
  }

  addToCart(product: CartProduct, quantity = 1): { added: boolean; count: number } {
    const items = [...this.cartItemsSubject.value];
    const exists = items.some((item) => item.product.id === product.id);

    if (exists) {
      return { added: false, count: items.length };
    }

    const safeQuantity = this.normalizeQuantity(quantity);
    items.push({ product, quantity: safeQuantity });
    this.persist(items);

    return { added: true, count: items.length };
  }

  updateQuantity(productId: number, quantity: number): void {
    const safeQuantity = this.normalizeQuantity(quantity);
    const items = this.cartItemsSubject.value.map((item) =>
      item.product.id === productId ? { ...item, quantity: safeQuantity } : item
    );
    this.persist(items);
  }

  clearCart(): void {
    this.persist([]);
  }

  toApiProductsPayload(): Array<{ id: number; quantity: number }> {
    return this.cartItemsSubject.value.map((item) => ({
      id: item.product.id,
      quantity: item.quantity,
    }));
  }

  private persist(items: CartItem[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    this.cartItemsSubject.next(items);
  }

  private readFromStorage(): CartItem[] {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) {
      return [];
    }

    try {
      const parsed = JSON.parse(raw) as unknown;
      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed
        .map((item) => item as Partial<CartItem>)
        .filter(
          (item) =>
            Boolean(item?.product) &&
            typeof item?.product?.id === 'number' &&
            typeof item?.quantity === 'number'
        )
        .map((item) => ({
          product: item.product as CartProduct,
          quantity: this.normalizeQuantity(item.quantity as number),
        }));
    } catch {
      return [];
    }
  }

  private normalizeQuantity(quantity: number): number {
    if (!Number.isFinite(quantity)) {
      return 1;
    }

    return Math.max(1, Math.floor(quantity));
  }
}
