import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  TextField,
  Button,
  Grid,
  Paper,
  CircularProgress,
  Tooltip,
  Fab,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { addRecipe, updateRecipe } from "../../../actions/recipes";
// import FileBase from "react-file-base64";
import { useHistory, useParams } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import nextId from "react-id-generator";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  main: {
    marginBottom: 100,
  },
  paper: {
    marginTop: theme.spacing(16),
    padding: theme.spacing(6),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  loading: {
    marginTop: theme.spacing(16),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  loadingText: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(4),
    textTransform: "uppercase",
  },
  addButton: {
    // fontSize: 20,
    width: "45px",
    height: "45px",
    cursor: "pointer",
    marginRight: 5,
  },
  addSection: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
}));

const NewRecipe = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const [selectedFile, setSelectedFile] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [recipeData, setRecipeData] = useState({
    name: "",
    description: [{ id: nextId(), step: "" }],
    ingredients: [
      {
        id: nextId(),
        ingredient: "",
        amount: "",
      },
    ],
    serves: "",
    tags: "",
  });

  const editProductId = params?.id;

  const recipeDataToEdit = useSelector((state) =>
    editProductId
      ? state.recipes.recipes.recipes.find((r) => r._id === editProductId)
      : null
  );

  useEffect(() => {
    window.scroll(0, 0);
    if (editProductId) {
      setRecipeData(recipeDataToEdit);
    }
  }, [editProductId, recipeDataToEdit]);

  const setIngredientHandler = (event, _id) => {
    const newRecipe = Object.assign({}, _.cloneDeep(recipeData));

    newRecipe.ingredients.map((ingr) => {
      if (ingr.id === _id) {
        return (ingr.ingredient = event.target.value);
      } else {
        return ingr;
      }
    });

    setRecipeData(newRecipe);
  };

  const setAmountHandler = (event, _id) => {
    const newRecipe = Object.assign({}, _.cloneDeep(recipeData));

    newRecipe.ingredients.map((ingr) => {
      if (ingr.id === _id) {
        return (ingr.amount = event.target.value);
      } else {
        return ingr;
      }
    });
    setRecipeData(newRecipe);
  };

  const setDescriptionHandler = (event, _id) => {
    const newRecipe = Object.assign({}, _.cloneDeep(recipeData));

    newRecipe.description.map((recipe) => {
      if (recipe.id === _id) {
        return (recipe.step = event.target.value);
      } else {
        return recipe;
      }
    });
    setRecipeData(newRecipe);
  };

  const addIngredientRowHandler = (e) => {
    e.preventDefault();
    let newIngredient = {
      id: nextId(),
      ingredient: "",
      amount: "",
    };

    setRecipeData({
      ...recipeData,
      ingredients: [...recipeData.ingredients, newIngredient],
    });
  };

  const addDescriptionStepHandler = (e) => {
    e.preventDefault();
    let newStep = {
      id: nextId(),
      step: "",
    };

    setRecipeData({
      ...recipeData,
      description: [...recipeData.description, newStep],
    });
  };

  const onFormSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("data", JSON.stringify(recipeData));

    const formBody = { recipeData };
    if (editProductId) {
      setIsLoading(true);
      dispatch(updateRecipe(editProductId, formBody.recipeData, history));
    } else {
      setIsLoading(true);
      dispatch(addRecipe(formData, history));
    }
    setRecipeData({
      name: "",
      description: [
        {
          id: "",
          step: "",
        },
      ],
      ingredients: [
        {
          id: "",
          ingredient: "",
          amount: "",
        },
      ],
      serves: "",
      tags: "",
    });
    setSelectedFile(null);
  };

  const setImageHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <Container component="main" className={classes.main} maxWidth="md">
      {isLoading && (
        <div className={classes.loading}>
          <CircularProgress />
          <Typography
            className={classes.loadingText}
            component="h4"
            variant="h4"
          >
            Posting Recipe...
          </Typography>
        </div>
      )}
      {!isLoading && (
        <Paper className={classes.paper} variant="outlined" square>
          <Typography component="h1" variant="h4">
            {editProductId ? "Edit" : "Create"} Your Recipe
          </Typography>

          <form
            className={classes.form}
            encType="multipart/form-data"
            onSubmit={onFormSubmitHandler}
          >
            <Grid container spacing={5}>
              <Grid item xs={12} md={6}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      name="name"
                      type="text"
                      onChange={(event) =>
                        setRecipeData({
                          ...recipeData,
                          name: event.target.value,
                        })
                      }
                      value={recipeData.name}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="serves"
                      label="Serves"
                      type="number"
                      id="serves"
                      onChange={(event) =>
                        setRecipeData({
                          ...recipeData,
                          serves: +event.target.value,
                        })
                      }
                      value={recipeData.serves}
                    />
                  </Grid>
                </Grid>
                {recipeData?.ingredients.map((recipe) => {
                  return (
                    <Grid key={recipe.id} container spacing={3}>
                      <Grid item sm={12} md={6}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          name={`ing` + recipe.id}
                          label="Ingredient"
                          type="text"
                          value={recipe.ingredient}
                          id={`ing` + recipe.id}
                          onChange={(event) =>
                            setIngredientHandler(event, recipe.id)
                          }
                        />
                      </Grid>
                      <Grid item sm={12} md={6}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          name={`amt` + recipe.id}
                          label="Amount with unit"
                          type="text"
                          value={recipe.amount}
                          id={`amt` + recipe.id}
                          onChange={(event) =>
                            setAmountHandler(event, recipe.id)
                          }
                        />
                      </Grid>
                    </Grid>
                  );
                })}

                <div className={classes.addSection}>
                  <Tooltip title="Add More Ingredients" aria-label="add">
                    <Fab
                      className={classes.addButton}
                      onClick={addIngredientRowHandler}
                    >
                      <AddIcon />
                    </Fab>
                  </Tooltip>
                </div>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="tags"
                  label="Tags (Coma seperated)"
                  type="text"
                  id="tags"
                  onChange={(event) =>
                    setRecipeData({
                      ...recipeData,
                      tags: event.target.value
                        .split(",")
                        .map((item) => item.trim().toLowerCase()),
                    })
                  }
                  value={recipeData.tags}
                />

                <input type="file" name="image" onChange={setImageHandler} />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Submit Recipe
                </Button>
              </Grid>

              <Grid item xs={12} md={6}>
                {recipeData?.description.map((recipe, index) => {
                  return (
                    <TextField
                      key={recipe.id}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      multiline
                      rows={3}
                      name={`description` + recipe.id}
                      label={`Enter Step`}
                      type="text"
                      id={`description` + recipe.id}
                      onChange={(event) =>
                        setDescriptionHandler(event, recipe.id)
                      }
                      value={recipe.step}
                    />
                  );
                })}
                <div className={classes.addSection}>
                  <Tooltip title="Add Next Step" aria-label="add">
                    <Fab
                      className={classes.addButton}
                      onClick={addDescriptionStepHandler}
                    >
                      <AddIcon />
                    </Fab>
                  </Tooltip>
                </div>
              </Grid>
            </Grid>
          </form>
        </Paper>
      )}
    </Container>
  );
};

export default NewRecipe;
