/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { Fragment } from "react";
import Head from "next/head";
import Image from "next/image";
import nookies from "nookies";
import { authClient, db } from "../firebase.config";
import { firebaseAdmin } from "../firebaseAdmin.config";
import Router, { useRouter } from "next/router";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import Badge from "../public/assets/badge.png";
import Free from "../public/assets/free.png";
import Security from "../public/assets/security.png";
import Hire from "../public/assets/hire.jpg";
import { BiCategory } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { Menu } from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi";
import { GoLocation } from "react-icons/go";
import { BsFillPatchCheckFill } from "react-icons/bs";

const links = [
  {
    href: "/category/Design & Creative",
    label: "Design & Creative",
    logo: "https://firebasestorage.googleapis.com/v0/b/vrhere-1.appspot.com/o/serviceIcons%2Fdesign.png?alt=media&token=1a641453-9146-4368-b038-550b0c7ce4c1",
    desc: "Website Design Adobe XD, Figma, Adobe Photoshop",
  },
  {
    href: "/category/Development & IT",
    label: "Development & IT",
    logo: "https://firebasestorage.googleapis.com/v0/b/vrhere-1.appspot.com/o/serviceIcons%2Fdevelopment.png?alt=media&token=4e1edae3-0499-407a-9cbe-5958a049ece1",
    desc: "Software Engineer, Web / Mobile Developer & More",
  },
  {
    href: "/category/Digital Marketing",
    label: "Digital Marketing",
    logo: "https://firebasestorage.googleapis.com/v0/b/vrhere-1.appspot.com/o/serviceIcons%2Fmarketing.png?alt=media&token=16901a86-9389-4920-a3b6-c5cbd29d3e00",
    desc: "Service Digital and Social Media Management",
  },
  {
    href: "/category/Finance & Accounting",
    label: "Finance & Accounting",
    logo: "https://firebasestorage.googleapis.com/v0/b/vrhere-1.appspot.com/o/serviceIcons%2Ffinance.png?alt=media&token=1bb1e07f-5e4c-4045-9be0-82b76f1e3668",
    desc: "Team Works , Collaboration Meet for Your Business",
  },
  {
    href: "/category/Programming & Tech",
    label: "Programming & Tech",
    logo: "https://firebasestorage.googleapis.com/v0/b/vrhere-1.appspot.com/o/serviceIcons%2Fprogramming.png?alt=media&token=fa7b25d4-ed72-4ad5-89df-28430192bd19",
    desc: "Programmers and coders Both for Your Project",
  },
  {
    href: "/category/Writing & Translation",
    label: "Writing & Translation",
    logo: "https://firebasestorage.googleapis.com/v0/b/vrhere-1.appspot.com/o/serviceIcons%2Fwriting.png?alt=media&token=b3afd764-0245-4d7b-835a-1509f266893a",
    desc: "Writing , Translation Project, get It Quickly done",
  },
  {
    href: "/category/Others",
    label: "Others",
    logo: "https://firebasestorage.googleapis.com/v0/b/vrhere-1.appspot.com/o/serviceIcons%2Fothers.png?alt=media&token=20f58924-bea2-4be0-b43e-418783771171",
    desc: "Freelancer Music, Audio Services, Music Projects Animation Video Maker that Brings Studio Quality and others",
  },
];

