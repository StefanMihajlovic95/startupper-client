import React from 'react';
import {Line} from 'react-chartjs-2';
import {axiosApiInstance} from "../../../interceptors/axios-interceptor";
import moment from "moment";

const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: false,
                },
            },
        ],
    },
    legend: {
        display: false
    }
};

export default class LineChart extends React.Component<{}, { data: any }> {

    constructor(prop: any) {
        super(prop);
        this.state = {
            data: {
                labels: [],
                datasets: [],
            }
        };
        this.getProjects();
    }

    getProjects() {
        axiosApiInstance.get('projects', null).then(response => {
            this.configureChart(response.data.data);
        }, error => {
        });
    }

    configureChart(projects: Array<any>) {
        let years: Array<number> = [];
        let dataset: Array<number> = [];
        projects = projects.filter(project => {
            return moment().format('YYYY-MM-DD') >= moment(project.END_DATE, 'YYYY-MM-DD').format('YYYY-MM-DD');
        });
        projects = projects.sort((a, b) => {
            return (moment(a.END_DATE, 'YYYY-MM-DD').year() > moment(b.END_DATE, 'YYYY-MM-DD').year()) ? 1 : -1
        });
        projects.forEach(project => {
            let year: number = moment(project.END_DATE, 'YYYY-MM-DD').year();
            if (years.includes(year)) {
                let yearIndex: number = years.indexOf(year);
                dataset[yearIndex] += 1;
            } else {
                years.push(moment(project.END_DATE, 'YYYY-MM-DD').year());
                dataset.push(1);
            }
        });
        this.setState({
            data: {
                labels: years,
                datasets: [
                    {
                        label: 'Finished',
                        data: dataset,
                        fill: false,
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgba(255, 99, 132, 0.2)',
                    },
                ],
            }
        });
    }


    render() {
        return (
            <div>
                <p className={"text-center"}>Number of finished projects per year</p>
                <Line data={this.state.data} options={options}/>
            </div>
        );
    }
}
