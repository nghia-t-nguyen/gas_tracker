import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCuKE2Fu5Fc31jyykvaWBsFNks5Ad2luGk",
    authDomain: "gas-tracker-90f63.firebaseapp.com",
    projectId: "gas-tracker-90f63",
    storageBucket: "gas-tracker-90f63.appspot.com",
    messagingSenderId: "245269806511",
    appId: "1:245269806511:web:1257ca23664b93ecb3035a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // Signed in successfully
                setCurrentUser(result.user);
            })
            .catch((error) => {
                // Handle errors
                console.error(error);
            });
        console.log('hello')
    };

    const signOutUser = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    };

    return (
        <AuthContext.Provider value={{ currentUser, signInWithGoogle, signOutUser }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };