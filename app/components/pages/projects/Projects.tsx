import React from 'react';
import {axiosApiInstance} from '../../../interceptors/axios-interceptor';
import {Redirect} from 'react-router-dom';
import CreateProjectModal from "../../components/createProjectModal/CreateProjectModal";
import {toast} from "react-toastify";

export default class Projects extends React.Component<{}, { projects: [], redirect: null, projectId: null }> {

    constructor(prop: any) {
        super(prop);
        this.state = {projects: [], redirect: null, projectId: null};
        this.getProjects();
        this.onProjectAdded = this.onProjectAdded.bind(this);
    }

    getProjects() {
        axiosApiInstance.get('projects', null).then(response => {
            this.setState({projects: response.data.data});
        }, error => {
        });
    }

    handleClick(projectId: number) {
        this.setState({projectId: projectId});
        this.setState({redirect: '/project-single/' + projectId});
    }

    onProjectAdded(newProject: any) {
        var newProjArr = this.state.projects.concat([newProject]);
        this.setState({projects: newProjArr});
    }

    handleDeleteProject(deletedProject: number, event: any) {
        event.stopPropagation();
        axiosApiInstance.delete('delete-project/' + deletedProject.PROJECT_ID).then(response => {
            this.setState({projects: this.state.projects.filter(project => project.PROJECT_ID !== deletedProject.PROJECT_ID)});
            // Calling toast method by passing string
            toast('Successfully deleted project');
        }, error => {
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={{pathname: this.state.redirect, state: {projectId: this.state.projectId}}}/>
        }
        return (
            <div className={"container h-100"}>
                <div className="row h-100 justify-content-center align-items-flex-start p-t-80">
                    <div className="col-12 default-page-wrapper">
                        <h1 className={"text-center"}>Projects</h1>
                        <CreateProjectModal projectAdded={this.onProjectAdded}/>
                        <table className="table table-dark">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Project name</th>
                                <th scope="col">Is project paid</th>
                                <th scope="col">Project price</th>
                                <th scope="col">Paid till now</th>
                                <th scope="col">Client</th>
                                <th></th>
                            </tr>
                            {this.state.projects.map((project, index) =>
                                <tr key={index} style={{'cursor': 'pointer'}} onClick={() => {
                                    this.handleClick(project.PROJECT_ID)
                                }}>
                                    <th scope="row">{index + 1}</th>
                                    <td> {project.PROJECT_NAME}</td>
                                    <td> {project.IS_PROJECT_PAID ? 'Yes' : 'No'}</td>
                                    <td> {project.PROJECT_PRICE + ' ' + project.PAYMENT_CURRENCY} </td>
                                    <td> {project.PROJECT_PAID + ' ' + project.PAYMENT_CURRENCY} </td>
                                    {project.CLIENT_NAME &&
                                    <td> {project.CLIENT_NAME}</td>
                                    }
                                    {!project.CLIENT_NAME &&
                                    <td>No client</td>
                                    }
                                    <td>
                                        <i className="fas fa-trash"
                                           onClick={(e) => this.handleDeleteProject(project, e)}/>
                                    </td>
                                </tr>
                            )}
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                        {this.state.projects.length === 0 &&
                        <p className={"text-center"}>No project inserted</p>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
