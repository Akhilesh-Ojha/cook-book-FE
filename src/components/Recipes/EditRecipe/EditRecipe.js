import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  TextField,
  Button,
  Grid,
  Paper,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { addRecipe, updateRecipe } from "../../../actions/recipes";
import FileBase from "react-file-base64";
import { useHistory, useParams } from "react-router-dom";
import { fetchRecipe } from "../../../api/index";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { recipesAction } from "../../../store/recipes-slice";

const useStyles = makeStyles((theme) => ({
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginTop: theme.spacing(16),
  },
  loadingText: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(4),
  },
  addButton: {
    fontSize: 30,
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

  const [formCounter, setFormCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const editProductId = params?.id;

  const recipeData = useSelector((state) =>
    editProductId
      ? state.recipes.recipes.find((r) => r.id === editProductId)
      : null
  );

  console.log("recipe data", recipeData);
  const row = useSelector((state) => state.recipes.newRow);

  useEffect(() => {
    if (editProductId) {
      fetchRecipe(editProductId).then((data) => {
        console.log("Dataaa in fetch", data);
        recipeData = data.data;
        // setRecipeData({
        //   name: data.data.name,
        //   description: data.data.description,
        //   // ingredients: data.data.ingredients,
        //   tags: data.data.tags,
        //   serves: data.data.serves,
        // });
      });
    }
  }, [editProductId]);

  const setRecipeField = (event) => {
    dispatch(recipesAction.createRecipe({ event }));
  };

  const setIngredient = (event) => {
    dispatch(recipesAction.createRecipe({ event, ing: "Ing" }));
  };

  const setAmount = (event) => {
    dispatch(recipesAction.createRecipe({ event, amt: "Amt" }));
  };

  const GRID = (
    <Grid container spacing={3}>
      <Grid item sm={12} md={6}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name={`ingredient ${formCounter + 1}`}
          label="Ingredient"
          type="text"
          id={`ingredient ${formCounter + 1}`}
          onChange={setIngredient}
        />
      </Grid>
      <Grid item sm={12} md={6}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name={`amount ${formCounter + 1}`}
          label="Amount with unit"
          type="text"
          id={`amount ${formCounter + 1}`}
          onChange={setAmount}
        />
      </Grid>
    </Grid>
  );

  const incremntCounter = (e) => {
    e.preventDefault();
    setFormCounter((prevCounter) => prevCounter + 1);
    dispatch(recipesAction.addRow(GRID));
  };

  const onFormSubmitHandler = async (event) => {
    event.preventDefault();
    const formBody = { recipeData };
    if (editProductId) {
      dispatch(updateRecipe(editProductId, formBody.recipeData, history));
    } else {
      setIsLoading(true);
      dispatch(addRecipe(formBody.recipeData, history));
    }
  };

  return (
    <Container component="main" maxWidth="md">
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

          <form className={classes.form} onSubmit={onFormSubmitHandler}>
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
                      onChange={setRecipeField}
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
                      onChange={setRecipeField}
                      value={recipeData.serves}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item sm={12} md={6}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="ingredient 0"
                      label="Ingredient"
                      type="text"
                      id="ingredient 0"
                      onChange={setIngredient}
                    />
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="amount 0"
                      label="Amount with unit"
                      type="text"
                      id="amount 0"
                      onChange={setAmount}
                    />
                  </Grid>
                </Grid>
                {row}
                <div className={classes.addSection}>
                  <AddCircleIcon
                    onClick={incremntCounter}
                    className={classes.addButton}
                  />
                  <Typography variant="h6">Add Ingredient</Typography>
                </div>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="tags"
                  label="Tags"
                  type="text"
                  id="tags"
                  onChange={setRecipeField}
                  value={recipeData.tags}
                />

                <div className={classes.fileInput}>
                  <FileBase
                    type="file"
                    multiple={false}
                    // onDone={({ base64 }) =>
                    //   setRecipeData({ ...recipeData, image: base64 })
                    // }
                  />
                </div>

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
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  multiline
                  rows={20}
                  name="description"
                  label="Description"
                  type="text"
                  id="description"
                  onChange={setRecipeField}
                  value={recipeData.description}
                />
              </Grid>
            </Grid>
          </form>
        </Paper>
      )}
    </Container>
  );
};

export default NewRecipe;
