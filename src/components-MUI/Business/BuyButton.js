import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Button from '@material-ui/core/Button';

import * as actions from '../../actions/actions';
import { formatCurrency } from '../../utils';

function BuyButton({ business }) {
    const dispatch = useDispatch();
    const money = useSelector((state) => state.money);

    return (
        <Button
            disabled={money < business.price}
            onClick={() => dispatch(actions.buyBusiness(business.id))}
            variant="contained"
            color="primary"
            fullWidth={true}
            startIcon={<ShoppingCartIcon />}
        >
            {formatCurrency(business.price)}
        </Button>
    );
}

export default BuyButton;
