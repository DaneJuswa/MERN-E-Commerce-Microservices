import React from "react";
import { Check } from "lucide-react";

export default function ConfirmedView({ orderId, email, onContinue }) {
  return (
    <div className="max-w-md mx-auto px-5 py-24 text-center">
      <div className="inline-flex items-center justify-center h-14 w-14 rounded-full mb-4 bg-sage">
        <Check size={26} className="text-white" />
      </div>
      <p className="font-display text-2xl">Order placed.</p>
      <p className="text-sm text-black/60 mt-2 font-mono">Confirmation #{orderId}</p>
      <p className="text-sm text-black/60 mt-4">
        A receipt is on its way to {email || "your inbox"}. This screen is ready for a real order status once your
        backend returns one.
      </p>
      <button onClick={onContinue} className="mt-8 font-display text-sm px-5 py-2.5 rounded-full text-white bg-ink">
        CONTINUE SHOPPING
      </button>
    </div>
  );
}
