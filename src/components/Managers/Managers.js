import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Manager from './Manager';

function Managers() {
    return (
        <>
            {
                new Array(10).fill('1').map((business, i) => (
                    <Manager key={i} n={i} />
                ))
            }
        </>
    )
}

export default Managers;