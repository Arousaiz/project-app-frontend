import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import Accordion from "~/components/Buttons/Accordion";
import ButtonWithIcon from "~/components/Buttons/ButtonWithIcon";
import CounterButton from "~/components/Buttons/CounterButton";
import PrimaryButton from "~/components/Buttons/PrimaryButton";
import PrimaryButtonWithIcon from "~/components/Buttons/PrimaryButtonWithIcon";
import Cart from "~/components/Card/CartCard";
import ProductCard from "~/components/Card/ProductCard";
import PromotionCard from "~/components/Card/PromotionCard";
import RestaurantCard from "~/components/Card/RestaurantCard";
import RestaurantHeaderCard from "~/components/Card/RestaurantHeaderCard";
import Carousel from "~/components/Carousel/Carousel";
import FilterBar from "~/components/Filters/FilterBar/FilterBar";
import FilterButton from "~/components/Filters/FilterButton/FilterButton";
import FilterDropDownMenu from "~/components/Filters/FilterDropDownMenu/FilterDropDownMenu";
import Modal from "~/components/Modal/Modal";
import SearchBar from "~/components/Search/SearchBar/SearchBar";

export default function TestPage() {
    const [open, setOpen] = useState(false);

    return(
        <div>
            <div className="flex mx-auto max-w-7xl items-center justify-center gap-2 mt-5">
                <PromotionCard/>
            </div>
            <div className="flex mx-auto max-w-7xl items-center justify-center gap-2 mt-5">
                <ProductCard/>
            </div>
            <div className="flex mx-auto max-w-7xl items-center justify-center gap-2 mt-5">
                <FilterBar></FilterBar>
            </div>
            <div className="flex mx-auto max-w-5xl items-center justify-center">
                <RestaurantCard></RestaurantCard>
            </div>
            <div className="flex flex-col mx-auto max-w-7xl items-center justify-center">
                <SearchBar></SearchBar>
                <Accordion label="Text" id="accordion">
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero suscipit, explicabo nemo incidunt cum quam iste maiores vero, voluptatem porro ratione fugit quidem reprehenderit nam eligendi! Ipsum eaque facere magni.</p>
                </Accordion>
            </div>
            <div className="flex mx-auto max-w-7xl items-center justify-center gap-2 mt-5">
                <PrimaryButton onSubmit={() => setOpen(true)} label="Label" className=""></PrimaryButton>
                <PrimaryButtonWithIcon onSubmit={undefined} label="Search" icon={<MagnifyingGlassIcon className="size-5"></MagnifyingGlassIcon>}></PrimaryButtonWithIcon>
                <ButtonWithIcon onSubmit={undefined} Icon={<MagnifyingGlassIcon className="size-8 p-1"></MagnifyingGlassIcon>}/>
                <FilterButton onSubmit={undefined} label="Button"></FilterButton>
                <FilterDropDownMenu label="label"></FilterDropDownMenu>
                <CounterButton></CounterButton>
            </div>
            <div className=" justify-center items-center max-w-7xl flex mx-auto">
                <RestaurantHeaderCard/>
            </div>
            <div className="justify-center items-center max-w-7xl flex mx-auto">
                <Cart></Cart>
            </div>
            <div className="justify-center items-center max-w-7xl flex mx-auto">
                <Carousel>
                    <RestaurantCard></RestaurantCard>
                    <RestaurantCard></RestaurantCard>
                    <RestaurantCard></RestaurantCard>
                    <RestaurantCard></RestaurantCard>
                    <RestaurantCard></RestaurantCard>
                    <RestaurantCard></RestaurantCard>
                </Carousel>
            </div>
            <Modal open={open} onClose={() => setOpen(false)}>
                <div>Allo</div>
            </Modal>
        </div>
    )
}