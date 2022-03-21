import React from 'react';
import Clients from '../components/pages/clients/Clients';
import Login from "../components/pages/login/Login";
import Header from "../components/components/Header/Header";

export default function ClientsPage() {
    if (localStorage.getItem('su-token')) {
        return <div className={"h-100"}><Header/><Clients/></div>;
    } else {
        return <Login/>
    }
}
