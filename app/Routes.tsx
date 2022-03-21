/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import LoginPage from './containers/LoginPage';
import ClientsPage from './containers/ClientsPage';
import DashboardPage from './containers/DashboardPage';
import FinancePage from './containers/FinancePage';
import ProjectsPage from './containers/ProjectsPage';
import ProjectSinglePage from "./containers/ProjectSinglePage";
import EmployeeSinglePage from "./containers/EmployeeSinglePage";
import ClientSinglePage from "./containers/ClientSinglePage";
import EmployeePage from "./containers/EmployeePage";
import ChartsPage from "./containers/ChartsPage";


export default function Routes() {
    return (
        <App>
            <Switch>
                <Route path={routes.DASHBOARD} component={DashboardPage}/>

                <Route path={routes.CLIENTS} component={ClientsPage}/>
                <Route path={routes.CLIENT_SINGLE} component={ClientSinglePage}/>

                <Route path={routes.FINANCE} component={FinancePage}/>

                <Route path={routes.PROJECTS} component={ProjectsPage}/>
                <Route path={routes.PROJECT_SINGLE} component={ProjectSinglePage}/>

                <Route path={routes.EMPLOYEE_SINGLE} component={EmployeeSinglePage}/>
                <Route path={routes.EMPLOYEES} component={EmployeePage}/>

                <Route path={routes.CHARTS} component={ChartsPage}/>

                <Route path={routes.HOME} component={LoginPage}/>
            </Switch>
        </App>
    );
}
