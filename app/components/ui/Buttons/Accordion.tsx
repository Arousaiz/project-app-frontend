import { ChevronDown } from "lucide-react";
import React from "react";
import { useState } from "react";
import { cn } from "~/utils/utils";

type AccordionGroupProps = {
  children: React.ReactElement<AccordionProps>[];
  singleOpen?: boolean;
  title: string;
};

type AccordionProps = {
  label: string;
  className?: string;
  id: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
};

export function Accordion({
  label,
  id,
  children,
  isOpen,
  onToggle,
  className,
}: AccordionProps) {
  const [maxHeight, setMaxHeight] = React.useState("0px");
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!contentRef.current) return;

    const updateHeight = () => {
      if (isOpen) {
        setMaxHeight(`${contentRef.current?.scrollHeight}px`);
      } else {
        setMaxHeight("0px");
      }
    };

    requestAnimationFrame(updateHeight);
  }, [isOpen]);

  return (
    <div
      className={`w-96 md:w-[640px] lg:w-[800px] max-w-3xl my-2 ${className}`}
    >
      <button
        aria-expanded={isOpen}
        aria-controls={`${id}-content`}
        onClick={onToggle}
        className="w-full select-none transition-all duration-400 flex justify-between items-center bg-secondary hover:bg-accent/60 p-4 rounded-2xl data-[open=true]:rounded-b-[0px] data-[open=true]:border-b border-0"
        data-open={isOpen}
      >
        <span className="text-left font-medium truncate">{label}</span>
        <ChevronDown
          className={`size-6 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        id={`${id}-content`}
        ref={contentRef}
        className={cn(
          "bg-secondary/50 rounded-b-3xl overflow-hidden origin-top transition-all duration-300 will-change-[max-height]"
        )}
        style={{
          maxHeight,
          transition: "max-height 300ms ease",
          overflow: "hidden",
        }}
      >
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

export function AccordionGroup({
  children,
  singleOpen = true,
  title,
}: AccordionGroupProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const handleToggle = (id: string) => {
    setOpenIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        if (singleOpen) newSet.clear();
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="    ">
      <p className="indent-4 text-3xl font-bold my-2">{title}</p>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          isOpen: openIds.has(child.props.id),
          onToggle: () => handleToggle(child.props.id),
        })
      )}
    </div>
  );
}
