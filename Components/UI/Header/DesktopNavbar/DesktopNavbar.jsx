"use client";
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Link from "next/link";
import Image from "next/image";
import Paper from "@mui/material/Paper";
import { usePathname } from "next/navigation";
import { headerLinks } from "@/utils/headerLinks";
import HeaderArrowIcon from "../../Icons/HeaderArrowIcon";
import useScrollTrigger from '@mui/material/useScrollTrigger';
import PropTypes from 'prop-types';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styles from "./DesktopNavbar.module.scss";

function DesktopNavbar(props) {
  const [showMenu, setShowMenu] = useState(-1);
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  const menuItems = headerLinks.map((item, index) => {
    const isOpen = showMenu === index;

    return (
      <li
        className={styles.link}
        key={index}
        onMouseEnter={() => setShowMenu(index)}
        onMouseLeave={() => setShowMenu(-1)}
      >
        <div className={styles.navTrigger}>
          {!item.subLinks ? (
            <Link
              href={item.url}
              className={`${styles.navLink} ${isActive(item.url) ? styles.active : ""}`}
            >
              <Typography component="span" variant="body1" className={styles.navText}>
                {item.label}
              </Typography>
            </Link>
          ) : (
            <Typography
              component="span"
              variant="body1"
              className={`${styles.navText} ${styles.navParent}`}
            >
              {item.label}
            </Typography>
          )}

          {item.subLinks && (
            <HeaderArrowIcon className={`${styles.arrow} ${isOpen ? styles.rotate : ""}`} />
          )}
        </div>

        {item.subLinks && (
          <Paper
            component="ul"
            variant="outlined"
            className={`${styles.sublinksContainer} ${isOpen ? styles.sublinksOpen : ""}`}
          >
            {item.subLinks.map((subLink, subIndex) => (
              <li key={subIndex}>
                <Link
                  href={subLink.url}
                  passHref
                  onClick={() => setTimeout(() => setShowMenu(-1), 200)}
                >
                  {subLink.graphic && (
                    <Image
                      className={`${styles.iconWrapper} border-radius-8`}
                      src={subLink.graphic}
                      alt={subLink.label}
                      width="48"
                      height="48"
                      quality={100}
                    />
                  )}
                  <div className={styles.labelWrapper}>
                    <Typography
                      className={styles.subLink}
                      component="span"
                      variant="subtitle1"
                    >
                      {subLink.label}
                    </Typography>
                    <Typography
                      className={styles.subLink}
                      component="span"
                      variant="body2"
                    >
                      {subLink.subtitle}
                    </Typography>
                  </div>
                </Link>
              </li>
            ))}
          </Paper>
        )}
      </li>
    );
  });

  return (
    <ElevationScroll {...props}>

    <AppBar
      className={styles.section}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters className={styles.gridLinksWrapper}>
          <Link href="/" className={styles.logoLink}>
            <Image
              src="/logo.png"
              width={184}
              height={51}
              alt="Darmar Group"
              className={styles.logo}
              priority
            />
          </Link>

          <div className={styles.linksWrapper}>
            <ul className={styles.navList}>
              {menuItems}
            </ul>
            <Link href="/get-free-quote" className={styles.ctaLink}>
              <Button size="large" variant="contained" endIcon={<ArrowForwardIcon />} className={styles.ctaButton}>
                Get a Quote
              </Button>
            </Link>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
    </ElevationScroll>
  );
}

export default DesktopNavbar;


function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return children
    ? React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
      })
    : null;
}

ElevationScroll.propTypes = {
  children: PropTypes.element,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
