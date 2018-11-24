import React from 'react';
import Aux from '../../hoc/Aux'
import classes from './Layout.module.css';
import Header from './../Header/Header'

const layout = ({children}) => (
    <Aux>
        <div className={classes.layout}>
            <div className={classes.sidebar}><Header /></div>
            <div className={classes.content}>
                <main className={classes.Content}>
                    {children}
                </main>
            </div>
        </div>
    </Aux>
);

export default layout;