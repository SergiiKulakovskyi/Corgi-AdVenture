export const businessStart = (id, time) => ({
    type: 'BUSINESS_START',
    payload: { id, time },
});

export const finished = (id, time) => ({
    type: 'BUSINESS_FINISHED',
    payload: { id, time },
});

export const buyBusiness = (id) => ({
    type: 'BUY_BUSINESS',
    payload: { id },
});

export const hireManager = (id, time) => ({
    type: 'HIRE_MANAGER',
    payload: { id, time },
});
