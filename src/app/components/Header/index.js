import React, { useState } from 'react'
import './styles.css'
import userImage from '../../assets/profile.png'
import { Button } from 'antd'

function Header({ showAccountModal, showCategoryModal }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className='navbarContainer'>
            {/* Title in the center */}
            <div className='title'>Finance Tracker</div>
            <div>
                <Button type='primary' className='btn_class' onClick={showAccountModal}>Add Account</Button>
            </div>
            <div style={{ padding: 10 }}>
                <Button type='primary' className='btn_class' onClick={showCategoryModal}>Add Category</Button>
            </div>
            {/* Profile section with dropdown */}
            <div className='profileContainer' onClick={() => setDropdownOpen(!dropdownOpen)}>
                <img src={userImage} alt="Profile" className='profilePic' />
                {dropdownOpen && (
                    <div className='dropdownMenu'>
                        <button className='logoutButton'>Logout</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header