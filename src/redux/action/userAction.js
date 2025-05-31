export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_UPDATE_PROFILE_SUCCESS = 'USER_UPDATE_PROFILE_SUCCESS';

export const doLogin = (data) => {
    return {
        type: USER_LOGIN_SUCCESS,
        payload: data
    };
};

export const doLogout = () => {
    return {
        type: USER_LOGOUT_SUCCESS
    };
};

export const doUpdateProfile = () => {
    return {
        type: USER_UPDATE_PROFILE_SUCCESS
    };
};