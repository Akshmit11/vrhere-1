/* eslint-disable @next/next/no-img-element */
import React from "react";
import { HiOutlineMail, HiPhone } from "react-icons/hi";
import { GoLocation } from "react-icons/go";
import { db } from "../../firebase.config";
import Link from "next/link";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import Navbar from "../../components/Navbar";

export default function ServiceDetails({ service, serviceId, seller }) {
  // console.log(seller);
  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="flex flex-col items-center justify-center bg-gray-100 w-full h-full py-16">
        <div className="text-center">
          <p className="text-4xl font-bold">{service.title}</p>
          <p className="text-base text-center">{service.category}</p>
        </div>
        {/* Service Banner */}
        <div className="bg-white flex flex-col h-full w-fit rounded-md my-4 p-6 space-y-4 shadow-md">
          <img
            src={service.imgURL}
            alt=""
            srcset=""
            className="w-full h-full"
          />
        </div>
        {/* Service Description */}
        <div className="bg-white flex flex-col h-full w-3/4 rounded-md my-4 p-6 space-y-4 shadow-md">
          <p className="text-xl font-bold">Description</p>
          <p>{service.description}</p>
          <div className="flex items-center space-x-1">
            <GoLocation size={14} className="opacity-75" />
            <p className="text-sm opacity-75">{service.serviceArea}</p>
          </div>
        </div>
        {/* About the seller */}
        <div className="bg-white flex flex-col h-full w-3/4 rounded-md p-6 space-y-4 shadow-md">
          <p className="text-xl font-bold">About the Seller</p>
          <div className="flex space-x-6 justify-between items-center bg-white rounded-t-md">
            <div className="flex items-center space-x-6">
              <img
                src={seller.imgURL}
                alt=""
                className="w-40 h-40 rounded-lg"
              />
              <div className="flex flex-col space-y-2">
                <p className="text-4xl font-bold">
                  {seller.firstName} {seller.lastName}
                </p>
                <p className="uppercase text-xl font-medium opacity-75">
                  {seller.category}
                </p>
                <div className="flex opacity-50">
                  <p>
                    Years of experience:{" "}
                    <span className="font-bold text-xl opacity-100 text">
                      {seller.years}+
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <Link href={`/seller/${seller.id}`}>
              <button className="px-6 py-2 bg-green-400 hover:bg-green-700 rounded-md text-white shadow-sm">
                View Profile
              </button>
            </Link>
          </div>
          <div className="flex border-[1px] border-t-gray-300 items-center rounded-b-md bg-white justify-evenly w-full">
            <div className="flex border-r-[1px] w-1/2 items-center py-4 justify-center space-x-4">
              <HiOutlineMail size={20} className="opacity-60" />
              <p className="font-bold text-xl">{seller.email}</p>
            </div>
            <div className="flex w-1/2 justify-center items-center space-x-4">
              <HiPhone size={20} className="opacity-60" />
              <p className="font-bold text-xl">{seller.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params: { serviceId } }) {
  const docRef = doc(db, "services", serviceId);
  try {
    const docSnap = await getDoc(docRef);
    // reviews are left
    console.log(docSnap.data().sellerId);
    const docRefSeller = doc(db, "sellers", docSnap.data().sellerId);
    const docSnapSeller = await getDoc(docRefSeller);

    return {
      props: {
        service: {
          ...docSnap.data(),
          serviceCreatedAt: docSnap.data().serviceCreatedAt.toMillis(),
        },
        seller: {
          ...docSnapSeller.data(),
          id: docSnap.data().sellerId,
          accountCreatedAt: docSnapSeller.data().accountCreatedAt.toMillis(),
        },
        serviceId,
      },
    };
  } catch (error) {
    return {
      props: {
        e: "error",
      },
    };
  }

  return {
    props: {}, // will be passed to the page component as props
  };
}
