import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faCog,
  faBell,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import Checkbox from "../../components/Dashboard/Checkbox"; // Adjust the import path as necessary

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Dashboard() {
  // Sample user data
  const user = {
    name: "Mzambiya Doe",
    role: "Store Owner",
    // You can add more fields like profile picture URL, etc.
  };

  // Sample data for daily sales graph
  const dailySalesData = {
    labels: ["9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"],
    datasets: [
      {
        label: "Daily Sales",
        data: [200, 450, 700, 850, 1000],
        fill: false,
        borderColor: "blue",
        tension: 0.1,
      },
    ],
  };

  // Sample data for revenue forecast graph
  const revenueForecastData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Revenue",
        data: [3000, 4500, 5000, 7000, 8500, 9000],
        fill: false,
        borderColor: "green",
        tension: 0.1,
      },
      {
        label: "Profit",
        data: [600, 1350, 1500, 2100, 2550, 3600], // Example: 20% - 40% of revenue
        fill: false,
        borderColor: "red",
        tension: 0.1,
      },
    ],
  };

  // Sample data for orders pie chart
  const ordersSourceData = {
    labels: ["Organic", "Facebook", "Instagram", "SEO"],
    datasets: [
      {
        label: "Order Sources",
        data: [100, 500, 150, 200], // Majority from Facebook
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  // Sample suggestions data
  const suggestions = [
    "Improve website UI",
    "Add more payment options",
    "Enhance customer support",
    "Launch marketing campaign",
  ];

  return (
    <div className="flex h-screen">
      {/* Side Menu */}

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-10 relative">
        <div className="absolute top-10 left-10 flex items-center">
          <div className="rounded-full h-12 w-12 bg-gray-300 mr-4"></div>{" "}
          {/* Placeholder for smaller profile picture */}
          <div>
            <h2 className="text-lg font-bold">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.role}</p>
          </div>
        </div>
        {/* Cards */}
        <div className="mt-20 space-y-4">
          {/* First Row of Cards */}
          <div className="flex space-x-4">
            <div className="bg-white rounded-lg shadow-md p-4 flex-1">
              {/* Daily Sales card */}
              <h3 className="text-lg font-bold mb-2">Daily Sales</h3>
              <p className="text-sm text-gray-700">
                Today's sales figure: R
                {
                  dailySalesData.datasets[0].data[
                    dailySalesData.datasets[0].data.length - 1
                  ]
                }
              </p>
              {/* Graph */}
              <div className="mt-4">
                <Line
                  data={dailySalesData}
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: "Amount (R)",
                          color: "black",
                          font: {
                            size: 14,
                            weight: "bold",
                            lineHeight: 1.2,
                          },
                        },
                        ticks: {
                          color: "black",
                          font: {
                            size: 12,
                            weight: "bold",
                          },
                        },
                      },
                      x: {
                        title: {
                          display: true,
                          text: "Time",
                          color: "black",
                          font: {
                            size: 14,
                            weight: "bold",
                            lineHeight: 1.2,
                          },
                        },
                        ticks: {
                          color: "black",
                          font: {
                            size: 10,
                            weight: "bold",
                          },
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 flex-1">
              {/* Suggestions card */}
              <h3 className="text-lg font-bold mb-2">Suggestions</h3>
              <div className="space-y-4">
                {suggestions.map((suggestion, index) => (
                  <Checkbox key={index} suggestion={suggestion} />
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 flex-1">
              {/* Best Performing Products card */}
              <h3 className="text-lg font-bold mb-2">
                Best Performing Products
              </h3>
              <div className="flex flex-col">
                <div className="border-b border-black py-2">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-700">Product D</p>
                    <p className="text-sm text-gray-700">50 units sold</p>
                  </div>
                </div>
                <div className="border-b border-black py-2">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-700">Product E</p>
                    <p className="text-sm text-gray-700">40 units sold</p>
                  </div>
                </div>
                <div className="border-b border-black py-2">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-700">Product F</p>
                    <p className="text-sm text-gray-700">30 units sold</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Row of Cards */}
          <div className="flex space-x-4">
            <div className="bg-white rounded-lg shadow-md p-4 flex-1">
              {/* Revenue Forecast Card */}
              <h3 className="text-lg font-bold mb-2">Revenue Forecast</h3>
              <div className="mt-4">
                <Line
                  data={revenueForecastData}
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: "Amount (R)",
                          color: "black",
                          font: {
                            size: 14,
                            weight: "bold",
                            lineHeight: 1.2,
                          },
                        },
                        ticks: {
                          color: "black",
                          font: {
                            size: 12,
                            weight: "bold",
                          },
                        },
                      },
                      x: {
                        title: {
                          display: true,
                          text: "Months",
                          color: "black",
                          font: {
                            size: 14,
                            weight: "bold",
                            lineHeight: 1.2,
                          },
                        },
                        ticks: {
                          color: "black",
                          font: {
                            size: 10,
                            weight: "bold",
                          },
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 flex-1">
              {/* Orders Source Card */}
              <h3 className="text-lg font-bold mb-2">Order Sources</h3>
              <div className="mt-4">
                <Pie
                  data={ordersSourceData}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: true,
                        position: "bottom",
                        labels: {
                          color: "black",
                          font: {
                            size: 12,
                            weight: "bold",
                          },
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
            {/* <div className="bg-white rounded-lg shadow-md p-4 flex-1">
              <h3 className="text-lg font-bold mb-2">Card 3</h3>
              <p className="text-sm text-gray-700">Content for Card 3</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
