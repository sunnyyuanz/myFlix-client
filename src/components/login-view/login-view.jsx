import React, { useState } from "react";
import PropType from "prop-types";

export function LoginView(props){
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username,password);
        //send a request to the server for authentication
        //then call props.onLoggedIn(username)
        props.onLoggedIn(username);
    };

    const onSignUpClick = () =>{
        console.log("signupCLick is clicked");
    }

    return(
        <div>
        <form>
            <label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
        <button type="submit" onClick={onSignUpClick}>Sign Up</button>
        </div>
    )
}


LoginView.propTypes = {
    user: PropType.shape({
        username: PropType.string,
        password:PropType.string
    }).isRequired,
    onLoggedIn:PropType.func.isRequired
};