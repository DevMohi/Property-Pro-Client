import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Sample Data for Rental Trends
const rentalData = [
  { month: "Jan", rent: 150 },
  { month: "Feb", rent: 200 },
  { month: "Mar", rent: 250 },
  { month: "Apr", rent: 300 },
  { month: "May", rent: 350 },
  { month: "Jun", rent: 400 },
  { month: "Jul", rent: 450 },
  { month: "Aug", rent: 500 },
  { month: "Sep", rent: 550 },
  { month: "Oct", rent: 600 },
  { month: "Nov", rent: 650 },
  { month: "Dec", rent: 700 },
];

const RentalTrendsChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={rentalData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="rent" stroke="#82ca9d" activeDot={{ r: 8 }} />
    </LineChart>
  </ResponsiveContainer>
);

export default RentalTrendsChart;
