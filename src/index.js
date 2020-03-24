import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Stage, Sprite } from '@inlet/react-pixi'

import App from './App';
import store from './reducers/rootReducer';

store.subscribe(() => {
    localStorage.setItem('gameState', JSON.stringify(store.getState()))
})

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);


render(
    <Provider store={store}>
        <Stage width={1024} height={640}>
            <Sprite image="./neddy-face-2.png" x={0} y={0} width={100} height={100} />
        </Stage>
    </Provider>,
    document.getElementById('container')
);
