import React from 'react';
import {axiosApiInstance} from "../../../interceptors/axios-interceptor";
import {toast} from "react-toastify";

export default class FileUpload extends React.Component<{}, { selectedFile: any, allFiles: [] }> {

    constructor(prop: any) {
        super(prop);
        this.state = {selectedFile: null, allFiles: []};
        this.onFileUpload = this.onFileUpload.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.getFiles();
        this.getFiles = this.getFiles.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
    }

    getFiles() {
        axiosApiInstance.get('files/' + this.props.folderName + '/' + this.props.subfolderName).then(response => {
            this.setState({allFiles: response.data});
        }, error => {
        });
    }

    convertBase64DataToPDFAndDownload(base64: string, fileName) {
        // create a download anchor tag
        var downloadLink = document.createElement('a');
        downloadLink.target = '_blank';
        downloadLink.download = fileName;

        // convert downloaded data to a Blob
        var blob = new Blob([base64], {type: 'application/jpg'});

        // create an object URL from the Blob
        var URL = window.URL || window.webkitURL;
        var downloadUrl = URL.createObjectURL(blob);

        // set object URL as the anchor's href
        downloadLink.href = downloadUrl;

        // append the anchor to document body
        document.body.appendChild(downloadLink);

        // fire a click event on the anchor
        downloadLink.click();

        // cleanup: remove element and revoke object URL
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(downloadUrl);
    }

    downloadFile(fileName: string) {
        axiosApiInstance.get('files/' + this.props.folderName + '/' + this.props.subfolderName + '/' + fileName).then(response => {
            this.convertBase64DataToPDFAndDownload(response.data, fileName);
        }, error => {
        });
    }

    deleteFile(fileName: string) {
        axiosApiInstance.delete('files/' + this.props.folderName + '/' + this.props.subfolderName + '/' + fileName).then(response => {
            let fileIndex = this.state.allFiles.findIndex(x => x.name === fileName);
            let newFilesArr = this.state.allFiles;
            if (fileIndex !== -1) {
                newFilesArr.splice(fileIndex, 1);
                this.setState({allFiles: newFilesArr});
            }
            toast('Successfully deleted document');
        }, error => {
        });
    }

    onFileChange(event: any) {
        // Update the state
        this.setState({selectedFile: event.target.files[0]});
    };

    // On file upload (click the upload button)
    onFileUpload() {
        // Create an object of formData
        const formData = new FormData();
        // Update the formData object
        formData.append("file", this.state.selectedFile, this.state.selectedFile.name);
        formData.append("folder_name", this.props.folderName);
        formData.append("subfolder_name", this.props.subfolderName);
        // Send formData object
        axiosApiInstance.post('upload/' + this.props.folderName + '/' + this.props.subfolderName, formData).then(response => {
            this.state.allFiles.push({name: this.state.selectedFile.name});
            this.setState({selectedFile: null});
            toast('Successfully uploaded document');
        }, error => {
            toast('ERROR! File size cannot be larger than 2MB!');
        });
    };

    render() {
        return (
            <div className={"m-t-32"}>
                <div>
                    <input type="file" onChange={this.onFileChange} accept="application/pdf"/>
                    <button className={"btn btn-primary"} onClick={this.onFileUpload}
                            disabled={!this.state.selectedFile}>
                        Upload!
                    </button>
                </div>
                <div className={"row"}>
                    {this.state.allFiles.map((file, index) =>
                        <div className={"col-12 mt-1"} key={index}>
                            <button className={"btn btn-primary"} onClick={() => this.downloadFile(file.name)}>
                                <i className="fas fa-download"/>
                                {file.name}
                            </button>
                            <button className={"btn btn-danger ml-1"} onClick={() => this.deleteFile(file.name)}>
                                <i className="fas fa-trash"/>
                            </button>
                        </div>
                    )}
                </div>
                {/*{this.fileData()}*/}
            </div>
        );
    }
}
