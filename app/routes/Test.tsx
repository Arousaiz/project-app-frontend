import { HelpCircle, Info, Mail, User2Icon } from "lucide-react";
import { useState } from "react";
import {
  useForm,
  type RegisterOptions,
  type UseFormRegisterReturn,
} from "react-hook-form";
import { Accordion } from "~/components/Buttons/Accordion";
import { CheckBox, CheckBoxGroup } from "~/components/Buttons/Checkbox";
import CounterButton from "~/components/Buttons/CounterButton";
import FilterButton from "~/components/Buttons/FilterButton";
import PrimaryButton from "~/components/Buttons/PrimaryButton";
import Radio, { RadioGroup } from "~/components/Buttons/Radio";
import ToggleButton from "~/components/Buttons/ToggleButton";
import Cart from "~/components/Card/CartCard";
import FavoriteCard from "~/components/Card/FavoriteProfileCard";
import ProductCard from "~/components/Card/ProductCard";
import PromotionCard from "~/components/Card/PromotionCard";
import RestaurantCard from "~/components/Card/RestaurantCard";
import Carousel from "~/components/Carousel/Carousel";
import CheckBoxInput from "~/components/Forms/CheckBox";
import Form from "~/components/Forms/Form";
import HelpLink from "~/components/Forms/HelpLink";
import Input from "~/components/Forms/Input";
import InputWithIcon from "~/components/Forms/InputWithIcon";
import Label from "~/components/Forms/Label";
import ProfileForm from "~/components/Forms/ProfileForm";
import Select from "~/components/Forms/Select";
import SubmitButton from "~/components/Forms/SubmitButton";
import TextArea from "~/components/Forms/TextArea";
import ProfileContent from "~/components/Profile/ProfileContent";
import ProfileHeader from "~/components/Profile/ProfileHeader";
import { FavoritesProvider } from "~/providers/favoritesContext";
import { PromotionType, type Promotions } from "~/types/promotions";

