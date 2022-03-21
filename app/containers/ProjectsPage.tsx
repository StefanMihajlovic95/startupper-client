import React from 'react';
import Login from "../components/pages/login/Login";
import Header from "../components/components/Header/Header";
import Projects from "../components/pages/projects/Projects";

export default function ProjectsPage() {
    if (localStorage.getItem('su-token')) {
        return <div className={"h-100"}><Header/><Projects/></div>;
    } else {
        return <Login/>
    }
}
