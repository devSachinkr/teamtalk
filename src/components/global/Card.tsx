import React from "react";
import {
  Card as ShadcnCard,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  cardTitle?: string | React.ReactNode;
  children: string | React.ReactNode;
  cardDesc?: string | React.ReactNode;
  cardFooter?: string | React.ReactNode;
  contentClasses?: string;
  cardClasses?: string;
};

const Card = ({
  children,
  cardDesc,
  cardTitle,
  cardFooter,
  contentClasses,
  cardClasses,
}: Props) => {
  return (
    <ShadcnCard className={cardClasses}>
      <CardHeader>
        {cardTitle && <CardTitle>{cardTitle}</CardTitle>}
        {cardDesc && <CardDescription>{cardDesc}</CardDescription>}
      </CardHeader>
      <CardContent className={contentClasses}>{children}</CardContent>
      {cardFooter && <CardFooter className="text-muted-foreground">{cardFooter}</CardFooter>}
    </ShadcnCard>
  );
};

export default Card;
