export default function PrimaryButtonWithIcon({
  onSubmit,
  label,
  icon,
}: {
  onSubmit?: () => void;
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <button
      onClick={onSubmit}
      className="text-white flex items-center bg-blue-600 dark:bg-blue-800 hover:bg-blue-800 focus:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:hover:bg-blue-600 "
    >
      {icon}
      {label}
    </button>
  );
}
