import React from 'react';
import {axiosApiInstance} from '../../../interceptors/axios-interceptor';
import {Redirect} from 'react-router-dom';
import moment from 'moment';
import CreateClientModal from "../../components/createClientModal/CreateClientModal";
import {toast} from "react-toastify";

export default class Clients extends React.Component<{}, { clients: [], redirect: null, projectId: null }> {

    public createClientRef: React.RefObject<any>;

    constructor(prop: any) {
        super(prop);
        this.createClientRef = React.createRef();
        this.state = {clients: [], redirect: null, projectId: null};
        this.getClients();
        this.onClientAdded = this.onClientAdded.bind(this);
    }

    getClients() {
        axiosApiInstance.get('clients', null).then(response => {
            this.setState({clients: response.data.data});
        }, error => {
        });
    }

    handleClick(clientId: number) {
        this.setState({clientId: clientId});
        this.setState({redirect: '/client-single/' + clientId});
    }

    onClientAdded(newClient: any) {
        var newClientsArr = this.state.clients.concat([newClient]);
        this.setState({clients: newClientsArr});
    }

    handleDeleteClient(deletedClient: number, event: any) {
        event.stopPropagation();
        axiosApiInstance.delete('delete-client/' + deletedClient.CLIENT_ID).then(response => {
            this.setState({clients: this.state.clients.filter(client => client.CLIENT_ID !== deletedClient.CLIENT_ID)});
            // Calling toast method by passing string
            toast('Successfully deleted client');
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
                        <h1 className={"text-center"}>Clients</h1>
                        <CreateClientModal ref={this.createClientRef} clientAdded={this.onClientAdded}/>
                        <table className="table table-dark m-t-15">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Client name</th>
                                <th scope="col">Client city</th>
                                <th scope="col">Client country</th>
                                <th></th>
                            </tr>
                            {this.state.clients.map((client, index) =>
                                <tr key={index} style={{'cursor': 'pointer'}} onClick={() => {
                                    this.handleClick(client.CLIENT_ID)
                                }}>
                                    <th scope="row">{index + 1}</th>
                                    <td> {client.CLIENT_NAME}</td>
                                    <td> {client.CITY}</td>
                                    <td> {client.COUNTRY} </td>
                                    <td>
                                        <i className="fas fa-trash"
                                           onClick={(e) => this.handleDeleteClient(client, e)}/>
                                    </td>
                                </tr>
                            )}
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                        {this.state.clients.length === 0 &&
                        <p className={"text-center"}>No clients inserted</p>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
