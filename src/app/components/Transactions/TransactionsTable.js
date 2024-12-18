import React, { useState } from 'react';
import { Table, Select, Radio } from 'antd';

function TransactionsTable({ transactions }) {
    const { Option } = Select;
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [sortKey, setSortKey] = useState("");

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Amount', dataIndex: 'amount', key: 'amount' },
        { title: 'Tag', dataIndex: 'tag', key: 'tag' },
        { title: 'Type', dataIndex: 'type', key: 'type' },
        { title: 'Date', dataIndex: 'date', key: 'date' },
    ];

    const filteredTransaction = transactions.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) &&
        item.type.includes(typeFilter)
    );

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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 30px', gap: '5rem' }}>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by Name"
                    style={{ borderRadius: '5px', border: '1px solid #d9d9d9', padding: '0.5rem', flex: 6 }}
                />
                <Select
                    // className="select-input"
                    onChange={(value) => setTypeFilter(value)}
                    value={typeFilter}
                    placeholder="Filter by Type"
                    allowClear
                    style={{ flex: 3 }}
                >
                    <Option value="">All</Option>
                    <Option value="Income">Income</Option>
                    <Option value="Expenses">Expenses</Option>
                </Select>
            </div>
            <div className="my-table">
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        marginBottom: '1rem',
                    }}
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
                </div>
                <div style={{ padding: '0px 15px' }}>
                    <Table dataSource={dataSource} columns={columns} />
                </div>
            </div>
        </div>
    );
}

export default TransactionsTable;
