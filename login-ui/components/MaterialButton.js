"use client";
import { useRef } from "react";

export default function MaterialButton({
  children,
  className = "",
  color = "indigo",
  onClick,
  type = "button",
  disabled = false,
}) {
  const btnRef = useRef(null);

  const handleClick = (e) => {
    const button = btnRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.position = "absolute";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.borderRadius = "50%";

    // Neon ripple effect (lighter but glowing)
    ripple.style.background = "rgba(255, 255, 255, 0.4)";

    ripple.style.transform = "scale(0)";
    ripple.style.animation = "ripple 700ms ease-out";
    ripple.style.pointerEvents = "none";

    button.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());

    onClick?.(e);
  };

  const colorClasses = {
    indigo:
      "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/30 hover:shadow-indigo-500/50",
    teal:
      "bg-teal-600 hover:bg-teal-700 shadow-teal-500/30 hover:shadow-teal-500/50",
    pink:
      "bg-pink-600 hover:bg-pink-700 shadow-pink-500/30 hover:shadow-pink-500/50",
    blue:
      "bg-blue-600 hover:bg-blue-700 shadow-blue-500/30 hover:shadow-blue-500/50",
    amber:
      "bg-amber-600 hover:bg-amber-700 shadow-amber-500/30 hover:shadow-amber-500/50",
    red:
      "bg-red-600 hover:bg-red-700 shadow-red-500/30 hover:shadow-red-500/50",
  };

  return (
    <button
      ref={btnRef}
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`relative overflow-hidden select-none 
        inline-flex items-center justify-center 
        rounded-xl px-6 py-3 text-white font-semibold
        transition-all duration-300
        active:scale-[0.97]
        focus:outline-none focus:ring-2 focus:ring-white/20
        ${colorClasses[color] || colorClasses.indigo}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {children}

      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 0.5;
          }
          100% {
            transform: scale(2.8);
            opacity: 0;
          }
        }
      `}</style>
    </button>
  );
}
