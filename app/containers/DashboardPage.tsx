import React from 'react';
import Dashboard from '../components/pages/dashboard/Dashboard';
import Login from "../components/pages/login/Login";
import Header from "../components/components/Header/Header";

export default function DashboardPage() {
    if (localStorage.getItem('su-token')) {
        return <div className={"h-100"}><Header/><Dashboard/></div>;
    } else {
        return <Login/>
    }
}
