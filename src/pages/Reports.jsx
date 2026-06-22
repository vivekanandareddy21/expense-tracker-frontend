import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import API from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

function Reports() {

  const [data, setData] = useState([]);

  useEffect(() => {

    const fetchReport = async () => {

      try {

        const response =
          await API.get("/reports");

        setData(response.data);

      } catch (error) {

        console.log(error);
      }
    };

    fetchReport();

  }, []);

  const COLORS = [
    "#2563eb",
    "#dc2626",
    "#16a34a",
    "#9333ea",
    "#ea580c",
    "#0891b2"
  ];

  const totalSpent = data.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  return (
    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">
        Expense Reports
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow-lg">

          <h2 className="text-xl font-semibold mb-4">
            Category Wise Spending
          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <PieChart>

              <Pie
                data={data}
                dataKey="amount"
                nameKey="category"
                outerRadius={120}
                label
              >

                {data.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index % COLORS.length
                      ]
                    }
                  />

                ))}

              </Pie>

              <Tooltip />
              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">

          <h2 className="text-xl font-semibold mb-4">
            Analytics
          </h2>

          <div className="space-y-4">

            <div className="border rounded-xl p-4">

              <p className="text-gray-500">
                Total Categories
              </p>

              <p className="text-3xl font-bold">
                {data.length}
              </p>

            </div>

            <div className="border rounded-xl p-4">

              <p className="text-gray-500">
                Total Expenses
              </p>

              <p className="text-3xl font-bold text-red-500">
                ₹{totalSpent}
              </p>

            </div>

          </div>

        </div>

      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg mt-6">

        <h2 className="text-xl font-semibold mb-4">
          Category Breakdown
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">
                Category
              </th>

              <th className="text-left py-3">
                Amount
              </th>

            </tr>

          </thead>

          <tbody>

            {data.map((item, index) => (

              <tr
                key={index}
                className="border-b"
              >

                <td className="py-3">
                  {item.category}
                </td>

                <td className="py-3 font-semibold">
                  ₹{item.amount}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </MainLayout>
  );
}

export default Reports;