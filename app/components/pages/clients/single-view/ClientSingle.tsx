import React from 'react';
import {axiosApiInstance} from '../../../../interceptors/axios-interceptor';
import {toast} from 'react-toastify';
import FileUpload from "../../../components/fileUpload/FileUpload";
import routes from "../../../../constants/routes.json";
import {Redirect} from "react-router-dom";

toast.configure();
export default class ClientSingle extends React.Component<{},
    {
        allProjects: [],
        client: {},
        clientForm: {
            CLIENT_NAME: '',
            CITY: '',
            COUNTRY: ''
        },
        redirect: null
    }> {

    constructor(prop: any) {
        super(prop);
        this.state = {
            allProjects: [],
            client: {},
            clientForm: {
                CLIENT_NAME: '',
                CITY: '',
                COUNTRY: ''
            },
            redirect: null
        };
        this.getClientWithProjectsById();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
    }

    handleCityChange(event: any) {
        this.setState({
            clientForm:
                {
                    CLIENT_NAME: this.state.clientForm.CLIENT_NAME,
                    CITY: event.target.value,
                    COUNTRY: this.state.clientForm.COUNTRY
                }
        });
    }

    handleCountryChange(event: any) {
        this.setState({
            clientForm:
                {
                    CLIENT_NAME: this.state.clientForm.CLIENT_NAME,
                    CITY: this.state.clientForm.CITY,
                    COUNTRY: event.target.value
                }
        });
    }

    handleNameChange(event: any) {
        this.setState({
            clientForm:
                {
                    CLIENT_NAME: event.target.value,
                    CITY: this.state.clientForm.CITY,
                    COUNTRY: this.state.clientForm.COUNTRY
                }
        });
    }

    getClientWithProjectsById() {
        if (this.props.parentProps.match) {
            axiosApiInstance.get('client-with-projects/' + this.props.parentProps.match.params.id).then(response => {
                this.setState({client: response.data.data});
                this.setState({
                    clientForm:
                        {
                            CLIENT_NAME: response.data.data.CLIENT_NAME,
                            CITY: response.data.data.CITY,
                            COUNTRY: response.data.data.COUNTRY
                        }
                });
                this.getProjects();
            }, error => {
            });
        }
    }


    getProjects() {
        axiosApiInstance.get('projects', null).then(response => {
            this.setState({
                allProjects: response.data.data.filter(project => {
                    var foundProject = false;
                    this.state.client.projects.forEach(clientProject => {
                        if (clientProject.CLIENT_ID === project.CLIENT_ID) {
                            foundProject = true;
                        }
                    });
                    return !foundProject;
                })
            });
        }, error => {
        });
    }

    handleSubmit(event: any) {
        event.preventDefault();
        axiosApiInstance.put('edit-client/' + this.props.parentProps.match.params.id, this.state.clientForm).then(response => {
            // Calling toast method by passing string
            toast('Successfully edited client');
        }, error => {
        });
    }

    handleDeleteProject(project) {
        axiosApiInstance.get('detach-project-from-client/' + project.PROJECT_ID).then(response => {
            project.CLIENT_ID = null;
            this.setState({client: {projects: this.state.client.projects.filter(proj => proj.PROJECT_ID !== project.PROJECT_ID)}});
            let newArrOfProjects = this.state.allProjects.concat([project]);
            this.setState({allProjects: newArrOfProjects});
            // Calling toast method by passing string
            toast('Successfully deleted client\'s project');
        }, error => {
        });
    }

    handleAddingExistingProject(project: any) {
        axiosApiInstance.post('attach-project-to-client/' + project.PROJECT_ID, {CLIENT_ID: this.props.parentProps.match.params.id}).then(response => {
            project.CLIENT_ID = this.props.parentProps.match.params.id;
            this.setState({allProjects: this.state.allProjects.filter(proj => proj.PROJECT_ID !== project.PROJECT_ID)});
            let newArrOfProjects = this.state.client.projects.concat([project]);
            this.setState({client: {projects: newArrOfProjects}});
            // Calling toast method by passing string
            toast('Successfully added project');
        }, error => {
        });
    }

    handleDeleteClient() {
        axiosApiInstance.delete('delete-client/' + this.props.parentProps.match.params.id).then(response => {
            toast('Successfully deleted client');
            this.setState({redirect: routes.CLIENTS});
            // Calling toast method by passing string
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
                                    <h4 className={"text-center"}>Edit client
                                        <i className="fas fa-trash cursor-pointer m-l-10"
                                           onClick={() => this.handleDeleteClient()}/>
                                    </h4>
                                    <div className={'form-group col-12 m-t-10 text-center'}>
                                        <label className={'no-margin'}>Client name</label>
                                        <input required={true} className="form-control" type="text"
                                               value={this.state.clientForm?.CLIENT_NAME}
                                               onChange={this.handleNameChange}/>
                                    </div>
                                    <div className={'form-group col-12 m-t-10 text-center'}>
                                        <label className={'no-margin'}>Project description</label>
                                        <input required={true} className="form-control" type="text" value={this.state.clientForm?.CITY}
                                               onChange={this.handleCityChange}/>
                                    </div>
                                    <div className={'form-group col-12 m-t-10 text-center'}>
                                        <label className={'no-margin'}>Project price</label>
                                        <input required={true} className="form-control" type="text"
                                               value={this.state.clientForm?.COUNTRY}
                                               onChange={this.handleCountryChange}/>
                                    </div>
                                    <div className={'col-12 m-t-10 text-center'}>
                                        <button type={"submit"} className={"btn btn-primary w-100"}>Edit
                                        </button>
                                    </div>
                                    <p className={"mt-4 text-center m-b-0"}>Edit projects</p>
                                    <div className={'col-12 text-center mb-2'}>
                                        <div className={'row justify-content-center'}>
                                            {this.state.client.projects?.map((clientProject, index) =>
                                                <div className={"col-4 mt-1"} key={index}>
                                                    <li className={"default-li"}>{clientProject.PROJECT_NAME}
                                                        <i className="fas fa-times-circle cursor-pointer m-l-10"
                                                           onClick={() => this.handleDeleteProject(clientProject)}/>
                                                    </li>
                                                </div>
                                            )}
                                            {this.state.client.projects?.length === 0 &&
                                            <li className={"text-center"}>No projects assigned to this client yet</li>
                                            }
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="dropdown text-center">
                                            <button className="btn btn-secondary dropdown-toggle" type="button"
                                                    id="js-all-employees" data-toggle="dropdown" aria-haspopup="true"
                                                    aria-expanded="false">
                                                Assign existing project
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="js-all-employees">
                                                {this.state.allProjects.map((project, index) =>
                                                    <a className="dropdown-item" key={index}
                                                       onClick={() => this.handleAddingExistingProject(project)}>{project.PROJECT_NAME}
                                                    </a>
                                                )}
                                                {this.state.allProjects.length === 0 &&
                                                <a className="dropdown-item">All projects allready assigned to this
                                                    client</a>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className={"col-6"}>
                                <div className={'justify-content-center'}>
                                    <h4>Upload file</h4>
                                    <FileUpload folderName={'clients'}
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
