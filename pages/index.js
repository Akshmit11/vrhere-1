import React, { useContext, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  useSession,
  signIn,
  signOut,
  getProviders,
  getSession,
} from "next-auth/react";
import {
  getAuth,
  onAuthStateChanged,
  onIdTokenChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { app, authClient, provider } from "../firebase.config";
import nookies from "nookies";
import { useRouter } from "next/router";
import Logo from "../public/assets/logo.png";
import Banner1 from "../public/assets/banner1.png";
import Image from "next/image";
import { AuthProvider, useAuth } from "../auth/Auth";
import { firebaseAdmin } from "../firebaseAdmin.config";

export default function Start(props) {
  const router = useRouter();

  const loginWithGoogle = async () => {
    const auth = getAuth();
    await signInWithPopup(auth, provider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        const user = result.user;
        nookies.set(undefined, "user", user, {});
        const token = await user.getIdToken();
        console.log(user);
        nookies.set(undefined, "token", token, {});
      })
      .catch((error) => {
        console.log(error.message);
        nookies.set(undefined, "token", null, {});
        nookies.set(undefined, "user", null, {});
      });

    router.push("/home");
  };

  console.log(props);

  return (
    <div className="flex items-center justify-center h-screen relative bg-gray-100">
      <div className="bg-white px-3 m-auto flex flex-col justify-evenly w-full h-full lg:rounded-[2.5rem] lg:shadow-xl lg:w-[90%] lg:h-[90%] lg:p-6">
        <div className="w-16 h-16 sm:w-24 sm:h-24">
          <Image src={Logo} alt="Logo" className="w-full h-full" />
        </div>
        <div className="flex ml-1 lg:space-x-3 items-center h-1/3">
          <div className="lg:w-3/5">
            <h1 className="text-5xl sm:text-7xl font-bold my-4 text-black break-words">
              Get hired by the popular teams.
            </h1>
            <p className="text-base sm:text-lg opacity-75 break-words">
              Find jobs according to your interest simply click on search and
              choose category according you skills
            </p>
          </div>
          <div className="hidden lg:inline-block lg:w-2/5">
            {/* Image */}
            <Image src={Banner1} alt="Hire talents" className="w-full h-full" />
          </div>
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-black mt-2 ml-1 opacity-90">
            Join Us
          </h2>
          <div className="flex space-x-4">
            <FcGoogle size={38} className="my-1" onClick={loginWithGoogle} />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req, res } = context;
  try {
    const cookies = nookies.get(context);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    if (token != null) {
      res.statusCode = 302;
      res.setHeader("Location", "/home");
    }
    return {
      props: {
        token,
      },
    };
  } catch (error) {
    return {
      props: {
        e: error.message,
      },
    };
  }
}
