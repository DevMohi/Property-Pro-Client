import React from "react";
import { Card } from "@/components/ui/card";

type UserSummaryCardProps = {
  title: string;
  value: number;
  percentage: number;
  increase: boolean;
};

export const UserSummaryCard = ({
  title,
  value,
  percentage,
  increase,
}: UserSummaryCardProps) => {
  return (
    <Card className="p-4 shadow-lg rounded-lg bg-white">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div
          className={`flex  text-xs font-medium ${
            increase ? "text-green-500" : "text-red-500"
          }`}
        >
          {increase ? `+${percentage}%` : `-${percentage}%`} increase
        </div>
      </div>
    </Card>
  );
};
