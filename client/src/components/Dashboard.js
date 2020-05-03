import React from 'react';
import {Link} from 'react-router-dom';

const Dashboard = () => {
    return (
        <div class="container">
            Dashboard
                <div className="fixed-action-btn container">
                     <Link to="/surveys/new" className="btn-floating btn-large red">
                        <i className="large material-icons">add</i>
                    </Link>
                </div>
        </div>  
      )
};

export default Dashboard;