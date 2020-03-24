import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, TextStyle, Sprite, Graphics, Rectangle } from 'pixi.js';

import { formatTime, formatCurrency } from '../../utils';
import * as actions from '../../actions/actions';

function progressBar() {
    const graphics = new Graphics();
    graphics.beginFill(0x000000);
    graphics.drawRect(0, 0, 400 / 2, 70 / 2);
    graphics.endFill();
    graphics.x = -200;
    graphics.interactive = false;
    graphics.hitArea = new Rectangle(0, 0, 0, 0);
    return graphics;
}

function createCurrentProfitTitle() {
    const title = new Text(
        '',
        new TextStyle({
            fontFamily: 'Arial',
            fontSize: 32,
            fontWeight: 'bold',
            fill: '#ffffff',
            stroke: '#d8782d',
            strokeThickness: 5,
        })
    );
    title.setTransform(200 / 2, 32 / 2);
    title.anchor.set(0.5, 0.5);
    title.scale.set(0.5);
    return title;
}

function createTimeTitle() {
    const title = new Text(
        '00:00:00',
        new TextStyle({
            fontFamily: 'Arial',
            fontSize: 16,
            fontWeight: 'bold',
            fill: '#ffffff',
            stroke: '#d8782d',
            strokeThickness: 3,
        })
    );
    title.setTransform(39, 16);
    title.anchor.set(0.5, 0.5);
    return title;
}

function creatTimeBackground() {
    const background = Sprite.from('./images/time.png');
    background.width = 157 / 2;
    background.height = 70 / 2;
    background.setTransform(120, 35);
    return background;
}

function creatProgressBarBackground() {
    const background = Sprite.from('./images/progress-back.png');
    background.width = 198;
    background.height = 33;
    background.setTransform(0, 0);
    background.buttonMode = true;
    background.interactive = true;
    background.on('pointerover', (a) => (a.currentTarget.tint = 0xeeeeee));
    background.on('pointerout', (a) => (a.currentTarget.tint = 0xffffff));
    return background;
}

function creatProgressBarForeground() {
    const background = Sprite.from('./images/progress-front.png');
    background.width = 377 / 2;
    background.height = 47 / 2;
    background.setTransform(9 / 2, 8 / 2);
    return background;
}

function ProgressBar({ wrapper, business, businessStart }) {
    const dispatch = useDispatch();
    const [progress, setProgress] = useState(0);
    const [timeLeft, setTimeLeft] = useState(formatTime(0));
    const requestRef = React.useRef();
    const timeStarted = useSelector((state) => business.timeStarted);
    const [timeElement, setTimeElement] = useState();
    const [
        progressBarBackgroundElement,
        setProgressBarBackgroundElement,
    ] = useState();
    const [timeBackgroundElement, setTimeBackgroundElement] = useState();
    const [currentProfitElement, setCurrentProfitElement] = useState();
    const [maskElement, setMaskElement] = useState();

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

    function isDisabled() {
        return !business.amount || !!business.timeStarted;
    }

    function onInit() {
        const timeBackground = wrapper.addChild(creatTimeBackground());
        setTimeBackgroundElement(timeBackground);

        setTimeElement(timeBackground.addChild(createTimeTitle()));

        const progressBarBackground = wrapper.addChild(
            creatProgressBarBackground()
        );
        progressBarBackground.on('pointerdown', businessStart);

        const mask = progressBarBackground.addChild(progressBar());
        setMaskElement(mask);

        const progressBarForeground = progressBarBackground.addChild(
            creatProgressBarForeground()
        );
        progressBarForeground.mask = mask;
        setProgressBarBackgroundElement(progressBarBackground);

        setCurrentProfitElement(
            progressBarBackground.addChild(createCurrentProfitTitle())
        );
    }

    function onBusinessChange() {
        if (timeElement) timeElement.text = timeLeft;
        if (progressBarBackgroundElement) {
            progressBarBackgroundElement.alpha = isDisabled() ? 0.5 : 1;
            timeBackgroundElement.alpha = !business.amount ? 0.5 : 1;
            progressBarBackgroundElement.interactive = !isDisabled();
        }
        if (currentProfitElement) {
            currentProfitElement.text =
                '$' + formatCurrency(business.currentProfit);
        }
        if (maskElement)
            maskElement.x = business.timeStarted ? -200 * (1 - progress) : -200;
    }

    useEffect(onInit, []);
    useEffect(onBusinessChange, [
        timeLeft,
        maskElement,
        timeBackgroundElement,
        business,
        progress,
    ]);

    return null;
}

export default ProgressBar;
