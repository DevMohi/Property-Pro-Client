import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample Data for User Distribution

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const UserDistributionChart = ({ userData }: { userData: any }) => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={userData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        label
      >
        {userData.map((entry: any, index: number) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
);

export default UserDistributionChart;
