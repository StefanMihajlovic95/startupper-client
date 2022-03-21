import React from 'react';
import routes from "../../../constants/routes.json";
import {Redirect} from "react-router-dom";
import {BackButton} from "../backButton/BackButton";

export default class Header extends React.Component<{}, { redirect: '' }> {

    constructor(prop: any) {
        super(prop);
        this.state = {redirect: ''};
        this.logout = this.logout.bind(this);
    }

    logout() {
        localStorage.removeItem('su-token');
        this.setState({redirect: routes.HOME});
        return null;
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }
        return (
            <div className={"su-header w-100 mt-2"}>
                <BackButton/>
                <div>
                </div>
                <div>
                    <button type="button" className={"btn btn-warning logout-button"} onClick={this.logout}>Log Out
                    </button>
                </div>
            </div>
        );
    }
}
