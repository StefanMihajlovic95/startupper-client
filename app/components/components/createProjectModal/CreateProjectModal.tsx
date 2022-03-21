import React from 'react';
import ReactModal from 'react-modal';
import {axiosApiInstance} from "../../../interceptors/axios-interceptor";
import {toast} from "react-toastify";
import CreateClientModal from "../createClientModal/CreateClientModal";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        marginRight: '-50%',
        height: 'auto',
        width: '50%',
        transform: 'translate(-50%, -50%)'
    }
};

export default class CreateProjectModal extends React.Component {

    public createClientRef: React.RefObject<any>;

    constructor(props: any) {
        super(props);
        this.state = {
            showModal: false,
            possibleCurrencies: ['USD', 'EUR', 'RSD'],
            allClients: [],
            selectedClient: {},
            projectForm: {
                PROJECT_NAME: '',
                DESCRIPTION: '',
                START_DATE: new Date,
                END_DATE: new Date,
                CURRENCY: 'RSD',
                PROJECT_PRICE: 0,
                PROJECT_PAID: 0
            }
        };
        this.createClientRef = React.createRef();
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
        this.handleProjectPriceChange = this.handleProjectPriceChange.bind(this);
        this.handleProjectPaidChange = this.handleProjectPaidChange.bind(this);
        this.onClientAdded = this.onClientAdded.bind(this);
        this.getAllClients();
    }

    handleOpenModal() {
        this.setState({showModal: true});
    }

    handleCloseModal() {
        this.setState({showModal: false});
    }

    getAllClients() {
        axiosApiInstance.get('clients', null).then(response => {
            this.setState({allClients: response.data.data});
            this.setState({selectedClient: response.data.data[0]});
        }, error => {
        });
    }

    handleNameChange(event: any) {
        this.setState({
            projectForm: {
                PROJECT_NAME: event.target.value,
                DESCRIPTION: this.state.projectForm.DESCRIPTION,
                START_DATE: this.state.projectForm.START_DATE,
                END_DATE: this.state.projectForm.END_DATE,
                PROJECT_PRICE: this.state.projectForm.PROJECT_PRICE,
                PROJECT_PAID: this.state.projectForm.PROJECT_PAID,
                CURRENCY: this.state.projectForm.CURRENCY
            }
        });
    }

    handleDescriptionChange(event: any) {
        this.setState({
            projectForm: {
                PROJECT_NAME: this.state.projectForm.PROJECT_NAME,
                DESCRIPTION: event.target.value,
                START_DATE: this.state.projectForm.START_DATE,
                END_DATE: this.state.projectForm.END_DATE,
                PROJECT_PRICE: this.state.projectForm.PROJECT_PRICE,
                PROJECT_PAID: this.state.projectForm.PROJECT_PAID,
                CURRENCY: this.state.projectForm.CURRENCY
            }
        });
    }

    handleStartDateChange(event: any) {
        this.setState({
            projectForm: {
                PROJECT_NAME: this.state.projectForm.PROJECT_NAME,
                DESCRIPTION: this.state.projectForm.DESCRIPTION,
                START_DATE: event.target.value,
                END_DATE: this.state.projectForm.END_DATE,
                PROJECT_PRICE: this.state.projectForm.PROJECT_PRICE,
                PROJECT_PAID: this.state.projectForm.PROJECT_PAID,
                CURRENCY: this.state.projectForm.CURRENCY
            }
        });
    }

    handleEndDateChange(event: any) {
        this.setState({
            projectForm: {
                PROJECT_NAME: this.state.projectForm.PROJECT_NAME,
                DESCRIPTION: this.state.projectForm.DESCRIPTION,
                START_DATE: this.state.projectForm.START_DATE,
                END_DATE: event.target.value,
                PROJECT_PRICE: this.state.projectForm.PROJECT_PRICE,
                PROJECT_PAID: this.state.projectForm.PROJECT_PAID,
                CURRENCY: this.state.projectForm.CURRENCY
            }
        });
    }

    handleCurrencyChange(event: any) {
        this.setState({
            projectForm: {
                PROJECT_NAME: this.state.projectForm.PROJECT_NAME,
                DESCRIPTION: this.state.projectForm.DESCRIPTION,
                START_DATE: this.state.projectForm.START_DATE,
                END_DATE: this.state.projectForm.END_DATE,
                PROJECT_PRICE: this.state.projectForm.PROJECT_PRICE,
                PROJECT_PAID: this.state.projectForm.PROJECT_PAID,
                CURRENCY: event
            }
        });
    }

    handleProjectPriceChange(event: any) {
        this.setState({
            projectForm: {
                PROJECT_NAME: this.state.projectForm.PROJECT_NAME,
                DESCRIPTION: this.state.projectForm.DESCRIPTION,
                START_DATE: this.state.projectForm.START_DATE,
                END_DATE: this.state.projectForm.END_DATE,
                PROJECT_PRICE: event.target.value,
                PROJECT_PAID: this.state.projectForm.PROJECT_PAID,
                CURRENCY: this.state.projectForm.CURRENCY
            }
        });
    }

    handleProjectPaidChange(event: any) {
        this.setState({
            projectForm: {
                PROJECT_NAME: this.state.projectForm.PROJECT_NAME,
                DESCRIPTION: this.state.projectForm.DESCRIPTION,
                START_DATE: this.state.projectForm.START_DATE,
                END_DATE: this.state.projectForm.END_DATE,
                PROJECT_PRICE: this.state.projectForm.PROJECT_PRICE,
                PROJECT_PAID: event.target.value,
                CURRENCY: this.state.projectForm.CURRENCY
            }
        });
    }

