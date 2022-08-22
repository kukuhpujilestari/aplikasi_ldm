import React from 'react';
import Body from './body';
import Footer from './footer';
import Navbar from './navbar';
import Sidenav from './sidenav';

export default () => {
    return (
        <div>
            <Navbar/>
            <div id="layoutSidenav">
                <Sidenav/>
                <div id="layoutSidenav_content">
                    <Body/>
                    <Footer/>
                </div>
            </div>
        </div>
    )
}