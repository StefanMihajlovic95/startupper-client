import React from 'react';
import {axiosApiInstance} from '../../../interceptors/axios-interceptor';
import {Redirect} from 'react-router-dom';
import moment from 'moment';
import CreateEmployeeModal from "../../components/createEmployeeModal/CreateEmployeeModal";
import {toast} from "react-toastify";

export default class Employees extends React.Component<{}, { employees: [], redirect: null }> {

    constructor(prop: any) {
        super(prop);
        this.state = {employees: [], redirect: null};
        this.getEmployees();
        this.onEmployeeAdded = this.onEmployeeAdded.bind(this);
    }

    getEmployees() {
        axiosApiInstance.get('employees', null).then(response => {
            this.setState({employees: response.data.data});
        }, error => {
        });
    }

    handleClick(employeeId: number) {
        this.setState({redirect: '/employee-single/' + employeeId});
    }

    onEmployeeAdded(newEmployee: any) {
        var newEmployeesArr = this.state.employees.concat([newEmployee]);
        this.setState({employees: newEmployeesArr});
    }

    handleDeleteEmployee(deletedEmployee: number, event: any) {
        event.stopPropagation();
        axiosApiInstance.delete('delete-employee/' + deletedEmployee.EMPLOYEE_ID).then(response => {
            this.setState({employees: this.state.employees.filter(employee => employee.EMPLOYEE_ID !== deletedEmployee.EMPLOYEE_ID)});
            // Calling toast method by passing string
            toast('Successfully deleted employee');
        }, error => {
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={{pathname: this.state.redirect}}/>
        }
        return (
            <div className={"container h-100"}>
                <div className="row h-100 justify-content-center align-items-flex-start p-t-80">
                    <div className="col-12 default-page-wrapper">
                        <h1 className={"text-center"}>Employees</h1>
                        <CreateEmployeeModal employeeAdded={this.onEmployeeAdded}/>
                        <table className="table table-dark m-t-15">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Employee name</th>
                                <th scope="col">Employee status</th>
                                <th scope="col">Employee birthday</th>
                                <th scope="col">Projects done</th>
                                <th scope="col">Employed since</th>
                                <th scope="col"></th>
                            </tr>
                            {this.state.employees.map((employee, index) =>
                                <tr key={index} style={{'cursor': 'pointer'}} onClick={() => {
                                    this.handleClick(employee.EMPLOYEE_ID)
                                }}>
                                    <th scope="row">{index + 1}</th>
                                    <td> {employee.EMPLOYEE_NAME}</td>
                                    <td> {employee.STATUS}</td>
                                    <td> {moment(employee.BIRTHDAY, 'YYYY-MM-DD').format('MM/DD/YYYY')} </td>
                                    <td> {employee.PROJECTS_DONE} </td>
                                    <td> {moment(employee.EMPLOYED_SINCE, 'YYYY-MM-DD').format('MM/DD/YYYY')} </td>
                                    <td>
                                        <i className="fas fa-trash"
                                           onClick={(e) => this.handleDeleteEmployee(employee, e)}/>
                                    </td>
                                </tr>
                            )}
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                        {this.state.employees.length === 0 &&
                        <p className={"text-center"}>No employees inserted</p>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
