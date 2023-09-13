import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BiSolidAddToQueue } from "react-icons/bi";
import { AiFillEye, AiFillEdit, AiFillDelete } from "react-icons/ai";
import axios from "axios";

const Home = () => {
  // State to hold the list of users
  const [data, setData] = useState([]);

  // useEffect hook to fetch data from the server when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5500/users")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Function to handle user deletion
  const handelDelete = (id) => {
    // Display a confirmation dialog before deleting
    const confirmDelete = window.confirm("Are you sure you want to delete");

    if (confirmDelete) {
      axios
        .delete("http://localhost:5500/users/" + id)
        .then((res) => {
          // Remove the deleted item from the data state
          setData((prevData) => prevData.filter((d) => d.id !== id));
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="w-[100%] h-screen py-12 bg-gray-50">
      <div className="w-[90%] mx-auto h-[90vh] flex flex-col">
        <h1 className="text-center mb-6 text-3xl font-semibold">
          Notebook App
        </h1>
        <div className="w-[100%] h-[100%] grid grid-cols-3 gap-10 mb-6">
          {data.map((item, i) => (
            <div
              key={i}
              className="w-[100%] h-[230px] p-4 flex flex-col gap-4 rounded-lg shadow-md bg-white"
            >
              <div className="flex justify-between">
                <h1 className="text-[16px] font-medium">{item.title}</h1>
                <div className="flex text-[18px] gap-4 justify-center items-center">
                  <NavLink
                    to={`/view/${item.id}`}
                    className="text-blue-500 hover:text-blue-300"
                    title="View"
                  >
                    <AiFillEye />
                  </NavLink>
                  <NavLink
                    to={`/update/${item.id}`}
                    className="text-green-500 hover:text-green-300"
                    title="Edit"
                  >
                      <AiFillEdit />
                  </NavLink>
                  <NavLink className="text-red-500 hover:text-red-300">
                    <button
                      type="submit"
                      onClick={(e) => handelDelete(item.id)}
                    >
                      <AiFillDelete />
                    </button>
                  </NavLink>
                </div>
              </div>
              <p className="text-[14px] text-gray-600 overflow-auto">
                {item.desc}
              </p>
            </div>
          ))}
          <NavLink
            to="/input"
            className="w-[100%] h-[230px] flex justify-center items-center rounded-lg shadow-md bg-white text-green-500 hover:text-green-300"
            title="Add New Note"
          >
            <BiSolidAddToQueue size={28} />
          </NavLink>
        </div>
        <div className="flex w-[100%] justify-center items-center border h-10"></div>
      </div>
    </div>
  );
};

export default Home;
