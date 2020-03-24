import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { priceFormatter, timeFormatter } from '../../utils';

import * as actions from '../../actions/actions';

import './Business.scss';

function Business({ business }) {
    const dispatch = useDispatch();
    const businessEffector = useSelector(store => store.businesses[business.id]);
    const money = useSelector(store => store.money);
    const [progress, setProgress] = useState(0);
    const [timeLeft, setTimeLeft] = useState(timeFormatter(0))

    const requestRef = React.useRef()

    function businessStart() {
        dispatch(actions.start(business.id, business.amount, window.performance.now()));
    }

    function hireManager() {
        dispatch(actions.hireManager(business.id));
        if (business.lastStart === null) {
            businessStart();
        }
    }

    function checkProgress(time) {
        let currentProgress = (time ? time - business.lastStart : 0) / 1000 / business.time

        if (currentProgress >= 1) {
            currentProgress = 0;
            business.lastStart = null;
            cancelAnimationFrame(requestRef.current);
            dispatch(actions.increaseMoney(business.id));
            if (business.manager) {
                businessStart();
            }
        }
        setProgress(currentProgress);
        setTimeLeft(timeFormatter(business.time * (1-currentProgress)));
    }

    function render(time) {
        requestRef.current = requestAnimationFrame(render);
        
        checkProgress(time);
    }

    useEffect(() => {
        if (business.lastStart) {
            requestRef.current = requestAnimationFrame(render);
        }
        return () => cancelAnimationFrame(requestRef.current);
    }, [businessEffector]);

    return (
        <>
            <Grid item xs={3}>
                <Typography variant="h5" gutterBottom noWrap={true}>
                    <IconButton
                        disabled={money < business.managerSalary || business.manager || business.amount < 1 }
                        onClick={hireManager}
                        color="secondary" aria-label="upload picture"
                    >
                        { business.manager ? <PeopleAltIcon style={{color: '#000'}} /> : <GroupAddIcon /> }
                    </IconButton>
                    {business.name}
                </Typography>
                <Typography variant="button" gutterBottom>
                    Amount: {business.amount}
                </Typography>

                <LinearProgress variant="determinate" value={progress * 100}
                    style={{height: 40}}>sfdfd</LinearProgress>
                <Button onClick={businessStart} disabled={!business.amount || !!business.lastStart} fullWidth={true}
                    style={{height: 40, marginTop: '-40px', display: 'block'}}
                >
                    ${ business.currentEarning }
                </Button>           

                <Box mt={2}>
                    <Grid container alignItems="center">
                        <Grid item xs={8}>
                            <Button
                                disabled={money < business.price}
                                onClick={() => dispatch(actions.buyBusiness(business.id))}
                                variant="contained"
                                color="primary"
                                fullWidth={true}
                                startIcon={<ShoppingCartIcon />}
                            >
                                {priceFormatter(business.price)}
                            </Button>
                        </Grid>
                        <Grid item xs={4} align="center">
                            <Typography variant="button">
                                {timeLeft}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </>
    )
}

export default Business;