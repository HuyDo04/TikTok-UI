const config = {
    routes : {
        home : "/",
        //product
        products : "/products",
        productDetail:"/products/:id",
        //auth
        login : "/login",
        register : "/register",
        user: "/user",
        profile:"/profile",
        notFound:"*"
    }
}

export default config;