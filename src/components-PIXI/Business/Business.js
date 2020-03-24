import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Container } from 'pixi.js';

import * as actions from '../../actions/actions';
import BusinessTitle from './BusinessTitle';
import ProgressBar from './ProgressBar';
import BuyButton from './BuyButton';
import HireManager from './HireManager';

function createContainer(index) {
    const container = new Container();
    container.setTransform(Math.floor(index / 5) * 350, (index % 5) * 95);
    return container;
}

function Business({ business, wrapper, index }) {
    const dispatch = useDispatch();
    const money = useSelector((state) => state.money);

    const businessStart = () =>
        dispatch(actions.businessStart(business.id, new Date().getTime()));
    const hireManager = () => {
        dispatch(actions.hireManager(business.id, new Date().getTime()));
        if (!business.timeStarted) businessStart();
    };

    const [container, setCotainer] = useState(container);

    useEffect(() => {
        const container = wrapper.addChild(createContainer(index));

        setCotainer(container);
    }, []);

    return (
        <>
            {container && (
                <>
                    <BuyButton wrapper={container} business={business} />
                    <BusinessTitle
                        wrapper={container}
                        name={business.name}
                        amount={business.amount}
                    />
                    {!!business.amount && (
                        <>
                            <ProgressBar
                                wrapper={container}
                                business={business}
                                businessStart={businessStart}
                            />
                            <HireManager
                                wrapper={container}
                                business={business}
                                money={money}
                                hireManager={hireManager}
                            />
                        </>
                    )}
                </>
            )}
        </>
    );
}

export default Business;
