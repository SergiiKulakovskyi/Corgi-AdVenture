import React from 'react';
import { useSelector } from 'react-redux';

import Typography from '@material-ui/core/Typography';

import { formatCurrency } from '../../utils';

function Stats() {
    const money = useSelector((store) => store.money);

    return (
        <Typography variant="h2" gutterBottom>
            $ {formatCurrency(money)}
        </Typography>
    );
}

export default Stats;
