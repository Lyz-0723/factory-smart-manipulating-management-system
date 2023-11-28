import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

import { get_environment_datas } from "../../../requests/Admin/data";
import Loading from "../../Common/Loading";
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
      id: "temperature",
      data: undefined,
      average: 0,
      colorSet: { r: 150, g: 50, b: 150 },
    },
    {
      label: "Humidity",
      id: "humidity",
      data: undefined,
      average: 0,
      colorSet: { r: 52, g: 203, b: 219 },
    },
    {
      label: "Pressure",
      id: "pressure",
      data: undefined,
      average: 0,
      colorSet: { r: 52, g: 50, b: 219 },
    },
    {
      label: "Vibration",
      id: "vibration",
      data: undefined,
      average: 0,
      colorSet: { r: 200, g: 152, b: 30 },
    },
    {
      label: "Chemical Concentration",
      id: "chemical_concentration",
      data: undefined,
      average: 0,
      colorSet: { r: 52, g: 152, b: 10 },
    },
    {
      label: "Noise",
      id: "noise",
      data: undefined,
      average: 0,
      colorSet: { r: 52, g: 152, b: 219 },
    },
  ]);

  useEffect(() => {
    const get_env_datas = async () => {
      const env_datas = await get_environment_datas();
      console.log("envdatas : ", env_datas);
      const updatedChartData = chartData.map((dataItem) => {
        const values = env_datas.map((entry) => entry[dataItem.id]);
        const average =
          values.reduce((acc, value) => acc + value, 0) / values.length;

        return {
          ...dataItem,
          data: values,
          average,
        };
      });

      setChartData(updatedChartData);
    };
    get_env_datas();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {chartData.every((data) => data.data !== undefined) && (
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
                    elements: {
                      bar: {
                        barPercentage: 0.8,
                        categoryPercentage: 0.7,
                      },
                    },
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {!chartData.every((data) => data.data !== undefined) && <Loading />}
    </>
  );
};

export default EnvironmentMonitor;
