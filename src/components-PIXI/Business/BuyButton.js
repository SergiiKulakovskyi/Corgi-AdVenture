import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, TextStyle, Sprite, Container } from 'pixi.js';

import * as actions from '../../actions/actions';
import { formatCurrency } from '../../utils';

function createContainer() {
    const container = new Container();
    container.setTransform(10, 8, 1.2, 1.2);
    return container;
}

function creatBackground() {
    const background = Sprite.from('./images/button.png');
    background.width = 293 / 2;
    background.height = 97 / 2;
    background.on('pointerover', (a) => (a.currentTarget.tint = 0xeeeeee));
    background.on('pointerout', (a) => (a.currentTarget.tint = 0xffffff));
    return background;
}

function createTitle() {
    const title = new Text(
        'Buy',
        new TextStyle({
            fontFamily: 'Arial',
            fontSize: 18,
            fontWeight: 'bold',
            fill: '#ffffff',
            stroke: '#d8782d',
            strokeThickness: 3,
        })
    );
    title.setTransform(12, 11);
    return title;
}

function createPriceTitle(name) {
    const title = new Text(
        name,
        new TextStyle({
            fontFamily: 'Arial',
            fontSize: 16,
            fill: '#ffffff',
            stroke: '#d8782d',
            strokeThickness: 3,
            wordWrap: true,
            wordWrapWidth: 20,
            align: 'center',
            lineHeight: 14,
        })
    );
    title.setTransform(95, 24);
    title.anchor.set(0.5, 0.5);
    return title;
}

function BuyButton({ wrapper, business }) {
    const dispatch = useDispatch();
    const money = useSelector((state) => state.money);
    const [priceElement, setPriceElement] = useState();
    const [buttonElement, setButtonElement] = useState();
    const [containerElement, setContainerElement] = useState();
    let inited = false;

    function onBusinessChange() {
        if (priceElement) priceElement.text = formatCurrency(business.price);
        if (buttonElement) buttonElement.interactive = money > business.price;
        if (containerElement) {
            if (!inited && business.amount) {
                inited = true;
                containerElement.setTransform(0, 33, 0.8, 0.8);
            }
            containerElement.alpha = money > business.price ? 1 : 0.3;
        }
    }

    function onInit() {
        const containerElement = createContainer();
        wrapper.addChild(containerElement);
        setContainerElement(containerElement);

        const buttonElement = creatBackground();
        buttonElement.buttonMode = true;
        buttonElement.interactive = money > business.price;
        buttonElement.on('pointerdown', () =>
            dispatch(actions.buyBusiness(business.id))
        );
        containerElement.addChild(buttonElement);
        setButtonElement(buttonElement);

        containerElement.addChild(createTitle());

        const priceElement = createPriceTitle();
        containerElement.addChild(priceElement);
        setPriceElement(priceElement);
    }

    useEffect(onInit, []);
    useEffect(onBusinessChange, [
        money,
        business,
        priceElement,
        buttonElement,
        containerElement,
    ]);

    return null;
}

export default BuyButton;
