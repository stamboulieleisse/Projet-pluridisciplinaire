import React from 'react';
import './QuickActions.css';

const QuickActions = () => {
    const pendingRequests = [
        {
            id: 1,
            teacher: 'MR.Teacher',
            requestDate: '20-01-2025',
            currentSlot: 'Sunday 8:00 - 9:30 | Course 145 T',
            newSlot: 'Sunday 8:00 - 9:30 | Course 145 T',
            section: 'Section B ING.INFO'
        },
        {
            id: 2,
            teacher: 'MR.Teacher',
            requestDate: '20-01-2025',
            currentSlot: 'Sunday 8:00 - 9:30 | Course 145 T',
            newSlot: 'Sunday 8:00 - 9:30 | Course 145 T',
            section: 'Section B ING.INFO'
        }
    ];

    return (
        <div className="quick-actions">
            <div className="quick-actions-header">
                <h2>Quick Actions</h2>
                <a href="#" className="see-all">See All</a>
            </div>
            
            <div className="pending-requests">
                {pendingRequests.map(request => (
                    <div key={request.id} className="request-card">
                        <div className="request-header">
                            <div className="swap-icon">
                                <i className="fas fa-exchange-alt"></i>
                            </div>
                            <div className="request-info">
                                <h3>Swap with : {request.teacher}</h3>
                                <p className="request-date">Request Date: {request.requestDate}</p>
                            </div>
                        </div>
                        
                        <div className="request-details">
                            <div className="slot-info">
                                <p>Class to be swapped: {request.currentSlot}</p>
                                <p>Class to be swapped: {request.newSlot}</p>
                                <p>Students Affected: {request.section}</p>
                            </div>
                            
                            <div className="request-actions">
                                <button className="edit-btn">Edit Request</button>
                                <button className="delete-btn">Delete Request</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuickActions; 