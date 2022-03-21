import React from 'react';
import {Link} from 'react-router-dom';
import routes from '../../../constants/routes.json';
import Header from "../../components/header/Header";

export default class Dashboard extends React.Component<{}, { redirect: '' }> {

    constructor(prop: any) {
        super(prop);
        this.state = {redirect: ''};
    }

    render() {
        return (
            <div className={"h-100"}>
                <Header/>
                <div className={"container h-100"}>
                    <div className={'row h-100 justify-content-center align-items-center'}>
                        <div className={'col-4 dashboard-wrapper'}>
                            <h1>Dashboard</h1>
                            <div className={'row text-left mt-3'}>
                                <div className={'col-12'}>
                                    <Link to={routes.PROJECTS}>
                                        <h4>Projects</h4>
                                    </Link>
                                </div>
                                <div className={'col-12'}>
                                    <Link to={routes.EMPLOYEES}>
                                        <h4>Employees</h4>
                                    </Link>
                                </div>
                                <div className={'col-12'}>
                                    <Link to={routes.CLIENTS}>
                                        <h4>Clients</h4>
                                    </Link>
                                </div>
                                <div className={'col-12'}>
                                    <Link to={routes.FINANCE}>
                                        <h4>Finances</h4>
                                    </Link>
                                </div>
                                <div className={'col-12'}>
                                    <Link to={routes.CHARTS}>
                                        <h4>Graphs</h4>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
