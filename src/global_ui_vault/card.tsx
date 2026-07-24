import React, {
  forwardRef,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../utils/tailwind_merge";

type CardVariant = "default" | "elevated" | "outline" | "ghost";
type CardPadding = "none" | "sm" | "md" | "lg";

type PolymorphicProps<T extends ElementType> = {
  as?: T;
  children?: ReactNode;
  className?: string;
  variant?: CardVariant;
  padding?: CardPadding;
  hover?: boolean;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children">;

type CardComponent = React.ForwardRefExoticComponent<
  Omit<PolymorphicProps<ElementType>, "ref"> &
    React.RefAttributes<any>
> & {
  Header: typeof Header;
  Body: typeof Body;
  Footer: typeof Footer;
};

const Card = forwardRef(
  <T extends ElementType = "div">(
    {
      as,
      children,
      className,
      variant = "default",
      padding = "md",
      hover = true,
      ...props
    }: PolymorphicProps<T>,
    ref: any
  ) => {
    const Component = as || "div";

    const variants = {
      default: `
        bg-card
        text-card-foreground
        border-border
        shadow-xs
      `,

      elevated: `
        bg-card
        text-card-foreground
        border-transparent
        shadow-md
      `,

      outline: `
        bg-transparent
        border-2
        border-border
      `,

      ghost: `
        bg-transparent
        border-transparent
        shadow-none
      `,
    };

    const paddings = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    return (
      <Component
        ref={ref}
        className={cn(
          "flex flex-col",
          "rounded-xl",
          "border",
          "transition-all duration-200 ease-out",

          variants[variant],
          paddings[padding],

          hover &&
            "hover:-translate-y-1 hover:shadow-lg",

          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
) as CardComponent;

Card.displayName = "Card";

/* ---------------------------------------------------------------- */

interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const Header = ({
  children,
  className,
  ...props
}: SectionProps) => (
  <header
    className={cn(
      "flex items-center justify-between",
      "pb-4",
      className
    )}
    {...props}
  >
    {children}
  </header>
);

const Body = ({
  children,
  className,
  ...props
}: SectionProps) => (
  <div
    className={cn(
      "text-foreground-secondary",
      "leading-7",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

const Footer = ({
  children,
  className,
  ...props
}: SectionProps) => (
  <footer
    className={cn(
      "flex items-center justify-between",
      "pt-5",
      className
    )}
    {...props}
  >
    {children}
  </footer>
);

Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;

export default Card;