import React from "react";

type Props = {
  text: string;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

const Typography: React.FC<Props> = ({
  text,
  variant,
  className,
  ...props
}: Props) => {
  switch (variant) {
    case "h1": {
      return (
        <h1
          className={` scroll-m-20 text-4xl font-bold lg:text-5xl ${className}`}
          {...props}
        >
          {text}
        </h1>
      );
    }
    case "h2": {
      return (
        <h2 className={`text-3xl font-bold lg:text-4xl ${className}`} {...props}>
          {text}
        </h2>
      );
    }
    case "h3": {
      return (
        <h3 className={`text-2xl font-bold lg:text-3xl ${className}`} {...props}>
          {text}
        </h3>
      );
    }
    case "h4": {
      return (
        <h4 className={`text-xl font-bold lg:text-2xl ${className}`} {...props}>
          {text}
        </h4>
      );
    }
    case "h5": {
      return (
        <h5 className={`text-lg font-bold lg:text-xl ${className}`} {...props}>
          {text}
        </h5>
      );
    }
    case "h6": {
      return (
        <h6 className={`text-sm font-bold lg:text-xl ${className}`} {...props}>
          {text}
        </h6>
      );
    }
    case "p": {
      return (
        <p className={`text-base ${className}`} {...props}>
          {text}
        </p>
      );
    }
  }
};

export default Typography;
