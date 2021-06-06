import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link, useLocation, useHistory } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { authAction } from "../../store/auth-slice";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import InfoIcon from "@material-ui/icons/Info";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
      textTransform: "uppercase",
    },
  },
  sectionDesktop: {
    display: "none",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  actionLink: {
    marginRight: 50,
    color: "white",
    textTransform: "uppercase",
  },
  actionLinkText: {
    fontSize: 16,
    letterSpacing: 1.5,
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  appBar: {
    padding: 10,
  },
  signIn: {
    color: "white",
    border: "1px solid white",
  },
  mobileMain: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
}));

const HeaderBar = ({ onOpenLoginModal }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const location = useLocation();
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // const handleMobileMenuClose = () => {
  //   setMobileMoreAnchorEl(null);
  // };

  const handleMenuClose = () => {
    setAnchorEl(null);
    // handleMobileMenuClose();
  };

  const logoutHandler = () => {
    dispatch(authAction.logout());
    handleMenuClose();
    history.replace("/home");
    onOpenLoginModal();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isLoggedIn && (
        <div>
          <Link to="/add-recipe">
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon style={{ minWidth: "30px" }}>
                <AddCircleOutlineIcon fontSize="small" />
              </ListItemIcon>
              Add Recipe
            </MenuItem>
          </Link>
          <Link to="/">
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon style={{ minWidth: "30px" }}>
                <InfoIcon fontSize="small" />
              </ListItemIcon>
              About
            </MenuItem>
          </Link>
          <Link to="/recipes/bookmarked">
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon style={{ minWidth: "30px" }}>
                <BookmarkBorderIcon fontSize="small" />
              </ListItemIcon>
              Bookmarked
            </MenuItem>
          </Link>
          <MenuItem onClick={logoutHandler}>
            <ExitToAppIcon style={{ minWidth: "30px" }}>
              <BookmarkBorderIcon fontSize="small" />
            </ExitToAppIcon>
            Logout
          </MenuItem>
        </div>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  const whiteClass = {
    color: "white",
  };

  const noDisplay = {
    display: "none",
  };

  const display = {
    display: "block",
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.grow}>
        <AppBar
          className={classes.appBar}
          position="fixed"
          color={
            scrollY > 0 ||
            location.pathname === "/add-recipe" ||
            location.pathname.includes("/edit-recipe") ||
            location.pathname.includes("/recipes")
              ? "primary"
              : "transparent"
          }
        >
          <Toolbar>
            <Link to="/" style={whiteClass}>
              {" "}
              <Typography
                style={
                  scrollY === 0 && location.pathname === "/home"
                    ? noDisplay
                    : display
                }
                className={classes.title}
                variant="h5"
                noWrap
              >
                Cook Book
              </Typography>
            </Link>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Link to={"/recipes"} className={classes.actionLink}>
                <Typography variant="h6" className={classes.actionLinkText}>
                  Recipes
                </Typography>
              </Link>
              {!isLoggedIn && (
                <Button
                  variant="outlined"
                  className={classes.signIn}
                  onClick={onOpenLoginModal}
                >
                  SIGN IN
                </Button>
              )}
            </div>
            {isLoggedIn && (
              <div className={classes.sectionDesktop}>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                >
                  <AccountCircle style={{ color: "white", fontSize: 30 }} />
                </IconButton>
              </div>
            )}
            <div className={classes.sectionMobile}>
              <div className={classes.mobileMain}>
                <Link
                  to={"/recipes"}
                  className={classes.actionLink}
                  style={{ marginRight: "15px" }}
                >
                  <Typography variant="h6" className={classes.actionLinkText}>
                    Recipes
                  </Typography>
                </Link>
                {!isLoggedIn && (
                  <Button
                    variant="outlined"
                    className={classes.signIn}
                    onClick={onOpenLoginModal}
                  >
                    SIGN IN
                  </Button>
                )}
              </div>
              {isLoggedIn && (
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle style={{ color: "white" }} />
                </IconButton>
              )}
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </div>
    </React.Fragment>
  );
};

export default HeaderBar;
