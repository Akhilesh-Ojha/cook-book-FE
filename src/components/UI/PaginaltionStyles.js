import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  ul: {
    justifyContent: "space-around",
  },

  paginationConatiner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paginate: {
    marginTop: 40,
    padding: 20,
    width: "50%",
  },
}));
