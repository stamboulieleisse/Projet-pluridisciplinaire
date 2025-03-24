import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/Group 1.png';

const Navbar = () => {
    const location = useLocation();
    const [searchFocused, setSearchFocused] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'swap_request',
            message: 'New swap request from Dr. Smith',
            time: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
            read: true
        },
        {
            id: 2,
            type: 'approval',
            message: 'Your swap request was approved',
            time: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
            read: false
        },
        {
            id: 3,
            type: 'reminder',
            message: 'Upcoming class swap in 1 hour',
            time: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
            read: false
        }
    ]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [lastActive, setLastActive] = useState(new Date());
    const [userStatus, setUserStatus] = useState('online');

    // Update current time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Update user status based on activity
    useEffect(() => {
        const activityTimer = setInterval(() => {
            const inactiveTime = new Date() - lastActive;
            if (inactiveTime > 5 * 60 * 1000) { // 5 minutes
                setUserStatus('away');
            }
        }, 60000);

        const handleActivity = () => {
            setLastActive(new Date());
            setUserStatus('online');
        };

        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keypress', handleActivity);

        return () => {
            clearInterval(activityTimer);
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keypress', handleActivity);
        };
    }, [lastActive]);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const getTimeAgo = (date) => {
        const seconds = Math.floor((new Date() - date) / 1000);
        
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + ' years ago';
        
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + ' months ago';
        
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + ' days ago';
        
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + ' hours ago';
        
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + ' minutes ago';
        
        return 'just now';
    };

    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/" className="logo-container">
                    <img src={logo} alt="Scope Logo" className="logo" />
                </Link>
                <div className="nav-links">
                    <Link to="/home" className={`nav-link ${location.pathname === '/home' ? 'active' : ''}`}>
                        <i className="fas fa-home"></i>
                        <span>Home</span>
                    </Link>
                    <Link to="/pending-requests" className={`nav-link ${location.pathname === '/pending-requests' ? 'active' : ''}`}>
                        <i className="fas fa-clock"></i>
                        <span>Pending Requests</span>
                        <span className="badge">2</span>
                    </Link>
                    <Link to="/incoming-requests" className={`nav-link ${location.pathname === '/incoming-requests' ? 'active' : ''}`}>
                        <i className="fas fa-inbox"></i>
                        <span>Incoming Requests</span>
                        <span className="badge">3</span>
                    </Link>
                    <Link to="/time-swap" className={`nav-link ${location.pathname === '/time-swap' ? 'active' : ''}`}>
                        <i className="fas fa-exchange-alt"></i>
                        <span>Time Swap</span>
                    </Link>
                </div>
            </div>
            <div className="nav-right">
                <div className="current-time">
                    <i className="far fa-clock"></i>
                    <span>{formatTime(currentTime)}</span>
                </div>
                <div className={`search-container ${searchFocused ? 'focused' : ''}`}>
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="search-input"
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                    />
                    <button className="search-btn">
                        <i className="fas fa-search"></i>
                    </button>
                </div>
                <div className="nav-icons">
                    <button className="icon-btn tooltip-container">
                        <i className="far fa-question-circle"></i>
                        <span className="tooltip">Help</span>
                    </button>
                    <div className="notification-container">
                        <button 
                            className="icon-btn notification-btn tooltip-container"
                            onClick={() => setShowNotifications(!showNotifications)}
                        >
                            <i className="far fa-bell"></i>
                            {notifications.filter(n => !n.read).length > 0 && (
                                <span className="notification-badge">
                                    {notifications.filter(n => !n.read).length}
                                </span>
                            )}
                            <span className="tooltip">Notifications</span>
                        </button>
                        {showNotifications && (
                            <div className="notifications-menu">
                                <div className="notifications-header">
                                    <h3>Notifications</h3>
                                    <button className="mark-all-read">Mark all as read</button>
                                </div>
                                <div className="notifications-list">
                                    {notifications.map(notification => (
                                        <div key={notification.id} className={`notification-item ${notification.read ? 'read' : ''}`}>
                                            <div className={`notification-icon ${notification.type}`}>
                                                <i className={`fas ${
                                                    notification.type === 'swap_request' ? 'fa-exchange-alt' :
                                                    notification.type === 'approval' ? 'fa-check' : 'fa-clock'
                                                }`}></i>
                                            </div>
                                            <div className="notification-content">
                                                <p>{notification.message}</p>
                                                <span className="notification-time">{getTimeAgo(notification.time)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="profile-menu-container">
                        <button 
                            className="profile-btn"
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                        >
                            <img src="https://via.placeholder.com/32" alt="Profile" className="profile-img" />
                            <span className={`profile-status ${userStatus}`}></span>
                        </button>
                        {showProfileMenu && (
                            <div className="profile-menu">
                                <div className="profile-header">
                                    <img src="https://via.placeholder.com/32" alt="Profile" />
                                    <div className="profile-info">
                                        <h4>John Doe</h4>
                                        <p>Professor</p>
                                        <span className={`status-text ${userStatus}`}>
                                            <i className="fas fa-circle"></i>
                                            {userStatus.charAt(0).toUpperCase() + userStatus.slice(1)}
                                        </span>
                                    </div>
                                </div>
                                <div className="menu-items">
                                    <a href="#" className="menu-item">
                                        <i className="fas fa-user"></i>
                                        <span>My Profile</span>
                                    </a>
                                    <a href="#" className="menu-item">
                                        <i className="fas fa-cog"></i>
                                        <span>Settings</span>
                                    </a>
                                    <div className="last-active">
                                        <small>Last active: {getTimeAgo(lastActive)}</small>
                                    </div>
                                    <a href="#" className="menu-item">
                                        <i className="fas fa-sign-out-alt"></i>
                                        <span>Logout</span>
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 