import React from 'react';
import styled from 'styled-components';
import Typography from '../common/Typography';
import { useCart } from '../../contexts/CartContext';

const CartItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.small} 0;
  border-bottom: 1px solid ${props => props.theme.colors.lightGrey};
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled(Typography)`
  font-weight: ${props => props.theme.fontWeights.medium};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const ItemPrice = styled(Typography)`
  color: ${props => props.theme.colors.grey};
  font-size: ${props => props.theme.fontSizes.medium};
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  margin-left: ${props => props.theme.spacing.medium};
`;

const QuantityButton = styled.button`
  width: 24px;
  height: 24px;
  background: ${props => props.theme.colors.lightBackground};
  border: 1px solid ${props => props.theme.colors.lightGrey};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.fontSizes.small};
  cursor: pointer;
  
  &:hover {
    background: ${props => props.theme.colors.lightGrey};
  }
`;

const QuantityText = styled.span`
  margin: 0 ${props => props.theme.spacing.small};
  width: 20px;
  text-align: center;
`;

const CartItem = ({ item }) => {
  const { addToCart, removeFromCart } = useCart();
  
  const formatCurrency = (amount) => {
    return '$' + amount.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };
  
  return (
    <CartItemContainer>
      <ItemDetails>
        <ItemName variant="body1">{item.name}</ItemName>
        <ItemPrice>{formatCurrency(item.price)}</ItemPrice>
      </ItemDetails>
      
      <QuantityControls>
        <QuantityButton onClick={() => removeFromCart(item.id)}>-</QuantityButton>
        <QuantityText>{item.quantity}</QuantityText>
        <QuantityButton onClick={() => addToCart(item)}>+</QuantityButton>
      </QuantityControls>
    </CartItemContainer>
  );
};

export default CartItem;