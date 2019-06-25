// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
// core components/views for Admin layout
import MyTasks from "views/MyTasks/MyTasks";
import DashboardPage from "views/Dashboard/Dashboard.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/tasks",
    name: "My Tasks",
    icon: "content_paste",
    component: MyTasks,
    layout: "/admin"
  }
];

export default dashboardRoutes;
