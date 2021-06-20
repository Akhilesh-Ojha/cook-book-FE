import {
  Box,
  Container,
  Typography,
  Grid,
  ListItemText,
  Divider,
  GridList,
  GridListTileBar,
  GridListTile,
} from "@material-ui/core";
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { fetchRecipe } from "../../../api/index";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { useDispatch, useSelector } from "react-redux";
import { getRecipesBySearch } from "../../../actions/recipes";
import ListItem from "@material-ui/core/ListItem";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    marginBottom: 50,
    minHeight: "100vh",
  },

  root: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(4),
    marginBottom: -16,
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },

  title: {
    color: "#101010",
    textAlign: "center",
    letterSpacing: "1px",
    textTransform: "uppercase",
    margin: "0",
    fontSize: "50px",
    lineHeight: "60px",
    fontWeight: "normal",
  },
  imageContainer: {
    width: "100%",
    height: "75vh",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    backgroundRepeat: "no-repeat",
  },
  recipe: {
    marginTop: 30,
    height: "auto",
    width: "70%",
  },
  ingredients: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginRight: "10",
  },

  subHeader: {
    fontSize: 40,
    marginBottom: 20,
  },
  method: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingLeft: "20 !important",
  },

  list: {
    position: "relative",
  },
  vertical: {
    borderLeft: "2px solid black",
    height: 80,
    marginRight: 20,
  },
  number: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 20,
  },
  icon: {
    fontSize: 12,
    marginRight: 10,
  },
  circularProgress: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },

  mainGrid: {
    marginTop: 40,
    minWidth: "100vw",
    height: "400px",
  },

  gridRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },

  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

const FetchRecipe = () => {
  const params = useParams();
  const classes = useStyles();
  const [recipe, setRecipeData] = useState(null);
  const recipeId = params?.id;
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { recipes } = useSelector((state) => state.recipes.recipes);

  const fetchRecipeHandler = useCallback(() => {
    setLoading(true);

    fetchRecipe(recipeId).then((data) => {
      setRecipeData({
        name: data.data.name,
        description: data.data.description,
        ingredients: data.data.ingredients,
        tags: data.data.tags,
        serves: data.data.serves,
        image: data.data.image.url,
      });
      setLoading(false);
    });
  }, [recipeId]);

  const stopLoading = () => {
    setLoading(false);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchRecipeHandler();
  }, [recipeId, fetchRecipeHandler]);

  useEffect(() => {
    if (recipe) {
      dispatch(
        getRecipesBySearch(
          { search: "none", tags: recipe.tags.join(",") },
          stopLoading
        )
      );
    }
  }, [recipe, dispatch]);

  return (
    <React.Fragment>
      {isLoading && (
        <div className={classes.circularProgress}>
          <CircularProgress />
        </div>
      )}

      {!isLoading && (
        <div className={classes.mainContainer}>
          <Container>
            <div className={classes.root}>
              <Typography className={classes.title} component="h3">
                {recipe?.name}
              </Typography>
            </div>
          </Container>

          <Box className={classes.imageContainer}>
            <img
              className={classes.image}
              src={recipe?.image}
              alt="recipe main"
            />
          </Box>

          <Container className={classes.recipe}>
            <Grid container spacing={5}>
              <Grid item sm={12} md={4} className={classes.ingredients}>
                <Typography
                  className={`${classes.title} ${classes.subHeader}`}
                  component="h4"
                  variant="h4"
                  fontWeight="fontWeightLight"
                >
                  Ingredients
                </Typography>

                <List>
                  {recipe?.ingredients.map((ing) => {
                    return (
                      <ListItem key={ing._id}>
                        <FiberManualRecordIcon className={classes.icon} />
                        <ListItemText>
                          <Typography className={classes.listText} variant="h6">
                            {ing.amount} {ing.ingredient}
                          </Typography>
                        </ListItemText>
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>
              <Grid item sm={12} md={8} className={classes.method}>
                <Typography
                  className={`${classes.title} ${classes.subHeader}`}
                  variant="h4"
                >
                  Cooking instructions
                </Typography>
                <List>
                  {recipe?.description.map((method, index) => {
                    return (
                      <ListItem className={classes.list} key={method._id}>
                        <div className={classes.number}>{index + 1}</div>

                        <div className={classes.vertical}></div>

                        <ListItemText>
                          <Typography className={classes.listText} variant="h6">
                            {method.step}
                          </Typography>
                        </ListItemText>
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>
            </Grid>
          </Container>
          <Divider variant="middle" />
          {recipes && (
            <Container className={classes.mainGrid}>
              <div className={classes.gridRoot}>
                <GridList className={classes.gridList} cols={2.5}>
                  {recipes.map((tile) => (
                    <GridListTile key={tile._id} style={{ height: "400px" }}>
                      <img src={tile.image.url} alt={tile.name} />
                      <GridListTileBar
                        title={tile.name}
                        classes={{
                          root: classes.titleBar,
                        }}
                      />
                    </GridListTile>
                  ))}
                </GridList>
              </div>
            </Container>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default FetchRecipe;
