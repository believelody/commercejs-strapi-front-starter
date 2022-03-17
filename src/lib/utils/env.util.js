export const varEnv = {
    stripePublicKey: import.meta.env['VITE_STRIPE_PUBLIC_KEY'],
    paypalClient: import.meta.env['VITE_PAYPAL_CLIENT'],
    paypalSecret: import.meta.env['VITE_PAYPAL_SECRET'],
    paypalSandboxAccount: import.meta.env['VITE_PAYPAL_SANDBOX_ACCOUNT'],
    paypalSandboxUrl: import.meta.env['VITE_PAYPAL_SANDBOX_URL'],
    paypalAccountToken: import.meta.env['VITE_PAYPAL_SANDBOX_TOKEN'],
    devServerUrl: import.meta.env['VITE_DEV_SERVER_URL'],
    prodServerUrl: import.meta.env['VITE_PROD_SERVER_URL'],
}