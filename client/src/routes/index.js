import React from 'react';
import { Route } from 'react-router-dom';
import App from '../components/App';
import RequireAuth from '../components/Auth/require_auth';
import Signin from '../components/sign-in';
import Dashboard from '../components/dashboard'
import UsersForm from '../components/users-form'
import Students from '../components/Students/students-list'
import Teachers from '../components/Teachers/teachers'
import CreateExamForm from '../components/Exams/create-exam'
import Exams from '../components/Exams/exams'


const Routes = () => {
    return (
        <App>
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/" component={RequireAuth(Dashboard)} />
            <Route exact path="/dashboard" component={RequireAuth(Dashboard)} />
            <Route exact path="/teachers" component={RequireAuth(Teachers)} />
            <Route exact path="/user-form/:type" component={RequireAuth(UsersForm)} />
            <Route exact path="/students" component={RequireAuth(Students)} />

            <Route exact path="/exams" component={RequireAuth(Exams)} />
            <Route exact path="/create-exam" component={RequireAuth(CreateExamForm)} />

            <Route exact path="/create-question-paper" component={RequireAuth(Students)} />
            <Route exact path="/view-question-paper" component={RequireAuth(Students)} />
            <Route exact path="/question-paper/:exam_id" component={RequireAuth(Students)} />
            <Route exact path="/test/:exam_id" component={RequireAuth(Students)} />


        </App>
    );
};

export default Routes;