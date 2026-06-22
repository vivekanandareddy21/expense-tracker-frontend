import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-72 bg-slate-950 text-white min-h-screen p-6">

      <h1 className="text-3xl font-bold mb-10">
        Expense Tracker
      </h1>

      <div className="flex flex-col gap-3">

        <Link
          to="/dashboard"
          className="p-3 rounded-lg hover:bg-slate-800"
        >
          Dashboard
        </Link>

        <Link
          to="/expenses"
          className="p-3 rounded-lg hover:bg-slate-800"
        >
          Expenses
        </Link>

        <Link
          to="/budget"
          className="p-3 rounded-lg hover:bg-slate-800"
        >
          Budget
        </Link>

        <Link
          to="/reports"
          className="p-3 rounded-lg hover:bg-slate-800"
        >
          Reports
        </Link>

      </div>
    </div>
  );
}

export default Sidebar;