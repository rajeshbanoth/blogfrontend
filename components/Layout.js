import Header from './Header';
import React from 'react';
import StickyFooter from './StickyFooter';

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <div style={{paddingBottom:'90px'}}>
            <Header />

            </div>

            {children}
            <StickyFooter/>
        </React.Fragment>
    );
};

export default Layout;
