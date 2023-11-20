import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "./EnvironmentPage.css";

import {
  Chart,
  LinearScale,
  CategoryScale,
  BarElement,
  Legend,
  Tooltip,
} from "chart.js";
Chart.register(LinearScale, CategoryScale, BarElement, Legend, Tooltip);

const EnvironmentMonitor = () => {
  const [chartData, setChartData] = useState([
    {
      label: "Temperature",
      id: "Temperature",
      data: [],
      average: 0,
      colorSet: { r: 150, g: 50, b: 150 },
    },
    {
      label: "Humidity",
      id: "Humidity",
      data: [],
      average: 0,
      colorSet: { r: 52, g: 203, b: 219 },
    },
    {
      label: "Pressure",
      id: "Pressure",
      data: [],
      average: 0,
      colorSet: { r: 52, g: 50, b: 219 },
    },
    {
      label: "Vibration",
      id: "Vibration",
      data: [],
      average: 0,
      colorSet: { r: 200, g: 152, b: 30 },
    },
    {
      label: "Chemical Concentration",
      id: "Chemical_Concentration",
      data: [],
      average: 0,
      colorSet: { r: 52, g: 152, b: 10 },
    },
    {
      label: "Noise",
      id: "Noise",
      data: [],
      average: 0,
      colorSet: { r: 52, g: 152, b: 219 },
    },
  ]);

  useEffect(() => {
    const generateFakeData = () => {
      let sum = 0;
      return Array.from({ length: 10 }, (_, i) => {
        const value = Math.floor(Math.random() * (80 - 20 + 1) + 20);
        sum += value;
        return value;
      });
    };

    const updatedChartData = chartData.map((dataItem) => {
      const data = generateFakeData();
      const average = data.reduce((acc, value) => acc + value, 0) / data.length;

      return {
        ...dataItem,
        data,
        average,
      };
    });

    setChartData(updatedChartData);
  }, []);

  return (
    <div className="env-body">
      <h1 className="env-title">環境監控</h1>
      <div className="data-container">
        {chartData.map((data) => (
          <div key={data.id} className="data-card">
            <h2>{data.label}</h2>
            <p>平均值: {data.average?.toFixed(2)}</p>
            <Bar
              data={{
                labels: Array.from({ length: 10 }, (_, i) =>
                  (i + 1).toString()
                ),
                datasets: [
                  {
                    label: `${data.label}`,
                    data: data.data,
                    backgroundColor: `rgba(${data.colorSet.r}, ${data.colorSet.g}, ${data.colorSet.b}, 0.5)`,
                    borderColor: `rgba(${data.colorSet.r}, ${data.colorSet.g}, ${data.colorSet.b}, 1)`,
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnvironmentMonitor;
