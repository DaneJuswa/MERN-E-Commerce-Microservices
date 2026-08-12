import { useState, useEffect, useMemo } from "react";
// import { fetchProducts, useProducts} from "../apis/fetchproducts";
import { placeOrder } from "../apis/placeOrder";

import Header from "../components/Header";
import ProductGrid from "../components/ProductGrid";
import ProductModal from "../components/ProductModal";
import CartDrawer from "../components/CartDrawer";
import CheckoutView from "../components/CheckoutView";
import ConfirmedView from "../components/ConfirmedView";
import type { Product, Order, ID, ApiResponse } from "../types";
import type { OrderPayload } from "../types/orderPayload";

import { useCategories } from "../apis/fetchCategroies";
import { useProducts } from "../apis/fetchproducts";

import { getCart, updateCartItem, type CartReceive } from "../apis/fetchCart";

import { addToCartAPI } from "../apis/fetchCart";

// Local checkout contact + shipping form.
// NOTE: doesn't reuse `Address` directly because it bundles `email`
// (contact info) with shipping fields. Split into Address + contactEmail
// once you wire this to a real backend that expects our `Address` shape.
interface CheckoutForm {
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  paymentMethod: "COD" | "GCash" | "Card";
}

const EMPTY_FORM: CheckoutForm = {
  name: "",
  email: "",
  address: "",
  city: "",
  zip: "",
  paymentMethod: "COD",
};

// Local pre-checkout cart state: productId -> quantity.
// Intentionally NOT the `Cart`/`Order` type from types.ts — that type
// represents a persisted order on the backend. This is just UI state
// until the user checks out, at which point we build a real order.
type CartMap = Record<ID, number>;

type ViewState = "shop" | "checkout" | "confirmed";

export interface CartLineItem {
  cartItemId: string;
  productID: string;
  variantID?: string;
  name: string;
  quantity: number;
  price: number;
  lineTotal: number;
  inStock: boolean;
  stockRemaining: number;
}

// Swap this for ApiResponse<Order> once placeOrder hits a real backend.
interface PlaceOrderResult {
  orderId: ID;
}

export default function HomePage() {
  // const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<CartReceive | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [view, setView] = useState<ViewState>("shop");
  const [placing, setPlacing] = useState(false);
  const [orderId, setOrderId] = useState<ID | null>(null);
  const [form, setForm] = useState<CheckoutForm>(EMPTY_FORM);

  const { products, loading } = useProducts();
  const { categories } = useCategories();

  //function that triggers when a filter is clicked

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCat =
        activeCategory === "All" || p.category?.category === activeCategory;
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
      return matchesCat && matchesQuery;
    });
  }, [products, activeCategory, query]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const data = await getCart();
        setCart(data);
      } catch (error) {
        console.error("Failed to load cart:", error);
      }
    };

    loadCart();
  }, []);

  const cartItems = cart?.items ?? [];

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cartItems.reduce((sum, item) => sum + item.lineTotal, 0);
  const shipping = subtotal > 0 && subtotal < 75 ? 6 : 0;
  const total = subtotal + shipping;

  //calls addtocart api
  async function addToCart(
    product: Product,
    qty: number = 1,
    variantID?: string,
  ) {
    console.log("ADD TO CART FUNCTION CALLED");
    console.log("product:", product);
    console.log("qty:", qty);
    console.log("variantID:", variantID);

    try {
      console.log("CALLING API...");

      const result = await addToCartAPI(product.id, qty, variantID);

      console.log("ADDED SUCCESSFULLY:", result);

      const updatedCart = await getCart();
      setCart(updatedCart);

      setDrawerOpen(true);
    } catch (error) {
      console.error("ADD TO CART ERROR:", error);
    }
  }

  async function setQty(cartItemId: string, qty: number) {
    try {
      await updateCartItem(cartItemId, qty);

      const updatedCart = await getCart();

      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to update cart:", error);
    }
  }

  // //fumction for submitting a form (order)
  // async function handlePlaceOrder(e: React.FormEvent) {
  //   e.preventDefault();
  //   setPlacing(true);
  //   try {
  //     const orderPayload: OrderPayload = {
  //       items: cartItems.map((item) => ({
  //         productId: item.id,
  //         name: item.name,
  //         quantity: item.qty,
  //         price: item.price,
  //       })),
  //       customer: {
  //         name: form.name,
  //         email: form.email,
  //       },
  //       shippingAddress: {
  //         street: form.address,
  //         city: form.city,
  //         zip: form.zip,
  //       },
  //       paymentMethod: form.paymentMethod,
  //       totalAmount: total,
  //     };

  //     //the result of placing an order
  //     const result: PlaceOrderResult = await placeOrder(orderPayload);

  //     setOrderId(result.orderId);
  //     setView("confirmed");
  //     setCart({});
  //   } catch (err) {
  //     alert("Something went wrong placing the order. Try again.");
  //   } finally {
  //     setPlacing(false);
  //   }
  // }

  useEffect(() => {
    async function getCartNgani() {
      try {
        const res = await getCart();
        console.log(res);
      } catch (error) {}
    }
    getCartNgani();
  }, []);

  return (
    <div className="min-h-full font-sans">
      <Header
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        query={query}
        onQueryChange={setQuery}
        cartCount={cartCount}
        onOpenCart={() => setDrawerOpen(true)}
      />

      {view === "shop" && (
        <main className="max-w-6xl mx-auto px-5 py-8">
          <ProductGrid
            products={filtered}
            loading={loading}
            onSelect={setSelected}
          />
        </main>
      )}

      {view === "checkout" && (
        <CheckoutView
          cartItems={cartItems}
          subtotal={subtotal}
          shipping={shipping}
          total={total}
          form={form}
          setForm={setForm}
          placing={placing}
          onSubmit={handlePlaceOrder}
          onBack={() => setView("shop")}
        />
      )}

      {view === "confirmed" && (
        <ConfirmedView
          orderId={orderId}
          email={form.email}
          onContinue={() => {
            setForm(EMPTY_FORM);
            setView("shop");
          }}
        />
      )}

      {selected && (
        <ProductModal
          product={selected}
          onClose={() => setSelected(null)}
          onAddToCart={(product: Product, qty: number) => {
            addToCart(product, qty);
            setSelected(null);
          }}
        />
      )}

      <CartDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        cartItems={cartItems}
        subtotal={subtotal}
        shipping={shipping}
        total={total}
        onSetQty={setQty}
        onCheckout={() => {
          setDrawerOpen(false);
          setView("checkout");
        }}
      />
    </div>
  );
}
