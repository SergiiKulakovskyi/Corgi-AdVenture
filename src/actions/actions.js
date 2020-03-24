export const increaseMoney = id => ({
    type: 'INCREASE_MONEY',
    payload: id
});

export const start = (id, amount, time) => ({
    type: 'BUSINESS_START',
    payload: {id, amount, time}
});

export const animationUpdate = (time) => ({
    type: 'ANIMATION_UPDATE',
    payload: time
});

export const buyBusiness = (id) => ({
    type: 'BUY_BUSINESS',
    payload: id
});

export const hireManager = (id) => ({
    type: 'HIRE_MANAGER',
    payload: id
});