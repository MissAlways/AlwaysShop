import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from 'redux-thunk';
import { logout } from "../actions/loginActions";

interface State {
    login: {
        isLogged: boolean;
        error: string;
        loading: boolean;
        token: string;
    }
}

const Navbar: React.FC<{}> = (props) => {
    const stateSelector = (state: State) => state;
    const state = useSelector(stateSelector);
    const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();

    let header = <h2>Always Shop</h2>
    if (state.login.loading) {
        header = <h2>Loading...</h2>
    }
    let error: string = "";
    
    if (state.login.error) {
        error = state.login.error;
    }
    if (error) {
        header = <h2>{error}</h2>
    }
    if (state.login.isLogged) {
        return (
            <div>
                {header}
                <ul>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/" onClick={() => {
                        dispatch(logout(state.login.token))
                    }}>Logout</Link></li>
                </ul>
            </div>
        )
    }
    else {
        return (
            <div>
                {header}
            </div>
        )
    }
}
export default Navbar;