import React, { useState } from 'react';
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';
import app from '../../firebase/firebase.init';

const Login = () => {

    const [user, setUser] = useState(null)
    const auth = getAuth(app);

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handleGoogleLogin = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const loginUser = result.user;
                console.log(loginUser)
                setUser(loginUser)
            })
            .catch(error => {
                console.log('Error', error.message)
            })
    }
    const handleGoogleSignOut = () => {
        signOut(auth)
            .then((result) => {
                console.log(result)
                setUser(null)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleGithubLogin = () =>{
        signInWithPopup(auth,githubProvider)
        .then((result) =>{
            const loggedUser = result.user
            console.log(loggedUser)
            setUser(loggedUser)
        })
        .catch((error) =>{
            console.log('error' , error)
        })
    }

    return (
        <div>
            {  
            user?
                <button onClick={handleGoogleSignOut}>Sign Out</button>:
                 <>
                    <button onClick={handleGoogleLogin}>Google Login</button>
                    <button onClick={handleGithubLogin}>Github Login</button>
                 </>


            }

            {user &&
                <div>
                    <h3>User : {user?.displayName}</h3>
                    <p>Email : {user.email}</p>
                    <img src={user.photoURL} alt="no photo found" />
                </div>
            }
        </div>
    );
};

export default Login;