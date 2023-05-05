import { render } from 'react-dom';
import React from 'react';
import BarChartActivity from './BarChartActivity';

function UserDashboard() {


    return (
        <div>
            <BarChartActivity id={12} endpoint={'-activity'} />
        </div>
    )
}

export default UserDashboard;