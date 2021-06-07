import React, { useEffect } from "react";
import { Paper } from "@material-ui/core";
import { Pagination, PaginationItem } from "@material-ui/lab";
import useStyles from "./PaginaltionStyles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../actions/recipes";

const Paginate = ({ page, startLoading, stopLoading, isLoading }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { totalPages } = useSelector((state) => state.recipes.recipes);

  useEffect(() => {
    window.scroll(0, 0);
    if (page) {
      startLoading();
      dispatch(getRecipes(page, stopLoading));
    }
  }, [dispatch, page, startLoading, stopLoading]);

  return !isLoading ? (
    <div className={classes.paginationConatiner}>
      <Paper elevation={4} className={classes.paginate}>
        <Pagination
          classes={{ ul: classes.ul }}
          count={totalPages}
          page={Number(page) || 1}
          variant="outlined"
          color="primary"
          renderItem={(item) => (
            <PaginationItem
              {...item}
              component={Link}
              to={`/recipes?page=${item.page}`}
            />
          )}
        />
      </Paper>
    </div>
  ) : null;
};

export default Paginate;
