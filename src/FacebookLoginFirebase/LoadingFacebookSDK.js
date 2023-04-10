// import React, { useState, useEffect } from 'react';
// import { Router } from 'react-router-dom';

// import { initFacebookSdk, jwtInterceptor, errorInterceptor, history } from './_helpers';

// // setup fake backend
// import { fakeBackend } from './_helpers';
// import FacebookLogin from './FacebookLogin';
// fakeBackend();

// // enable interceptors for http requests
// jwtInterceptor();
// errorInterceptor();

// function LoadingComponent() {
//   return <div>Loading...</div>;
// }

// export default function LoadingFacebookSDK() {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     initFacebookSdk().then(() => setIsLoading(false));
//   }, []);

//   return (
//     <>
//       {isLoading ? (
//         <LoadingComponent />
//       ) : (
//           <FacebookLogin history={history}/>
//       )}
//     </>
//   );
// }

import React from "react";
import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";

import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {authentication} from "./config";
// import firebase from "firebase/app";
// import "firebase/compat/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

export default function LoadingFacebookSDK() {

  const handleLoginWithFacebook = () => {
    console.log(authentication);
    const provider = new FacebookAuthProvider();
    provider.addScope('email');
    signInWithPopup(authentication, provider)
      .then((result) => {
        console.log(result);
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // const credential = FacebookAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        // const user = result.user;
        // console.log(user)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <>
      <button onClick={handleLoginWithFacebook}>Login with facebook</button>
    </>
  );
}
