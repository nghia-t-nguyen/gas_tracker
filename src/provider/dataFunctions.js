import { doc, setDoc } from "firebase/firestore";

export async function saveArrayToFirestore(array, currentUser) {
    // Reference to the user's document
    const userDocRef = doc(db, "users", user.uid);

    try {
        await setDoc(userDocRef, { userWatchlist: array }, { merge: true });
    } catch (error) {
        console.error("Error saving array to Firestore:", error);
    }
}

export async function readArrayFromFirestore(currentUser) {
    // Reference to the user's document
    const userDocRef = doc(db, "users", user.uid);

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