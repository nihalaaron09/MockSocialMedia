export const LoginStart = (userCredentials) => ({
    login: "LOGIN_START"
});

export const LoginSuccess = (user) => ({
    login: "LOGIN_SUCCESS",
    payload: user
});

export const LoginFailure = (error) => ({
    login: "LOGIN_FAILURE",
    payload: error
});

