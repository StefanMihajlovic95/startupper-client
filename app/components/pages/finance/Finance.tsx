import React from 'react';
import {axiosApiInstance} from "../../../interceptors/axios-interceptor";

export default class Finance extends React.Component<{}, { projects: [] }> {

    constructor(prop: any) {
        super(prop);
        this.state = {projects: []};
        this.getProjects();
    }

    getProjects() {
        axiosApiInstance.get('projects', null).then(response => {
            this.setState({projects: response.data.data});
        }, error => {
        });
    }

    addNewPayment(project: any, projectInputId: string) {
        let newProjectPaidVal = project.PROJECT_PAID + parseInt(document.getElementById(projectInputId).value);
        let reqObj = {project_paid: newProjectPaidVal, is_project_paid: project.PROJECT_PAID <= newProjectPaidVal}
        axiosApiInstance.post('change-project-payment/' + project.PROJECT_ID, reqObj).then(response => {
            project.PROJECT_PAID = reqObj.project_paid;
            project.IS_PROJECT_PAID = reqObj.is_project_paid;
            let updatedProjects = this.state.projects;
            let projectIndex = updatedProjects.findIndex(x => x.PROJECT_ID === project.PROJECT_ID);
            if (projectIndex !== -1) {
                updatedProjects[projectIndex] = project;
            }
            this.setState({projects: updatedProjects});
            document.getElementById(projectInputId).value = null;
        }, error => {
        });
    }

    checkIfInputIsValid(projectId: string, projectPrice: any, projectPaidUntilNow: any, buttonId: string) {
        let inputEl = parseInt(document.getElementById(projectId).value);
        let buttonEl = document.getElementById(buttonId);
        (projectPaidUntilNow + inputEl <= projectPrice) ? buttonEl.disabled = false : buttonEl.disabled = true;
    }

    render() {
        return (
            <div className={"container h-100"}>
                <div className="row h-100 justify-content-center align-items-flex-start p-t-80">
                    <div className="col-12 default-page-wrapper">
                        <h1 className={"text-center"}>Finance</h1>
                        <div className={"row"}>
                            {this.state.projects.map((project, index) =>
                                <div className={"col-4 single-finance-box-wrapper"} key={index}>
                                    <div className={"single-finance-box"}>
                                        <div className={"col-12"}>
                                            <h3>{project.PROJECT_NAME}</h3>
                                        </div>
                                        <div className={"col-12"}>
                                            <span>Project price: </span>
                                            <span className={"value-span"}>{project.PROJECT_PRICE + ' ' + project.PAYMENT_CURRENCY}</span>
                                        </div>
                                        {project.PROJECT_PAID !== project.PROJECT_PRICE &&
                                        <div className={"col-12"}>
                                            <span>Project paid until now: </span>
                                            <span className={"value-span"}>{project.PROJECT_PAID + ' ' + project.PAYMENT_CURRENCY}</span>
                                        </div>
                                        }
                                        {project.PROJECT_PAID !== project.PROJECT_PRICE &&
                                        <div className={'form-group col-12 m-t-10 mt-3'}>
                                            <span>Add new payment</span>
                                            <div className={"row"}>
                                                <div className={"col-10"}>
                                                    <input className="form-control" type={"number"} id={index + '-input'}
                                                           onChange={() => this.checkIfInputIsValid(index + '-input', project.PROJECT_PRICE, project.PROJECT_PAID, index + '-button')}/>
                                                </div>
                                                <div className={"col-2 pl-0"}>
                                                    <button type={"button"} className={"btn btn-primary"}
                                                            onClick={() => this.addNewPayment(project, index + '-input')}
                                                            id={index + '-button'}>Add
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        }
                                        {project.PROJECT_PAID === project.PROJECT_PRICE &&
                                        <div className={"col-12"}>
                                            <h3 className={"payment-completed-text"}>Payment completed</h3>
                                        </div>
                                        }
                                        <br></br>
                                    </div>
                                </div>
                            )}
                            {this.state.projects.length === 0 &&
                            <p className={"text-center"}>No existing projects and finances</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
