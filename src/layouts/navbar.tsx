import React, { useState, useEffect } from 'react';
import {
  Logo,
  ThemeToggle
} from '../components';
import NextLink from 'next/link';
import { Row, Col, Spacer, Link, useBodyScroll } from '@nextui-org/react';
import { Container } from '@nextui-org/react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { StyledNavContainer, StyledNavMainContainer } from './styles';
import Search from "../components/search";

export interface Props {
  hasNotify?: boolean;
  isSearchLoading: boolean;
  onSearchChange: (e) => Promise<void>
}
const Navbar: React.FC<Props> = ({ hasNotify, isSearchLoading, onSearchChange }) => {
  const [expanded, setExpanded] = useState(false);
  const isMobile = useMediaQuery(960);
  const [, setBodyHidden] = useBodyScroll(null, { scrollLayer: true });
  const [scrollPosition, setScrollPosition] = useState(
    (typeof window !== 'undefined' && window.pageYOffset) || 0
  );

  const detached = hasNotify ? scrollPosition > 30 : scrollPosition > 0;

  useEffect(() => {
    window.addEventListener('scroll', onScroll.bind(this));
    return () => {
      window.removeEventListener('scroll', onScroll.bind(this));
    };
  }, []);

  const onScroll = () => {
    requestAnimationFrame(() => {
      setScrollPosition(window.pageYOffset);
    });
  };

  useEffect(() => {
    if (!isMobile) {
      setExpanded(false);
      setBodyHidden(false);
    }
  }, [isMobile]);

  const showBlur = expanded || detached;

  return (
    <StyledNavMainContainer id="navbar-container">
      <StyledNavContainer detached={detached} showBlur={showBlur}>
        <Container
          lg={true}
          as="nav"
          display="flex"
          wrap="nowrap"
          alignItems="center"
        >
          <Col
            className="navbar__logo-container"
            css={{
              '@mdMax': {
                width: '100%'
              }
            }}
          >
            <Row justify="flex-start" align="center">
              <NextLink href="/">
                <Link href="/">
                  <Logo
                    auto
                    className="navbar__logo"
                    css={{
                      cursor: 'pointer',
                      transition: '$default'
                    }}
                  />
                </Link>
              </NextLink>
              <Spacer x={0.4} />
            </Row>
          </Col>
          <Col className="navbar__search-container">
            <Row
              className="navbar__search-row"
              justify="flex-end"
              align="center"
              css={{
                position: 'initial',
                jc: 'center',
              }}
            >
              <Search isLoading={isSearchLoading} onChange={onSearchChange}/>
            </Row>
          </Col>
          <Col
            className="navbar__menu-container"
            css={{
              size: '100%',
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <ThemeToggle
              className="navbar__social-icon-mobile"
              css={{ m: '0' }}
            />
          </Col>
        </Container>
      </StyledNavContainer>
    </StyledNavMainContainer>
  );
};

export default Navbar;
