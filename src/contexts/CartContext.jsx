import React, { createContext, useReducer, useContext } from 'react';

// Initial state for the cart
const initialState = {
  items: [],
  totalAmount: 0,
};

// Create context
const CartContext = createContext();

// Actions for cart operations
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
const CLEAR_CART = 'CLEAR_CART';

// Reducer function to handle cart state updates
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { service } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === service.id);
      
      if (existingItemIndex >= 0) {
        // If item already exists, increment quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        
        return {
          ...state,
          items: updatedItems,
          totalAmount: state.totalAmount + service.price
        };
      } else {
        // Add new item with quantity 1
        return {
          ...state,
          items: [...state.items, { ...service, quantity: 1 }],
          totalAmount: state.totalAmount + service.price
        };
      }
    }
    
    case REMOVE_FROM_CART: {
      const { serviceId } = action.payload;
      const existingItem = state.items.find(item => item.id === serviceId);
      
      if (!existingItem) return state;
      
      // Remove item completely if quantity is 1, otherwise decrement
      if (existingItem.quantity === 1) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== serviceId),
          totalAmount: state.totalAmount - existingItem.price
        };
      } else {
        return {
          ...state,
          items: state.items.map(item => 
            item.id === serviceId 
              ? { ...item, quantity: item.quantity - 1 } 
              : item
          ),
          totalAmount: state.totalAmount - existingItem.price
        };
      }
    }
    
    case UPDATE_QUANTITY: {
      const { serviceId, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === serviceId);
      
      if (!existingItem) return state;
      
      // Calculate new total based on quantity change
      const quantityDifference = quantity - existingItem.quantity;
      const priceDifference = existingItem.price * quantityDifference;
      
      // Remove item if quantity is 0
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== serviceId),
          totalAmount: state.totalAmount - (existingItem.price * existingItem.quantity)
        };
      }
      
      return {
        ...state,
        items: state.items.map(item => 
          item.id === serviceId ? { ...item, quantity } : item
        ),
        totalAmount: state.totalAmount + priceDifference
      };
    }
    
    case CLEAR_CART:
      return initialState;
      
    default:
      return state;
  }
};

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  // Actions
  const addToCart = (service) => {
    dispatch({
      type: ADD_TO_CART,
      payload: { service }
    });
  };
  
  const removeFromCart = (serviceId) => {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: { serviceId }
    });
  };
  
  const updateQuantity = (serviceId, quantity) => {
    dispatch({
      type: UPDATE_QUANTITY,
      payload: { serviceId, quantity }
    });
  };
  
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };
  
  const value = {
    cart: state.items,
    totalAmount: state.totalAmount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };
  
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;