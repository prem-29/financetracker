import React from 'react';
import { Chart } from 'react-google-charts';

function Charts({ transactions }) {
    // Preprocessing the data
    const aggregatedData = transactions.reduce((acc, transaction) => {
        const { date, amount, type } = transaction;
        const existing = acc.find((entry) => entry.date === date);

        if (existing) {
            existing[type] += amount;
        } else {
            acc.push({
                date: date,
                Income: type === "Income" ? amount : 0,
                Expenses: type === "Expenses" ? amount : 0,
            });
        }
        return acc;
    }, []);

    // Prepare data for the chart
    const chartData =
        aggregatedData.length > 0
            ? [
                ["Date", "Income", "Expenses"],
                ...aggregatedData.map((entry) => [
                    new Date(entry.date),
                    entry.Income,
                    entry.Expenses,
                ]),
            ]
            : [["Date", "Income", "Expenses"], [new Date(), 0, 0]]; // Placeholder data for empty chart

    const options = {
        title: "Your Analytics",
        curveType: "function",
        legend: { position: "bottom" },
        hAxis: {
            title: "Date",
            format: "MMM dd, yyyy",
        },
        vAxis: {
            title: "Amount",
        },
    };

    return (
        <div>
            <Chart
                chartType="LineChart"
                width="80%"
                height="400px"
                data={chartData}
                options={options}
            />
        </div>
    );
}

export default Charts;
