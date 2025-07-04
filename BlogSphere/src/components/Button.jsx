import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "",
    textColor = "",
    className = "",
    disabled = false,
    variant = "primary",
    size = "md",
    ...props
}) {
    // Define button variants
    const variants = {
        primary: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl",
        secondary: "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white shadow-lg hover:shadow-xl",
        success: "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl",
        danger: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl",
        outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent",
        ghost: "text-gray-700 hover:bg-gray-100 bg-transparent"
    };

    // Define button sizes
    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg"
    };

    // Use custom colors if provided, otherwise use variant
    const buttonVariant = bgColor || textColor ? "" : variants[variant] || variants.primary;
    const buttonSize = sizes[size] || sizes.md;

    const customColors = bgColor || textColor ? `${bgColor} ${textColor}` : "";

    return (
        <button 
            className={`
                ${buttonSize}
                ${buttonVariant}
                ${customColors}
                rounded-lg font-medium 
                transition-all duration-300 transform 
                ${disabled 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:scale-105 active:scale-95'
                }
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${className}
            `} 
            disabled={disabled}
            type={type}
            {...props}
        >
            {children}
        </button>
    );
}