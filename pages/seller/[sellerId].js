/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { db } from "../../firebase.config";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import nookies from "nookies";
import { firebaseAdmin } from "../../firebaseAdmin.config";
import { HiOutlineMail, HiPhone } from "react-icons/hi";
import { GoLocation } from "react-icons/go";
import { RiAccountCircleLine } from "react-icons/ri";
import { AiFillStar } from "react-icons/ai";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function SellerPage({
  seller,
  AllServices,
  currentUserId,
  e,
  AllReviews,
}) {
  // console.log(seller, AllServices);
  // console.log(currentUserId);
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState("");

  async function handleSubmit(e) {
    try {
      const docRef = await addDoc(collection(db, "reviews"), {
        nameBuyer: name,
        emailBuyer: email,
        review,
        userIdBuyer: currentUserId,
        sellerId: AllServices[0].sellerId,
        rating,
        reviewCreatedOn: serverTimestamp(),
      });
      console.log("congrats you added a review");
      console.log(docRef);
    } catch (error) {
      console.log("error", error.message);
    }
  }

  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="bg-gray-100 flex w-full h-full justify-center items-center py-16">
        <div className="w-full h-full flex flex-col items-center justify-center ">
          <div className="flex flex-col w-3/4 bg-gray-100 z-10 h-fit self-center rounded-md">
            <div className="flex p-6 space-x-6 items-center bg-white rounded-t-md">
              <img
                src={seller?.imgURL}
                alt=""
                className="w-40 h-40 rounded-lg"
              />
              <div className="flex flex-col space-y-2">
                <p className="text-4xl font-bold">
                  {seller?.firstName} {seller?.lastName}
                </p>
                <p className="uppercase text-xl font-medium opacity-75">
                  {seller?.category}
                </p>
                <div className="flex opacity-50">
                  <p>
                    Years of experience:{" "}
                    <span className="font-bold text-xl opacity-100 text">
                      {seller?.years}+
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-[1px] border-t-gray-300 items-center rounded-b-md bg-white justify-evenly w-full">
              <div className="flex border-r-[1px] w-1/2 items-center py-4 justify-center space-x-4">
                <HiOutlineMail size={20} className="opacity-60" />
                <p className="font-bold text-xl">{seller?.email}</p>
              </div>
              <div className="flex w-1/2 justify-center items-center space-x-4">
                <HiPhone size={20} className="opacity-60" />
                <p className="font-bold text-xl">{seller?.phone}</p>
              </div>
            </div>
            {/* Description */}
            <div className="mt-6 p-6 rounded-md shadow-sm bg-white">
              <p className="text-2xl font-bold">Description</p>
              <p>{seller?.description}</p>
              <p>{seller?.experienceOptional}</p>
              <p>{seller?.categoryOptional}</p>
            </div>
            {/* All Services */}
            <div className="mt-6 p-6 rounded-md shadow-sm bg-white">
              <p className="text-2xl font-bold">All Services</p>
              <div className="flex flex-wrap w-full">
                {AllServices?.length == 0 ? (
                  <>
                    <div>
                      <p>No Services Posted</p>
                    </div>
                  </>
                ) : (
                  AllServices?.map((service) => (
                    <div
                      key={service.id}
                      className="border-[1px] rounded-md shadow-sm bg-white w-1/4 h-3/5 my-4 mr-2"
                    >
                      <div className="flex flex-col h-full justify-evenly space-y-4 items-center text-center">
                        <img src={service.imgURL} className="w-full h-full" />
                        <div className="space-y-2">
                          <p className="text-sm opacity-70">
                            {service.category}
                          </p>
                          <div className="text-xl text-center justify-center font-medium flex space-x-1 items-center">
                            <p>{service.title}</p>
                          </div>
                          <div className="flex items-center justify-center space-x-1">
                            <GoLocation size={14} className="opacity-75" />
                            <p className="text-sm opacity-75">
                              {service.serviceArea}
                            </p>
                          </div>
                        </div>
                        <Link
                          href={`/services/${service.id}`}
                          className="w-full flex items-center justify-center"
                        >
                          <button className="bg-orange-500 hover:bg-orange-700  cursor-pointer px-6 py-2 shadow-md text-white font-medium rounded-md m-4">
                            View Service
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            {/* Reviews */}
            <div className="mt-6 p-6 rounded-md bg-white shadow-sm">
              <p className="text-2xl font-bold">Reviews</p>
              {AllReviews?.length == 0 ? (
                <>
                  <div>
                    <p>No Reviews Posted</p>
                  </div>
                </>
              ) : (
                AllReviews?.map((review) => {
                  let stars = parseInt(review?.rating);
                  console.log(stars);
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
            {/* Add review */}
            <div className="mt-6 p-6 rounded-md bg-white shadow-sm flex flex-col space-y-4 w-full">
              <p className="text-2xl font-bold">Post a review</p>
              <div className="">
                <form
                  action=""
                  className="flex flex-col space-y-4"
                  onSubmit={(e) => handleSubmit(e)}
                >
                  <div className="flex flex-col space-y-2">
                    <p className="text-sm font-medium">Your Comment</p>
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      className="border-[1px] px-2 py-2 border-gray-200 rounded-md resize-none"
                      required
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="flex space-x-4">
                    <div className="flex flex-col space-y-2 w-1/4">
                      <p className="text-sm font-medium">Your Name</p>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="border-[1px] border-gray-200 px-2 py-2 rounded-md resize-none"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col space-y-2  w-1/4">
                      <p className="text-sm font-medium">Your Email</p>
                      <input
                        type="email"
                        name=""
                        id=""
                        className="border-[1px] border-gray-200 px-2 py-2 rounded-md resize-none"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col space-y-2  w-1/4">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">
                          Rate this freelancer
                        </p>
                        <span className="text-xs opacity-70 italic">
                          (on a scale of 1 to 5)
                        </span>
                      </div>
                      <select
                        name="category"
                        placeholder=""
                        id=""
                        className="border-[1px] border-gray-200 px-2 py-2 rounded-md resize-none"
                        required
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-fit px-4 py-2 bg-green-500 rounded-md shadow-md hover:bg-green-700 text-white font-semibold"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params: { sellerId }, req, res }) {
  const docRef = doc(db, "sellers", sellerId);
  try {
    const docSnap = await getDoc(docRef);
    // console.log(docSnap.data());
    // console.log(sellerId);
    const cookies = nookies.get({ req });
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { name, uid } = token;
    // console.log(uid);

    let AllServices = [];
    const querySnapshotServices = await getDocs(collection(db, "services"));
    querySnapshotServices.forEach((doc) => {
      if (doc.data().sellerId === sellerId) {
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
      if (doc.data().sellerId === sellerId) {
        AllReviews.push({
          ...doc.data(),
          id: doc.id,
          reviewCreatedOn: doc.data().reviewCreatedOn.toMillis(),
        });
      }
    });

    // console.log(AllReviews);

    return {
      props: {
        seller: {
          ...docSnap.data(),
          accountCreatedAt: docSnap.data().accountCreatedAt.toMillis(),
        },
        sellerId,
        AllServices,
        currentUserId: uid,
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
