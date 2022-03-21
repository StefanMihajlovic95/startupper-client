import React from 'react';
import ReactModal from 'react-modal';
import {axiosApiInstance} from "../../../interceptors/axios-interceptor";
import {toast} from "react-toastify";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        marginRight: '-50%',
        height: '60%',
        width: '50%',
        transform: 'translate(-50%, -50%)'
    }
};

export default class CreateClientModal extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            showModal: false,
            clientForm: {
                CLIENT_NAME: '',
                CITY: '',
                COUNTRY: ''
            }
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
    }

    handleOpenModal() {
        this.setState({showModal: true});
    }

    handleCloseModal() {
        this.setState({showModal: false});
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

    handleSubmit(event: any) {
        event.preventDefault();
        event.stopPropagation();
        axiosApiInstance.post('add-new-client', this.state.clientForm).then(response => {
            this.props.clientAdded(response.data.data);
            this.setState({
                clientForm: {
                    CLIENT_NAME: '',
                    CITY: '',
                    COUNTRY: ''
                }
            });
            // Calling toast method by passing string
            toast('Successfully added client');
        }, error => {
        });
    }

    render() {
        return (
            <div className={'m-t-10'}>
                <button type={"button"} className={"btn btn-primary"} onClick={this.handleOpenModal}>
                    Create new client
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
                                <h4 className={"text-center"}>Create new client</h4>
                                <div className={'form-group col-12 m-t-10 text-center'}>
                                    <label className={'no-margin'}>Client name</label>
                                    <input required={true} className="form-control" type="text"
                                           value={this.state.clientForm?.CLIENT_NAME}
                                           onChange={this.handleNameChange}/>
                                </div>
                                <div className={'form-group col-12 m-t-10 text-center'}>
                                    <label className={'no-margin'}>Client city</label>
                                    <input required={true} className="form-control" type="text"
                                           value={this.state.clientForm?.CITY}
                                           onChange={this.handleCityChange}/>
                                </div>
                                <div className={'form-group col-12 m-t-10 text-center'}>
                                    <label className={'no-margin'}>Client country</label>
                                    <input required={true} className="form-control" type="text"
                                           value={this.state.clientForm?.COUNTRY}
                                           onChange={this.handleCountryChange}/>
                                </div>
                                <div className={'col-12 m-t-10 text-center'}>
                                    <button type={"submit"} className={"btn btn-primary w-100"}>Add client
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
