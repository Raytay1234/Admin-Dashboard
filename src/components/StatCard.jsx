import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import CountUp from "react-countup";

export default function StatCard({ title, value, change }) {
    // Determine change styling
    let ChangeIcon = Minus;
    let changeColor = "text-gray-400 bg-gray-800";

    if (change > 0) {
        ChangeIcon = ArrowUp;
        changeColor = "text-green-400 bg-gray-800";
    } else if (change < 0) {
        ChangeIcon = ArrowDown;
        changeColor = "text-red-400 bg-gray-800";
    }

    return (
        <div className="p-6 rounded-xl flex justify-between items-center
      shadow-md bg-gray-900 text-gray-100 transition
      hover:bg-gray-800"
        >
            <div>
                <p className="text-gray-400">{title}</p>
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
