import React from 'react'

interface ErrorPageProps {
  code?: string
  title?: string
  message?: string
  onRetry?: () => void
  onHome?: () => void
}

const ErrorPage = ({
  code = '500',
  title = 'Signal lost',
  message = "Something broke on our end and the connection didn't make it through. Try again, or head back to safety.",
  onRetry,
  onHome,
}: ErrorPageProps) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0F1420] px-6">
      <div className="w-full max-w-md text-center">
        {/* Waveform signature: active pulses collapsing into a flatline */}
        <svg
          viewBox="0 0 320 80"
          className="mx-auto mb-8 w-64 h-16"
          aria-hidden="true"
        >
          <path
            d="M0 40 L28 40 L38 12 L48 68 L58 22 L68 58 L78 40 L150 40"
            fill="none"
            stroke="#F0A73C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M150 40 L320 40"
            fill="none"
            stroke="#F0A73C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="1 8"
            opacity="0.6"
          />
          <circle cx="150" cy="40" r="4" fill="#F0A73C" />
        </svg>

        <p className="font-mono text-sm tracking-[0.3em] text-[#F0A73C] mb-3">
          ERROR {code}
        </p>

        <h1 className="text-3xl font-semibold text-[#EDEAE1] mb-4">
          {title}
        </h1>

        <p className="text-[#9B968B] text-base leading-relaxed mb-10">
          {message}
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onRetry}
            className="px-5 py-2.5 rounded-md bg-[#F0A73C] text-[#1A1408] text-sm font-medium hover:bg-[#E49930] transition-colors"
          >
            Try again
          </button>
          <button
            onClick={onHome}
            className="px-5 py-2.5 rounded-md border border-[#2A3142] text-[#EDEAE1] text-sm font-medium hover:bg-[#171D2B] transition-colors"
          >
            Go home
          </button>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage