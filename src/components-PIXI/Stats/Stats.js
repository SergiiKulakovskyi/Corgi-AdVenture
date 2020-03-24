import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Text, TextStyle } from 'pixi.js';

import { formatCurrency } from '../../utils';

const style = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 42,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#ffffff'],
    stroke: '#4a185099',
    strokeThickness: 5,
    dropShadowAlpha: 0.5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowAngle: Math.PI / 3,
    dropShadowDistance: 3,
});

function createStats(money) {
    const stats = new Text(money, style);
    stats.setTransform(245, 5);
    return stats;
}

function Stats({ app }) {
    const money = useSelector((store) => store.money);
    const [stats, setStats] = useState(null);

    useEffect(() => {
        setStats(app.stage.addChild(createStats()));
    }, []);

    useEffect(() => {
        if (stats) stats.text = '$' + formatCurrency(money);
    }, [money, stats]);

    return null;
}

export default Stats;