export default function Home(props) {
  const router = useRouter();

  async function handleLogout() {
    await authClient.signOut();
    nookies.set(undefined, "user", null, {});
    nookies.set(undefined, "token", null, {});
    router.push("/");
  }

  // console.log(props.isSeller);

  const topSellers = props.AllSellers?.slice(0, 5);
  // console.log(topSellers);
  const topServices = props.AllServices?.slice(0, 5);
  // console.log(topServices)
  return (
    <>
      <Head>
        <title>vRHere - Freelance service marketplace</title>
        <meta name="description" content="Freelance service marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* header */}
      <header className=" h-full bg-gray-100 py-16 md:p-0">
        {/* navbar */}
        <div className="flex flex-col items-center space-x-2 p-4 sm:border-b-[1px] lg:flex-row  lg:items-center lg:justify-between lg:w-full">
          {/* Logo */}
          <div className="sm:flex sm:flex-row sm:w-full sm:justify-center sm:border-b-[1px] lg:justify-start lg:w-fit lg:border-0">
            <div className="flex w-full h-28 sm:m-0 sm:w-fit my-2 items-center justify-center border-b-[1px] sm:border-0 sm:border-r-[1px]  ">
              <img
                src="/assets/logo.png"
                alt="Logo"
                className="w-24 py-2 h-full"
              />
            </div>

            {/* categories + services + search */}

            <div className="flex space-x-6 px-4 my-2 items-center">
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
          </div>

          {/* become a seller + sign in */}
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 lg:space-y-0">
            <div className="mt-4 lg:m-0">
              <Link
                href={
                  props.isSeller
                    ? `/dashboard`
                    : "/seller_onboarding/seller_info"
                }
              >
                <p className="hover:underline cursor-pointer">
                  {props.isSeller ? "My Dashboard" : "Become a Seller"}
                </p>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <p className="capitalize">
                <span className="text-sm">Hi</span>,{" "}
                <span className="text-lg font-bold">{props.name}</span>
              </p>
              <button
                className="bg-white px-5 py-2 rounded-md shadow-sm hover:shadow-2xl"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* banner */}
        <div className="md:px-14 md:py-20">
          <div className="w-full">
            <h1 className="text-5xl font-bold break-words w-full px-4 pt-20 pb-4 my-2 sm:w-5/6 md:w-2/3 lg:w-1/2">
              Hire the best freelancers for any job, online.
            </h1>
            <p className="text-base break-words w-full px-4 pb-4 mb-6 sm:w-5/6 md:w-2/3 lg:w-1/2">
              Millions of people use vRHere to turn their ideas into reality.
            </p>
          </div>

          <div className="flex flex-col items-center w-full rounded-md sm:flex-row md:w-5/6  lg:w-3/5 lg:justify-evenly lg:bg-white lg:mx-4 ">
            {/* input search */}
            <div className="md:flex md:items-center w-full">
              <div className="flex w-full p-4 items-center space-x-2 rounded-sm lg:w-3/4">
                <FiSearch size={18} />
                <input
                  type="text"
                  name="search"
                  placeholder="What are you looking for?"
                  id=""
                  className="p-2 w-full border-[1px] sm:border-r-[1px] focus:border-none focus:outline-none lg:border-0 lg:border-r-[1px]"
                />
              </div>
              {/* Categories */}
              <Menu
                as="div"
                className="hidden relative md:inline-flex w-fit lg:w-1/3"
              >
                <Menu.Button className="px-4 py-3 flex items-center w-full justify-between lg:p-6 ">
                  Categories <HiChevronDown size={18} />
                </Menu.Button>
                <Menu.Items className="flex flex-col absolute  bottom-20 overflow-y-scroll h-56 shadow-sm rounded-md md:w-56 md:right-5 ">
                  {links.map((link) => (
                    /* Use the `active` state to conditionally style the active item. */
                    <Menu.Item
                      key={link.href}
                      as={Fragment}
                      className="px-4 py-2  bg-white hover:bg-gray-100"
                    >
                      {({ active }) => (
                        <Link href={link.href} className="">
                          {link.label}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Menu>
            </div>
            {/* Search Btn */}
            <button className="bg-green-400 text-white font-bold py-4 px-6 sm:mr-4 w-fit self-center rounded-md">
              Search
            </button>
          </div>

          <div className="text-base breaks-words w-fit px-4 py-4 mt-8">
            <p>
              Popular Searches: Designer, Developer, Web, IOS, PHP, Senior,
              Engineer
            </p>
          </div>
        </div>
      </header>

      {/* Browse by category */}
      <div className="flex flex-col md:py-6 px-14">
        {/* Title */}
        <div className="py-6 px-4 space-y-2">
          <p className="text-3xl font-bold">Browse talent by category</p>
          <p className="text-md opacity-75">
            Get some Inspirations from 1800+ skills
          </p>
        </div>
        {/* Categories */}
        <div className="flex flex-wrap w-full h-fit">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className="p-8 border-[1px] hover:shadow-md rounded-md cursor-pointer sm:w-2/5 lg:w-1/4 h-fit m-4"
            >
              <div className="flex flex-col h-full justify-evenly md:space-y-4">
                <img src={link.logo} className="w-10 h-10" />
                <div>
                  <p className="text-lg font-medium">{link.label}</p>
                  <p className="text-sm opacity-70">{link.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* Trending Services */}
      <div className="flex flex-col md:py-6 md:px-14 bg-gray-100">
        <div className="py-6 px-4 space-y-2">
          <p className="text-3xl font-bold">Trending Services</p>
          <p className="text-md opacity-75">
            Most viewed and all-time top-selling services
          </p>
        </div>
        {/* Trending service from backend */}
        <div className="flex flex-wrap w-full h-fit px-4">
          {topServices?.length == 0 ? (
            <>
              <div>
                <p>No Services Posted</p>
              </div>
            </>
          ) : (
            topServices?.map((service) => (
              <div
                key={service?.id}
                className="border-[1px] rounded-md shadow-md bg-white w-full h-fit my-4 mr-2 sm:w-1/2 lg:w-1/3 xl:w-1/4"
              >
                <div className="flex flex-col h-full justify-evenly space-y-4 items-center text-center">
                  <img
                    src={service?.imgURL}
                    className="w-full h-full rounded-t-md  "
                  />
                  <div className="space-y-4 px-4">
                    <p className="text-sm opacity-70">{service.category}</p>
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
                    <button className="bg-orange-500 hover:bg-orange-700  cursor-pointer px-6 py-2 shadow-md text-white font-medium rounded-md mx-4 mt-2 mb-4">
                      View Service
                    </button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Need something done? */}

      <div className="flex w-full h-fit items-center justify-center md:justify-start">
        <div className="w-2/3 flex flex-col">
          <div className="p-4">
            <p className="text-5xl font-bold capitalize">
              A whole world of freelance talent at your fingertips
            </p>
          </div>
          <div className="p-4">
            <div className="flex space-x-6 items-center">
              <Image src={Badge} className="w-10 h-10" />
              <div>
                <p className="text-2xl font-semibold ">Proof of quality</p>
                <p className="opacity-80">
                  Check any pro’s work samples, client reviews, and identity
                  verification.
                </p>
              </div>
            </div>
            <div className="flex space-x-6 items-center">
              <Image src={Free} className="w-10 h-10" />
              <div>
                <p className="text-2xl font-semibold ">
                  No cost until the end.
                </p>
                <p className="opacity-80">
                  Check any pro’s work samples, client reviews, and identity
                  verification.
                </p>
              </div>
            </div>
            <div className="flex space-x-6 items-center">
              <Image src={Security} className="w-10 h-10" />
              <div>
                <p className="text-2xl font-semibold ">Safe and secure</p>
                <p className="opacity-80">
                  Check any pro’s work samples, client reviews, and identity
                  verification.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/3 hidden md:inline-flex">
          <Image src={Hire} className="w-full h-full" />
        </div>
      </div>
      {/* Top Freelancers */}
      <div className="flex flex-col md:py-6 md:px-14 bg-gray-100">
        <div className="py-6 px-4 space-y-2">
          <p className="text-3xl font-bold">Top Freelancers</p>
          <p className="text-md opacity-75">
            Work with talented people at the most affordable price to get your
            job done
          </p>
        </div>
        {/* Trending freelancers from backend */}
        <div className="flex flex-wrap w-full h-fit px-4">
          {topSellers?.length == 0 ? (
            <>
              <div>
                <p>No Sellers Available Right Now</p>
              </div>
            </>
          ) : (
            topSellers?.map((seller) => (
              <div
                key={seller?.id}
                className="border-[1px] rounded-md shadow-md bg-white w-full h-fit my-4 mr-2 sm:w-1/2 lg:w-1/3 xl:w-1/4"
              >
                <div className="flex flex-col h-full justify-evenly space-y-4 items-center text-center">
                  <img src={seller?.imgURL} className="w-full h-full" />
                  <div className="space-y-2">
                    <p className="text-sm opacity-70">{seller.category}</p>
                    <div className="text-xl text-center justify-center font-medium flex space-x-1 items-center">
                      <p>
                        {seller.firstName} {seller.lastName}
                      </p>
                      <BsFillPatchCheckFill color="orange" size={18} />
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <GoLocation size={14} className="opacity-75" />
                      <p className="text-sm opacity-75">Delhi, India</p>
                    </div>
                  </div>
                  <Link
                    href={`/seller/${seller.id}`}
                    className="w-full flex items-center justify-center"
                  >
                    <button className="bg-orange-500 hover:bg-orange-700 mb-2 cursor-pointer px-6 py-2 shadow-md text-white font-medium rounded-md">
                      View Profile
                    </button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Footer */}
      <div className="flex flex-col py-6 px-14 bg-white">
        <h1>vRhere - Freelancing Marketplace</h1>
        <h1>
          Made By <span className="text-2xl font-bold">Akshmit Saxena</span>
        </h1>
        <h1>Sage University</h1>
      </div>
      {/* Copyright */}
    </>
  );
}

export async function getServerSideProps(context) {
  const { req, res } = context;
  try {
    const cookies = nookies.get(context);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { name, uid } = token;
    let userObj = cookies.user;

    if (name == undefined) {
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

    let AllServices = [];
    const querySnapshotServices = await getDocs(collection(db, "services"));
    querySnapshotServices.forEach((doc) => {
      AllServices.push({
        ...doc.data(),
        id: doc.id,
        serviceCreatedAt: doc.data().serviceCreatedAt.toMillis(),
      });
    });

    return {
      props: {
        name,
        isSeller,
        AllSellers,
        AllServices,
      },
    };
  } catch (error) {
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return {
      props: {
        e: error.message,
      },
    };
  }
}
