export default function Button({
  children,
  className = "",
  ...props
}) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-lg bg-violet-600 text-white ${className}`}
    >
      {children}
    </button>
  );
}