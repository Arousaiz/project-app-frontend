import { BookmarkIcon } from "@heroicons/react/20/solid";

export default function ButtonWithIcon({ onSubmit, Icon }) {
  return (
    <button
      onClick={onSubmit}
      type="button"
      className="flex justify-center items-center size-full text-white bg-blue-700 dark:bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full dark:hover:bg-blue-600 dark:focus:ring-blue-600"
    >
      {Icon}
    </button>
  );
}
