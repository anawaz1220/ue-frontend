import React from 'react';
import styled from 'styled-components';
import Typography from '../common/Typography';
import Button from '../common/Button';
import CartItem from './CartItem';
import { useCart } from '../../contexts/CartContext';

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 1px solid ${props => props.theme.colors.lightGrey};
  background-color: ${props => props.theme.colors.white};
  height: fit-content;
`;

const CartHeader = styled.div`
  padding: ${props => props.theme.spacing.medium};
  border-bottom: 1px solid ${props => props.theme.colors.lightGrey};
`;

const CartContent = styled.div`
  padding: ${props => props.theme.spacing.medium};
  max-height: 50vh;
  overflow-y: auto;
  
  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.lightBackground};
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.lightGrey};
    border-radius: 4px;
  }
`;

const EmptyCartMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.large};
  text-align: center;
`;

const CartIcon = styled.div`
  margin-bottom: ${props => props.theme.spacing.medium};
  svg {
    width: 64px;
    height: 64px;
    color: ${props => props.theme.colors.lightGrey};
  }
`;

const CartTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.medium};
  border-top: 1px solid ${props => props.theme.colors.lightGrey};
`;

const CartTotalButton = styled(Button)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.medium} ${props => props.theme.spacing.large};
`;

const Cart = () => {
  const { cart, totalAmount } = useCart();
  
  const formatCurrency = (amount) => {
    return '$' + amount.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };
  
  return (
    <CartContainer>
      <CartHeader>
        <Typography variant="h3">Cart</Typography>
      </CartHeader>
      
      {cart.length === 0 ? (
        <EmptyCartMessage>
          <CartIcon>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </CartIcon>
          <Typography variant="body1">No items in your cart</Typography>
        </EmptyCartMessage>
      ) : (
        <>
          <CartContent>
            {cart.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </CartContent>
          
          <CartTotal>
            <CartTotalButton color="primary">
              <span>{formatCurrency(totalAmount)}</span>
              <span>View Cart</span>
            </CartTotalButton>
          </CartTotal>
        </>
      )}
    </CartContainer>
  );
};

export default Cart;