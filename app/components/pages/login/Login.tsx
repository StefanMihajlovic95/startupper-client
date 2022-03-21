import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import routes from '../../../constants/routes.json';

export default class Login extends React.Component<{}, { email: '', password: '', errMessage: '', redirect: '' }> {

    constructor(props: any) {
        super(props);
        this.state = {email: '', password: '', errMessage: '', redirect: ''};
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeEmail(event: any) {
        this.setState({email: event.target.value});
    }

    handleChangePassword(event: any) {
        this.setState({password: event.target.value});
    }

    handleSubmit() {
        axios.post('http://localhost:3000/auth/login', {email: this.state.email, password: this.state.password})
            .then(res => {
                localStorage.setItem('su-token', JSON.stringify(res.data.data));
                setTimeout(() => {
                    this.setState({redirect: routes.DASHBOARD});
                });
                // this.setState({persons});
            }, error => {
                let errorMessage: any = 'Wrong email or password!';
                this.setState({errMessage: errorMessage});
            });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }
        return (
            <div className={'row h-100 justify-content-center align-items-center'}>
                <form className={'col-12 login-form'} onSubmit={this.handleSubmit}>
                    <div className={'col-12'}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email</label>
                            <input type="email" value={this.state.email} onChange={this.handleChangeEmail}
                                   className="form-control" id="exampleInputEmail1"
                                   aria-describedby="emailHelp" placeholder="Enter email"/>
                        </div>
                    </div>
                    <div className={'col-12'}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Password</label>
                            <input type="password" value={this.state.password}
                                   onChange={this.handleChangePassword} className="form-control"
                                   id="exampleInputEmail1"
                                   aria-describedby="emailHelp" placeholder="Enter password"/>
                        </div>
                    </div>
                    <div className={'col-12'}>
                        <p className={"form-error-message"}>{this.state.errMessage}</p>
                        {/*<input type="submit" value="Submit"/>*/}
                        <button type="submit" value="Submit" className="btn btn-primary login-button">Login</button>
                    </div>
                </form>
            </div>
        );
    }
}
