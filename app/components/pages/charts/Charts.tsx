import React from 'react';
import DoughnutChart from "../../components/graphs/DoughnutChart";
import LineChart from "../../components/graphs/LineChart";
import VerticalBarChart from "../../components/graphs/VerticalBarChart";

export default class Charts extends React.Component<{}, { projects: [] }> {

    constructor(prop: any) {
        super(prop);
        this.state = {projects: []};
    }

    render() {
        return (
            <div className={"container h-100"}>
                <div className="row h-100 justify-content-center align-items-flex-start p-t-80">
                    <div className="col-12 chart-page-wrapper">
                        <h4 className={"text-center"}>Charts</h4>
                        <div className={"row"}>
                            <div className={"col-6 justify-content-center"}>
                                <DoughnutChart/>
                            </div>
                            <div className={"col-6 justify-content-center"}>
                                <LineChart/>
                            </div>
                            <div className={"col-6 justify-content-center"}>
                                <VerticalBarChart/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
