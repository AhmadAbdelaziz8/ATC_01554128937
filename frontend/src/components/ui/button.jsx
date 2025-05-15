import { Link } from "react-router-dom";

export function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  type = "button",
  ...props
}) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-colors rounded-md";

  const variantClasses = {
    primary: "bg-primary hover:bg-primary-hover text-white",
    secondary: "bg-secondary hover:bg-secondary-hover text-white",
    outline:
      "border border-gray-300 dark:border-gray-600 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200",
    ghost:
      "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200",
    danger: "bg-red-500 hover:bg-red-600 text-white",
  };

  const sizeClasses = {
    sm: "text-sm px-3 py-1.5",
    md: "px-4 py-2",
    lg: "text-lg px-6 py-3",
  };

  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  const allClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={allClasses}
      {...props}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  children,
  to,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-colors rounded-md";

  const variantClasses = {
    primary: "bg-primary hover:bg-primary-hover text-white",
    secondary: "bg-secondary hover:bg-secondary-hover text-white",
    outline:
      "border border-gray-300 dark:border-gray-600 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200",
    ghost:
      "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200",
    danger: "bg-red-500 hover:bg-red-600 text-white",
  };

  const sizeClasses = {
    sm: "text-sm px-3 py-1.5",
    md: "px-4 py-2",
    lg: "text-lg px-6 py-3",
  };

  const allClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <Link to={to} className={allClasses} {...props}>
      {children}
    </Link>
  );
}
