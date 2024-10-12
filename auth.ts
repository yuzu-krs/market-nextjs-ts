import NextAuth, { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";

export const config: NextAuthConfig={
    providers:[
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
        }),
    ],

    basePath:"/api/auth",
    

    callbacks:{
        //認証後
        authorized({request,auth}){
            try{
                const{pathname}=request.nextUrl;
                if(pathname==="/protected-page") return !!auth;
                return true;
            }catch(err){
                console.log(err)
            }
        },
        jwt({token,trigger,session}){
            if(trigger==="update") token.name=session.user.name;
            return token;
        },
    },
};

export const {handlers,auth,signIn,signOut} =NextAuth(config);