import { Chart } from 'react-google-charts';
import React from 'react';

function PieChart({ transactions }) {
    // Preprocessing the data
    const expenseByCategory = transactions.reduce((acc, transaction) => {
        const { category_name, amount, type } = transaction;
        if (type === 'Expense') {
            acc[category_name] = (acc[category_name] || 0) + Number(amount);
        }
        return acc;
    }, []);

    // Prepare data for the chart
    const chartData = [
        ['Category', 'Amount'],
        ...Object.entries(expenseByCategory),
    ];

    const options = {
        title: 'Monthly Expenses',
        pieHole: 0.4, // if you want a donut chart; remove this for full pie
        is3D: false,
        chartArea: { width: '90%', height: '80%' },
        legend: { position: 'right' },
        sliceVisibilityThreshold: 0.02, // Show only slices >2%
    };

    return (
        <div>
            <Chart
                chartType="PieChart"
                width="100%"
                height="400px"
                data={chartData}
                options={options}
            />
        </div>
    );
}

export default PieChart