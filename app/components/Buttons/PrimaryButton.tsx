export default function PrimaryButton({onSubmit, label, className} : {onSubmit?: ()=> void, label: string, className: string}) {
    return(
        <button className={`text-white bg-blue-600 dark:bg-blue-800 hover:bg-blue-800 focus:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:hover:bg-blue-600 ${className}`} onClick={onSubmit}>
            {label}
        </button>
    )
}