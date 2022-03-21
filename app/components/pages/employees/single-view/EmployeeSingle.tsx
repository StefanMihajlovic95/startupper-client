import React from 'react';
import {axiosApiInstance} from '../../../../interceptors/axios-interceptor';
import {toast} from 'react-toastify';
import {employeeStatuses} from '../../../../constants/globalConstants';
import moment from 'moment';
import FileUpload from "../../../components/fileUpload/FileUpload";
import {Redirect} from "react-router-dom";
import routes from '../../../..//constants/routes.json';

toast.configure();
export default class EmployeeSingle extends React.Component<{},
    {
        employeeForm: {
            EMPLOYEE_NAME: string,
            BIRTHDAY: any,
            EMPLOYED_SINCE: any,
            PROJECTS_DONE: number,
            STATUS: string
        },
        redirect: null
    }> {

    constructor(prop: any) {
        super(prop);
        this.state = {
            employeeForm: {
                EMPLOYEE_NAME: '',
                BIRTHDAY: new Date(),
                EMPLOYED_SINCE: new Date(),
                PROJECTS_DONE: 0,
                STATUS: ''
            },
            redirect: null
        };
        this.getEmployeeById();
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleBirthdayChange = this.handleBirthdayChange.bind(this);
        this.handleEmployedSinceChange = this.handleEmployedSinceChange.bind(this);
        this.handleProjectsDoneChange = this.handleProjectsDoneChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleStatusChange(event: any) {
        this.setState({
            employeeForm:
                {
                    EMPLOYEE_NAME: this.state.employeeForm.EMPLOYEE_NAME,
                    BIRTHDAY: this.state.employeeForm.BIRTHDAY,
                    EMPLOYED_SINCE: this.state.employeeForm.EMPLOYED_SINCE,
                    PROJECTS_DONE: this.state.employeeForm.PROJECTS_DONE,
                    STATUS: event
                }
        });
    }

    handleProjectsDoneChange(event: any) {
        this.setState({
            employeeForm:
                {
                    EMPLOYEE_NAME: this.state.employeeForm.EMPLOYEE_NAME,
                    BIRTHDAY: this.state.employeeForm.BIRTHDAY,
                    EMPLOYED_SINCE: this.state.employeeForm.EMPLOYED_SINCE,
                    PROJECTS_DONE: event.target.value,
                    STATUS: this.state.employeeForm.STATUS,
                }
        });
    }

    handleNameChange(event: any) {
        this.setState({
            employeeForm:
                {
                    EMPLOYEE_NAME: event.target.value,
                    BIRTHDAY: this.state.employeeForm.BIRTHDAY,
                    EMPLOYED_SINCE: this.state.employeeForm.EMPLOYED_SINCE,
                    PROJECTS_DONE: this.state.employeeForm.PROJECTS_DONE,
                    STATUS: this.state.employeeForm.STATUS,
                }
        });
    }

    handleBirthdayChange(event: any) {
        this.setState({
            employeeForm:
                {
                    EMPLOYEE_NAME: this.state.employeeForm.EMPLOYEE_NAME,
                    BIRTHDAY: event.target.value,
                    EMPLOYED_SINCE: this.state.employeeForm.EMPLOYED_SINCE,
                    PROJECTS_DONE: this.state.employeeForm.PROJECTS_DONE,
                    STATUS: this.state.employeeForm.STATUS,
                }
        });
    }

    handleEmployedSinceChange(event: any) {
        this.setState({
            employeeForm:
                {
                    EMPLOYEE_NAME: this.state.employeeForm.EMPLOYEE_NAME,
                    BIRTHDAY: this.state.employeeForm.BIRTHDAY,
                    EMPLOYED_SINCE: event.target.value,
                    PROJECTS_DONE: this.state.employeeForm.PROJECTS_DONE,
                    STATUS: this.state.employeeForm.STATUS,
                }
        });
    }

    getEmployeeById() {
        axiosApiInstance.get('employees/' + this.props.parentProps.match.params.id).then(response => {
            this.setState({
                employeeForm:
                    {
                        EMPLOYEE_NAME: response.data.data.EMPLOYEE_NAME,
                        BIRTHDAY: moment(response.data.data.BIRTHDAY, 'YYYY-MM-DD').format('YYYY-MM-DD'),
                        EMPLOYED_SINCE: moment(response.data.data.EMPLOYED_SINCE, 'YYYY-MM-DD').format('YYYY-MM-DD'),
                        PROJECTS_DONE: response.data.data.PROJECTS_DONE,
                        STATUS: response.data.data.STATUS
                    }
            });
        }, error => {
        });
    }

    handleDeleteEmployee() {
        axiosApiInstance.delete('delete-employee/' + this.props.parentProps.match.params.id).then(response => {
            toast('Successfully deleted employee');
            this.setState({redirect: routes.EMPLOYEES});
            // Calling toast method by passing string
        }, error => {
        });
    }

    handleSubmit(event: any) {
        event.preventDefault();
        axiosApiInstance.put('edit-employee/' + this.props.parentProps.match.params.id, this.state.employeeForm).then(response => {
            // Calling toast method by passing string
            toast('Successfully edited employee');
        }, error => {
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }
        return (
            <div className={"container h-100"}>
                <div className="row h-100 justify-content-center align-items-flex-start p-t-80">
                    <div className={"col-12 default-page-wrapper"}>
                        <div className={"row"}>
                            <div className="col-6">
                                <form onSubmit={this.handleSubmit}>
                                    <h4 className={"text-center"}>Edit employee
                                        <i className="fas fa-trash cursor-pointer m-l-10"
                                           onClick={() => this.handleDeleteEmployee()}/>
                                    </h4>
                                    <div className={'form-group col-12 m-t-10 text-center'}>
                                        <label className={'no-margin'}>Employee name</label>
                                        <input required={true} className="form-control" type="text"
                                               value={this.state.employeeForm?.EMPLOYEE_NAME}
                                               onChange={this.handleNameChange}/>
                                    </div>
                                    <div className={'form-group col-12 m-t-10 text-center'}>
                                        <label className={'no-margin'}>Employee birthday</label>
                                        <input required={true} className="form-control" type="date"
                                               value={this.state.employeeForm?.BIRTHDAY}
                                               onChange={this.handleBirthdayChange}/>
                                    </div>
                                    <div className={'form-group col-12 m-t-10 text-center'}>
                                        <label className={'no-margin'}>Employed since</label>
                                        <input required={true} className="form-control" type="date"
                                               value={this.state.employeeForm?.EMPLOYED_SINCE}
                                               onChange={this.handleEmployedSinceChange}/>
                                    </div>
                                    <div className={'form-group col-12 m-t-10 text-center'}>
                                        <label className={'no-margin'}>Projects done</label>
                                        <input required={true} className="form-control" type="number"
                                               value={this.state.employeeForm?.PROJECTS_DONE}
                                               onChange={this.handleProjectsDoneChange}/>
                                    </div>
                                    <div className={'form-group col-12 m-t-10 text-center'}>
                                        <label className={'no-margin'}>Employee status</label>
                                        <div className="dropdown">
                                            <button className="btn btn-secondary dropdown-toggle" type="button"
                                                    id="js-all-employees" data-toggle="dropdown" aria-haspopup="true"
                                                    aria-expanded="false">
                                                {this.state.employeeForm?.STATUS}
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="js-all-employees">
                                                {employeeStatuses.map((status, index) =>
                                                    <a className="dropdown-item" key={index}
                                                       onClick={() => this.handleStatusChange(status)}>{status}
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'col-12 m-t-10 text-center'}>
                                        <button type={"submit"} className={"btn btn-primary w-100"}>Edit employee
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className={"col-6"}>
                                <div className={'justify-content-center'}>
                                    <h4>Upload file</h4>
                                    <FileUpload folderName={'employees'}
                                                subfolderName={this.props.parentProps.match.params.id}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
