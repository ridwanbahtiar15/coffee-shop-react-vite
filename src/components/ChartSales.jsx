import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";

// defaults.global.tooltips.enabled = false;
// defaults.global.legend.position = "bottom";

Chart.defaults.font.size = 13;
Chart.defaults.font.weight = 500;
Chart.defaults.font.family = "Plus Jakarta Sans";

function ChartSales() {
  return (
    <Line
      data={{
        labels: [
          "16 Januari",
          "17 januari",
          "18 Januari",
          "19 Januari",
          "20 Januari",
          "21 Januari",
          "22 Januari",
          "23 Januari",
        ],
        datasets: [
          {
            label: "# of votes",
            data: [90, 100, 140, 150, 160, 140, 200, 220],
            backgroundColor: "#00A7001A",
            borderColor: "#00A700",
            borderWidth: 2,
            fill: true,
          },
        ],
      }}
      options={{
        tension: 0.4,
        pointStyle: false,
        plugins: {
          legend: false,
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            ticks: {
              callback: (value) => value + "c",
            },
            border: {
              dash: [10],
            },
          },
        },
      }}
      height={200}
      width={600}
    />
  );
}

export default ChartSales;
