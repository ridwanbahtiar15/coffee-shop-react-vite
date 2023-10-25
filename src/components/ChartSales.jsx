import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";

// defaults.global.tooltips.enabled = false;
// defaults.global.legend.position = "bottom";

Chart.defaults.font.size = 13;
Chart.defaults.font.weight = 500;
Chart.defaults.font.family = "Plus Jakarta Sans";

function ChartSales(props) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dateArr = [];
  const cupArr = [];
  // eslint-disable-next-line react/prop-types
  props.dateSales.forEach((e) => {
    const dateFormat = new Date(e.order_date);
    dateArr.push(
      `${dateFormat.getDate()} ${monthNames[dateFormat.getMonth() + 1]}`
    );
    cupArr.push(e.cup);
  });

  return (
    <Line
      data={{
        labels: dateArr,
        datasets: [
          {
            label: "# of votes",
            data: cupArr,
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
