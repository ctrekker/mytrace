import React from 'react';
import {Link} from "react-router-dom";

function Data(props) {
    return (
        <div>
            This is the data page
            <Link to={'/'}>Go home</Link>
        </div>
    )
}

export default Data;