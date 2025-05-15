import type { ReactElement } from "react";

export default function InfoButton({icon, label, onSubmit}: {icon: ReactElement, label: string, onSubmit?: () => void}){
    return(
        <button onClick={onSubmit} className="text-white flex items-center bg-blue-600 dark:bg-sky-800 hover:bg-blue-800 focus:bg-blue-600 dark:focus:bg-sky-600 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:hover:bg-sky-600 ">
            {icon} 
            {label}            
        </button>
    )
}