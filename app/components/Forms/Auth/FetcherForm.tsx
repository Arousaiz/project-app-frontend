import { Children, createElement, type ReactElement } from "react";
import { useForm } from "react-hook-form";
import { useFetcher } from "react-router";

export default function FetcherForm({
  defaultValues,
  children,
  onSubmit,
  className,
  ...rest
}: React.PropsWithChildren<{
  onSubmit: () => void;
  defaultValues?: any;
  className: string;
}>) {
  const fetcher = useFetcher();
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  return (
    <fetcher.Form
      onSubmit={handleSubmit(onSubmit)}
      {...rest}
      className={className}
    >
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
    </fetcher.Form>
  );
}
