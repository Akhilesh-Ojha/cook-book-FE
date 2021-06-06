import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: "auto",
    backgroundColor: theme.palette.primary.main,
    // padding: "20px 0px",
    height: "25vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // paddingTop: "20",
  },

  title: {
    color: "white",
  },
  social: {
    marginTop: 20,
    display: "flex",
    listStyle: "none",
    alignItems: "center",
    justifyContent: "center",
    padding: "0px",
    // margin: "1rem 0 3rem 0",
  },

  socialLi: {
    marginRight: "10px",
  },

  link: {
    textDecoration: "none",
    color: "white",
  },

  icon: {
    fontSize: 40,
    transition: "color .4s ease",

    "&:hover, &:focus": {
      color: "aqua",
      // border: "1px solid #2c0d00",
    },
  },

  credits: {
    // marginTop: 10,
    color: "white",
  },
}));

const FooterBar = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <Typography className={classes.title} variant="h6">
        Cook Book - By Akhilesh Ojha
      </Typography>
      <ul className={classes.social}>
        <li className={classes.socialLi}>
          <Link to="/" className={classes.link}>
            <FacebookIcon className={classes.icon} />
          </Link>
        </li>
        <li className={classes.socialLi}>
          <Link to="/" className={classes.link}>
            <InstagramIcon className={classes.icon} />
          </Link>
        </li>

        <li className={classes.socialLi}>
          <Link to="/" className={classes.link}>
            <LinkedInIcon className={classes.icon} />
          </Link>
        </li>
        <li className={classes.socialLi}>
          <Link to="/" className={classes.link}>
            <TwitterIcon className={classes.icon} />{" "}
          </Link>
        </li>
      </ul>
      <div className={classes.credits}>
        <Typography className={classes.credits} variant="h6">
          Background Image credits: Rachel, Mathew.
        </Typography>
      </div>
    </div>
  );
};

export default FooterBar;
