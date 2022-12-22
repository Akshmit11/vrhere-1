/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
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

export default function Categories() {
  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="bg-gray-100 flex flex-col w-full h-full justify-center items-center py-8">
        <div className="flex flex-wrap w-full h-screen justify-center">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className="p-8 bg-white border-[1px] hover:shadow-md rounded-md cursor-pointer w-1/5 h-2/5 m-4"
            >
              <div className="flex flex-col h-full justify-evenly">
                <img src={link.logo} className="w-10 h-10" alt={link.label} />
                <div>
                  <p className="text-lg font-medium">{link.label}</p>
                  <p className="text-sm opacity-70">{link.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
