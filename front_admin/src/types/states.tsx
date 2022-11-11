export interface LoginState {
    isLogged: boolean;
    token: string;
    loading: boolean;
    error: string;
}

export interface AppState {
	login:LoginState;
}