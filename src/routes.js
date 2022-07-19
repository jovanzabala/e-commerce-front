import Dashboard from "layouts/dashboard";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
// @mui icons
//import "~mdb-ui-kit/css/mdb.min.css";
import Icon from "@mui/material/Icon";
import TableCategory from "layouts/category/index";
import Customer from "./layouts/customers/customer";
import TableEmployee from "layouts/employees/index";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Customer",
    key: "customer",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/customer",
    component: <Customer />,
  },
  {
    type: "collapse",
    name: "Category ",
    key: "category",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/category",
    component: <TableCategory />,
  },
  {
    type: "collapse",
    name: "Employees",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/employee",
    component: <TableEmployee />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes;
