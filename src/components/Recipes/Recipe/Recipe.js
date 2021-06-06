import React, { useState, useEffect, useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { useHistory, Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useDispatch } from "react-redux";
import { deleteRecipe, likeRecipe } from "../../../actions/recipes";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
// import { bookMarkRecipe } from "../../../actions/auth";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { bookMarkRecipe } from "../../../api/index";
// import { getUser } from "../../../api/index";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    maxHeight: 500,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: "#e91e63",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  likeClass: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  likeCount: {
    marginTop: 2,
    fontSize: 18,
    marginLeft: -5,
    color: "#707070",
  },
  bookmark: {
    cursor: "pointer",
    marginRight: 10,
    color: "#707070",
  },
}));

const Recipe = ({
  name,
  image,
  description,
  ingredients,
  serves,
  likeCount,
  createdAt,
  id,
  author,
  userId,
  bookMarkedRecipesOfUser,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const routeHandler = () => {
    history.push(`/edit-recipe/${id}`);
  };

  const [isOwner, setIsOwner] = useState(false);
  const [ownerLiked, setOwnerLiked] = useState(false);
  // const [likeCountFE, setLikeCountFE] = useState(likeCount.length);
  const [isuserBookmarkedRecipe, setUserBookmarkedRecipe] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { _id } = author;

  useEffect(() => {
    if (_id === userId) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, [userId, _id]);

  useEffect(() => {
    let index = likeCount.findIndex((id) => id === userId);
    if (index === -1) {
      setOwnerLiked(false);
    } else {
      setOwnerLiked(true);
    }
  }, [likeCount, userId]);

  const deleteRecipeDispatch = () => {
    dispatch(deleteRecipe(id, history));
  };

  const heartRecipe = () => {
    dispatch(likeRecipe(id));
  };

  const getBookMarkedRecipesOfUser = useCallback(
    async (shouldBookmark) => {
      if (shouldBookmark === "bookmark") {
        bookMarkedRecipesOfUser.push(id);
      }
      const index = bookMarkedRecipesOfUser.findIndex((recId) => recId === id);
      if (index !== -1) {
        setUserBookmarkedRecipe(true);
      } else {
        setUserBookmarkedRecipe(false);
      }
    },
    [id, bookMarkedRecipesOfUser]
  );

  useEffect(() => {
    getBookMarkedRecipesOfUser();
  }, [userId, getBookMarkedRecipesOfUser]);

  const bookMarkRecipeHandler = async () => {
    const { data } = await bookMarkRecipe(id);
    if (data) {
      getBookMarkedRecipesOfUser("bookmark");
    }
  };

  return (
    <Grid item xs={12} md={4}>
      <Card className={classes.root} raised elevation={5}>
        <CardMedia className={classes.media} image={image} title={name} />
        <CardHeader
          title={
            <Link to={`recipes/${id}`}>
              {name.toUpperCase().substring(0, 24)}
            </Link>
          }
          subheader="September 14, 2016"
          action={
            isOwner && (
              <React.Fragment>
                <IconButton aria-label="settings" onClick={handleClick}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="fade-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                >
                  <MenuItem onClick={routeHandler}>
                    <ListItemIcon>
                      <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography style={{ marginLeft: "-20px" }}>
                      Edit
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={deleteRecipeDispatch}>
                    <ListItemIcon>
                      <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography style={{ marginLeft: "-20px" }}>
                      Delete
                    </Typography>
                  </MenuItem>
                </Menu>
              </React.Fragment>
            )
          }
        />

        <CardActions className={classes.actions}>
          <div className={classes.likeClass}>
            {ownerLiked ? (
              <IconButton aria-label="add to favorites" onClick={heartRecipe}>
                <FavoriteIcon style={{ color: "#ED4956" }} />
              </IconButton>
            ) : (
              <IconButton aria-label="add to favorites" onClick={heartRecipe}>
                <FavoriteBorderIcon disabled={!userId} />
              </IconButton>
            )}
            <div className={classes.likeCount}>{likeCount.length}</div>
          </div>

          {isuserBookmarkedRecipe ? (
            <BookmarkIcon
              className={classes.bookmark}
              onClick={bookMarkRecipeHandler}
              style={{ color: "#1976D1" }}
            />
          ) : (
            <BookmarkBorderIcon
              className={classes.bookmark}
              onClick={bookMarkRecipeHandler}
            />
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Recipe;
