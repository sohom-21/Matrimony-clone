import React from "react";

const menuItems = [
  {
    title: "Partner Search",
    links: [
      { name: "Smart Search", href: "/smartsearch" },
      { name: "Advanced Search", href: "/advancedsearch" },
      { name: "Occupational Search", href: "/occupationalsearch" },
      { name: "Educational Search", href: "/educationalsearch" },
      { name: "ID Search", href: "/Idsearch" },
      { name: "Location Search", href: "/locationsearch" },
    ],
  },
  {
    title: "General",
    links: [
      { name: "Refer a Friend", href: "referafriend.php" },
      { name: "Success Stories", href: "successstory.php" },
      { name: "Contact Us", href: "reachus.php" },
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
                <a
                  href={link.href}
                  className="block py-2 px-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SidebarMenu;
