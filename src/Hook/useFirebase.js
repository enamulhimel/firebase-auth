import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import app from './firebaseConfig';
import { useState } from 'react';

const useFirebase = () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [userInfo, setUserInfo] = useState('');
  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUserInfo(user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return { handleGoogleLogin, userInfo };
};

export default useFirebase;
