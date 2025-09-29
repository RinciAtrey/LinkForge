import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  BarElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  Legend,
  Filler
);

const Graph = ({ graphData }) => {
  const labels = graphData?.map((item, i) => `${item.clickDate}`);
  const userPerDaya = graphData?.map((item) => item.count);

  //chart data
  const data = {
    labels:
     graphData.length > 0
    //  if no data
        ? labels
        : ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    datasets: [
      {
        label: "Total Clicks",
        data:
         graphData.length > 0
            ? userPerDaya
            : [1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1],
        backgroundColor:
         graphData.length > 0
            ? (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                gradient.addColorStop(0, "rgba(249,115,22,0.95)");
                gradient.addColorStop(0.6, "rgba(249,115,22,0.65)");
                gradient.addColorStop(1, "rgba(249,115,22,0.22)");
                return gradient;
              }
            : "rgba(249,115,22,0.08)",
        borderColor: "rgba(255,120,40,0.95)",
        pointBorderColor: "rgba(255,255,255,0.9)",
        fill: true,
        tension: 0.4,
        barThickness: 20,
        categoryPercentage: 1.5,
        barPercentage: 1.5,
      },
    ],
  };

  //chart options
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#E6EEF6",
        },
      },
      tooltip: {
        backgroundColor: "rgba(17,24,39,0.95)",
        titleColor: "#FFDDBA",
        bodyColor: "#E6EEF6",
        padding: 10,
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            if (Number.isInteger(value)) {
              return value.toString();
            }
            return "";
          },
          color: "#C9D1D9",
        },
        grid: {
          color: "rgba(255,255,255,0.03)",
          borderColor: "rgba(255,255,255,0.04)",
        },
        title: {
          display: true,
          text: "Number Of Clicks",
          font: {
            family: "Arial",
            size: 14,
            weight: "600",
          },
          color: "#AFC3D9",
        },
      },
      x: {
        beginAtZero: true,
        ticks: {
          color: "#C9D1D9",
        },
        grid: {
          color: "rgba(255,255,255,0.02)",
          borderColor: "rgba(255,255,255,0.04)",
        },
        title: {
          display: true,
          text: "Date",
          font: {
            family: "Arial",
            size: 14,
            weight: "600",
          },
          color: "#AFC3D9",
        },
      },
    },
  };

  return <Bar className="w-full" data={data} options={options}></Bar>;
};

export default Graph;
