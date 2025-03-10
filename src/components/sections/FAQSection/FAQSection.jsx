import React, { useState } from 'react';
import {
  FAQContainer,
  FAQWrapper,
  FAQTitle,
  FAQSubtitle,
  AccordionContainer,
  AccordionItem,
  AccordionHeader,
  AccordionIcon,
  AccordionContent,
  AccordionText,
  AccordionImageContainer,
  AccordionImage
} from './FAQSection.styles';

const FAQSection = () => {
  // State to track which FAQ is currently expanded
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Toggle function for accordion items
  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // FAQ data
  const faqs = [
    {
      question: "What is Urban Ease?",
      answer: "Urban Ease is an online home services marketplace. It was started in 2025 by Tanveer Kour and Asif Nawaz! We currently operate in Sudbury, ON.",
      images: []
    },
    {
      question: "How to place a booking?",
      answer: "You can follow the steps below to book a service on our app:\n\n1. Search for the service on the home screen for the category you are looking for.\n2. Open the category and follow the instructions as you proceed ahead.\n3. Once you have booked a service, wait for the professional to get assigned. Professional will be assigned 1 hour prior to your booking time.\n4. Assigned professional will reach your address at the time of the booking and will deliver the service.",
      images: ["/assets/images/booking-steps.png"]
    },
    {
      question: "What if someone is unable to make payments?",
      answer: "If you are not able to complete payment, please try the following steps:\n\n• Select a different payment mode than the one you're trying with (e.g. try using your debit card, credit card)\n• If multiple payment options are failing or pay after service is not available - please wait for some time and try placing the booking again.\n• If any amount has been debited and the booking shows \"payment failed\" - please don't worry. Any debited amount will be credited back to your source account within 7 working days.",
      images: []
    }
  ];

  return (
    <FAQContainer>
      <FAQWrapper>
        <FAQTitle>Frequently Asked Questions</FAQTitle>
        <FAQSubtitle>Find answers to common questions about Urban Ease services</FAQSubtitle>
        
        <AccordionContainer>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} isExpanded={expandedIndex === index}>
              <AccordionHeader onClick={() => toggleAccordion(index)}>
                {faq.question}
                <AccordionIcon isExpanded={expandedIndex === index}>
                  {expandedIndex === index ? '−' : '+'}
                </AccordionIcon>
              </AccordionHeader>
              
              {expandedIndex === index && (
                <AccordionContent>
                  <AccordionText dangerouslySetInnerHTML={{ __html: faq.answer.replace(/\n/g, '<br />') }} />
                  
                  
                </AccordionContent>
              )}
            </AccordionItem>
          ))}
        </AccordionContainer>
      </FAQWrapper>
    </FAQContainer>
  );
};

export default FAQSection;