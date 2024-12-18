import React, { useState } from 'react'
import Header from '../Header'
import Cards from '../Cards'
import AddIncome from '../Modals/AddIncome'
import Expenses from '../Modals/Expenses'
import TransactionsTable from '../Transactions/TransactionsTable'
import Charts from '../Charts/Charts'
import NoTransactions from '../../assets/NoTransactions'
import './styles.css'


function Dashboard() {
    const [incomeVisible, setIncomeVisible] = useState(false);
    const [expenseVisible, setExpenseVisible] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [incomeTotal, setIncomeTotal] = useState(0);
    const [expenseTotal, setExpenseTotal] = useState(0);
    const [balance, setBalance] = useState(0);

    const handleIncomeVisible = () => {
        setIncomeVisible(true);
    }
    const handleIncomeClose = () => {
        setIncomeVisible(false);
    }
    const handleExpenseVisible = () => {
        setExpenseVisible(true);
    }
    const handleExpenseClose = () => {
        setExpenseVisible(false);
    }
    const calculateBalance = (newIncomeTotal, newExpensesTotal) => {
        return newIncomeTotal - newExpensesTotal;
    };
    const onFinish = (values, type) => {
        let newTransaction;
        if (type === 'Income') {
            newTransaction = {
                type: type,
                date: values.date.format("YYYY-MM-DD"),
                amount: parseFloat(values.amount),
                tag: values.tagIncome,
                name: values.incomeType
            }
            setIncomeTotal((prevIncomeTotal) => {
                const updatedIncome = prevIncomeTotal + parseFloat(values.amount);
                setBalance(calculateBalance(updatedIncome, expenseTotal)); // Update balance
                return updatedIncome;
            });
            setIncomeVisible(false);
        } else {
            newTransaction = {
                type: type,
                date: values.date.format("YYYY-MM-DD"),
                amount: parseFloat(values.amount),
                tag: values.tagExpenses,
                name: values.expneses
            }
            setExpenseTotal((prevExpensesTotal) => {
                const updatedExpenses = prevExpensesTotal + parseFloat(values.amount);
                setBalance(calculateBalance(incomeTotal, updatedExpenses)); // Update balance
                return updatedExpenses;
            });
            setExpenseVisible(false);
        }
        setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
    }

    return (
        <div>
            <Header />
            <Cards showIncomeModal={handleIncomeVisible} showExpenseModal={handleExpenseVisible} income={incomeTotal} expenses={expenseTotal} balance={balance} />
            <AddIncome isIncomeVisible={incomeVisible} handleIncomeCancel={handleIncomeClose} onFinish={onFinish} />
            <Expenses isExpenseVisible={expenseVisible} handleExpenseCancel={handleExpenseClose} onFinish={onFinish} />
            {balance ? (<><TransactionsTable transactions={transactions} />
                <Charts transactions={transactions} /> </>) : <div style={{ display: 'flex', justifyContent: 'center' }}><div><div className='noTransStyle'><NoTransactions /></div>
                    <p style={{ padding: 25, margin: 10 }}>You Have No Transactions Currently</p></div></div>}
        </div>
    )
}

export default Dashboard