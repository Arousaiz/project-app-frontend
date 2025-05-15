export default function FilterButton({
  onClick,
  children,
}: React.PropsWithChildren<{ onClick?: () => void }>) {
  return (
    <button
      onClick={onClick}
      className="h-8 min-w-16 text-white bg-blue-600 dark:bg-gray-600 hover:bg-blue-800 focus:bg-gray-800 dark:focus:bg-gray-400 font-medium rounded-3xl text-sm px-2 py-1 me-2 dark:hover:bg-gray-400 "
    >
      {children}
    </button>
  );
}
