import { useEffect, useState } from "react";
import API from "../services/api";
import MainLayout from "../layouts/MainLayout";

function Budget() {

  const [budget, setBudget] = useState(0);
  const [amount, setAmount] = useState("");

  const fetchBudget = async () => {

    try {

      const response =
        await API.get("/budgets/current");

      setBudget(response.data.amount);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchBudget();

  }, []);

  const handleSetBudget = async () => {

    try {

      await API.post("/budgets", {
        amount
      });

      alert("Budget Saved Successfully");

      setAmount("");

      fetchBudget();

    } catch (error) {

      console.log(error);

      alert("Failed to Save Budget");
    }
  };

  return (
    <MainLayout>

      <h1 className="text-4xl font-bold mb-8">
        Budget Management
      </h1>

      <div className="bg-white rounded-xl shadow p-6 mb-6">

        <h2 className="text-xl font-semibold mb-4">
          Set Monthly Budget
        </h2>

        <div className="flex gap-4">

          <input
            type="number"
            placeholder="Enter Budget Amount"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            className="flex-1 border rounded-lg p-3"
          />

          <button
            onClick={handleSetBudget}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Save Budget
          </button>

        </div>

      </div>

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-semibold mb-4">
          Current Budget
        </h2>

        <p className="text-5xl font-bold text-blue-600">
          ₹{budget}
        </p>

      </div>

    </MainLayout>
  );
}

export default Budget;