import React from 'react';
import styled from 'styled-components';
import Typography from '../common/Typography';

const PromiseContainer = styled.div`
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 1px solid ${props => props.theme.colors.lightGrey};
  background-color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.medium};
  position: relative;
`;

const PromiseHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.medium};
`;

const PromiseTitle = styled(Typography)`
  font-weight: ${props => props.theme.fontWeights.semiBold};
`;

const PromiseBadge = styled.div`
  position: absolute;
  top: ${props => props.theme.spacing.medium};
  right: ${props => props.theme.spacing.medium};
  width: 50px;
  height: 50px;
  background-image: url('/images/quality-assured.svg');
  background-size: contain;
  background-repeat: no-repeat;
`;

const PromiseList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const PromiseItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.small};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const CheckIcon = styled.div`
  margin-right: ${props => props.theme.spacing.small};
  color: ${props => props.theme.colors.success};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ServicePromise = ({ items }) => {
  return (
    <PromiseContainer>
      <PromiseHeader>
        <PromiseTitle variant="h3">UE Promise</PromiseTitle>
        <PromiseBadge />
      </PromiseHeader>
      
      <PromiseList>
        {items.map(item => (
          <PromiseItem key={item.id}>
            <CheckIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </CheckIcon>
            <Typography variant="body1">{item.text}</Typography>
          </PromiseItem>
        ))}
      </PromiseList>
    </PromiseContainer>
  );
};

export default ServicePromise;