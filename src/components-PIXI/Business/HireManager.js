import { useEffect, useState } from 'react';
import { Text, TextStyle } from 'pixi.js';

const style = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 14,
    fontWeight: 'bold',
    fill: ['#000000'],
    stroke: '#ffffff',
    strokeThickness: 2,
    wordWrap: true,
    wordWrapWidth: 50,
    align: 'right',
});

function createTitle() {
    const title = new Text('Hire Manager', style);
    title.setTransform(-105, 32);
    title.anchor.set(0.5, 0.5);
    return title;
}

function HireManager({ wrapper, business, money, hireManager }) {
    const [nameElement, setNameElement] = useState();

    function isDisabled() {
        return (
            money < business.managerSalary ||
            business.manager ||
            business.amount < 1
        );
    }

    useEffect(() => {
        const buttonElement = wrapper.addChild(createTitle());
        buttonElement.on('pointerdown', hireManager);
        setNameElement(buttonElement);
    }, []);

    useEffect(() => {
        if (nameElement) {
            nameElement.buttonMode = true;
            nameElement.interactive = !isDisabled();
            nameElement.alpha = isDisabled() ? 0.2 : 1;
            nameElement.visible = !business.manager;
        }
    }, [money, nameElement]);

    return null;
}

export default HireManager;
