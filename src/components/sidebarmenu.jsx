import React from "react";
import { Link } from "react-router-dom";

const menuItems = [
  {
    title: "Partner Search",
    links: [
      { name: "Smart Search", href: "/smartsearch" },
      { name: "Advanced Search", href: "/advancedsearch" },
      { name: "Occupational Search", href: "/occupationalsearch" },
      { name: "Educational Search", href: "/educationalsearch" },
      { name: "ID Search", href: "/idsearch" },
      { name: "Location Search", href: "/locationsearch" },
    ],
  },
  {
    title: "General",
    links: [
      { name: "Refer a Friend", href: "/referafriend" },
      { name: "Success Stories", href: "/successstories" },
      { name: "Contact Us", href: "/contact" },
    ],
  },
];

const SidebarMenu = () => {
  return (
    <div className="w-48 bg-white border border-gray-300 p-4">
      {menuItems.map((section, index) => (
        <div key={index} className="mb-4">
          <h3 className="bg-gray-200 text-gray-700 font-semibold px-2 py-1">
            {section.title}
          </h3>
          <ul className="mt-2">
            {section.links.map((link, i) => (
              <li key={i} className="border-b last:border-none">
                <Link
                  to={link.href}
                  className="block py-2 px-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SidebarMenu;
