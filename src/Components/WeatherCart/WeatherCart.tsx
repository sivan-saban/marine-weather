import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import WaveModel from "../../Models/Model";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface WeatherChartProps {
  data: WaveModel;
}

const WeatherCart: React.FC<WeatherChartProps> = ({ data }) => {
  const dates = data.hourly.time.map((item :any) => {
    const dateObject = item;
    return dateObject;
  });

  const waves = data.hourly.wave_height.map((item: number) => item);

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: "Wave",
        data: waves,
        backgroundColor: ["rgb(153, 102, 255)"],
        borderColor: ["rgb(153, 102, 255)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="WeatherCart">
      <div className="bar">
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default WeatherCart;
