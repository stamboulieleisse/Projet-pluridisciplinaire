import './newrequest.css';

function Newrequest() {

    return (
        <div className="newrequest">
            <div className="container">

                <div className='top'>
                    <img src="" alt="" className="top-image" />
                    <h2 className="top-title"></h2>
                    <button className="top-button"></button>
                </div>

                <div className="teacher-swap">
                    <p className="teacher-swap-label">Teacher swapped with :</p>
                    <div className="teacher-swap-input">
                        <img src="" alt="" className="teacher-swap-image" />
                        <input type="text" id="teacher-swap-text" />
                    </div>
                </div>

                <div className="submission-date">
                    <p className="submission-date-label">Submission date :</p>
                    <div className="submission-date-input">
                        <img src="" alt="" className="submission-date-image" />
                        <input type="date" id="submission-date-picker" />
                    </div>
                </div>

                <div className="description">
                    <p className="description-label">Description</p>
                    <input type="text" id="description-text" />
                </div>

                <ul className="details-list">
                    <li className="details-item">Class Details</li>
                    <li className="details-item">Additional Details</li>
                </ul>

                <div className="indicator"></div>

                <hr />
                <button className='submit' id="submit-button">Make request</button>
            </div>
        </div>
    );
}

export default Newrequest;

