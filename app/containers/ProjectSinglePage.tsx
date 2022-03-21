import React from 'react';
import Login from "../components/pages/login/Login";
import Header from "../components/components/Header/Header";
import ProjectSingle from "../components/pages/projects/single-view/ProjectSingle";

export default function ProjectsPage(props: any) {
    if (localStorage.getItem('su-token')) {
        return <div className={"h-100"}><Header/><ProjectSingle parentProps={props}/></div>;
    } else {
        return <Login/>
    }
}
