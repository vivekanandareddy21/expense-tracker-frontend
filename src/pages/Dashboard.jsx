import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import API from "../services/api";

function Dashboard() {

  const [summary, setSummary] = useState(null);

  useEffect(() => {

    const fetchSummary = async () => {

      try {

        const response =
          await API.get("/dashboard/summary");

        setSummary(response.data);

      } catch (error) {

        console.log(error);
      }
    };

    fetchSummary();

  }, []);

  if (!summary) {
    return (
      <MainLayout>
        <h1 className="text-2xl font-bold">
          Loading...
        </h1>
      </MainLayout>
    );
  }

  return (
    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-gray-500 text-sm">
            Total Budget
          </h3>

          <p className="text-3xl font-bold text-blue-600 mt-2">
            ₹{summary.budget}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-gray-500 text-sm">
            Total Spent
          </h3>

          <p className="text-3xl font-bold text-red-500 mt-2">
            ₹{summary.spent}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-gray-500 text-sm">
            Remaining Budget
          </h3>

          <p className="text-3xl font-bold text-green-600 mt-2">
            ₹{summary.remaining}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-gray-500 text-sm">
            Expense Count
          </h3>

          <p className="text-3xl font-bold text-purple-600 mt-2">
            {summary.expenseCount}
          </p>
        </div>

      </div>

    </MainLayout>
  );
}

export default Dashboard;