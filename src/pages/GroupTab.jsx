import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GroupTab.css'

function GroupTab() {
    const navigate = useNavigate();

    const handleProgram1 = () => {
        navigate('/forum/arcteryx');
    };

    const handleProgram2 = () => {
        navigate('/forum/strategic-partnerships');
    };

    const handleProgram3 = () => {
        navigate('/forum/participatory-grantmaking');
    };

    return (
        <div className="group-tab">
            <div className="image-banner">
                <img src="./events/forum.webp" alt="Forum Banner" />
                <h2 className="banner-title">FORUMS</h2>
            </div>
            <div className="content-container">
            <h2>Select a group to communicate with!</h2>
            <div className="button-container">
                <div className="button-item">
                    <button className="program-button" onClick={handleProgram1}>
                        Arc'teryx Community Grant Program
                    </button>
                    <img src="./events/grant.png" alt="" />
                </div>
                <div className="button-item">
                    <button className="program-button" onClick={handleProgram2}>
                        Strategic Partnerships Program
                    </button>
                    <img src=".\events\Strategic Partnerships Program.png" alt="" />
                </div>
                <div className="button-item">
                    <button className="program-button" onClick={handleProgram3}>
                        Participatory Grantmaking Program
                    </button>
                    <img src="events\Participatory Grantmaking Program.png" alt="" />
                </div>
            </div>
            </div>
        </div>
    );
}

export default GroupTab; 