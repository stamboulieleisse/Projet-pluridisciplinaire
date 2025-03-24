import React from 'react';
import './BrowseRequests.css';

const BrowseRequests = () => {
    const requests = [
        {
            id: 1,
            teacher: {
                name: 'Teacher 1',
                image: 'https://via.placeholder.com/40',
                status: 'online'
            },
            yours: 'Sunday 8:00 - 9:30 | Course 145 T',
            with: 'Monday 8:00 - 9:30 | Course 313 T',
            date: '2 hours ago'
        },
        {
            id: 2,
            teacher: {
                name: 'Teacher 3',
                image: 'https://via.placeholder.com/40',
                status: 'offline'
            },
            yours: 'Sunday 8:00 - 9:30 | Course 145 T',
            with: 'Monday 8:00 - 9:30 | Course 313 T',
            date: '5 hours ago'
        }
    ];

    return (
        <div className="browse-requests-container">
            {requests.map(request => (
                <div key={request.id} className="request-item">
                    <div className="teacher-info">
                        <div className="teacher-image-container">
                            <img src={request.teacher.image} alt={request.teacher.name} className="teacher-image" />
                            <span className={`status-indicator ${request.teacher.status}`}></span>
                        </div>
                        <div className="teacher-details">
                            <div className="teacher-name">{request.teacher.name}</div>
                            <div className="request-time">{request.date}</div>
                        </div>
                        <div className="request-status">
                            <button className="action-btn accept" title="Accept Request">
                                <i className="fas fa-check"></i>
                            </button>
                            <button className="action-btn reject" title="Reject Request">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                    <div className="swap-details">
                        <div className="slot">
                            <span className="label">Yours:</span>
                            <span className="value">
                                <i className="far fa-clock"></i>
                                {request.yours}
                            </span>
                        </div>
                        <div className="slot">
                            <span className="label">With:</span>
                            <span className="value">
                                <i className="fas fa-exchange-alt"></i>
                                {request.with}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BrowseRequests; 