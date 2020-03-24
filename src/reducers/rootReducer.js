import { createStore } from 'redux';
import { businessInitialState } from './defaults';

const currentBusinessPrice = (price, amount, priceGrowth) => {
    return price * Math.pow(priceGrowth, amount);
};

function earnedSinceLastActivity(business, time) {
    const timeLast = time - business.timeStarted;
    if (business.manager) {
        const timesEarned = Math.floor(timeLast / business.duration);
        return [
            timesEarned * business.currentProfit,
            time - (timeLast - timesEarned * business.duration),
        ];
    }
    return [business.currentProfit, null];
}

const initialState = {
    businesses: [
        ...businessInitialState.map((business) => ({
            ...business,
            progress: 0,
            timeStarted: null,
            manager: false,
            price: currentBusinessPrice(
                business.initialPrice,
                business.amount,
                business.priceGrowth
            ),
            currentProfit: business.profit * business.amount,
        })),
    ],
    gameStarted: new Date().getTime(),
    money: 500,
    version: 2,
};

const getBusinessById = (state, action) =>
    state.businesses.find((business) => business.id === action.payload.id);

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'BUSINESS_START': {
            const businessActive = getBusinessById(state, action);
            return {
                ...state,
                businesses: state.businesses.map((business) => {
                    if (business.id === businessActive.id) {
                        return {
                            ...business,
                            timeStarted: action.payload.time,
                        };
                    }
                    return business;
                }),
            };
        }
        case 'BUSINESS_FINISHED': {
            const businessActive = getBusinessById(state, action);

            const [earned, newTimeStarted] = earnedSinceLastActivity(
                businessActive,
                action.payload.time
            );

            return {
                ...state,
                money: state.money + earned,
                businesses: state.businesses.map((business) => {
                    if (business.id === businessActive.id) {
                        return {
                            ...business,
                            timeStarted: newTimeStarted,
                        };
                    }
                    return business;
                }),
            };
        }
        case 'BUY_BUSINESS': {
            const businessActive = getBusinessById(state, action);
            const { initialPrice, amount, priceGrowth } = businessActive;
            return {
                ...state,
                money: state.money - businessActive.price,
                businesses: state.businesses.map((business) => {
                    if (business.id === businessActive.id) {
                        return {
                            ...business,
                            amount: amount + 1,
                            price: currentBusinessPrice(
                                initialPrice,
                                amount + 1,
                                priceGrowth
                            ),
                            currentProfit:
                                business.profit * (business.amount + 1),
                        };
                    }
                    return business;
                }),
            };
        }
        case 'HIRE_MANAGER': {
            const businessActive = getBusinessById(state, action);
            return {
                ...state,
                money: state.money - businessActive.managerSalary,
                businesses: state.businesses.map((business) => {
                    if (business.id === businessActive.id) {
                        return {
                            ...business,
                            manager: true,
                            timeStarted: !businessActive.timeStarted
                                ? action.payload.time
                                : businessActive.timeStarted,
                        };
                    }
                    return business;
                }),
            };
        }
        default:
            return state;
    }
};

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return;
        }
        const json = JSON.parse(serializedState);
        if (json.version !== initialState.version) {
            localStorage.clear();
            return;
        }
        return json;
    } catch (err) {
        return;
    }
};

const store = createStore(
    rootReducer,
    loadState(),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() =>
    localStorage.setItem('state', JSON.stringify(store.getState()))
);

export default store;
