/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import nookies from "nookies";
import { storage, authClient, db } from "../../firebase.config";
import { firebaseAdmin } from "../../firebaseAdmin.config";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";

export default function SellerInfo(props) {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [email, setEmail] = useState("");
  const [years, setYears] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [experienceOptional, setExperienceOptional] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [category, setCategory] = useState("");
  const [categoryOptional, setCategoryOptional] = useState("");

  function handleFileUpload(file) {
    setProfileImg(file);
    const metadata = {
      contentType: "image/png",
    };
    const storageRef = ref(
      storage,
      "profileImages/" + props.uid + "/" + file.name
    );
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            console.log("User doesn't have permission to access the object");
            break;
          case "storage/canceled":
            console.log("User canceled the upload");
            break;

          case "storage/unknown":
            console.log("Unknown error occurred, inspect error.serverResponse");
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("file uploaded");
          console.log("File available at", downloadURL);
          setImgURL(downloadURL);
        });
      }
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (imgURL != "") {
      try {
        const docRef = await addDoc(collection(db, "sellers"), {
          firstName,
          lastName,
          email,
          imgURL,
          years,
          phone: "+91" + phone,
          description,
          category,
          userId: props.uid,
          experienceOptional,
          categoryOptional,
          accountCreatedAt: serverTimestamp(),
        });

        console.log("congrats you are a seller");
        console.log(docRef);
        nookies.set(undefined, "sellerDoc", docRef, {});
        nookies.set(undefined, "sellerId", docRef.id, {});
        router.push("/home");
      } catch (error) {
        console.log("error", error.message);
      }
    }
  }

  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="flex flex-col w-full h-full items-center justify-center py-8 shadow-md bg-gray-100 space-y-6">
        <div className="text-center">
          <p className="text-xl font-bold">Seller Info</p>
          <p className="text-base text-center">
            Tell a bit about yourself. This information will appear on your
            public profile, so that potential buyers can get to know you better.
          </p>
        </div>

        {/* Form */}
        <form
          action=""
          onSubmit={(e) => handleSubmit(e)}
          className="w-5/6 flex flex-col justify-center space-y-4"
        >
          <div className="w-full flex flex-col justify-between bg-white shadow-md rounded-md py-8 px-8 space-y-6">
            {/* Name */}
            <div className="flex w-full">
              <div className="w-1/3">
                <p>
                  Name <span className="text-red-600 font-bold">*</span>
                </p>
              </div>
              <div className="flex w-2/3">
                <div className="w-1/2">
                  <p>First Name</p>
                  <input
                    className="border-[1px] w-5/6 py-2 px-1 my-2 focus:outline-none rounded-sm"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="w-1/2">
                  <p>Last Name</p>
                  <input
                    className="border-[1px] w-5/6 py-2 px-1 my-2 focus:outline-none rounded-sm"
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* Profile Image */}
            <div className="flex w-full">
              <div className="w-1/3">
                <p>
                  Profile Image{" "}
                  <span className="text-red-600 font-bold">*</span>
                </p>
              </div>
              <div className="flex">
                <div className="relative">
                  <input
                    type="file"
                    accept="image/png"
                    className=""
                    required
                    onChange={(e) => handleFileUpload(e.target.files[0])}
                  />
                </div>
              </div>
            </div>
            {/* Contact Details */}
            <div className="flex w-full">
              <div className="w-1/3">
                <p>
                  Contact Details{" "}
                  <span className="text-red-600 font-bold">*</span>
                </p>
              </div>
              <div className="flex w-2/3">
                <div className="w-1/2">
                  <p>Phone Number (+91)</p>
                  <input
                    className="border-[1px] w-5/6 py-2 px-1 my-2 focus:outline-none rounded-sm"
                    type="number"
                    minLength={10}
                    maxLength={10}
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="w-1/2">
                  <p>Professional Email Address</p>
                  <input
                    className="border-[1px] w-5/6 py-2 px-1 my-2 focus:outline-none rounded-sm"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* Description */}
            <div className="flex w-full">
              <div className="w-1/3">
                <p>
                  Description <span className="text-red-600 font-bold">*</span>
                </p>
              </div>
              <div className="flex flex-col w-2/3">
                <textarea
                  className="border-[1px] w-11/12 resize-none h-36 py-2 px-1 my-1 focus:outline-none rounded-sm"
                  required
                  name="desc"
                  minLength={150}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <label
                  htmlFor="desc"
                  className="opacity-70 font-medium text-sm"
                >
                  Minimum 150 characters
                </label>
              </div>
            </div>
            {/* Experience */}
            <div className="flex w-full">
              <div className="w-1/3">
                <p>
                  Experience <span className="text-red-600 font-bold">*</span>
                </p>
              </div>
              <div className="flex w-2/3">
                <div className="w-1/2">
                  <p>Number of years</p>
                  <input
                    className="border-[1px] w-5/6 py-2 px-1 my-2 focus:outline-none rounded-sm appearance-none"
                    type="number"
                    required
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                  />
                </div>
                <div className="w-1/2">
                  <p>Describe your experience - (Optional)</p>
                  <textarea
                    className="border-[1px] py-2 px-1 my-2 focus:outline rounded-sm w-5/6 resize-none"
                    value={experienceOptional}
                    onChange={(e) => setExperienceOptional(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
            {/* Category for Service */}
            <div className="flex w-full">
              <div className="w-1/3">
                <p>
                  Category for Service{" "}
                  <span className="text-red-600 font-bold">*</span>
                </p>
              </div>
              <div className="flex w-2/3">
                <div className="w-1/2">
                  <p>Skill Category</p>
                  <select
                    name="category"
                    placeholder=""
                    id=""
                    className="border-[1px] w-5/6 py-2 px-1 my-2 focus:outline-none rounded-sm"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Design & Creative">Design & Creative</option>
                    <option value="Development & IT">Development & IT</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Finance & Accounting">
                      Finance & Accounting
                    </option>
                    <option value="Programming & Tech">
                      Programming & Tech
                    </option>
                    <option value="Writing & Translation">
                      Writing & Translation
                    </option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div className="w-1/2">
                  <p>If you have any extra skills, do tell - (Optional)</p>
                  <textarea
                    className="border-[1px] py-2 px-1 my-2 focus:outline rounded-sm w-5/6 resize-none"
                    value={categoryOptional}
                    onChange={(e) => setCategoryOptional(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2 rounded-md font-bold text-lg bg-green-400 text-white shadow-md hover:bg-green-600 w-1/6 self-center"
          >
            Become a seller
          </button>
        </form>
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
    const querySnapshot = await getDocs(collection(db, "sellers"));

    // if (name) {
    //   res.statusCode = 302;
    //   res.setHeader("Location", "/");
    // }

    let AllSellers = [];
    querySnapshot.forEach((doc) => {
      AllSellers.push({
        ...doc.data(),
        id: doc.id,
        accountCreatedAt: doc.data().accountCreatedAt.toMillis(),
      });
    });

    let isSeller = AllSellers.find((seller) => seller.userId === uid);

    if (isSeller) {
      res.statusCode = 302;
      res.setHeader("Location", "/home");
    }

    return {
      props: {
        name,
        uid,
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
