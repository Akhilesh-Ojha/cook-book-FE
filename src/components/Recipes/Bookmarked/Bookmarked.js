import React, { useEffect, useState } from "react";
import { Container, Grid, Box, TextField } from "@material-ui/core";
import Recipe from "../Recipe/Recipe";
import { makeStyles } from "@material-ui/core/styles";
import RecipeHeroImage from "../../../assets/RecipeHero.jpg";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getBookMarkedRecipesOfUser } from "../../../api/index";
import { getUser } from "../../../api/index";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 30,
    marginBottom: 50,
  },

  recipeHeroImage: {
    transform: "rotate(180deg)",
    width: "100%",
    height: "70vh",
    backgroundImage: `url(${RecipeHeroImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  search: {
    position: "relative",
    marginBottom: "30px",
  },

  loading: {
    display: "flex",
    justifyContent: "center",
  },
}));
const Bookmarked = () => {
  const classes = useStyles();
  const userId = useSelector((state) => state.auth.id);
  const [recipes, setRecipes] = useState([]);
  const [bookMarkedRecipesOfUser, setBookMarkedRecipesOfUser] = useState(null);

  useEffect(() => {
    window.scroll(0, 0);
    bookMarkedRecipes();
  }, []);

  const bookMarkedRecipes = async () => {
    const { data } = await getBookMarkedRecipesOfUser();
    setRecipes(data);
  };

  const getUserData = async () => {
    const { data } = await getUser();
    console.log("Data", data.bookMarkedRecipes);
    setBookMarkedRecipesOfUser(data.bookMarkedRecipes);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Box>
      <div className={classes.recipeHeroImage} alt="recipeList" />
      <Container className={classes.container}>
        <div className={classes.search}>
          <TextField
            className={classes.searchField}
            label="Search for a Recipe"
            margin="normal"
            variant="outlined"
            fullWidth
          ></TextField>
        </div>
        {recipes.length === 0 && (
          <div className={classes.loading}>
            <CircularProgress />
          </div>
        )}
        {recipes.length > 0 && bookMarkedRecipesOfUser && (
          <Grid container spacing={3}>
            {recipes.map((recipe) => {
              return (
                <Recipe
                  key={recipe._id}
                  id={recipe._id}
                  name={recipe.name}
                  description={recipe.description}
                  image={recipe.image}
                  serves={recipe.serves}
                  ingredients={recipe.ingredients}
                  likeCount={recipe.likes}
                  author={recipe.author}
                  userId={userId}
                  bookMarkedRecipesOfUser={bookMarkedRecipesOfUser}
                />
              );
            })}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Bookmarked;
