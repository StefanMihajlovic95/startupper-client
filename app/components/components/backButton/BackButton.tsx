import {useHistory} from "react-router-dom";
import React from "react";

export const BackButton = () => {
    let history = useHistory();
    return (
        <div className={"back-button-wrapper"}>
            <div data-tid="backButton" className={"float-left"}>
                <i className="fa fa-arrow-left fa-3x cursor-pointer" onClick={() => history.goBack()}/>
            </div>
        </div>
    );
};
