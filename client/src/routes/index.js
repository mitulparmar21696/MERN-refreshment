import React from 'react';
import { Route } from 'react-router-dom';
import App from '../components/App';
import RequireAuth from '../components/Auth/require_auth';
import Signin from '../components/sign-in';
import Dashboard from '../components/dashboard'
import UsersForm from '../components/users-form'
import Students from '../components/Students/students-list'
import Teachers from '../components/Teachers/teachers'




const Routes = () => {
    return (
        <App>
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/" component={RequireAuth(Dashboard)} />
            <Route exact path="/dashboard" component={RequireAuth(Dashboard)} />
            <Route exact path="/teachers" component={RequireAuth(Teachers)} />
            <Route exact path="/user-form/:type" component={RequireAuth(UsersForm)} />
            <Route exact path="/students" component={RequireAuth(Students)} />

        </App>
    );
};

export default Routes;