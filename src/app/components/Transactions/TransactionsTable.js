import React, { useState } from 'react';
import { Table, Select, Radio } from 'antd';
import DatePicker from "react-datepicker";
import PieChart from '../PieCharts/PieChart';
import './styles.css'

import "react-datepicker/dist/react-datepicker.css";

function TransactionsTable({ transactions, renderChart }) {
    const { Option } = Select;
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [sortKey, setSortKey] = useState("");
    const [startDate, setStartDate] = useState(new Date());

    const columns = [
        { title: 'Name', dataIndex: 'category_name', key: 'category_name', responsive: ['xs', 'sm', 'md', 'lg'] },
        { title: 'Amount', dataIndex: 'amount', key: 'amount', responsive: ['xs', 'sm', 'md', 'lg'] },
        { title: 'Tag', dataIndex: 'account_name', key: 'account_name', responsive: ['xs', 'sm', 'md', 'lg'] },
        { title: 'Type', dataIndex: 'type', key: 'type', responsive: ['xs', 'sm', 'md', 'lg'] },
        {
            title: 'Date', dataIndex: 'date', key: 'date', render: (date) => {
                const d = new Date(date);
                return d.toLocaleDateString('en-GB'); // formats as DD/MM/YYYY
            },
            responsive: ['xs', 'sm', 'md', 'lg']
        },
    ];

    const filteredTransaction = transactions.filter((item) => {
        const matchesSearch = item?.category_name
            ?.toLowerCase()
            .includes(search?.toLowerCase());

        const matchesType = typeFilter ? item.type === typeFilter : true;

        const itemDate = new Date(item.date);
        const matchesMonthYear =
            itemDate.getMonth() === startDate.getMonth() &&
            itemDate.getFullYear() === startDate.getFullYear();

        return matchesSearch && matchesType && matchesMonthYear;
    });

    const sortedTransaction = filteredTransaction.sort((a, b) => {
        if (sortKey === "date") {
            return new Date(a.date) - new Date(b.date);
        } else if (sortKey === "amount") {
            return parseFloat(a.amount) - parseFloat(b.amount);
        } else {
            return 0;
        }
    });

    const dataSource = sortedTransaction.map((item, index) => ({
        ...item,
        key: index,
    }));

    return (
        <div style={{ width: '100%' }}>
            <div className='search-style'>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by Name"
                    style={{ borderRadius: '5px', border: '1px solid #d9d9d9', padding: '0.5rem', flex: 4 }}
                />
                <div style={{ flex: 4, padding: '10px' }}></div>
                <Select
                    // className="select-input"
                    onChange={(value) => setTypeFilter(value)}
                    value={typeFilter}
                    placeholder="Filter by Type"
                    style={{ flex: 4 }}
                >
                    <Option value="">All</Option>
                    <Option value="Income">Income</Option>
                    <Option value="Expense">Expense</Option>
                </Select>
            </div>

            <div className="my-table">
                <div
                    className='trans-head'
                >
                    <div style={{ flex: 2, padding: '10px 30px' }}>
                        <h2>My Transactions</h2>
                    </div>
                    <div style={{ flex: 3 }}>
                        <Radio.Group className="input-radio" onChange={(e) => setSortKey(e.target.value)}>
                            <Radio.Button value="">No Sort</Radio.Button>
                            <Radio.Button value="date">Sort by Date</Radio.Button>
                            <Radio.Button value="amount">Sort by Amount</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div style={{ flex: 2 }}>
                        <DatePicker
                            showIcon
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            className="calendar-input"
                            dateFormat="MMMM-yyyy"
                            showMonthYearPicker
                            showFullMonthYearPicker
                        />
                    </div>
                </div>
                <div className='transTable'>
                    <Table dataSource={dataSource} columns={columns} pagination={{
                        pageSize: 10
                    }} />
                </div>
            </div>
            <div className='chart-style'>
                <div style={{ flex: 2 }}>
                    {window.innerWidth > 768 && renderChart && renderChart(dataSource)}
                </div>
                <div style={{ flex: 1 }}>
                    <PieChart transactions={dataSource} />
                </div>
            </div>
        </div>
    );
}

export default TransactionsTable;
