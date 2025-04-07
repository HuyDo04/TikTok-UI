const config = {
    routes : {
        home : "/",
        //auth
        login : "/login",
        register : "/register",
        // user
        profile:"/profile/:username",
        edit:"/profile/:username/edit",
        user: "/users",
        notFound:"*"
    }
}

export default config;