import React from 'react';
import Login from "../components/pages/login/Login";
import Header from "../components/components/Header/Header";
import ClientSingle from "../components/pages/clients/single-view/ClientSingle";

export default function ClientSinglePage(props: any) {
    if (localStorage.getItem('su-token')) {
        return <div className={"h-100"}><Header/><ClientSingle parentProps={props}/></div>;
    } else {
        return <Login/>
    }
}
