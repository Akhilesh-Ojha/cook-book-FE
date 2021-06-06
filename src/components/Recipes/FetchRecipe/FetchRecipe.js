import {
  Box,
  Container,
  Typography,
  Grid,
  ListItemText,
} from "@material-ui/core";
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { fetchRecipe } from "../../../api/index";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
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
    // fontWeight: "100 !important",
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
    height: "100vh",
    width: "70%",
  },
  ingredients: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
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
  // listText: {
  //   fontSize: "18px !important",
  //   position:
  // },
}));

const FetchRecipe = () => {
  const params = useParams();
  const classes = useStyles();
  const [recipe, setRecipeData] = useState(null);
  const productId = params?.id;
  const [isLoading, setLoading] = useState(false);

  const fetchRecipeHandler = useCallback(() => {
    setLoading(true);

    fetchRecipe(productId).then((data) => {
      setRecipeData({
        name: data.data.name,
        description: data.data.description,
        ingredients: data.data.ingredients,
        tags: data.data.tags,
        serves: data.data.serves,
        image: data.data.image,
      });
      setLoading(false);
    });
  }, [productId]);

  useEffect(() => {
    window.scroll(0, 0);
    fetchRecipeHandler();
  }, [productId, fetchRecipeHandler]);

  console.log("recipe", recipe);
  return (
    // <React.Fragment>
    // {/* <h3 className={classes.title}>{recipe?.name}</h3> */}
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
                      <ListItem>
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
                      <ListItem className={classes.list}>
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
        </div>
      )}
    </React.Fragment>
  );
};

export default FetchRecipe;
