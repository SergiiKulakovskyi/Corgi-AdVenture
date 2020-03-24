import { useEffect } from 'react';
import { Graphics, Container } from 'pixi.js';
import 'pixi-spine';

function createAvatar(image) {
    const avatar = new Container();
    avatar.setTransform(100, 125, 0.6, 0.6);

    const myMask = avatar.addChild(new Container());

    const circleWrapper = avatar.addChild(new Graphics());
    circleWrapper.lineStyle(10, 0xffbd01, 1, 1);
    circleWrapper.beginFill(0xde3249, 1);
    circleWrapper.drawCircle(0, 0, 120);
    circleWrapper.endFill();

    const circle = myMask.addChild(new Graphics());
    circle.lineStyle(0);
    circle.beginFill(0xde3249, 1);
    circle.drawCircle(0, 0, 120);
    circle.endFill();

    const square = myMask.addChild(new Graphics());
    square.beginFill(0xde3249);
    square.drawRect(-125, -200, 250, 200);
    square.endFill();

    avatar.addChild(image);
    image.position.set(-30, 170);
    image.mask = myMask;

    return avatar;
}

function randomAnimation(neddy) {
    const animationName = Math.round(Math.random()) ? 'anim1' : 'anim2';
    const timeDelay = (Math.random() * 3 + 2) * 1000;
    neddy.state.setAnimation(0, animationName, false);
    setTimeout(() => randomAnimation(neddy), timeDelay);
}

export default function SpineAnimation({ app }) {
    function onAssetsLoaded(_, resource) {
        const neddy = new PIXI.spine.Spine(resource.neddy.spineData);
        const avatar = createAvatar(neddy);
        app.stage.addChild(avatar);

        randomAnimation(neddy);
    }

    useEffect(() => {
        app.loader
            .add('neddy', './CorgiAnimation/Corgi.json')
            .load(onAssetsLoaded);
    }, []);

    return null;
}
