import NoFooterLayout from "@/component/layouts/NoFooterLayout";
import AdminLayout from "../component/layouts/AdminLayout";
import config from "../config";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import NotFound from "../Pages/NotFound";
import Products from "../Pages/Products";
import Register from "../Pages/Register";
import User from "../Pages/User";
import NoHeaderLayout from "@/component/layouts/NoHeaderLayout";
import Profile from "@/Pages/Profile";

const routes = [
    {
        path: config.routes.home,
        component: Home
    },
    {   
        path: config.routes.user,
        component: User,
        protected: true
    },
    {
        path: config.routes.products,
        component: Products,
        layout: AdminLayout
    },
    {   
        path: config.routes.login,
        component: Login,
        layout: NoFooterLayout
    },
    {
        path: config.routes.register,
        component: Register,
    },
    {
        path: config.routes.profile,
        component: Profile,
        layout: NoHeaderLayout
    },
    {
        path: config.routes.notFound,
        component: NotFound
    }
]

export default routes