import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import { Sparklines, SparklinesLine } from "react-sparklines";

export default function StatCard({
  title,
  value,
  change,
  type = "currency",
  sparklineData = [],
}) {
  // Trend logic
  let ChangeIcon = Minus;
  let changeColor = "text-gray-400";
  let sparkColor = "#6B7280"; // default gray

  if (typeof change === "number") {
    if (change > 0) {
      ChangeIcon = ArrowUp;
      changeColor = "text-green-400";
      sparkColor = "#10B981";
    } else if (change < 0) {
      ChangeIcon = ArrowDown;
      changeColor = "text-red-400";
      sparkColor = "#EF4444";
    }
  }

  const formattedValue =
    type === "currency"
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(value || 0)
      : (value || 0).toLocaleString();

  return (
    <div className="group p-5 rounded-2xl bg-gray-900/70 backdrop-blur border border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
      
      {/* TOP */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <h2 className="text-2xl font-semibold mt-1 text-white tracking-tight">
            {formattedValue}
          </h2>
        </div>

        {/* CHANGE BADGE */}
        {typeof change === "number" && (
          <div
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-800 ${changeColor}`}
          >
            <ChangeIcon size={14} />
            {Math.abs(change).toFixed(1)}%
          </div>
        )}
      </div>

      {/* BOTTOM */}
      <div className="mt-4 flex items-center justify-between">
        {/* TREND TEXT */}
        {typeof change === "number" && (
          <p className="text-xs text-gray-500">
            {change > 0
              ? "Growth from last period"
              : change < 0
              ? "Decline from last period"
              : "No change"}
          </p>
        )}

        {/* SPARKLINE */}
        {sparklineData.length > 0 && (
          <div className="w-24 h-8">
            <Sparklines data={sparklineData}>
              <SparklinesLine
                color={sparkColor}
                style={{ strokeWidth: 2, fill: "none" }}
              />
            </Sparklines>
          </div>
        )}
      </div>
    </div>
  );
}