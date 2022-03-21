import React from 'react';
import Login from '../components/pages/login/Login';
import Dashboard from "../components/pages/dashboard/Dashboard";

export default function LoginPage() {
    if (localStorage.getItem('su-token')) {
        return <Dashboard/>
    } else {
        return <Login/>;
    }
}
