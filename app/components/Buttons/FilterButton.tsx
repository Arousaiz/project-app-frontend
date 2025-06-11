type FilterButtonProps = { onClick?: () => void; children?: React.ReactNode };

export default function FilterButton({ onClick, children }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className="h-8 min-w-16 flex justify-center items-center snd-button font-medium rounded-3xl text-sm px-2 py-1 me-2 "
    >
      {children}
    </button>
  );
}
