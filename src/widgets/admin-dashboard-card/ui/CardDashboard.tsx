import React, { ReactNode } from "react";

interface CardDashboardProps {
  title: string;
  value: number;
  percent: number;
  footerDescription: string;
  miniDescription: string;
  link: string;
  color: "purple" | "green" | "blue" | "rose";
  icon: ReactNode;
}

export function CardDashboard(props: CardDashboardProps) {
  const {
    title,
    value,
    percent,
    miniDescription,
    color,
    link,
    icon,
    footerDescription,
  } = props;

  return (
    <div className="rounded-lg text-card-foreground border bg-white dark:bg-background shadow-sm hover:shadow-md transition">
      <div className="space-y-1.5 p-3 md:p-4 xxl:p-6 flex flex-col items-start gap-1">
        <h3> {icon} </h3>

        <h2 className="xl:text-2xl mb-2 tracking-tight text-base font-semibold text-foreground">
          {title}
        </h2>
        <p className="text-muted-foreground text-sm">
          <span className="text-black-600">{percent}</span> {miniDescription}
        </p>
      </div>
      <div className="p-3 md:p-4 xxl:p-6 flex flex-col gap-2 mt-2 !pt-0">
        <h3 className="text-4xl font-bold">{value}</h3>
        <span className="text-gray-500">{footerDescription}</span>
      </div>
    </div>
  );
}
