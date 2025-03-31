const config = {
    routes : {
        home : "/",
        //product
        products : "/products",
        productDetail:"/products/:id",
        //auth
        login : "/login",
        login2 : "/login2",
        register : "/register",
        register2 : "/register2",

        // user
        profile:"/profile/:username",
        edit:"/profile/:username/edit",
        user: "/user",
        notFound:"*"
    }
}

export default config;