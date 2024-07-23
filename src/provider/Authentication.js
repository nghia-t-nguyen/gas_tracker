import React, { createContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    deleteUser
} from 'firebase/auth';
import { doc, setDoc, getDoc, getFirestore, deleteDoc } from 'firebase/firestore';

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
const db = getFirestore(app);


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

    const signInUser = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    const signUpUser = (email, password) => {
        return new Promise((resolve, reject) => {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed up successfully
                    const user = userCredential.user;
                    sendEmailVerification(user).then(signOutUser())
                    resolve(null); // Resolve with null since there's no error code
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    reject(errorCode); // Reject with error code
                });
        });
    }

    const signOutUser = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    };

    const deleteUserAccount = async () => {
        await deleteDoc(doc(db, "users", currentUser.uid)).then(
            currentUser.delete()
                .then(() => {
                })
                .catch((error) => {
                })
        )

    }

    const resendVerificationEmail = () => {
        sendEmailVerification(currentUser).then(() => {

        }).catch((error) => {

        });

    }

    const sendPasswordResetEmailUser = (email) => {
        sendPasswordResetEmail(auth, email)
            .then(function () {
                // Password reset email sent.
            })
            .catch(function (error) {
                // Error occurred. Inspect error.code.
            });

    }

    const saveArrayToFirestore = async (array) => {
        if (!currentUser) {
            return;
        }

        // Reference to the user's document
        const userDocRef = doc(db, "users", currentUser.uid);

        try {
            await setDoc(userDocRef, { userWatchlist: array }, { merge: true });
        } catch (error) {
            console.error("Error saving array to Firestore:", error);
        }
    }

    const readArrayFromFirestore = async () => {
        if (!currentUser) {
            return;
        }

        // Reference to the user's document
        const userDocRef = doc(db, "users", currentUser.uid);

        try {
            // Get the user's document
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                const userData = userDoc.data();
                const watchlist = userData.userWatchlist;
                return watchlist;
            } else {
                return [];
            }
        } catch (error) {
            console.error("Error reading document:", error);
        }
    }



    const functions = {
        currentUser,
        signInWithGoogle,
        signInUser,
        signOutUser,
        signUpUser,
        deleteUserAccount,
        resendVerificationEmail,
        sendPasswordResetEmailUser,
        saveArrayToFirestore,
        readArrayFromFirestore
    }

    return (
        <AuthContext.Provider value={functions}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };