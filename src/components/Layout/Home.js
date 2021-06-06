import React, { useEffect, useState } from "react";
import { Container, Box, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import Home1 from "../../assets/Home1.jpg";
// import Home2 from "../../assets/Home2.jpg";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../actions/recipes";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { Link } from "react-router-dom";
import Home3 from "../../assets/Home3.jpg";
import Home4 from "../../assets/Home4.jpg";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  home: {
    margin: 0,
    padding: 0,
  },
  box: {
    height: "100vh",
    width: "100vw",
    background: `linear-gradient(rgba(35,43,56,0.3),rgba(35,43,56,0.9)), url(${Home4})`,
    // backgroundImage: `url(${Home1})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    margin: 0,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },

  cookBook: {
    width: "14ch",
    animation: `$typing 2s steps(22), blink .5s step-end infinite alternate`,
    whiteSpace: "nowrap",
    overflow: "hidden",
    borderRight: "2px solid",
  },

  "@keyframes typing": {
    from: {
      width: 0,
    },
  },
  "@keyframes blink": {
    "50%": {
      borderColor: "transparent",
    },
  },

  grid: {
    height: "75vh",
    width: "100vw",
    margin: 0,
    padding: 0,
  },

  mainGrid: {
    marginTop: 40,
    minWidth: "100vw",
    height: "400px",
  },
  subHeading: {
    minWidth: "100vw",
    display: "flex",
    justifyContent: "center",
    marginTop: 40,
    textTransform: "uppercase",
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
    width: "100%",
    // height: "100vh",
  },
  title: {
    color: theme.palette.primary,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  buttonAllRecipe: {
    fontSize: 20,
  },
  addNewRecipe: {
    height: "70vh",
    minWidth: "100vw",
    margin: 0,
    padding: 0,
    background: `linear-gradient(rgba(35,43,56,0.3),rgba(35,43,56,0.9)), url(${Home3})`,
    // backgroundImage: `url(${Home1})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    display: "flex",
    // justifyContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  addText: {
    display: "flex",
    flexDirection: "column",
    color: "white",
    width: "700px",
    // marginRight: 100,
  },
  textTitle: {
    fontSize: 40,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 20,
    // width: "80%",
  },
  textPara: {
    flexWrap: "wrap",
    fontSize: 18,
    letterSpacing: 1.5,
    marginBottom: 30,
    marginRight: 5,
    // width: "100%",
  },
  flexWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    fontSize: 25,
    color: "white",
    outline: "white",
    border: "1px solid white",
    borderRadius: 40,
    width: "50%",
    "&:hover, &:focus": {
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      // border: "1px solid #2c0d00",
    },
  },
  linkText: {
    color: "white",
  },
}));

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { recipes } = useSelector((state) => state.recipes.recipes);
  const [isLoading, setIsLoading] = useState(false);

  const stopLoading = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    window.scroll(0, 0);
    setIsLoading(true);
    dispatch(getRecipes(1, stopLoading));
  }, [dispatch]);

  const navigateHandler = () => {
    history.push("/add-recipe");
  };
  return (
    <Container className={classes.home}>
      <Box className={classes.box}>
        <Typography variant="h1" className={classes.cookBook}>
          COOK - BOOK.
        </Typography>
      </Box>
      <Container className={classes.grid}>
        <div className={classes.subHeading}>
          <Typography variant="h3">Newly Added Recipes</Typography>
        </div>

        <Container className={classes.mainGrid}>
          <GridList className={classes.gridList} cols={2.5} cellHeight={400}>
            {isLoading && (
              <div className={classes.loading}>
                <CircularProgress />
              </div>
            )}
            {!isLoading &&
              recipes?.map((tile) => (
                <GridListTile key={tile._id}>
                  <img src={tile.image} alt={tile.title} />
                  <Link to={`recipes/${tile._id}`}>
                    <GridListTileBar
                      title={tile.name}
                      classes={{
                        root: classes.titleBar,
                        title: classes.title,
                      }}
                      actionIcon={
                        <IconButton aria-label={`star ${tile.title}`}>
                          <StarBorderIcon className={classes.title} />
                        </IconButton>
                      }
                    />
                  </Link>
                </GridListTile>
              ))}
          </GridList>
        </Container>

        <div className={classes.subHeading}>
          <Link to="/recipes">
            <Button
              size="large"
              className={classes.buttonAllRecipe}
              // variant="outlined"
              variant="contained"
              color="primary"
            >
              View All Recipes
            </Button>
          </Link>
        </div>
      </Container>
      <div className={classes.addNewRecipe}>
        <div className={classes.addText}>
          <div className={classes.flexWrapper}>
            <Typography variant="h5" className={classes.textTitle}>
              Do you have a recipe?
            </Typography>
          </div>

          <Typography variant="h6" className={classes.textPara}>
            The support from you all not only makes me want to experiment with
            food, it begets the creation of this website. I want to keep on
            experimenting with different cusinies and you all can also help me
            by sharing some of your recipes.
          </Typography>
          <div className={classes.flexWrapper}>
            <Button
              variant="outlined"
              onClick={navigateHandler}
              className={classes.button}
            >
              ADD A RECIPE
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Home;
