import React, { useState } from 'react';
import './Home.css';
import Navbar from '../Navbar/Navbar';
import TeacherSchedule from '../TeacherSchedule/TeacherSchedule';
import QuickActions from '../QuickActions/QuickActions';
import BrowseRequests from '../BrowseRequests/BrowseRequests';
import HelpCenter from '../HelpCenter/HelpCenter';

const Home = () => {
    const [currentDate] = useState(new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }));

    return (
        <div className="home-container">
            <Navbar id='navbar' />
            <div className="main-content">
                <div className="left-section">
                    <div className="date-section">
                        <h2>{currentDate}</h2>
                    </div>
                    <div className="schedule-section">
                        <div className="schedule-header">
                            <h2>Teacher schedule</h2>
                            <button className="export-btn">Export Schedule</button>
                        </div>
                        <TeacherSchedule />
                    </div>
                    <div className="browse-section">
                        <div className="browse-header">
                            <h2>Browse requests</h2>
                            <a href="#" className="see-all">See all</a>
                        </div>
                        <BrowseRequests />
                    </div>
                </div>
                <div className="right-section">
                    <QuickActions />
                    <HelpCenter />
                </div>
            </div>
        </div>
    );
};

export default Home; 