import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.config";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function CategoryName(props) {
  // console.log(props);
  return (
    <div className="w-full h-full">
      <Navbar props={props} />
      <div className="flex flex-col bg-gray-100 w-full h-full p-6">
        <h1 className="capitalize text-4xl font-bold my-6">
          {props?.categoryName}
        </h1>
        {props?.AllServices?.length == 0 ? (
          <>
            <div>
              <p>No Services right now under this category!!!</p>
            </div>
          </>
        ) : (
          props?.AllServices?.map((service) => (
            <div
              key={service?.id}
              className="bg-white w-3/4 h-fit flex flex-col space-y-2 py-4 px-2 rounded-md shadow-md"
            >
              <p className="text-xl font-semibold">{service?.title}</p>
              <p className="text-base font-thin text-ellipsis w-full overflow-hidden whitespace-nowrap">
                {service?.description}
              </p>
              <Link
                href={`/services/${service?.id}`}
                className="bg-green-400 w-fit px-4 py-2 rounded-md shadow-sm cursor-pointer hover:bg-green-700 text-white font-bold "
              >
                <button>View Service</button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps({ params: { categoryName } }) {
  try {
    let AllServices = [];
    const querySnapshotServices = await getDocs(collection(db, "services"));
    querySnapshotServices.forEach((doc) => {
      if (doc.data().category === categoryName) {
        AllServices.push({
          ...doc.data(),
          id: doc.id,
          serviceCreatedAt: doc.data().serviceCreatedAt.toMillis(),
        });
      }
    });
    return {
      props: {
        categoryName,
        AllServices,
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
