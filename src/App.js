import React from 'react';

import GameMUI from './components-MUI/Game';
import GamePIXI from './components-PIXI/Game';

function App() {
    return (
        <>
            <GamePIXI />
            <GameMUI />
        </>
    );
}

export default App;
