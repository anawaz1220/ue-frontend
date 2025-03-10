import styled from 'styled-components';

export const FAQContainer = styled.section`
  padding: 4rem 2rem;
  background-color: #f9f9f9;
`;

export const FAQWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

export const FAQTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xxlarge};
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
`;

export const FAQSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.grey};
  text-align: center;
  margin-bottom: 3rem;
`;

export const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const AccordionItem = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  background-color: ${({ theme }) => theme.colors.white};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const AccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  cursor: pointer;
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.large};
`;

export const AccordionIcon = styled.span`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

export const AccordionContent = styled.div`
  padding: 0 1.5rem 1.5rem;
  border-top: 1px solid #eee;
`;

export const AccordionText = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.grey};
  margin-bottom: 1rem;
`;

export const AccordionImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
`;

export const AccordionImage = styled.img`
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;