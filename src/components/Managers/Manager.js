import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Manager(props) {
    return (
        <>
            <div>{`Manager ${props.n}`}</div>
        </>
    )
}

export default Manager;