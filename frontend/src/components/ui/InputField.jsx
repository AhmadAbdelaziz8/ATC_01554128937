export function InputField({
  label,
  id,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  error,
  className = "",
  ...props
}) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`w-full px-3 py-2 bg-white dark:bg-gray-800 border ${
          error
            ? "border-red-500 dark:border-red-500"
            : "border-gray-300 dark:border-gray-600"
        } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-primary/50 focus:border-primary dark:focus:border-primary dark:text-white ${
          disabled ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed" : ""
        }`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
