import React from 'react';
import { useSelector } from 'react-redux';

import Typography from '@material-ui/core/Typography';

function Stats() {
    const money = useSelector(store => store.money);

    return (
        <Typography variant="h2" gutterBottom>
            ${money.toFixed(2)}
        </Typography>
    )
}

export default Stats;