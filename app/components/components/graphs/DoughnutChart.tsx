import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import distinctColors from 'distinct-colors';
import {axiosApiInstance} from "../../../interceptors/axios-interceptor";

export default class DoughnutChart extends React.Component<{}, { data: any }> {

    constructor(prop: any) {
        super(prop);
        this.state = {
            data: {
                labels: [],
                datasets: []
            }
        };
        this.getEmployees();
    }

    getEmployees() {
        axiosApiInstance.get('employees', null).then(response => {
            this.configureChart(response.data.data);
        }, error => {
        });
    }

    configureChart(employees: Array<any>) {
        const colors = distinctColors({count: employees.length});
        let dataset = [];
        let labels = [];
        employees.forEach(employee => {
            labels.push(employee.EMPLOYEE_NAME);
            dataset.push(employee.PROJECTS_DONE);
        });
        this.setState({
            data: {
                labels: labels,
                datasets: [{
                    data: dataset,
                    backgroundColor: colors,
                    hoverBackgroundColor: colors
                }]
            }
        });
    }


    render() {
        return (
            <div>
                <p className={"text-center"}>Number of finished employees projects</p>
                <Doughnut data={this.state.data}/>
            </div>
        );
    }
}
