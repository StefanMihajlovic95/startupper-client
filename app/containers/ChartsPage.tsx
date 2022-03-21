import React from 'react';
import Login from "../components/pages/login/Login";
import Header from "../components/components/Header/Header";
import Charts from "../components/pages/charts/Charts";

export default function ChartsPage() {
    if (localStorage.getItem('su-token')) {
        return <div className={"h-100"}><Header/><Charts/></div>;
    } else {
        return <Login/>
    }
}
