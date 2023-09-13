import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Input = () => {
  // State to store user input values
  const [value, setValue] = useState({
    title: "",
    desc: "",
  });

  // React Router's useNavigate hook for navigation
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    axios
      .post("http://localhost:5500/users", value) // Send a POST request to create a new user
      .then((res) => {
        console.log(res); // Log the response from the server (you can update this logic as needed)
        navigate('/'); // Navigate back to the home page after successful submission
      })
      .catch((err) => console.error(err)); // Log any errors that occur during the POST request
  };

  return (
    <div className="w-[100%] h-screen py-20 flex justify-center items-center bg-gray-50">
      <div className="w-[50%] h-[70vh]">
        <form onSubmit={handleSubmit}>
          <div className="w-[100%] mb-6 flex justify-between">
            <h1 className="text-2xl font-semibold">Add new note</h1>
            <div className="flex justify-center items-center gap-3">
              <NavLink
                to='/'
                className="py-1 px-2 rounded-md shadow-md  bg-blue-500  text-white hover:bg-blue-300"
              >
                Back
              </NavLink>
              <button
                type="submit"
                className="py-1 px-2 rounded-md shadow-md text-white bg-green-400 hover:bg-green-300"
              >
                Save
              </button>
            </div>
          </div>
          <div className="w-[100%] flex flex-col shadow-md rounded-md">
            <input
              type="text"
              name="title"
              placeholder="Title"
              onChange={(e) => setValue({ ...value, title: e.target.value })} // Update the 'name' field in the state
              className="border p-3 outline-none rounded-t-md bg-white text-black"
            />
            <textarea
              name="desc"
              id=""
              cols="30"
              rows="15"
              placeholder="Description"
              onChange={(e) => setValue({ ...value, desc: e.target.value })} // Update the 'name' field in the state
              className="border resize-none p-3 rounded-b-md outline-none text-black bg-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Input;
