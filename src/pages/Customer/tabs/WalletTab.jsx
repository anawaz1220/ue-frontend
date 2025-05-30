// src/pages/Customer/tabs/WalletTab.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import Typography from '../../../components/common/Typography';
import Button from '../../../components/common/Button';

const WalletContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const BalanceSection = styled.div`
  background: linear-gradient(to right, ${props => props.theme.colors.primary}, ${props => props.theme.colors.orange});
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.large};
  color: ${props => props.theme.colors.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.large};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const BalanceInfo = styled.div`
  flex: 1;
`;

const BalanceLabel = styled(Typography)`
  font-size: ${props => props.theme.fontSizes.medium};
  opacity: 0.8;
  margin-bottom: ${props => props.theme.spacing.small};
`;

const BalanceAmount = styled(Typography)`
  font-size: 48px;
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-bottom: ${props => props.theme.spacing.small};
`;

const LastUpdated = styled(Typography)`
  font-size: ${props => props.theme.fontSizes.small};
  opacity: 0.6;
`;

const BalanceActions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.medium};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-top: ${props => props.theme.spacing.medium};
    width: 100%;
    justify-content: space-between;
  }
`;

const WhiteButton = styled(Button)`
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.fontWeights.medium};
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
  }
`;

const TransactionSection = styled.div`
  margin-top: ${props => props.theme.spacing.xlarge};
`;

const TransactionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.medium};
`;

const FilterSelect = styled.select`
  padding: ${props => props.theme.spacing.small} ${props => props.theme.spacing.medium};
  border: 1px solid ${props => props.theme.colors.lightGrey};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: ${props => props.theme.fontSizes.medium};
  background-color: ${props => props.theme.colors.white};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const TransactionList = styled.div`
  border: 1px solid ${props => props.theme.colors.lightGrey};
  border-radius: ${props => props.theme.borderRadius.medium};
  overflow: hidden;
`;

const TransactionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.medium} ${props => props.theme.spacing.large};
  border-bottom: 1px solid ${props => props.theme.colors.lightGrey};
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const TransactionInfo = styled.div`
  flex: 1;
`;

const TransactionDescription = styled(Typography)`
  font-weight: ${props => props.theme.fontWeights.medium};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const TransactionDate = styled(Typography)`
  color: ${props => props.theme.colors.grey};
  font-size: ${props => props.theme.fontSizes.small};
`;

const TransactionAmount = styled(Typography)`
  font-weight: ${props => props.theme.fontWeights.semiBold};
  color: ${props => props.amount > 0 ? props.theme.colors.success : props.theme.colors.error};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-top: ${props => props.theme.spacing.small};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xlarge} ${props => props.theme.spacing.large};
  color: ${props => props.theme.colors.grey};
`;

const WalletTab = ({ walletData }) => {
  const [transactionType, setTransactionType] = useState('all');
  
  // Filter transactions based on type
  const filteredTransactions = walletData.transactions.filter(transaction => {
    if (transactionType === 'all') return true;
    return transaction.type === transactionType;
  });
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const formatAmount = (amount) => {
    const prefix = amount > 0 ? '+' : '';
    return `${prefix}$${Math.abs(amount).toFixed(2)}`;
  };
  
  return (
    <WalletContainer>
      <BalanceSection>
        <BalanceInfo>
          <BalanceLabel variant="body1">Your Wallet Balance</BalanceLabel>
          <BalanceAmount variant="h1">${walletData.balance.toFixed(2)}</BalanceAmount>
          <LastUpdated variant="caption">Last updated: {new Date().toLocaleString()}</LastUpdated>
        </BalanceInfo>
        
        <BalanceActions>
          <WhiteButton>Add Money</WhiteButton>
          <WhiteButton>Withdraw</WhiteButton>
        </BalanceActions>
      </BalanceSection>
      
      <TransactionSection>
        <TransactionHeader>
          <Typography variant="h2">Transaction History</Typography>
          
          <FilterSelect 
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
          >
            <option value="all">All Transactions</option>
            <option value="credit">Credits Only</option>
            <option value="debit">Debits Only</option>
          </FilterSelect>
        </TransactionHeader>
        
        <TransactionList>
          {filteredTransactions.length === 0 ? (
            <EmptyState>
              <Typography variant="body1">No transactions found</Typography>
            </EmptyState>
          ) : (
            filteredTransactions.map(transaction => (
              <TransactionItem key={transaction.id}>
                <TransactionInfo>
                  <TransactionDescription variant="body1">
                    {transaction.description}
                  </TransactionDescription>
                  <TransactionDate variant="caption">
                    {formatDate(transaction.date)}
                  </TransactionDate>
                </TransactionInfo>
                
                <TransactionAmount variant="h3" amount={transaction.amount}>
                  {formatAmount(transaction.amount)}
                </TransactionAmount>
              </TransactionItem>
            ))
          )}
        </TransactionList>
      </TransactionSection>
    </WalletContainer>
  );
};

export default WalletTab;