import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./loader.scss";
import logo from "./video.gif";

function Loader() {
    return (
        <div className="loader-wrap">
            <img className="loader-wrap__image" src={logo} alt="animate" />
        </div>
    );
}

export default Loader;
