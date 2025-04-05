import React from 'react';
import { useNavigate } from 'react-router-dom';

function GroupTab() {
  const navigate = useNavigate();

  const handleProgram1 = () => {
    alert("Arc'teryx Community Grant Program");
    navigate('/forum/arcteryx');
  };

  const handleProgram2 = () => {
    alert("Strategic Partnerships Program");
    navigate('/forum/strategic-partnerships');
  };

  const handleProgram3 = () => {
    alert("Participatory Grantmaking Program");
    navigate('/forum/participatory-grantmaking');
  };
    
  return (
    <div className="group-tab">
      <div className="button-container">
        <button className="program-button" onClick={handleProgram1}>
          Arc'teryx Community Grant Program
        </button>
        <button className="program-button" onClick={handleProgram2}>
          Strategic Partnerships Program
        </button>
        <button className="program-button" onClick={handleProgram3}>
          Participatory Grantmaking Program
        </button>
      </div>
    </div>
  );
}

export default GroupTab; 