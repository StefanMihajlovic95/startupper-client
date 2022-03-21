import React from 'react';
import Login from "../components/pages/login/Login";
import Header from "../components/components/Header/Header";
import Finance from "../components/pages/finance/Finance";

export default function FinancePage() {
    if (localStorage.getItem('su-token')) {
        return <div className={"h-100"}><Header/><Finance/></div>;
    } else {
        return <Login/>
    }
}
