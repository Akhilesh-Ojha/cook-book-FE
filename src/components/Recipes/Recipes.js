import React, { useEffect, useState, useCallback } from "react";
import { Container, Grid, Box, TextField, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getRecipesBySearch } from "../../actions/recipes";
import Recipe from "./Recipe/Recipe";
import { makeStyles } from "@material-ui/core/styles";
import RecipeHeroImage from "../../assets/RecipeHero.jpg";
// import SearchIcon from "@material-ui/icons/Search";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paginate from "../UI/Pagination";
import ChipInput from "material-ui-chip-input";
import { getUser } from "../../api/index";
import { useHistory, useLocation } from "react-router-dom";

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
    // position: "relative",
    marginBottom: "30px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  searchField: {
    marginRight: 20,
  },

  loading: {
    display: "flex",
    justifyContent: "center",
  },

  paginate: {
    marginTop: 40,
    padding: 20,
    // width: "50%",
  },
}));

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const Recipes = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();

  const page = query.get("page") || 1;
  const { recipes } = useSelector((state) => state.recipes.recipes);
  const userId = useSelector((state) => state.auth.id);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bookMarkedRecipesOfUser, setBookMarkedRecipesOfUser] = useState(null);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const searchRecipe = () => {
    if (search.trim().length > 0 || tags.length > 0) {
      startLoading();
      dispatch(
        getRecipesBySearch({ search, tags: tags.join(",") }, stopLoading)
      );
      history.push(
        `/recipes/search?searchQuery=${search || ""}&tags=${tags.join(",")}`
      );
    } else {
      history.push("/recipes");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchRecipe();
    }
  };

  const onSearchHandler = (event) => {
    setSearch(event.target.value);
  };

  const handleAdd = (tag) => setTags([...tags, tag.toLowerCase()]);

  const handleRemove = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));

  const getBookMarkedRecipesOfUser = useCallback(async () => {
    const { data } = await getUser();
    setBookMarkedRecipesOfUser(data.bookMarkedRecipes);
  }, []);

  useEffect(() => {
    if (userId) {
      getBookMarkedRecipesOfUser();
    } else {
      setBookMarkedRecipesOfUser([]);
    }
  }, [getBookMarkedRecipesOfUser, userId]);

  return (
    <Box>
      <div className={classes.recipeHeroImage} alt="recipeList" />
      <Container className={classes.container}>
        <div className={classes.search}>
          <TextField
            className={classes.searchField}
            label="Search for a Recipe"
            variant="outlined"
            fullWidth
            value={search}
            onKeyPress={handleKeyPress}
            onChange={onSearchHandler}
          ></TextField>
          <ChipInput
            className={classes.searchField}
            label="Search Tags"
            variant="outlined"
            fullWidth
            value={tags}
            onAdd={handleAdd}
            onDelete={handleRemove}
          />
          <Button variant="contained" onClick={searchRecipe} color="primary">
            Search
          </Button>
        </div>

        {isLoading && (
          <div className={classes.loading}>
            <CircularProgress />
          </div>
        )}
        {!isLoading && bookMarkedRecipesOfUser && (
          <React.Fragment>
            <Grid container spacing={3}>
              {recipes?.map((recipe) => {
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
          </React.Fragment>
        )}

        <Paginate
          page={page}
          isLoading={isLoading}
          startLoading={startLoading}
          stopLoading={stopLoading}
        />
      </Container>
    </Box>
  );
};

export default Recipes;
