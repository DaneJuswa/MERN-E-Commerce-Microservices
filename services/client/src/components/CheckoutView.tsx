import React from "react";
import { ChevronLeft, Loader2 } from "lucide-react";
import { money } from "../apis/fetchproducts.js";

function Field({ id, label, type = "text", value, onChange }) {
  return (
    <label className="block">
      <span className="text-xs font-mono uppercase tracking-wide text-black/50">{label}</span>
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
  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <main className="max-w-3xl mx-auto px-5 py-8">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-black/60 mb-6 focus:outline-none">
        <ChevronLeft size={16} /> Back to shop
      </button>
      <div className="grid sm:grid-cols-5 gap-8">
        <form onSubmit={onSubmit} className="sm:col-span-3 space-y-4">
          <p className="font-display text-lg mb-2">Shipping details</p>
          <Field id="name" label="Full name" value={form.name} onChange={update("name")} />
          <Field id="email" label="Email" type="email" value={form.email} onChange={update("email")} />
          <Field id="address" label="Address" value={form.address} onChange={update("address")} />
          <div className="grid grid-cols-2 gap-4">
            <Field id="city" label="City" value={form.city} onChange={update("city")} />
            <Field id="zip" label="ZIP / postal code" value={form.zip} onChange={update("zip")} />
          </div>
          <button
            type="submit"
            disabled={placing || cartItems.length === 0}
            className="w-full flex items-center justify-center gap-2 font-display text-sm py-3 rounded-full text-white bg-ink disabled:opacity-50"
          >
            {placing && <Loader2 size={16} className="animate-spin" />}
            {placing ? "PLACING ORDER…" : `PLACE ORDER · ${money(total)}`}
          </button>
        </form>

        <div className="sm:col-span-2 rounded-lg p-5 font-mono text-sm bg-card border border-line">
          <p className="font-display text-sm mb-3">ORDER SUMMARY</p>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between text-black/70 py-1">
              <span className="truncate pr-2">
                {item.qty}× {item.name}
              </span>
              <span>{money(item.qty * item.price)}</span>
            </div>
          ))}
          <div className="mt-3 pt-3 space-y-1 border-t border-dashed border-line">
            <div className="flex justify-between text-black/60">
              <span>Subtotal</span>
              <span>{money(subtotal)}</span>
            </div>
            <div className="flex justify-between text-black/60">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : money(shipping)}</span>
            </div>
            <div className="flex justify-between font-semibold text-base text-ink">
              <span>Total</span>
              <span>{money(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
