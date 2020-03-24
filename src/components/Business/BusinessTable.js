import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Business from './Business';

function BusinessTable() {
    const businesses = useSelector(store => store.businesses);

    return (
        <Grid container spacing={4}>
            {
                businesses.map((business) => (
                    <Business key={business.id} business={business} />
                ))
            }
        </Grid>
    )
}

export default BusinessTable;