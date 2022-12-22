/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import nookies from "nookies";
import { db } from "../firebase.config";
import { firebaseAdmin } from "../firebaseAdmin.config";
import { collection, getDocs } from "firebase/firestore";
import { HiOutlineMail, HiPhone } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { RiAccountCircleLine } from "react-icons/ri";
import { AiFillStar } from "react-icons/ai";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Dashboard(props) {
  // console.log(props?.isSeller);
  let currentSeller = props?.isSeller;
  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="bg-gray-100 flex w-full h-full justify-center items-center py-16">
        <div className="w-full h-full flex flex-col items-center justify-center ">
          <div className="flex flex-col w-3/4 bg-gray-100 z-10 h-fit self-center rounded-md">
            <div className="flex p-6 space-x-6 items-center justify-between bg-white rounded-t-md">
              <div className="flex space-x-4">
                <img
                  src={props?.isSeller?.imgURL}
                  alt=""
                  className="w-40 h-40 rounded-lg"
                />
                <div className="flex flex-col space-y-2">
                  <p className="text-4xl font-bold">
                    {props?.isSeller?.firstName} {props?.isSeller?.lastName}
                  </p>
                  <p className="uppercase text-xl font-medium opacity-75">
                    {props?.isSeller?.category}
                  </p>
                  <div className="flex opacity-50">
                    <p>
                      Years of experience:{" "}
                      <span className="font-bold text-xl opacity-100 text">
                        {props?.isSeller?.years}+
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <Link
                  href={{
                    pathname: "/updateProfile",
                    query: {
                      sellerId: currentSeller?.id,
                    },
                  }}
                  className="bg-green-400 px-6 py-2 text-white hover:bg-green-700 rounded-md shadow-md"
                >
                  <button>Update Profile</button>
                </Link>
              </div>
            </div>
            <div className="flex border-[1px] border-t-gray-300 items-center rounded-b-md bg-white justify-evenly w-full">
              <div className="flex border-r-[1px] w-1/2 items-center py-4 justify-center space-x-4">
                <HiOutlineMail size={20} className="opacity-60" />
                <p className="font-bold text-xl">{props?.isSeller?.email}</p>
              </div>
              <div className="flex w-1/2 justify-center items-center space-x-4">
                <HiPhone size={20} className="opacity-60" />
                <p className="font-bold text-xl">{props?.isSeller?.phone}</p>
              </div>
            </div>
            <div className="mt-6 p-6 rounded-md shadow-sm bg-white">
              <p className="text-2xl font-bold">Description</p>
              <p>{props?.isSeller?.description}</p>
              <p>{props?.isSeller?.experienceOptional}</p>
              <p>{props?.isSeller?.categoryOptional}</p>
            </div>

            {/* all services */}
            <div className="mt-6 p-6 rounded-md shadow-sm bg-white space-y-4">
              <div className="flex flex-wrap items-center justify-between">
                <p className="text-2xl font-bold">All Services</p>
                <Link
                  href="/serviceAdd"
                  className="cursor-pointer w-[12%] flex justify-center items-center"
                >
                  <button className="bg-green-400 hover:bg-green-700 w-full text-white py-1 rounded-sm shadow-md flex justify-center items-center space-x-2">
                    <p className="text-md">Add Service</p>
                    <AiOutlinePlus size={16} color="white" />
                  </button>
                </Link>
              </div>
              <div className="flex flex-wrap w-full">
                {props?.AllServices?.length == 0 ? (
                  <>
                    <div>
                      <p>No Services Posted</p>
                    </div>
                  </>
                ) : (
                  props?.AllServices?.map((service) => (
                    <div
                      key={service?.id}
                      className="border-[1px] rounded-md shadow-sm bg-white w-1/4 h-3/5 my-4 mr-2"
                    >
                      <div className="flex flex-col h-full justify-evenly space-y-4 items-center text-center">
                        <img src={service?.imgURL} className="w-full h-full" />
                        <div className="space-y-2">
                          <p className="text-sm opacity-70">
                            {service?.category}
                          </p>
                          <div className="text-xl text-center justify-center font-medium flex space-x-1 items-center">
                            <p>{service?.title}</p>
                          </div>
                          <div className="flex items-center justify-center space-x-1">
                            <GoLocation size={14} className="opacity-75" />
                            <p className="text-sm opacity-75">
                              {service?.serviceArea}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <Link
                            href={`/services/${service?.id}`}
                            className="w-full flex items-center justify-center"
                          >
                            <button className="bg-orange-400 hover:bg-orange-700  cursor-pointer px-6 py-2 shadow-md text-white font-medium rounded-md m-4">
                              View Service
                            </button>
                          </Link>
                          <Link
                            href={{
                              pathname: "/updateService",
                              query: {
                                serviceId: service?.id,
                              },
                            }}
                            className="w-full flex items-center justify-center"
                          >
                            <button className="bg-red-400 hover:bg-red-700  cursor-pointer px-6 py-2 shadow-md text-white font-medium rounded-md m-4">
                              Update Service
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* all reviews */}
            <div className="mt-6 p-6 rounded-md bg-white shadow-sm">
              <p className="text-2xl font-bold">Reviews</p>
              {props?.AllReviews?.length == 0 ? (
                <>
                  <div>
                    <p>No Reviews Posted</p>
                  </div>
                </>
              ) : (
                props?.AllReviews?.map((review) => {
                  let stars = parseInt(review?.rating);
                  // console.log(stars);
                  return (
                    <div
                      key={review.id}
                      className="my-4 flex flex-col space-y-1 border-[1px] rounded-md p-2"
                    >
                      <div className="flex items-center space-x-4">
                        {/* name */}
                        <div className="flex items-center space-x-1">
                          <RiAccountCircleLine size={16} />
                          <p className="text-lg font-medium">
                            {review?.nameBuyer}
                          </p>
                        </div>
                        {/* email */}
                        <div className="flex items-center space-x-1">
                          <HiOutlineMail size={16} />
                          <p className="text-lg font-medium">
                            {review?.emailBuyer}
                          </p>
                        </div>
                      </div>
                      {/* Rating */}
                      <div className="flex space-x-1 items-center">
                        {Array.from({ length: stars }).map((_, i) => (
                          <div key={i}>
                            <AiFillStar size={16} color="yellow" />
                          </div>
                        ))}
                      </div>
                      <p>{review?.review}</p>
                    </div>
                  );
                })
              )}
            </div>
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
    const { name, uid } = token;
    if (uid == undefined) {
      res.statusCode = 302;
      res.setHeader("Location", "/");
    }
    let isSeller = false;
    const querySnapshot = await getDocs(collection(db, "sellers"));

    let AllSellers = [];
    querySnapshot.forEach((doc) => {
      AllSellers.push({
        ...doc.data(),
        id: doc.id,
        accountCreatedAt: doc.data().accountCreatedAt.toMillis(),
      });
    });

    isSeller = AllSellers.find((seller) =>
      seller.userId === uid ? true : false
    );
    // console.log(isSeller);

    let AllServices = [];
    const querySnapshotServices = await getDocs(collection(db, "services"));
    querySnapshotServices.forEach((doc) => {
      if (doc.data().sellerId === isSeller.id) {
        AllServices.push({
          ...doc.data(),
          id: doc.id,
          serviceCreatedAt: doc.data().serviceCreatedAt.toMillis(),
        });
      }
    });

    let AllReviews = [];
    const querySnapshotReviews = await getDocs(collection(db, "reviews"));
    querySnapshotReviews.forEach((doc) => {
      if (doc.data().sellerId === isSeller.id) {
        AllReviews.push({
          ...doc.data(),
          id: doc.id,
          reviewCreatedOn: doc.data().reviewCreatedOn.toMillis(),
        });
      }
    });

    return {
      props: {
        isSeller,
        AllServices,
        AllReviews,
      },
    };
  } catch (error) {
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return {
      props: {
        e: "error",
      },
    };
  }
}
