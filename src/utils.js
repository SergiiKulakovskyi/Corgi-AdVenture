export function currentBusinessPrice(price, amount, priceGrowth) {
    return price * Math.pow(priceGrowth, amount);
}

export function currentEarning(earning, amount) {
    return earning * amount;
}

export function priceFormatter(price) {
    return price.toFixed(2);
}

export function timeFormatter(time) {
    return new Date(time * 1000).toISOString().substr(11, 8)
}