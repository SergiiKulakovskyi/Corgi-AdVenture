import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Business from './Business';

import { Container } from 'pixi.js';

function createContainer() {
    const container = new Container();
    container.setTransform(350, 65);
    return container;
}

function BusinessTable({ app }) {
    const businesses = useSelector((store) => store.businesses);
    const [container, setCotainer] = useState(container);

    useEffect(() => {
        setCotainer(app.stage.addChild(createContainer()));
    }, []);

    return (
        <>
            {container &&
                businesses.map((business, index) => (
                    <Business
                        key={business.id}
                        business={business}
                        wrapper={container}
                        index={index}
                    />
                ))}
        </>
    );
}

export default BusinessTable;
