import React, { useContext, useEffect, useState } from 'react'
import {auth} from '../firebase';
import firebase from  'firebase/app';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function loginWithProvider(providerName) {

        let provider = null;

        switch(providerName) {
            case "facebook":
                provider = new firebase.auth.FacebookAuthProvider();
                break;
            case "twitter":
                provider = new firebase.auth.TwitterAuthProvider();
                break;
            case "google":
                provider = new firebase.auth.GoogleAuthProvider();
                break;
            default:
                provider = null;
        }

        return auth.signInWithPopup(provider)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;

    }, [])

    const value = {
        currentUser,
        signup,
        login,
        loginWithProvider,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return (
       <AuthContext.Provider value={value}>
           {!loading && children}
       </AuthContext.Provider>
    )
}
