import React from 'react';
import './HelpCenter.css';

const HelpCenter = () => {
    return (
        <div className="help-center">
            <div className="help-center-header">
                <h2>Help Center</h2>
                <i className="far fa-question-circle"></i>
            </div>
            
            <div className="help-options">
                <button className="help-option">
                    <span>Contact Admin</span>
                </button>
                
                <button className="help-option">
                    <span>FAQs</span>
                </button>
                
                <button className="help-option">
                    <span>Suggest an Improvement</span>
                </button>
            </div>
        </div>
    );
};

export default HelpCenter; 