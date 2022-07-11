import api from "$lib/api";

export async function get() {
    try {
        const res = await api.server.get("users/me");
        if (res.error) {
            return { success: false, error: res.error };
        }
        console.log("api users me : ", res);
        return { success: true, user: res };
    } catch (error) {
        console.log(error);
    }
}