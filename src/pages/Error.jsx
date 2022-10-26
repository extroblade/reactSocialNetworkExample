import React from 'react';
import {Link} from "react-router-dom";

const Error = () => {
    return (
        <div>
            <h1>
                <Link to={'/about'}  style={{color: 'red', textDecoration: 'none'}}>
                    Очень жесткая ошибка, почти 400
                </Link>

            </h1>
        </div>
    );
};

export default Error;