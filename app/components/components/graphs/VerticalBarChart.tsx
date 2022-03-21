import React from 'react';
import {Bar} from 'react-chartjs-2';
import distinctColors from 'distinct-colors';
import {axiosApiInstance} from "../../../interceptors/axios-interceptor";

const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
    legend: {
        display: false
    }
};

export default class VerticalBarChart extends React.Component<{}, { data: any }> {

    constructor(prop: any) {
        super(prop);
        this.state = {
            data: {
                labels: [],
                datasets: [],
            }
        };
        this.getClients();
    }

    getClients() {
        axiosApiInstance.get('projects-number-per-client', null).then(response => {
            this.configureChart(response.data.data);
        }, error => {
        });
    }

    configureChart(clients: Array<any>) {
        let labels: Array<string> = [];
        let dataset: Array<number> = [];
        clients.forEach(client => {
            labels.push(client.CLIENT_NAME);
            dataset.push(client.NUMBER_OF_PROJECTS);
        });
        const colors = distinctColors({count: labels.length});
        this.setState({
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Project done: ',
                        data: dataset,
                        backgroundColor: colors,
                        borderColor: colors,
                        borderWidth: 1,
                    },
                ],
            }
        })
    }


    render() {
        return (
            <div className={"m-t-40"}>
                <p className={"text-center"}>Number of projects per client</p>
                <Bar data={this.state.data} options={options}/>
            </div>
        );
    }
}
