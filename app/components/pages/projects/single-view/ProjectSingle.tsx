import React from 'react';
import {axiosApiInstance} from '../../../../interceptors/axios-interceptor';
import {toast} from 'react-toastify';
import CreateEmployeeModal from '../../../components/createEmployeeModal/CreateEmployeeModal'
import FileUpload from "../../../components/fileUpload/FileUpload";
import {Redirect} from "react-router-dom";
import routes from "../../../../constants/routes.json";
import moment from "moment";

toast.configure();
export default class ProjectSingle extends React.Component<{},
    {
        project: [],
        employees: [],
        projectForm: {
            name: '',
            description: '',
            projectPrice: 0,
            projectPaid: 0,
            startDate: any,
            endDate: any
        },
        allEmployees: [],
        redirect: null
    }> {

    constructor(prop: any) {
        super(prop);
        this.state = {
            project: [],
            employees: [],
            allEmployees: [],
            projectForm: {
                name: '',
                description: '',
                projectPrice: 0,
                projectPaid: 0,
                startDate: new Date(),
                endDate: new Date()
            },
            redirect: null
        };
        this.getProjectById(prop);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleProjectPaidChange = this.handleProjectPaidChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleProjectPriceChange = this.handleProjectPriceChange.bind(this);
        this.onEmployeeAdded = this.onEmployeeAdded.bind(this);
    }

    getAllEmployees() {
        axiosApiInstance.get('employees').then(response => {
            this.setState({
                allEmployees: response.data.data.filter(employee => {
                    var foundEmployee = false;
                    this.state.employees.forEach(projectEmployee => {
                        if (projectEmployee.EMPLOYEE_ID === employee.EMPLOYEE_ID) {
                            foundEmployee = true;
                        }
                    });
                    return !foundEmployee;
                })
            });
        }, error => {
        });
    }

    getProjectById() {
        if (this.props.parentProps.match) {
            axiosApiInstance.get('project-with-employees/' + this.props.parentProps.match.params.id).then(response => {
                this.setState({project: response.data.data});
                this.setState({employees: response.data.data.EMPLOYEES});
                this.setState({
                    projectForm: {
                        name: response.data.data.PROJECT_NAME,
                        description: response.data.data.DESCRIPTION,
                        projectPaid: response.data.data.PROJECT_PAID,
                        projectPrice: response.data.data.PROJECT_PRICE,
                        startDate: moment(response.data.data.START_DATE, 'YYYY-MM-DD').format('YYYY-MM-DD'),
                        endDate: moment(response.data.data.END_DATE, 'YYYY-MM-DD').format('YYYY-MM-DD')
                    }
                });
                this.getAllEmployees();
            }, error => {
            });
        }
    }

    handleStartDateChange(event: any) {
        this.setState({
            projectForm: {
                name: this.state.projectForm.name,
                description: this.state.projectForm.description,
                projectPrice: this.state.projectForm.projectPrice,
                projectPaid: this.state.projectForm.projectPaid,
                startDate: event.target.value,
                endDate: this.state.projectForm.endDate
            }
        });
    }

    handleEndDateChange(event: any) {
        this.setState({
            projectForm: {
                name: this.state.projectForm.name,
                description: this.state.projectForm.description,
                projectPrice: this.state.projectForm.projectPrice,
                projectPaid: this.state.projectForm.projectPaid,
                startDate: this.state.projectForm.startDate,
                endDate: event.target.value
            }
        });
    }

    handleNameChange(event: any) {
        this.setState({
            projectForm: {
                name: event.target.value,
                description: this.state.projectForm.description,
                projectPrice: this.state.projectForm.projectPrice,
                projectPaid: this.state.projectForm.projectPaid,
                startDate: this.state.projectForm.startDate,
                endDate: this.state.projectForm.endDate
            }
        });
    }

    handleDescChange(event: any) {
        this.setState({
            projectForm: {
                name: this.state.projectForm.name,
                description: event.target.value,
                projectPrice: this.state.projectForm.projectPrice,
                projectPaid: this.state.projectForm.projectPaid,
                startDate: this.state.projectForm.startDate,
                endDate: this.state.projectForm.endDate
            }
        });
    }

    handleProjectPaidChange(event: any) {
        this.setState({
            projectForm: {
                name: this.state.projectForm.name,
                description: this.state.projectForm.description,
                projectPrice: this.state.projectForm.projectPrice,
                projectPaid: event.target.value,
                startDate: this.state.projectForm.startDate,
                endDate: this.state.projectForm.endDate
            }
        });
    }

    handleProjectPriceChange(event: any) {
        this.setState({
            projectForm: {
                name: this.state.projectForm.name,
                description: this.state.projectForm.description,
                projectPrice: event.target.value,
                projectPaid: this.state.projectForm.projectPaid,
                startDate: this.state.projectForm.startDate,
                endDate: this.state.projectForm.endDate
            }
        });
    }

    handleSubmit(event: any) {
        event.preventDefault();
        axiosApiInstance.put('edit-project/' + this.props.parentProps.match.params.id, {
            name: this.state.projectForm.name,
            description: this.state.projectForm.description,
            project_price: this.state.projectForm.projectPrice,
            project_paid: this.state.projectForm.projectPaid,
            start_date: this.state.projectForm.startDate,
            end_date: this.state.projectForm.endDate
        }).then(response => {
            // Calling toast method by passing string
            toast('Successfully edited project')
        }, error => {
        });

    }

    handleDeleteEmployee(projectEmployee: number) {
        axiosApiInstance.delete('delete-employee-from-project/' + projectEmployee.PROJECT_WITH_EMPLOYEE_ID).then(response => {
            // Calling toast method by passing string
            this.setState({employees: this.state.employees.filter(employee => employee.PROJECT_WITH_EMPLOYEE_ID !== projectEmployee.PROJECT_WITH_EMPLOYEE_ID)});
            var newArrOfAllEmployees = this.state.allEmployees.concat([projectEmployee]);
            this.setState({allEmployees: newArrOfAllEmployees});
            toast('Successfully deleted employee from project');
        }, error => {
        });
    }

    handleAddingExistingEmployee(addedEmployee: any) {
        axiosApiInstance.post('add-existing-employee', {
            project_id: this.state.project.PROJECT_ID,
            employee_id: addedEmployee.EMPLOYEE_ID
        }).then(response => {
            // Calling toast method by passing string
            addedEmployee.PROJECT_WITH_EMPLOYEE_ID = response.data.data.insertId;
            this.setState({allEmployees: this.state.allEmployees.filter(employee => employee.EMPLOYEE_ID !== addedEmployee.EMPLOYEE_ID)});
            var newArrOfProjectEmployees = this.state.employees.concat([addedEmployee]);
            this.setState({employees: newArrOfProjectEmployees});
            toast('Successfully added employee to project');
        }, error => {
        });
    }

    onEmployeeAdded(newEmployee: any) {
        var newArrOfProjectEmployees = this.state.employees.concat([newEmployee]);
        this.setState({employees: newArrOfProjectEmployees});
    }

    handleDeleteProject() {
        axiosApiInstance.delete('delete-project/' + this.props.parentProps.match.params.id).then(response => {
            toast('Successfully deleted project');
            this.setState({redirect: routes.PROJECTS});
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
                                    <h4 className={"text-center"}>Edit Project
                                        <i className="fas fa-trash cursor-pointer m-l-10"
                                           onClick={() => this.handleDeleteProject()}/>
                                    </h4>
                                    <div className={'form-group col-12 m-t-10 text-center'}>
                                        <label className={'no-margin'}>Project name</label>
                                        <input required={true} className="form-control" type="text"
                                               value={this.state.projectForm?.name}
                                               onChange={this.handleNameChange}/>
                                    </div>
                                    <div className={'col-12 m-t-10 text-center'}>
                                        <label className={'no-margin'}>Project description</label>
                                        <input required={true} className="form-control" type="text"
                                               value={this.state.projectForm?.description}
                                               onChange={this.handleDescChange}/>
                                    </div>
                                    <div className={'form-group col-12 m-t-10 text-center'}>
                                        <label className={'no-margin'}>Project start date</label>
                                        <input required={true} className="form-control" type="date"
                                               value={this.state.projectForm?.startDate}
                                               onChange={this.handleStartDateChange}/>
                                    </div>
                                    <div className={'form-group col-12 m-t-10 text-center'}>
                                        <label className={'no-margin'}>Project end date</label>
                                        <input required={true} className="form-control" type="date"
                                               value={this.state.projectForm?.endDate}
                                               onChange={this.handleEndDateChange}/>
                                    </div>
                                    <div className={'col-12 m-t-10 text-center'}>
                                        <label className={'no-margin'}>Project price</label>
                                        <input required={true} className="form-control" type="text"
                                               value={this.state.projectForm?.projectPrice}
                                               onChange={this.handleProjectPriceChange}/>
                                    </div>
                                    <div className={'col-12 m-t-10 text-center'}>
                                        <label className={'no-margin'}>Project paid</label>
                                        <input required={true} className="form-control" type="text"
                                               value={this.state.projectForm?.projectPaid}
                                               onChange={this.handleProjectPaidChange}/>
                                    </div>
                                    <div className={'col-12 m-t-10 text-center'}>
                                        <button type={"submit"} className={"btn btn-primary w-100"}>Edit
                                        </button>
                                    </div>
                                    <p className={"mt-4 text-center m-b-0"}>Edit employees</p>
                                    <div className={'col-12 text-center mb-2'}>
                                        <div className={'row justify-content-center'}>
                                            {this.state.employees.map((employee, index) =>
                                                <div className={"col-4 mt-1"} key={index}>
                                                    <li className={"default-li"}>{employee.EMPLOYEE_NAME}
                                                        <i className="fas fa-times-circle cursor-pointer m-l-10"
                                                           onClick={() => this.handleDeleteEmployee(employee)}/>
                                                    </li>
                                                </div>
                                            )}
                                            {this.state.employees.length === 0 &&
                                            <li>No employees added yet</li>
                                            }
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="dropdown text-center">
                                            <button className="btn btn-secondary dropdown-toggle" type="button"
                                                    id="js-all-employees" data-toggle="dropdown" aria-haspopup="true"
                                                    aria-expanded="false">
                                                Add existing employee
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="js-all-employees">
                                                {this.state.allEmployees.map((employee, index) =>
                                                    <a className="dropdown-item" key={index}
                                                       onClick={() => this.handleAddingExistingEmployee(employee)}>{employee.EMPLOYEE_NAME}
                                                    </a>
                                                )}
                                                {this.state.allEmployees.length === 0 &&
                                                <a className="dropdown-item">All employees already on this project</a>
                                                }
                                            </div>
                                            <CreateEmployeeModal projectId={this.state.project.PROJECT_ID}
                                                                 employeeAdded={this.onEmployeeAdded}/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className={"col-6"}>
                                <div className={'justify-content-center'}>
                                    <h4>Upload file</h4>
                                    <FileUpload folderName={'projects'}
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
