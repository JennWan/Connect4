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
                    <img src="" alt="" />
                </div>
                <div className="button-item">
                    <button className="program-button" onClick={handleProgram3}>
                        Participatory Grantmaking Program
                    </button>
                    <img src="" alt="" />
                </div>
            </div>
        </div>
    );
}

export default GroupTab; 