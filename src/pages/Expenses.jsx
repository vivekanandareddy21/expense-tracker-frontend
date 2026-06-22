import { useEffect, useState } from "react";
import API from "../services/api";
import MainLayout from "../layouts/MainLayout";

function Expenses() {

  const [expenses, setExpenses] = useState([]);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
const [isEditing, setIsEditing] = useState(false);

  const fetchExpenses = async () => {

    try {

      const response = await API.get("/expenses");

      setExpenses(response.data);

    } catch (error) {

      console.log(error);
    }
  };
useEffect(() => {

  const fetchExpenses = async () => {

    try {

      const response = await API.get("/expenses");

      setExpenses(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  fetchExpenses();

}, []);

  const handleAddExpense = async () => {

    try {

      await API.post("/expenses", {
        title,
        amount,
        category,
        description
      });

      alert("Expense Added Successfully");

      setTitle("");
      setAmount("");
      setCategory("");
      setDescription("");

      fetchExpenses();

    } catch (error) {

      console.log(error);

      alert("Failed to Add Expense");
    }
  };
  const handleDeleteExpense = async (id) => {

  try {

    await API.delete(`/expenses/${id}`);

    alert("Expense Deleted");

    fetchExpenses();

  } catch (error) {

    console.log(error);

    alert("Delete Failed");
  }
  
};
const handleEditExpense = (expense) => {

  setTitle(expense.title);
  setAmount(expense.amount);
  setCategory(expense.category);
  setDescription(expense.description);

  setEditId(expense.id);

  setIsEditing(true);
};
const handleUpdateExpense = async () => {

  try {

    await API.put(`/expenses/${editId}`, {
      title,
      amount,
      category,
      description
    });

    alert("Expense Updated Successfully");

    setTitle("");
    setAmount("");
    setCategory("");
    setDescription("");

    setEditId(null);
    setIsEditing(false);

    fetchExpenses();

  } catch (error) {

    console.log(error);

    alert("Update Failed");
  }
};
const filteredExpenses = expenses.filter((expense) =>
  expense.title.toLowerCase().includes(search.toLowerCase()) ||
  expense.category.toLowerCase().includes(search.toLowerCase())
);

  return (
    <MainLayout>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Expenses
        </h1>

      </div>

      {/* Add Expense Form */}

      <div className="bg-white p-6 rounded-xl shadow mb-6">

        <h2 className="text-xl font-bold mb-4">
          Add Expense
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-3 rounded-lg"
          />

        </div>

        <button
  onClick={
    isEditing
      ? handleUpdateExpense
      : handleAddExpense
  }
  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
>
  {isEditing ? "Update Expense" : "Add Expense"}
</button>

      </div>

      {/* Search */}

      <div className="bg-white p-4 rounded-xl shadow mb-6">

        <input
  type="text"
  placeholder="Search expenses..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4">Title</th>

              <th className="text-left p-4">Amount</th>

              <th className="text-left p-4">Category</th>

              <th className="text-left p-4">Description</th>
              <th className="text-left p-4">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredExpenses.map((expense) => (

              <tr
                key={expense.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-4">
                  {expense.title}
                </td>

                <td className="p-4 font-semibold text-green-600">
                  ₹{expense.amount}
                </td>

                <td className="p-4">
                  {expense.category}
                </td>

                <td className="p-4">
                  {expense.description}
                </td>

                <td className="p-4 flex gap-2">

  <button
    onClick={() => handleEditExpense(expense)}
    className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
  >
    Edit
  </button>

  <button
    onClick={() => handleDeleteExpense(expense.id)}
    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
  >
    Delete
  </button>

</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </MainLayout>
  );
}

export default Expenses;