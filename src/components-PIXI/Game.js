import React, { useRef, useEffect, useState } from 'react';
import { Application, Sprite } from 'pixi.js';

import Stats from './Stats/Stats';
import BusinesTable from './Business/BusinessTable';
import Avatar from './Avatar/Avatar';

function creatBackground(width, height) {
    const background = Sprite.from('./images/bg.jpg');
    background.width = width;
    background.height = height;
    background.alpha = 0.5;
    return background;
}

const Game = () => {
    const canvas = useRef();
    const size = { width: 960, height: 540 };
    const [app, setApp] = useState(null);

    useEffect(() => {
        const app = new Application({
            view: canvas.current,
            antialias: true,
            width: 960,
            height: 540,
            backgroundColor: 0x6b29a3,
            resolution: Math.min(window.devicePixelRatio, 2),
            autoResize: true,
        });
        app.stage.addChild(creatBackground(size.width, size.height));
        setApp(app);
    }, []);

    return (
        <>
            <canvas ref={canvas} width={size.width} height={size.height} />
            {app && (
                <>
                    <Stats app={app} />
                    <BusinesTable app={app} />
                    <Avatar app={app} />
                    {/* <Managers /> */}
                </>
            )}
        </>
    );
};

export default Game;
