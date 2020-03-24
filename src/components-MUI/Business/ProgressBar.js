import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { formatTime, formatCurrency } from '../../utils';
import * as actions from '../../actions/actions';

function ProgressBar({ business, businessStart }) {
    const dispatch = useDispatch();
    const [progress, setProgress] = useState(0);
    const [timeLeft, setTimeLeft] = useState(formatTime(0));
    const requestRef = React.useRef();
    const timeStarted = useSelector((state) => business.timeStarted);

    function render() {
        requestRef.current = requestAnimationFrame(render);
        const time = new Date().getTime();
        const currentProgress =
            (time - business.timeStarted) / business.duration;
        const normalizedProgress = currentProgress % 1;
        const secondsLeft = business.duration * (1 - normalizedProgress);

        if (currentProgress >= 1) {
            cancelAnimationFrame(requestRef.current);
            dispatch(actions.finished(business.id, time));
        }

        setProgress(normalizedProgress);
        setTimeLeft(formatTime(secondsLeft));
    }

    useEffect(() => {
        if (business.timeStarted) {
            requestRef.current = requestAnimationFrame(render);
        } else {
            if (business.manager) {
                businessStart();
            }
        }
        return () => cancelAnimationFrame(requestRef.current);
    }, [timeStarted]);

    return (
        <>
            <LinearProgress
                variant="determinate"
                value={business.timeStarted ? progress * 100 : 0}
                style={{ height: 40 }}
            ></LinearProgress>

            <Button
                variant="outlined"
                color="primary"
                onClick={businessStart}
                disabled={!business.amount || !!business.timeStarted}
                fullWidth={true}
                style={{ height: 40, marginTop: '-40px', display: 'block' }}
            >
                ${formatCurrency(business.currentProfit)}
            </Button>

            <Typography variant="button">{timeLeft}</Typography>
        </>
    );
}

export default ProgressBar;