export default function TestPage() {
  const dateN = new Date();
  const [open, setOpen] = useState(false);
  const [counter, setCounter] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const promos: Promotions[] = [
    {
      id: "idasas",
      title: "Название акции",
      description: "Описание акции",
      discount: 5,
      img_url: "",
      promotionType: PromotionType.FREE_ITEM,
      requiredCount: 0,
      startDate: dateN,
      endDate: dateN,
      isActive: false,
      restaurant: {
        id: "",
        img_url: "",
        name: "",
        phone: "",
        openTime: dateN,
        closeTime: dateN,
        rating: 0,
        cuisines: [],
        menuItems: [],
        promotions: [],
        reviews: [],
        address: {
          id: "",
          city: "",
          street: "",
          house: 0,
        },
      },
      menuItem: {
        id: "",
        img_url: "",
        name: "",
        description: "",
        price: 0,
        rating: 0,
        isAvailable: false,
        category: {
          id: "",
          name: "",
          description: "",
        },
        restaurant: {
          id: "",
          img_url: "",
          name: "",
          phone: "",
          openTime: dateN,
          closeTime: dateN,
          rating: 0,
          cuisines: [],
          menuItems: [],
          promotions: [],
          reviews: [],
          address: {
            id: "",
            city: "",
            street: "",
            house: 0,
          },
        },
        reviews: [],
      },
    },
  ];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const options = [
    { value: "option1", label: "Первый вариант" },
    { value: "option2", label: "Второй вариант" },
  ];

  const categories = [
    { value: "category1", label: "Первый вариант" },
    { value: "category2", label: "Второй вариант" },
  ];

  const [selected, setSelected] = useState("option1");

  return (
    <FavoritesProvider>
      <div>
        <div className="h-dvh flex flex-wrap">
          <div className="size-52 bg-accent mx-4 text-center"> Accent </div>
          <div className="size-52 bg-accent-foreground mx-4 text-center">
            Accent Foreground
          </div>
          <div className="size-52 bg-primary mx-4 text-center"> Primary </div>
          <div className="size-52 bg-primary-foreground mx-4 text-center">
            Primary Foreground
          </div>
          <div className="size-52 bg-secondary mx-4 text-center">
            {" "}
            Secondary{" "}
          </div>
          <div className="size-52 bg-secondary-foreground mx-4 text-center">
            Secondary Foreground
          </div>
          <div className="size-52 bg-background mx-4 text-center border border-amber-300">
            Background
          </div>
          <div className="size-52 bg-foreground mx-4 text-center border border-amber-300">
            Background Foreground
          </div>
          <div className="size-52 bg-card mx-4 text-center border border-amber-300">
            Card
          </div>
          <div className="size-52 bg-card-foreground mx-4 text-center border border-amber-300">
            Card Foreground
          </div>
          <div className="size-52 bg-popover mx-4 text-center border border-amber-300">
            Popover
          </div>
          <div className="size-52 bg-popover-foreground mx-4 text-center border border-amber-300">
            popover Foreground
          </div>
          <div className="size-52 bg-muted mx-4 text-center border border-amber-300">
            Muted
          </div>
          <div className="size-52 bg-muted-foreground mx-4 text-center border border-amber-300">
            Muted Foreground
          </div>
          <div className="size-52 bg-destructive mx-4 text-center border border-amber-300">
            Destructive
          </div>
          <div className="size-52 bg-border mx-4 text-center border border-amber-300">
            Border
          </div>
          <div className="size-52 bg-input mx-4 text-center border border-amber-300">
            Input
          </div>
          <div className="size-52 bg-ring mx-4 text-center border border-amber-300">
            Ring
          </div>
        </div>
        <div className="flex flex-wrap mb-10">
          <div className="size-52 bg-sidebar mx-4 text-center border border-amber-300">
            Sidebar
          </div>
          <div className="size-52 bg-sidebar-foreground mx-4 text-center border border-amber-300">
            Sidebar fooreground
          </div>
          <div className="size-52 bg-sidebar-accent mx-4 text-center border border-amber-300">
            Sidebar accent
          </div>
          <div className="size-52 bg-sidebar-accent-foreground mx-4 text-center border border-amber-300">
            Sidebar accent foreground
          </div>
          <div className="size-52 bg-sidebar-border mx-4 text-center border border-amber-300">
            Sidebar border
          </div>
          <div className="size-52 bg-sidebar-primary mx-4 text-center border border-amber-300">
            Sidebar pri
          </div>
          <div className="size-52 bg-sidebar-primary-foreground mx-4 text-center border border-amber-300">
            Sidebar primary foreg
          </div>
        </div>
        <div className="flex flex-row flex-wrap justify-center items-center">
          <PrimaryButton className={"mx-4"}>Button</PrimaryButton>
          <PrimaryButton variant="secondary" className={"mx-4"}>
            Secondary
          </PrimaryButton>
          <PrimaryButton variant="ghost" className={"mx-4"}>
            ghost
          </PrimaryButton>
          <PrimaryButton variant="outline" className={"mx-4"}>
            outline
          </PrimaryButton>
          <PrimaryButton variant="destructive" className={"mx-4"}>
            destructive
          </PrimaryButton>
          <PrimaryButton className={"mx-4"}>
            <HelpCircle className="size-5"></HelpCircle>
            <p>Help</p>
          </PrimaryButton>
          <PrimaryButton size="icon" className={""}>
            <User2Icon className="size-8"></User2Icon>
          </PrimaryButton>
          <ToggleButton></ToggleButton>
          <CounterButton
            count={counter}
            minusClick={() => setCounter(counter - 1)}
            plusClick={() => setCounter(counter + 1)}
            deleteFromCart={() => {}}
          ></CounterButton>
          <FilterButton>Title</FilterButton>
          <CheckBox id="id"></CheckBox>
        </div>

        <div className="w-[400px] flex flex-col items-center justify-center mx-auto mt-10">
          <Form onSubmit={() => {}} className={""}>
            <Label htmlFor="name">LabelForName</Label>
            <Input
              register={register}
              name={"name"}
              type={""}
              id={""}
              placeholder="placeholder"
            ></Input>
            {/* <HelpLink to={"/"}>HelpLink</HelpLink> */}
            <Label htmlFor="name">LabelForName</Label>
            <InputWithIcon
              register={register}
              name={"name1"}
              type={""}
              id={""}
              placeholder="placeholder"
            >
              <Mail></Mail>
            </InputWithIcon>
            <Label htmlFor="name">LabelForName</Label>
            <TextArea
              register={register}
              name={"name2"}
              id={""}
              placeholder="placeholder"
            ></TextArea>
            <Label htmlFor="name">LabelForName</Label>
            <Select name={"name3"} options={["option1", "option2"]}></Select>
            <Label htmlFor="name">LabelForName</Label>
            <CheckBoxInput
              register={register}
              name={"name4"}
              id={""}
            ></CheckBoxInput>

            <RadioGroup
              name="my-radio"
              options={options}
              value={selected}
              onChange={setSelected}
            />

            <p className="mt-4 text-sm text-muted-foreground">
              Вы выбрали: {selected}
            </p>
            <CheckBoxGroup
              options={categories}
              name=""
              values={selectedOptions}
              onChange={setSelectedOptions}
            />

            <p className="mt-4 text-sm text-muted-foreground">
              Вы выбрали: {selectedOptions.join(", ") || "ничего"}
            </p>
            <SubmitButton>Button</SubmitButton>
          </Form>
        </div>
        <div className="p-20 flex">
          <RestaurantCard
            restaurant={{
              id: "",
              img_url: "",
              name: "Название ресторана",
              cuisines: [],
              rating: 3.5,
              openTime: dateN,
              closeTime: dateN,
            }}
          ></RestaurantCard>
          <RestaurantCard
            restaurant={{
              id: "ada",
              img_url: "",
              name: "Название ресторана",
              cuisines: [],
              rating: 3.5,
              openTime: dateN,
              closeTime: dateN,
            }}
          ></RestaurantCard>
        </div>
      </div>
      <div className="p-20">
        <Carousel className="">
          {promos?.length ? (
            promos.map((item) => <PromotionCard promo={item}></PromotionCard>)
          ) : (
            <div></div>
          )}
        </Carousel>
      </div>

      <div className="p-20">
        <ProfileHeader></ProfileHeader>
        <ProfileContent>
          <div className="flex flex-col items-center ">
            <ProfileForm></ProfileForm>
          </div>
        </ProfileContent>
      </div>
    </FavoritesProvider>
  );
}
