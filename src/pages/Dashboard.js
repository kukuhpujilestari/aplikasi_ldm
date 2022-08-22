import React from 'react';

import PageJob from './dashboard/PageJob';
import PageCount from './dashboard/PageCount';

const Dashboard = () => {
    return (
        <main>
            <div className="container-fluid px-4">
                <br/>
                <div className="row">
                    <div className="col-6">
                        <PageCount/>
                    </div>
                    <div className="col-6">
                        <PageJob/>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Dashboard;