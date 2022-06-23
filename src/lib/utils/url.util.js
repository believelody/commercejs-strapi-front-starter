import { varEnv } from "./env.util";

const prefix = import.meta.env.PROD ? "prod" : "dev";

const privateRoutes = ['my-account'];

export const serverUrl = varEnv[`${prefix}ServerUrl`];

export const isRoutePrivate = pathname => {
    return privateRoutes.some((route) =>
        pathname.includes(route)
    )
}