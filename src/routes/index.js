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
import ProductDetail from "@/Pages/ProductDetail";
import Register2 from "@/Pages/Register2";
import Login2 from "@/Pages/Login2";
import Edit from "@/Pages/Edit";

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
        path: config.routes.productDetail,
        component: ProductDetail,
    },
    {   
        path: config.routes.login,
        component: Login,
        layout: NoFooterLayout
    },
     {   
        path: config.routes.login2,
        component: Login2,
    },
    {
        path: config.routes.register,
        component: Register,
    },
      {
        path: config.routes.register2,
        component: Register2,
    },
    {
        path: config.routes.profile,
        component: Profile,
        layout: NoHeaderLayout
    },
      {
        path: config.routes.edit,
        component: Edit,
        layout: NoHeaderLayout
    },
    {
        path: config.routes.notFound,
        component: NotFound
    }
]

export default routes