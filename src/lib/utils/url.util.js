import { getVarEnvFromMode } from "./env.util";

const prefix = import.meta.env.PROD ? "prod" : "dev"

export const serverUrl = getVarEnvFromMode[`${prefix}ServerUrl`];