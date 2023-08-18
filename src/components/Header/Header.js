import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import Logo from "../Logo";
import SuperHeader from "../SuperHeader";

const Header = () => {
  // Our site features two visual headers, but they should be
  // grouped semantically as a single header.
  return (
    <HeaderWrapper>
      <SuperHeader />
      <MainHeader>
        <CenteringItem>
          <Logo />
        </CenteringItem>
        <Nav>
          <NavLink href="/sale">Sale</NavLink>
          <NavLink href="/new">New&nbsp;Releases</NavLink>
          <NavLink href="/men">Men</NavLink>
          <NavLink href="/women">Women</NavLink>
          <NavLink href="/kids">Kids</NavLink>
          <NavLink href="/collections">Collections</NavLink>
        </Nav>
        <CenteringItem />
      </MainHeader>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: ${COLORS.white};
`;

const CenteringItem = styled.div`
  flex: 1;
`;

const MainHeader = styled.div`
  padding: 0 32px;
  height: 72px;
  border-bottom: 1px solid ${COLORS.gray[300]};
  display: flex;
  align-items: center;
  gap: 48px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 48px;
`;

const NavLink = styled.a`
  font-size: 1.125rem;
  text-transform: uppercase;
  text-decoration: none;
  color: ${COLORS.gray[900]};
  font-weight: ${WEIGHTS.medium};

  &:first-of-type {
    color: ${COLORS.secondary};
  }
`;

export default Header;
