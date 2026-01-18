import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import  useTheme  from "../hooks/useTheme.js";
import CountUp from "react-countup";

export default function StatCard({ title, value, change }) {
    const { theme } = useTheme();

    // Determine change styling
    let ChangeIcon = Minus;
    let changeColor = "text-gray-500 bg-gray-100";

    if (change > 0) {
        ChangeIcon = ArrowUp;
        changeColor = "text-green-600 bg-green-100";
    } else if (change < 0) {
        ChangeIcon = ArrowDown;
        changeColor = "text-red-600 bg-red-100";
    }

    return (
        <div
            className={`p-6 rounded-xl flex justify-between items-center shadow-md
        ${theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"}`}
        >
            <div>
                <p className="text-gray-400 dark:text-gray-300">{title}</p>
                <h2 className="text-2xl font-bold">
                    ${Number(value).toLocaleString()}
                </h2>

            </div>

            <span
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${changeColor}`}
            >
                <ChangeIcon size={16} />
                {Math.abs(change)}%
            </span>
        </div>
    );
}
