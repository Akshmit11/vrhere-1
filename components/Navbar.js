import React from "react";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { BiCategory } from "react-icons/bi";
import Link from "next/link";
import { authClient } from "../firebase.config";
// import { firebaseAdmin } from "../firebaseAdmin.config";
import nookies from "nookies";
// import { collection, getDocs } from "firebase/firestore";

const Navbar = (props) => {
  const router = useRouter();

  // console.log(props);
  async function handleLogout() {
    await authClient.signOut();
    nookies.set(undefined, "user", null, {});
    nookies.set(undefined, "token", null, {});
    router.push("/");
  }

  return (
    <div className="flex items-center space-x-2 p-4 border-b-[1px]">
      {/* Logo */}
      <div className="border-r-[1px] px-4">
        <Image src="/assets/logo.png" alt="Logo" width={56} height={56} />
      </div>

      {/* categories + services + search */}
      <div className="flex justify-between grow px-4 border-r-[1px]">
        <Link href="/categories" className="hover:underline">
          <div className="flex items-center">
            <BiCategory size={18} /> &nbsp; Categories
          </div>
        </Link>
        <div className="flex space-x-6 pr-4 items-center">
          {/* Nav links */}
          <Link href="/home" className="hover:underline">
            <p>Home</p>
          </Link>
        </div>
      </div>

      {/* become a seller + sign in */}
      <div className="flex items-center space-x-5 pl-4">
        <button
          className="bg-white px-5 py-2 rounded-md shadow-md border-[1px]"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;

export async function getServerSideProps(context) {
  // const { req, res } = context;
  // try {
  //   const cookies = nookies.get(context);
  //   const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
  //   const { name, uid } = token;
  //   let isSeller = false;
  //   const querySnapshot = await getDocs(collection(db, "sellers"));
  //   let AllSellers = [];
  //   querySnapshot.forEach((doc) => {
  //     AllSellers.push({
  //       ...doc.data(),
  //       id: doc.id,
  //       accountCreatedAt: doc.data().accountCreatedAt.toMillis(),
  //     });
  //   });
  //   isSeller = AllSellers.find((seller) => seller.userId === uid);
  //   return {
  //     props: {
  //       name,
  //       isSeller,
  //     },
  //   };
  // } catch (error) {
  //   return {
  //     props: {
  //       e: "error",
  //     },
  //   };
  // }
}
