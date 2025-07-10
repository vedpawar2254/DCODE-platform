import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#BCDD19', '#82ca9d', '#ffc658', '#8884d8'];

export default function SkillsPieChart({ data }) {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        dataKey="percent"
        nameKey="language"
        cx="50%"
        cy="50%"
        outerRadius={120}
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}
