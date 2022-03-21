import React from 'react';
import Login from "../components/pages/login/Login";
import Header from "../components/components/Header/Header";
import EmployeeSingle from "../components/pages/Employees/single-view/EmployeeSingle";

export default function EmployeeSinglePage(props: any) {
    if (localStorage.getItem('su-token')) {
        return <div className={"h-100"}><Header/><EmployeeSingle parentProps={props}/></div>;
    } else {
        return <Login/>
    }
}
