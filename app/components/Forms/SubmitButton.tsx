export default function SubmitButton({children} : React.PropsWithChildren) {
    return(
        <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-blue-600 dark:bg-sky-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-500 dark:hover:bg-sky-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            {children}
        </button>
    )
}