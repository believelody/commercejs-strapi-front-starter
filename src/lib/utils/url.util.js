import { varEnv } from "./env.util";

const prefix = import.meta.env.PROD ? "prod" : "dev";

export const serverUrl = varEnv[`${prefix}ServerUrl`];