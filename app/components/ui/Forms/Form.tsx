import { Children, createElement, type ReactElement } from "react";
import { useForm } from "react-hook-form";

export default function Form({
  defaultValues,
  children,
  onSubmit,
  className,
  ...rest
}: React.PropsWithChildren<{
  onSubmit: () => void;
  defaultValues?: any;
  className: string;
  fetcher?: boolean;
}>) {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)} {...rest} className={className}>
      {Children.map(children, (child: any) => {
        return child && child.props.name
          ? createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                key: child.props.name,
              },
            })
          : child;
      })}
    </form>
  );
}
