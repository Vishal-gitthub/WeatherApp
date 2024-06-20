import React, { useState } from "react";

const SideBar = () => {
  const [SideBar, setSidebar] = useState(false);
  return (
    <div
      className="flex
    "
    >
      <div
        className={`bg-black fixed w-48 z-50 h-screen transition-all duration-300 ${
          SideBar ? "left-0" : "-left-48"
        } `}
      >
        <button
          className="text-red-500 relative"
          onClick={() => setSidebar(!SideBar)}
        >
          close
        </button>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem,
        fugiat maiores. Molestiae voluptatibus odio officiis quas facere? Quia,
        molestiae eligendi. Dignissimos quia possimus nemo odit numquam sint
        dolor obcaecati. Saepe optio facilis esse voluptate eius? Facere iste,
        distinctio consequuntur incidunt beatae minima. Voluptatem similique
        odit quis quos placeat fuga magnam!
      </div>
      <div>
        <button
          className="text-red-600 relative"
          onClick={() => setSidebar(!SideBar)}
        >
          open
        </button>
      </div>
    </div>
  );
};

export default SideBar;
