import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectList, loginSuccess } from '../slices/user_slice';
// import { FaUserCircle } from "react-icons/fa";
import MyButton from './MyButton';
import { useNavigate } from 'react-router-dom'
import { Image } from "antd";
import userImage from '../assets/user.png'
import loginImage from '../assets/loginscreen.jpg'
import financeImage from '../assets/finance_tracker.png'
const Login = () => {
    const dispatch = useDispatch();
    const getuserList = useSelector(selectList);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (!email || !password) {
            setError("Email and Password is mandatory!");
        } else {
            const user = getuserList.find(
                (user) => user.email === email && user.password === password
            )

            if (!user) {
                setError('Email or Password is invalid')
            } else {
                dispatch(loginSuccess());
                navigate('/home')
            }

        }
    }

    const validateEmail = (e) => {
        const email = e.target.value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    }

    return (
        <section style={{ backgroundImage: `url(${loginImage})`, backgroundSize: 'cover', height: '100vh', backgroundRepeat: 'no-repeat' }}>
            <div style={styles.container}>
                <div style={{ padding: 40, margin: 40 }}>
                    <Image src={financeImage} alt="finance_image" width={650} height={700} style={{ userSelect: 'none', pointerEvents: 'none' }}
                        onContextMenu={(e) => e.preventDefault()}
                        draggable="false" />
                </div>
                <div style={styles.form}>
                    <h1 style={{ textAlign: 'center', color: "#081c15" }}>Login</h1>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {/* <FaUserCircle style={{ width: 50, height: 50 }} /> */}
                        <Image src={userImage} alt="User" width={100} height={100} />
                    </div>
                    <div>
                        <p style={styles.text}>Email *</p>
                    </div>
                    <div style={styles.fieldStyle}>
                        <input style={{ ...styles.input, borderColor: emailError ? "red" : "black" }} type="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={validateEmail} />
                    </div>
                    <div>
                        <p style={styles.text}>Password *</p>
                    </div>
                    <div style={styles.fieldStyle}>
                        <input style={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {error && <div style={styles.error}>{error}</div>}
                    <div style={{ width: '100', textAlign: 'center' }}>
                        <MyButton onClick={handleSubmit} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <p>Email: abc@gmail.com</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: -30 }}>
                        <p>Password: 1234</p>
                        {/* <p><u>Register
                        </u></p> */}
                    </div>
                </div>

            </div>
        </section>
    )
}

const styles = {
    container: {
        display: 'flex',
        // justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100vh', // to center vertically
        paddingLeft: 40,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '500px',
        borderRadius: '10px',
        borderWidth: '1px',
        borderStyle: 'solid',
        padding: 50,
        backgroundColor: 'white',
        height: 550
    },
    fieldStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
    },
    text: {
        marginRight: '10px'
    },
    error: {
        color: 'red',
        paddingBottom: 10
    },
    input: {
        flex: 1,
        padding: '10px',
        borderRadius: '10px',
        borderWidth: '1px'
    },
};

export default Login