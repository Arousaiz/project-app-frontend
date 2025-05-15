import FilterButton from "../FilterButton/FilterButton";
import FilterDropDownMenu from "../FilterDropDownMenu/FilterDropDownMenu";

export default function FilterBar() {
    return(
        <div className="w-full h-18 bg-gray-900 rounded-4xl flex flex-row mx-auto items-center">
            <div className="mx-4">
                <FilterButton onSubmit={undefined} label="Type"></FilterButton>
                <FilterButton onSubmit={undefined} label="Type"></FilterButton>
                <FilterButton onSubmit={undefined} label="Type"></FilterButton>
                <FilterDropDownMenu label="More"></FilterDropDownMenu>
            </div>
        </div>
    )
}