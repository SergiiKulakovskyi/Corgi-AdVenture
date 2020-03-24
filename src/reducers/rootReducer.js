import { createStore } from 'redux';

import { currentBusinessPrice, currentEarning } from '../utils';
import { businessInitialState } from '../game/defaults';

const initialState = {
    businesses: [
        ...businessInitialState.map(business => ({
            ...business,
            progress: 0,
            lastStart: null,
            manager: false,
            multiplier: 1,
            price: currentBusinessPrice(business.initialPrice, business.amount, business.priceGrowth),
            currentEarning: currentEarning(business.earning, business.amount)
        }))
    ],
    gameStarted: window.performance.now(),
    animation: {
        current: null
    },
    money: 1000001111
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREASE_MONEY': {
            const id = action.payload;
            const business = state.businesses[id];
            return {
                ...state,
                money: state.money + business.currentEarning
            }
        }
        case 'BUSINESS_START': {
            const {id, time} = action.payload;
            return {
                ...state,
                businesses: state.businesses.map( business => {
                    if (business.id === id) {
                        return {
                            ...business,
                            lastStart: time
                        }
                    }
                    return business;
                })
            }
        }
        case 'BUY_BUSINESS': {
            const id = action.payload;
            const { initialPrice, amount, priceGrowth } = state.businesses[id];
            return {
                ...state,
                money: state.money - currentBusinessPrice(initialPrice, amount, priceGrowth),
                businesses: state.businesses.map( business => {
                    if (business.id === id) {
                        return {
                            ...business,
                            amount: amount + 1,
                            price: currentBusinessPrice(initialPrice, amount + 1, priceGrowth),
                            currentEarning: currentEarning(business.earning, business.amount + 1)
                        }
                    }
                    return business;
                })
            }
        }
        case 'HIRE_MANAGER': {
            const id = action.payload;
            return {
                ...state,
                money: state.money - state.businesses[id].managerSalary,
                businesses: state.businesses.map( business => {
                    if (business.id === id) {
                        return {
                            ...business,
                            manager: true
                        }
                    }
                    return business;
                })
            }
        }
        case 'ANIMATION_UPDATE':
            return {
                ...state,
                animation: {
                    ...state.animation,
                    current: action.payload
                }
            }
        default:
            return state;
    }
};

export default createStore(
    rootReducer,
    // localStorage.getItem('gameState') 
    //     ? JSON.parse(localStorage.getItem('gameState'))
    //     : {},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);