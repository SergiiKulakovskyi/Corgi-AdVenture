import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import * as actions from '../../actions/actions';
import ProgressBar from './ProgressBar';
import BuyButton from './BuyButton';

function Business({ business }) {
    const dispatch = useDispatch();
    const money = useSelector((state) => state.money);
    const businessStart = () =>
        dispatch(actions.businessStart(business.id, new Date().getTime()));
    const hireManager = () => {
        dispatch(actions.hireManager(business.id, new Date().getTime()));
        if (!business.timeStarted) businessStart();
    };

    return (
        <>
            <Grid item xs={3}>
                <Typography variant="h5" noWrap={true}>
                    <IconButton
                        disabled={
                            money < business.managerSalary ||
                            business.manager ||
                            business.amount < 1
                        }
                        onClick={hireManager}
                        color="secondary"
                    >
                        {business.manager ? (
                            <PeopleAltIcon style={{ color: '#000' }} />
                        ) : (
                            <GroupAddIcon />
                        )}
                    </IconButton>
                    {business.name}
                </Typography>
                <Typography variant="button">
                    Amount: {business.amount}
                </Typography>

                <ProgressBar
                    business={business}
                    businessStart={businessStart}
                />

                <BuyButton business={business} />
            </Grid>
        </>
    );
}

export default Business;
