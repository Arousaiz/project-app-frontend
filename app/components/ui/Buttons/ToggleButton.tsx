export default function ToggleButton() {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input type="checkbox" value="" className="sr-only peer" />
      <div className="relative w-11 h-6 bg-secondary border-border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-ring/75 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-border-secondary-foreground after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-secondary-foreground after:border-secondary-foreground after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
      <span className="ms-3 text-sm font-medium">Toggle me</span>
    </label>
  );
}
