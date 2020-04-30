import React from 'react';
import {Link} from 'react-router-dom';

const Dashboard = () => {
    return (
        <div class="container">
            Dashboard
                <div class="fixed-action-btn container">
                     <Link to="/surveys/new" class="btn-floating btn-large red">
                        <i class="large material-icons">add</i>
                    </Link>
                </div>
        </div>  
      )
};

export default Dashboard;