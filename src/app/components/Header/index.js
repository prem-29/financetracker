import React, { useState, useEffect } from 'react'
import './styles.css'
import userImage from '../../assets/profile.png'
import { Button, Typography } from 'antd'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../slices/user_slice';
const { Text } = Typography;

function Header() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userName, setUserName] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.setItem('isAuthenticate', 'false');
        dispatch(logout());
        navigate('/');
    }

    useEffect(() => {
        const userDetail = JSON.parse(localStorage.getItem("userdetail"));
        setUserName(userDetail.name.toUpperCase());
    }, []);

    return (
        <div className='navbarContainer'>
            {/* Title in the center */}
            <div className='title'>Finance Tracker</div>
            {/* Profile section with dropdown */}
            <div className='profileWrapper'>
                <div className='profileContainer' onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={userImage} alt="Profile" className='profilePic' />
                        <Text style={{ fontWeight: "600", fontFamily: "sans-serif", color: "white" }}>{userName}</Text>
                    </div>
                    {dropdownOpen && (
                        <div className='dropdownMenu'>
                            <button className='logoutButton' onClick={onLogout}>Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header