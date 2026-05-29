"use client";

import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
  LabelList,
} from "recharts";
import styles from "./ChartBox.module.css";

const data = [
  { month: "فروردین", sales: 500 },
  { month: "اردیبهشت", sales: 620 },
  { month: "خرداد", sales: 400 },
  { month: "تیر", sales: 320 },
  { month: "مرداد", sales: 520 },
  { month: "شهریور", sales: 380 },
  { month: "مهر", sales: 450 },
  { month: "آبان", sales: 600 },
  { month: "آذر", sales: 550 },
  { month: "دی", sales: 480 },
  { month: "بهمن", sales: 700 },
  { month: "اسفند", sales: 850 },
];

function ChartBox() {
  return (
    <div className={styles["dashboard-card"]}>
      <div className={styles["dashboard-card-top"]}>
        <span className={styles["title"]}>نمودار فروش ماهانه</span>
        <img src="/icons/icon17.svg" alt="icon" />
      </div>

      <div style={{ width: "100%", height: 220, marginTop: "15px" }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 25, right: 10, left: 10, bottom: 5 }}>
            <Tooltip
              cursor={{ fill: "#f1f3f5" }}
              contentStyle={{
                borderRadius: "10px",
                border: "none",
                boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
                fontSize: "14px",
              }}
            />
            {/* نمایش نام ماه‌ها در پایین */}
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: "#666" }}
              dy={10}
            />

            <Bar dataKey="sales" radius={[4, 4, 4, 4]} barSize={20}>
              {/* نمایش عدد فروش بالای هر ستون */}
              <LabelList 
                dataKey="sales" 
                position="top" 
                fontSize={12} 
                fill="#444" 
                offset={10} 
              />
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === data.length - 1 ? "#831fc1" : "#d1c4e9"}
                  style={{ transition: "all 0.3s ease" }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ChartBox;




// "use client";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   ResponsiveContainer,
//   CartesianGrid,
//   Tooltip,
// } from "recharts";

// import styles from "./ChartBox.module.css";

// const data = [
//   { month: 0, sales: 500 },
//   { month: 1, sales: 620 },
//   { month: 2, sales: 400 },
//   { month: 3, sales: 320 },
//   { month: 4, sales: 520 },
//   { month: 5, sales: 380 },
//   { month: 6, sales: 490 },
//   { month: 7, sales: 800 },
// ];

// function ChartBox() {
//   return (
//     <div className={styles["dashboard-card"]}>
//       <div className={styles["dashboard-card-top"]}>
//         <span>نمودار فروش ماهانه</span>

//         <span>
//           <img src="/icons/icon17.svg" alt="icon17" />
//         </span>
//       </div>

//       <div style={{ width: "100%", height: 200 }}>
//         <ResponsiveContainer>
//           <BarChart data={data}>
//             <CartesianGrid strokeDasharray="3 3" vertical={false} />

//             <XAxis dataKey="month" />

//             <YAxis />

//             <Tooltip />

//             <Bar
//               dataKey="sales"
//               fill="#7b1fa2"
//               radius={[10, 10, 0, 0]}
//               barSize={28}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }

// export default ChartBox;
