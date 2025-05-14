"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";

import { toast } from "sonner";
import { getAllSummary } from "@/services/AdminService";
import { UserSummaryCard } from "@/components/shared/summaryCard";
import RentalTrendsChart from "@/components/modules/admin/LineChart";
import UserDistributionChart from "@/components/modules/admin/PieChart";

export default function AdminDashboard() {
  const { setIsLoading } = useUser();
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setIsLoading(true);
        const res = await getAllSummary(); // Fetch user summary
        setSummary(res.data); // Assuming the response contains a data object with the required data
      } catch (error) {
        console.error("Failed to load user summary", error);
        toast.error("Error fetching data");
      } finally {
        setLoading(false);
        setIsLoading(false);
      }
    };
    fetchSummary();
  }, [setIsLoading]);

  console.log(summary, "summary");

  const userData = [
    { name: "Landlords", value: summary?.landlord },
    { name: "Tenants", value: summary?.tenants },
    { name: "Admins", value: 3 },
    { name: "Guests", value: 20 },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-6 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <UserSummaryCard
          title="Total Houses"
          value={summary?.houses}
          percentage={12}
          increase
        />
        <UserSummaryCard
          title="Total Landlords"
          value={summary?.landlord}
          percentage={5}
          increase
        />
        <UserSummaryCard
          title="Total Tenants"
          value={summary?.tenants}
          percentage={1}
          increase
        />
        <UserSummaryCard
          title="Total Users"
          value={summary?.users}
          percentage={6}
          increase
        />
      </div>

      <div className="container mx-auto py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Rental Trends Chart */}
          <div className="bg-white rounded-lg p-4 shadow">
            <h2 className="text-xl font-semibold mb-4">
              Rental Trends (Monthly)
            </h2>
            <RentalTrendsChart />
          </div>

          {/* User Distribution Chart */}
          <div className="bg-white rounded-lg p-4 shadow">
            <h2 className="text-xl font-semibold mb-4">User Distribution</h2>
            <UserDistributionChart userData={userData} />
          </div>
        </div>
      </div>
    </div>
  );
}
