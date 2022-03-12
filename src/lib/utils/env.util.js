const prefix = import.meta.prod ? "SVELTEKIT" : "VITE";
export const getVarEnvFromMode = {
    stripePublicKey: import.meta.env[`${prefix}_STRIPE_PUBLIC_KEY`],
    paypalClient: import.meta.env[`${prefix}_PAYPAL_CLIENT`],
    paypalSecret: import.meta.env[`${prefix}_PAYPAL_SECRET`],
    paypalSandboxAccount: import.meta.env[`${prefix}_PAYPAL_SANDBOX_ACCOUNT`],
    paypalSandboxUrl: import.meta.env[`${prefix}_PAYPAL_SANDBOX_URL`],
    paypalAccountToken: import.meta.env[`${prefix}_PAYPAL_SANDBOX_TOKEN`],
    devServerUrl: import.meta.env[`${prefix}_DEV_SERVER_URL`],
    prodServerUrl: import.meta.env[`${prefix}_PROD_SERVER_URL`],
}