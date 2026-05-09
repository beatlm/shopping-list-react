import React from "react";

export default function IconButton({ onClick, ariaLabel, children, className = "", variant = "neutral" }) {
  const base = "inline-flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 focus:outline-none active:scale-90";
  const variants = {
    neutral: "bg-apple-gray-100 text-apple-gray-700 hover:bg-apple-gray-200 focus:ring-2 focus:ring-apple-gray-200",
    danger: "bg-apple-red/10 text-apple-red hover:bg-apple-red/20 focus:ring-2 focus:ring-apple-red/30",
    primary: "bg-apple-blue text-white hover:bg-opacity-90 focus:ring-2 focus:ring-apple-blue/30",
  };

  const classes = `${base} ${variants[variant] || variants.neutral} ${className}`;

  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel} className={classes}>
      {children}
    </button>
  );
}
