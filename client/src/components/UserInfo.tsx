import { useState } from "react";
import { User, MapPin, Check, ArrowRight, ArrowLeft, Camera } from "lucide-react";

const STEPS = ["Basics", "Shipping"];

export default function ProfileSetup() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    newsletter: true,
  });

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const initials =
    (form.firstName[0] || "") + (form.lastName[0] || "") || "?";

  const validateStep = () => {
    const e = {};
    if (step === 0) {
      if (!form.firstName.trim()) e.firstName = "Enter a first name";
      if (!form.lastName.trim()) e.lastName = "Enter a last name";
      if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
    }
    if (step === 1) {
      if (!form.address1.trim()) e.address1 = "Enter a street address";
      if (!form.city.trim()) e.city = "Enter a city";
      if (!form.zip.trim()) e.zip = "Enter a zip or postal code";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validateStep()) return;
    if (step === STEPS.length - 1) {
      setDone(true);
    } else {
      setStep((s) => s + 1);
    }
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  const field = (label, key, type = "text", placeholder = "") => (
    <div>
      <label className="block text-xs font-medium uppercase tracking-wide text-stone-500 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={form[key]}
        onChange={update(key)}
        placeholder={placeholder}
        className={`w-full rounded-md border px-3 py-2 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
          errors[key] ? "border-red-400" : "border-stone-300"
        }`}
      />
      {errors[key] && (
        <p className="mt-1 text-xs text-red-600">{errors[key]}</p>
      )}
    </div>
  );

  if (done) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white border border-stone-200 rounded-2xl p-8 text-center">
          <div className="mx-auto w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
            <Check className="w-7 h-7 text-emerald-700" />
          </div>
          <h1 className="font-serif text-2xl text-stone-900 mb-2">
            Profile complete
          </h1>
          <p className="text-sm text-stone-500 mb-6">
            Welcome, {form.firstName}. Your profile is saved and ready for checkout.
          </p>
          <button
            onClick={() => {
              setStep(0);
              setDone(false);
            }}
            className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
          >
            Edit profile again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-10 px-4">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Live preview card */}
        <div className="md:col-span-2">
          <div className="md:sticky md:top-10 bg-stone-900 rounded-2xl p-6 text-white">
            <p className="text-xs uppercase tracking-widest text-stone-400 mb-6">
              Member preview
            </p>
            <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center text-lg font-medium mb-4 relative">
              {initials.toUpperCase()}
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-stone-800 border-2 border-stone-900 flex items-center justify-center">
                <Camera className="w-3 h-3 text-stone-300" />
              </span>
            </div>
            <p className="font-serif text-xl">
              {form.firstName || form.lastName
                ? `${form.firstName} ${form.lastName}`.trim()
                : "Your name"}
            </p>
            <p className="text-sm text-stone-400 mb-6">
              {form.email || "you@example.com"}
            </p>

            <div className="border-t border-stone-700 pt-4 space-y-3 text-sm">
              <div className="flex items-start gap-2 text-stone-300">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>
                  {form.address1
                    ? `${form.address1}, ${form.city}${
                        form.state ? ", " + form.state : ""
                      } ${form.zip}`
                    : "No address yet"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="md:col-span-3 bg-white border border-stone-200 rounded-2xl p-6 md:p-8">
          {/* Stepper */}
          <div className="flex items-center mb-8">
            {STEPS.map((label, i) => (
              <div key={label} className="flex items-center flex-1 last:flex-none">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium border ${
                      i < step
                        ? "bg-emerald-600 border-emerald-600 text-white"
                        : i === step
                        ? "border-emerald-600 text-emerald-700"
                        : "border-stone-300 text-stone-400"
                    }`}
                  >
                    {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
                  </div>
                  <span
                    className={`text-sm hidden sm:inline ${
                      i === step ? "text-stone-900 font-medium" : "text-stone-400"
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-px mx-3 ${
                      i < step ? "bg-emerald-600" : "bg-stone-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {step === 0 && (
            <div className="space-y-4">
              <h2 className="font-serif text-xl text-stone-900 flex items-center gap-2">
                <User className="w-5 h-5 text-emerald-700" /> Basic info
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {field("First name", "firstName")}
                {field("Last name", "lastName")}
              </div>
              {field("Email", "email", "email", "you@example.com")}
              {field("Phone (optional)", "phone", "tel", "+1 555 000 0000")}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-serif text-xl text-stone-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-700" /> Shipping address
              </h2>
              {field("Street address", "address1")}
              <div className="grid grid-cols-2 gap-4">
                {field("City", "city")}
                {field("State / region", "state")}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {field("Zip / postal code", "zip")}
                {field("Country", "country")}
              </div>
              <label className="flex items-center gap-2 text-sm text-stone-600 pt-1">
                <input
                  type="checkbox"
                  checked={form.newsletter}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, newsletter: e.target.checked }))
                  }
                  className="w-4 h-4 rounded border-stone-300 text-emerald-600 focus:ring-emerald-600"
                />
                Send me restock alerts and new arrivals
              </label>
            </div>
          )}

          {/* Nav */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-stone-100">
            <button
              onClick={back}
              disabled={step === 0}
              className="flex items-center gap-1 text-sm font-medium text-stone-500 disabled:opacity-0 hover:text-stone-700"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={next}
              className="flex items-center gap-1 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium px-4 py-2 rounded-md"
            >
              {step === STEPS.length - 1 ? "Finish" : "Continue"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}