  
import React from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../../../constants/routes';
import {
  FooterContainer,
  FooterNav,
  FooterLink
} from './Footer.styles';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterNav>
        <FooterLink as={Link} to={ROUTES.ABOUT}>
          About Us
        </FooterLink>
        <FooterLink as={Link} to={ROUTES.UE_IMPACT}>
          UE Impact
        </FooterLink>
        <FooterLink as={Link} to={ROUTES.TERMS}>
          Terms & Conditions
        </FooterLink>
        <FooterLink as={Link} to={ROUTES.PRIVACY}>
          Privacy Policy
        </FooterLink>
        <FooterLink as={Link} to={ROUTES.ADVERTISING}>
          Interest-Based Advertising
        </FooterLink>
        <FooterLink as={Link} to={ROUTES.ANTI_DISCRIMINATION}>
          Anti Discrimination Policy
        </FooterLink>
        <FooterLink as={Link} to={ROUTES.PARTNER_WELFARE}>
          Partner Welfare Policy
        </FooterLink>
      </FooterNav>
    </FooterContainer>
  );
};

export default Footer;