    handleAddingClient(selectedClient) {
        this.setState({selectedClient: selectedClient});
    }

    handleSubmit(event: any) {
        event.preventDefault();
        var reqObj = this.state.projectForm;
        reqObj.CLIENT_ID = this.state.selectedClient.CLIENT_ID;
        axiosApiInstance.post('add-new-finance-and-project', reqObj).then(response => {
            this.props.projectAdded(response.data.data);
            this.setState({
                projectForm: {
                    PROJECT_NAME: '',
                    DESCRIPTION: '',
                    START_DATE: new Date,
                    END_DATE: new Date,
                    CURRENCY: 'RSD',
                    PROJECT_PRICE: 0,
                    PROJECT_PAID: 0
                }
            });
            // Calling toast method by passing string
            toast('Successfully added project');
        }, error => {
        });
    }

    onClientAdded(newClient: any) {
        this.setState({selectedClient: newClient});
        var newClientsArr = this.state.allClients.concat([newClient]);
        this.setState({allClients: newClientsArr});
        this.createClientRef.current.handleCloseModal();
    }

    render() {
        return (
            <div className={'m-t-10'}>
                <button type={"button"} className={"btn btn-primary m-b-15"} onClick={this.handleOpenModal}>
                    Create new Project
                </button>
                <ReactModal isOpen={this.state.showModal}
                            style={customStyles}
                            className={"custom-react-modal"}
                            contentLabel="Minimal Modal Example">
                    <div className={'row'}>
                        <div className={'container'}>
                            <div className={'col-12'}>
                                <i className="fas fa-times-circle cursor-pointer m-l-10 close-modal-span"
                                   onClick={this.handleCloseModal}/>
                            </div>
                            <form className={'justify-content-center m-t-20'} onSubmit={this.handleSubmit}>
                                <h4 className={"text-center"}>Create new project</h4>
                                <div className={'form-group col-12 m-t-10 text-center'}>
                                    <label className={'no-margin'}>Project name</label>
                                    <input required={true} className="form-control" type="text" value={this.state.projectForm?.PROJECT_NAME}
                                           onChange={this.handleNameChange}/>
                                </div>
                                <div className={'form-group col-12 m-t-10 text-center'}>
                                    <label className={'no-margin'}>Project description</label>
                                    <input required={true} className="form-control" type="text" value={this.state.projectForm?.DESCRIPTION}
                                           onChange={this.handleDescriptionChange}/>
                                </div>
                                <div className={'form-group col-12 m-t-10 text-center'}>
                                    <label className={'no-margin'}>Project start date</label>
                                    <input required={true} className="form-control" type="date" value={this.state.projectForm?.START_DATE}
                                           onChange={this.handleStartDateChange}/>
                                </div>
                                <div className={'form-group col-12 m-t-10 text-center'}>
                                    <label className={'no-margin'}>Project end date</label>
                                    <input required={true} className="form-control" type="date" value={this.state.projectForm?.END_DATE}
                                           onChange={this.handleEndDateChange}/>
                                </div>
                                <div className={'form-group col-12 m-t-10 text-center'}>
                                    <label className={'no-margin'}>Project price</label>
                                    <input required={true} className="form-control" type="number" value={this.state.projectForm?.PROJECT_PRICE}
                                           onChange={this.handleProjectPriceChange}/>
                                </div>
                                <div className={'form-group col-12 m-t-10 text-center'}>
                                    <label className={'no-margin'}>Project Paid</label>
                                    <input required={true} className="form-control" type="number" value={this.state.projectForm?.PROJECT_PAID}
                                           onChange={this.handleProjectPaidChange}/>
                                </div>
                                <div className={'form-group col-12 m-t-10 text-center'}>
                                    <label className={'no-margin'}>Project currency</label>
                                    <div className="dropdown mt-2 w-100">
                                        <button className="btn btn-secondary dropdown-toggle w-100" type="button"
                                                id="js-all-employees" data-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                            {this.state.projectForm.CURRENCY}
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="js-all-employees">
                                            {this.state.possibleCurrencies.map((currency, index) =>
                                                <a className="dropdown-item" key={index + currency}
                                                   onClick={() => this.handleCurrencyChange(currency)}>{currency}
                                                </a>
                                            )}
                                        </div>
                                        {/*<CreateEmployeeModal projectId={this.state.project.PROJECT_ID}*/}
                                        {/*                     employeeAdded={this.onEmployeeAdded}/>*/}
                                    </div>
                                </div>
                                <div className={'form-group col-12 m-t-10 text-center'}>
                                    <label className={'no-margin'}>Client</label>
                                    <div className="dropdown w-100">
                                        <button className="btn btn-secondary dropdown-toggle w-100" type="button"
                                                id="js-all-employees" data-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                            {this.state.selectedClient?.CLIENT_NAME}
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="js-all-employees">
                                            {this.state.allClients.map((client, index) =>
                                                <a className="dropdown-item" key={index}
                                                   onClick={() => this.handleAddingClient(client)}>{client.CLIENT_NAME}
                                                </a>
                                            )}
                                            {this.state.allClients.length === 0 &&
                                            <a className="dropdown-item">No clients inserted</a>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className={'col-12 mt-2 w-100 text-center'}>
                                    <CreateClientModal ref={this.createClientRef} clientAdded={this.onClientAdded}/>
                                </div>
                                <div className={'col-12 m-t-10'}>
                                    <button type={"submit"} className={"btn btn-primary w-100"}>Add project
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </ReactModal>
            </div>
        );
    }
}
