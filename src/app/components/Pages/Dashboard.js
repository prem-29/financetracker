import React, { useState, useEffect } from 'react'
import Header from '../Header'
import Cards from '../Cards'
import AddIncome from '../Modals/AddIncome'
import Expenses from '../Modals/Expenses'
import Account from '../Modals/Account'
import Category from '../Modals/Category'
import TransactionsTable from '../Transactions/TransactionsTable'
import NoTransactions from '../../assets/NoTransactions'
import Charts from '../Charts/Charts'
import './styles.css'
import axios from 'axios'


function Dashboard() {
    const [incomeVisible, setIncomeVisible] = useState(false);
    const [expenseVisible, setExpenseVisible] = useState(false);
    const [accountVisible, setAccountVisible] = useState(false);
    const [categoryVisible, setCategoryVisible] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [incomeTotal, setIncomeTotal] = useState(0);
    const [expenseTotal, setExpenseTotal] = useState(0);
    const [balance, setBalance] = useState(0);
    const [accountData, setAccountData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        getIncome();
        getExpenses();
        getCategory();
        getAccountlist();
        getTransactionlist();
    }, [])

    useEffect(() => {
        setBalance(calculateBalance(incomeTotal, expenseTotal));
    }, [incomeTotal, expenseTotal]);

    const getIncome = async () => {
        const userDetail = JSON.parse(localStorage.getItem("userdetail"));
        const token = localStorage.getItem("token");
        try {
            // Replace with your API endpoint
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/income?user_id=${userDetail.id}`, {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
            });
            if (response.data.success) {
                const data = response.data.incomeData;
                let incomeTotal = data.reduce((sum, item) => sum + Number(item.amount), 0);
                setIncomeTotal(incomeTotal);
            } else {
                alert('Try again');
            }
        } catch (error) {
            alert('An error occurred while get income data. Please try again.', error);
        }
    }
    const getExpenses = async () => {
        const userDetail = JSON.parse(localStorage.getItem("userdetail"));
        const token = localStorage.getItem("token");
        try {
            // Replace with your API endpoint
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/expenses?user_id=${userDetail.id}`, {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
            });
            if (response.data.success) {
                const data = response.data.expensesData;
                let expenseTotal = data.reduce((sum, item) => sum + Number(item.amount), 0);
                setExpenseTotal(expenseTotal)
            } else {
                alert('Try again');
            }
        } catch (error) {
            alert('An error occurred while get expenses data. Please try again.', error);
        }
    }

    const getCategory = async () => {
        const userDetail = JSON.parse(localStorage.getItem("userdetail"));
        const token = localStorage.getItem("token");
        try {
            // Replace with your API endpoint
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/category?user_id=${userDetail.id}`, {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
            });
            if (response.data.success) {
                const data = response?.data?.categoryGetData;
                setCategoryData(data);
            } else {
                alert('Try again');
            }
        } catch (error) {
            alert('An error occurred while get category data. Please try again.', error);
        }
    }

    const getAccountlist = async () => {
        const userDetail = JSON.parse(localStorage.getItem('userdetail'));
        const token = localStorage.getItem('token');

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/account?user_id=${userDetail.id}`, {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
            });
            if (res.data.success) {
                setAccountData(res?.data?.accountGetData)
            }
        } catch (error) {
            alert("message:", error);
        }
    }

    const getTransactionlist = async () => {
        const userDetail = JSON.parse(localStorage.getItem('userdetail'));
        const token = localStorage.getItem('token');

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/transactions?user_id=${userDetail.id}`, {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
            });
            if (res.data.success) {
                setTransactions(res?.data?.getTransData)
            }
        } catch (error) {
            alert("message:", error);
        }
    }


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
    const handleAccountVisible = () => {
        setAccountVisible(true);
    }
    const handleAccountClose = () => {
        setAccountVisible(false);
    }
    const handleCategoryVisible = () => {
        setCategoryVisible(true);
    }
    const handleCategoryClose = () => {
        setCategoryVisible(false);
    }
    const calculateBalance = (newIncomeTotal, newExpensesTotal) => {
        return newIncomeTotal - newExpensesTotal;
    };
    const onAddAccount = async (values) => {
        const userDetail = JSON.parse(localStorage.getItem("userdetail"));
        const token = localStorage.getItem('token');
        let data = {
            account_name: values.account,
            user_id: userDetail.id
        }
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/api/account/`,
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (response.data.success) {
                setAccountVisible(false);
                getAccountlist();
            } else {
                alert('Try again');
            }
        } catch (error) {
            console.log(error, "error")
            alert('An error occurred while adding account. Please try again.', error);
        }
    }
    const onAddCategory = async (values) => {
        const userDetail = JSON.parse(localStorage.getItem("userdetail"));
        const token = localStorage.getItem('token');
        let data = {
            category_name: values.category,
            type: values.type,
            user_id: userDetail.id
        }
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/api/category/`,
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (response.data.success) {
                setCategoryVisible(false);
                getCategory();
            } else {
                alert('Try again');
            }
        } catch (error) {
            console.log(error, "error")
            alert('An error occurred while adding account. Please try again.', error);
        }
    }
    const onFinish = async (values, type) => {
        const userDetail = JSON.parse(localStorage.getItem("userdetail"));
        const token = localStorage.getItem('token');
        let newTransaction;
        if (type === 'Income') {
            newTransaction = {
                type: type,
                date: values.date.format("YYYY-MM-DD"),
                amount: parseFloat(values.amount),
                account_id: values.account,
                category_id: values.category,
                notes: values.notes,
                user_id: userDetail.id
            }
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_API_BASE_URL}/api/income/`,
                    newTransaction,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );

                if (response.data.success) {
                    setIncomeVisible(false);
                    getIncome();
                } else {
                    alert('Try again');
                }
            } catch (error) {
                alert('An error occurred while adding income. Please try again.', error);
            }
        } else {
            newTransaction = {
                type: type,
                date: values.date.format("YYYY-MM-DD"),
                amount: parseFloat(values.amount),
                account_id: values.account,
                category_id: values.category,
                notes: values.notes,
                user_id: userDetail.id
            }
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_API_BASE_URL}/api/expenses/`,
                    newTransaction,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                if (response.data.success) {
                    setExpenseVisible(false);
                    getExpenses();
                } else {
                    alert('Try again');
                }
            } catch (error) {
                alert('An error occurred while adding expense. Please try again.', error);
            }
        }
        getTransactionlist();
    }

    return (
        <div>
            <Header showAccountModal={handleAccountVisible} showCategoryModal={handleCategoryVisible} />
            <Cards showIncomeModal={handleIncomeVisible} showExpenseModal={handleExpenseVisible} income={incomeTotal} expenses={expenseTotal} balance={balance} />
            <AddIncome isIncomeVisible={incomeVisible} handleIncomeCancel={handleIncomeClose} onFinish={onFinish} accountData={accountData} categoryData={categoryData} />
            <Expenses isExpenseVisible={expenseVisible} handleExpenseCancel={handleExpenseClose} onFinish={onFinish} accountData={accountData} categoryData={categoryData} />
            <Account isAccountVisible={accountVisible} handleAccountCancel={handleAccountClose} onFinishAccount={onAddAccount} />
            <Category isCategoryVisible={categoryVisible} handleCategoryCancel={handleCategoryClose} onFinishCategory={onAddCategory} />
            {balance ? (<><TransactionsTable transactions={transactions} renderChart={(transactions) => <Charts transactions={transactions} />} /> </>) : <div style={{ display: 'flex', justifyContent: 'center' }}><div><div className='noTransStyle'><NoTransactions /></div>
                <p style={{ padding: 25, margin: 10 }}>You Have No Transactions Currently</p></div></div>}
        </div>
    )
}

export default Dashboard