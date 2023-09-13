import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillEdit, AiFillCloseCircle } from "react-icons/ai";
import { NavLink, useParams } from "react-router-dom";

const View = () => {
  // State to hold the user data
  const [data, setData] = useState([]);

  // Get the 'id' parameter from the URL using React Router's 'useParams' hook
  const { id } = useParams();

  // Fetch user data from the server when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5500/users/" + id)
      .then((res) => {
        // Handle successful response
        setData(res.data);
      })
      .catch((err) => {
        // Handle errors
        console.log("Error fetching user data:", err);
      });
  }, [id]); // Include 'id' in the dependency array to re-run the effect when 'id' changes

  return (
    <div className="w-[100%] h-screen py-20 flex justify-center items-center bg-gray-50">
      <div className="w-[70%] h-[70vh] p-6 flex flex-col gap-4 rounded-md shadow-md">
        <div className="flex justify-between">
          <h1 className="text-[16px] font-medium">{data.title}</h1>
          <div className="flex text-[18px] gap-4 justify-center items-center">
            <NavLink
              to={`/update/${id}`}
              className="text-green-500 hover:text-green-300"
              title="Edit"
            >
              <AiFillEdit />
            </NavLink>
            <NavLink
              to="/"
              className="text-red-500 hover:text-red-300"
              title="Close"
            >
              <AiFillCloseCircle />
            </NavLink>
          </div>
        </div>
        <p className="text-[14px] text-gray-600 overflow-auto">{data.desc}</p>
      </div>
      {/* </div> */}
    </div>
  );
};

export default View;
