import React, { useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import nookies from "nookies";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function UpdateService(props) {
  // console.log(props);
  const router = useRouter();
  const [title, setTitle] = useState(props.data.title);
  const [description, setDescription] = useState(props.data.description);
  const [imgURL, setImgURL] = useState(props.data.imgURL);
  const [bannerImg, setBannerImg] = useState(null);
  const [serviceArea, setServiceArea] = useState(props.data.serviceArea);
  const [category, setCategory] = useState(props.data.category);

  function handleFileUpload(file) {
    setBannerImg(file);
    const metadata = {
      contentType: "image/png",
    };
    const storageRef = ref(
      storage,
      "serviceBannerImages/" + props?.data?.userId + "/" + file.name
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
        const docRef = doc(db, "services", props?.data?.id);
        await updateDoc(docRef, {
          title,
          imgURL,
          description,
          category,
          serviceArea,
        });
        console.log("congrats you updated your service");
        console.log(docRef);
        router.push("/dashboard");
      } catch (error) {
        console.log("error", error.message);
      }
    }
  }

  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="flex flex-col items-center justify-center bg-gray-100 w-full h-full py-16">
        <div className="text-center">
          <p className="text-xl font-bold">Add Service</p>
          <p className="text-base text-center">
            Add the services you provide. This information will appear on your
            public profile, so that potential buyers can contact you for your
            service.
          </p>
        </div>
        <div className="bg-white flex flex-col h-full w-3/4 rounded-md my-8 p-6 shadow-md">
          <form
            action=""
            className="space-y-4"
            onSubmit={(e) => handleSubmit(e)}
          >
            {/* title */}
            <div className="flex flex-col space-y-2">
              <p>Title:</p>
              <input
                type="text"
                className="border-[1px] border-gray-200 px-2 py-2 rounded-md w-full resize-none"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            {/* description */}
            <div className="flex flex-col space-y-2">
              <p>Description about your service:</p>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                required
                minLength={150}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border-[1px] border-gray-200 px-2 py-2 rounded-md w-full resize-none"
              ></textarea>
            </div>
            {/* image for service */}
            <div className="flex flex-col space-y-2">
              <p>Upload a banner for your service:</p>
              <input
                type="file"
                className=""
                accept="image/png"
                onChange={(e) => handleFileUpload(e.target.files[0])}
              />
            </div>
            {/* category */}
            <div className="flex flex-col space-y-2">
              <p>Category for Service:</p>
              <select
                name="category"
                placeholder=""
                id=""
                className="border-[1px] w-fit py-2 px-1 my-2 focus:outline-none rounded-sm"
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
                <option value="Programming & Tech">Programming & Tech</option>
                <option value="Writing & Translation">
                  Writing & Translation
                </option>
                <option value="Others">Others</option>
              </select>
            </div>
            {/* service area */}
            <div className="flex flex-col space-y-2">
              <div className="flex space-x-2 items-center">
                <p>Service Area</p>
                <span className="text-sm opacity-70 italic">
                  (You can write your city or if you want to provide your
                  service to whole world you can write everywhere)
                </span>
                :
              </div>
              <input
                type="text"
                className="border-[1px] w-fit border-gray-200 px-2 py-2 rounded-md resize-none"
                required
                value={serviceArea}
                onChange={(e) => setServiceArea(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-green-400 hover:bg-green-700 text-white rounded-md shadow-md"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  // console.log(context.query);
  const docRef = doc(db, "services", context.query.serviceId);
  try {
    const docSnap = await getDoc(docRef);
    // let data = docSnap.data();
    return {
      props: {
        data: {
          ...docSnap.data(),
          id: docSnap.id,
          serviceCreatedAt: docSnap.data().serviceCreatedAt.toMillis(),
        },
      }, // will be passed to the page component as props
    };
  } catch (error) {
    return {
      props: {
        e: "error",
      }, // will be passed to the page component as props
    };
  }
}
