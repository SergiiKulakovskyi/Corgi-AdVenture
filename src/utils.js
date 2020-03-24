export const formatTime = (time) => new Date(time).toISOString().substr(11, 8);

const toFixedTwo = (currency) =>
    currency.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

export const formatCurrency = (currency) => {
    const formated =
        currency >= 1.0e12
            ? toFixedTwo(currency / 1.0e12) + ' trillion'
            : currency >= 1.0e9
            ? toFixedTwo(currency / 1.0e9) + ' billion'
            : currency >= 1.0e6
            ? toFixedTwo(currency / 1.0e6) + ' million'
            : toFixedTwo(currency);
    return formated;
};

// TODO
const largeNumbers = [
    'Million',
    'Billion',
    'Trillion',
    'Quadrillion',
    'Quintillion',
    'Sextillion',
    'Septillion',
    'Octillion',
    'Nonillion',
    'Decillion',
    'Undecillion',
    'Duodecillion',
    'Tredecillion',
    'Quattuordecillion',
    'Quindecillion',
    'Sexdecillion',
    'Septendecillion',
    'Octodecillion',
    'Novemdecillion',
    'Vigintillion',
    'Centillion',
];
