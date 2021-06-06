import React, { useState, useEffect } from "react";
import "./App.css";
import HeaderBar from "./components/Layout/Header";
import FooterBar from "./components/Layout/Footer";
import Recipes from "./components/Recipes/Recipes";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import NewRecipe from "./components/Recipes/NewRecipe/NewRecipe";
import FetchRecipe from "./components/Recipes/FetchRecipe/FetchRecipe";
import Home from "./components/Layout/Home";
import Auth from "./components/Auth/Auth";
import { authAction } from "./store/auth-slice";
import { useDispatch } from "react-redux";
import Bookmarked from "./components/Recipes/Bookmarked/Bookmarked";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    let profileObject;
    if (localStorage.getItem("profile")) {
      const profile = JSON.parse(localStorage.getItem("profile"));
      profileObject = {
        result: {
          name: profile.result.name,
          id: profile.result._id,
          email: profile.result.email,
        },

        token: profile.token,
      };
      dispatch(authAction.auth(profileObject));
    }
  }, [dispatch]);

  const modalOpenHandler = () => {
    setOpenModal(true);
  };

  const modalCloseHandler = () => {
    setOpenModal(false);
  };

  return (
    <React.Fragment>
      <div className="bodyContainer">
        <HeaderBar onOpenLoginModal={modalOpenHandler} />

        {openModal && <Auth onCloseLoginModal={modalCloseHandler} />}

        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home" exact>
            <Home />
          </Route>
          <Route path="/recipes" exact>
            <Recipes />
          </Route>
          <Route path="/recipes/search" exact>
            <Recipes />
          </Route>
          <Route path="/recipes/bookmarked" exact>
            <Bookmarked />
          </Route>
          <Route path="/recipes/:id" exact>
            <FetchRecipe />
          </Route>
          <Route path="/add-recipe">
            <NewRecipe />
          </Route>
          <Route path="/edit-recipe/:id">
            <NewRecipe />
          </Route>
        </Switch>
        {location.pathname === "/home" && <FooterBar />}
      </div>
    </React.Fragment>
  );
}

export default App;
