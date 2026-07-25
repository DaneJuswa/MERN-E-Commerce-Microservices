import { ChevronLeft, Loader2 } from "lucide-react";
import { money } from "../apis/fetchproducts.js";

function Field({ id, label, type = "text", value, onChange }) {
  return (
    <label className="block">
      <span className="text-xs font-mono uppercase tracking-wide text-black/50">
        {label}
      </span>
      <input
        id={id}
        required
        type={type}
        value={value}
        onChange={onChange}
        className="mt-1 w-full rounded-md px-3 py-2.5 text-sm outline-none border border-line bg-card focus:ring-2 focus:ring-mustard"
      />
    </label>
  );
}

// receives the props, but the homepage manages the state
export default function CheckoutView({
  cartItems,
  subtotal,
  shipping,
  total,
  form,
  setForm,
  placing,
  onSubmit,
  onBack,
}) {
  const update =
    (key) =>
    (e) =>
      setForm((f) => ({
        ...f,
        [key]: e.target.value,
      }));

  return (
    <main className="max-w-3xl mx-auto px-5 py-8">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-black/60 mb-6 focus:outline-none"
      >
        <ChevronLeft size={16} />
        Back to shop
      </button>

      <div className="grid sm:grid-cols-5 gap-8">
        {/* Checkout Form */}
        <form onSubmit={onSubmit} className="sm:col-span-3 space-y-5">
          <p className="font-display text-lg">Shipping details</p>

          <Field
            id="name"
            label="Full name"
            value={form.name}
            onChange={update("name")}
          />

          <Field
            id="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={update("email")}
          />

          <Field
            id="address"
            label="Address"
            value={form.address}
            onChange={update("address")}
          />

          <div className="grid grid-cols-2 gap-4">
            <Field
              id="city"
              label="City"
              value={form.city}
              onChange={update("city")}
            />

            <Field
              id="zip"
              label="ZIP / Postal Code"
              value={form.zip}
              onChange={update("zip")}
            />
          </div>

          {/* Payment Method */}
          <div>
            <p className="text-xs font-mono uppercase tracking-wide text-black/50 mb-2">
              Payment Method
            </p>

            <div className="space-y-2">
              <label className="flex items-center gap-3 rounded-md border border-line bg-card px-4 py-3 cursor-pointer hover:border-mustard">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={form.paymentMethod === "cod"}
                  onChange={update("paymentMethod")}
                />
                <span>Cash on Delivery</span>
              </label>

              <label className="flex items-center gap-3 rounded-md border border-line bg-card px-4 py-3 cursor-pointer hover:border-mustard">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={form.paymentMethod === "card"}
                  onChange={update("paymentMethod")}
                />
                <span>Credit / Debit Card</span>
              </label>

              <label className="flex items-center gap-3 rounded-md border border-line bg-card px-4 py-3 cursor-pointer hover:border-mustard">
                <input
                  type="radio"
                  name="payment"
                  value="gcash"
                  checked={form.paymentMethod === "gcash"}
                  onChange={update("paymentMethod")}
                />
                <span>GCash</span>
              </label>

              <label className="flex items-center gap-3 rounded-md border border-line bg-card px-4 py-3 cursor-pointer hover:border-mustard">
                <input
                  type="radio"
                  name="payment"
                  value="maya"
                  checked={form.paymentMethod === "maya"}
                  onChange={update("paymentMethod")}
                />
                <span>Maya</span>
              </label>
            </div>
          </div>

          {/* Card Details */}
          {form.paymentMethod === "card" && (
            <div className="space-y-4 rounded-lg border border-line bg-card p-4">
              <Field
                id="cardNumber"
                label="Card Number"
                value={form.cardNumber || ""}
                onChange={update("cardNumber")}
              />

              <div className="grid grid-cols-2 gap-4">
                <Field
                  id="expiry"
                  label="Expiry (MM/YY)"
                  value={form.expiry || ""}
                  onChange={update("expiry")}
                />

                <Field
                  id="cvv"
                  label="CVV"
                  type="password"
                  value={form.cvv || ""}
                  onChange={update("cvv")}
                />
              </div>

              <Field
                id="cardName"
                label="Cardholder Name"
                value={form.cardName || ""}
                onChange={update("cardName")}
              />
            </div>
          )}

          {/* Place Order */}
          <button
            type="submit"
            disabled={placing || cartItems.length === 0}
            className="w-full flex items-center justify-center gap-2 font-display text-sm py-3 rounded-full text-white bg-ink disabled:opacity-50"
          >
            {placing && <Loader2 size={16} className="animate-spin" />}

            {placing
              ? "PLACING ORDER..."
              : `PLACE ORDER · ${money(total)}`}
          </button>
        </form>

        {/* Order Summary */}
        <div className="sm:col-span-2 rounded-lg p-5 font-mono text-sm bg-card border border-line">
          <p className="font-display text-sm mb-3">ORDER SUMMARY</p>

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between text-black/70 py-1"
            >
              <span className="truncate pr-2">
                {item.qty}× {item.name}
              </span>

              <span>{money(item.qty * item.price)}</span>
            </div>
          ))}

          <div className="mt-3 pt-3 space-y-2 border-t border-dashed border-line">
            <div className="flex justify-between text-black/60">
              <span>Subtotal</span>
              <span>{money(subtotal)}</span>
            </div>

            <div className="flex justify-between text-black/60">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : money(shipping)}</span>
            </div>

            <div className="flex justify-between text-black/60">
              <span>Payment</span>
              <span>
                {form.paymentMethod === "cod" && "Cash on Delivery"}
                {form.paymentMethod === "card" && "Card"}
                {form.paymentMethod === "gcash" && "GCash"}
                {form.paymentMethod === "maya" && "Maya"}
              </span>
            </div>

            <div className="flex justify-between font-semibold text-base text-ink pt-2 border-t border-dashed border-line">
              <span>Total</span>
              <span>{money(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}