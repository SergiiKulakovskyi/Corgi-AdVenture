import { useEffect, useState } from 'react';
import { Text, TextStyle, Graphics, Container } from 'pixi.js';

const style = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 32,
    fontWeight: 'bold',
    fill: ['#ffffff'],
    stroke: '#4a185099',
    strokeThickness: 2,
    dropShadowAlpha: 0.5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowAngle: Math.PI / 3,
    dropShadowDistance: 3,
});

function createTitle(name) {
    const container = new Container();
    container.position.set(-35, 35);

    const circleWrapper = container.addChild(new Graphics());
    circleWrapper.lineStyle(3, 0xee7230, 1, 1);
    circleWrapper.beginFill(0xa3b8ce, 1);
    circleWrapper.drawCircle(0, 0, 30);
    circleWrapper.endFill();

    const title = container.addChild(new Text(name, style));
    title.setTransform(1, -5);
    title.anchor.set(0.5, 0.5);

    return container;
}

function createAmount() {
    const title = new Text('2222', {
        ...style,
        fontSize: 14,
        dropShadow: false,
        fill: '#333333',
        strokeThickness: 0,
    });
    title.setTransform(-35, 52);
    title.anchor.set(0.5, 0.5);
    return title;
}

function BusinessTitle({ wrapper, name, amount }) {
    const [titleElement, setTitleElement] = useState();
    const [amountElement, setAmountElement] = useState();

    useEffect(() => {
        const Abbr = name
            .split(' ')
            .reduce((result, name) => result + name[0], '');

        const title = wrapper.addChild(createTitle(Abbr));
        setTitleElement(title);

        setAmountElement(wrapper.addChild(createAmount()));
    }, []);

    useEffect(() => {
        if (amountElement) amountElement.text = `${amount}`;
    }, [amount, amountElement]);

    return null;
}

export default BusinessTitle;
