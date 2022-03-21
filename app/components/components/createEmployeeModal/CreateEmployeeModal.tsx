import React from 'react';
import ReactModal from 'react-modal';
import {axiosApiInstance} from "../../../interceptors/axios-interceptor";
import {toast} from "react-toastify";
import {employeeStatuses, defaultEmployeeStatus} from "../../../constants/globalConstants";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        marginRight: '-50%',
        height: '60%',
        width: '50%',
        transform: 'translate(-50%, -50%)'
    }
};

export default class CreateEmployeeModal extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            showModal: false,
            employeeForm: {
                EMPLOYEE_NAME: '',
                BIRTHDAY: new Date(),
                EMPLOYED_SINCE: new Date(),
                PROJECTS_DONE: 0,
                STATUS: defaultEmployeeStatus
            }
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleBirthdayChange = this.handleBirthdayChange.bind(this);
        this.handleProjectsDoneChange = this.handleProjectsDoneChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleEmployedSinceChange = this.handleEmployedSinceChange.bind(this);
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

    handleOpenModal() {
        this.setState({showModal: true});
    }

    handleCloseModal() {
        this.setState({showModal: false});
    }

    handleSubmit(event: any) {
        event.preventDefault();
        if (this.props.projectId) {
            var reqObj = this.state.employeeForm;
            reqObj.PROJECT_ID = this.props.projectId;
            axiosApiInstance.post('add-new-employee-and-link-to-project', reqObj).then(response => {
                this.props.employeeAdded(response.data.data);
                this.setState({
                    employeeForm: {
                        EMPLOYEE_NAME: '',
                        BIRTHDAY: new Date(),
                        EMPLOYED_SINCE: new Date(),
                        PROJECTS_DONE: 0,
                        STATUS: this.state.employeeForm.STATUS
                    }
                });
                // Calling toast method by passing string
                toast('Successfully added employee to project');
            }, error => {
            });
        } else {
            axiosApiInstance.post('add-new-employee', this.state.employeeForm).then(response => {
                this.props.employeeAdded(response.data.data);
                this.setState({
                    employeeForm: {
                        EMPLOYEE_NAME: '',
                        BIRTHDAY: new Date(),
                        EMPLOYED_SINCE: new Date(),
                        PROJECTS_DONE: 0,
                        STATUS: this.state.employeeForm.STATUS
                    }
                });
                // Calling toast method by passing string
                toast('Successfully added employee');
            }, error => {
            });
        }
    }

    render() {
        return (
            <div className={'m-t-10'}>
                <button type={"button"} className={"btn btn-primary"} onClick={this.handleOpenModal}>
                    Create new employee
                </button>
                <ReactModal isOpen={this.state.showModal}
                            style={customStyles}
                            className={"custom-react-modal"}
                            contentLabel="Minimal Modal Example">
                    <div className={'row'}>
                        <div className={'container'}>
                            <div className={'col-12'}>
                                <i className="fas fa-times-circle cursor-pointer m-l-10 close-modal-span"
                                   onClick={this.handleCloseModal}/>
                            </div>
                            <form className={'justify-content-center m-t-20'} onSubmit={this.handleSubmit}>
                                <h4 className={"text-center"}>Create new employee</h4>
                                <div className={'form-group col-12 m-t-10 text-center'}>
                                    <label className={'no-margin'}>Employee name</label>
                                    <input required={true} className="form-control" type="text" value={this.state.employeeForm?.EMPLOYEE_NAME}
                                           onChange={this.handleNameChange}/>
                                </div>
                                <div className={'form-group col-12 m-t-10 text-center'}>
                                    <label className={'no-margin'}>Employee birthday</label>
                                    <input required={true} className="form-control" type="date" value={this.state.employeeForm?.BIRTHDAY}
                                           onChange={this.handleBirthdayChange}/>
                                </div>
                                <div className={'form-group col-12 m-t-10 text-center'}>
                                    <label className={'no-margin'}>Employed since</label>
                                    <input required={true} className="form-control" type="date" value={this.state.employeeForm?.EMPLOYED_SINCE}
                                           onChange={this.handleEmployedSinceChange}/>
                                </div>
                                <div className={'form-group col-12 m-t-10 text-center'}>
                                    <label className={'no-margin'}>Projects done</label>
                                    <input required={true} className="form-control" type="number" value={this.state.employeeForm?.PROJECTS_DONE}
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
                                                <a className="dropdown-item" key={index + status}
                                                   onClick={() => this.handleStatusChange(status)}>{status}
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className={'col-12 m-t-10'}>
                                    <button type={"submit"} className={"btn btn-primary w-100"}>Add employee
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </ReactModal>
            </div>
        );
    }
}
