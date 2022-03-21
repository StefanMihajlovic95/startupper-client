import React from 'react';
import Login from "../components/pages/login/Login";
import Header from "../components/components/Header/Header";
import Employees from "../components/pages/Employees/Employees";

export default function EmployeePage() {
    if (localStorage.getItem('su-token')) {
        return <div className={"h-100"}><Header/><Employees/></div>;
    } else {
        return <Login/>
    }
}
