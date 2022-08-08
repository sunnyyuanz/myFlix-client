import React, { useState } from "react";
import PropType from "prop-types";

export function RegistrationView(){
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');
    const [ favoriteMovies, setFavoriteMovies] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username,password);
    };

    return(
        <form>
             <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <label>
                Confirm Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
                Birthday:
                <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
            </label>
            <label>
                Favorite Movies:
                <input type="text" value={favoriteMovies} onChange={e => setFavoriteMovies(e.target.value)} />
            </label>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    )


}

RegistrationView.proptype = {
    handleSubmit:PropType.func.isRequired
};