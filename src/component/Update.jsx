import React, { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import axios from "axios";


const Update = () => {

    // State to store user input values for updating
    const [value, setValue] = useState({
      title: "",
      desc: ""
    });
  
    // Get the 'id' parameter from the URL using React Router's 'useParams' hook
    const { id } = useParams();
  
    // React Router's useNavigate hook for navigation
    const navigate = useNavigate();
  
    // Fetch user data from the server when the component mounts
    useEffect(() => {
      axios
        .get("http://localhost:5500/users/" + id)
        .then((res) => {
          // Populate the input fields with user data from the server
          setValue({
            title: res.data.title,
            desc: res.data.desc,
          });
          console.log("object")
        })
        .catch((err) => console.error(err));
    }, [id]); // Make sure to include 'id' in the dependency array to re-fetch data when it changes
  
    // Function to handle form submission for updating user data
    const handelUpdate = (e) => {
      e.preventDefault(); // Prevent the default form submission behavior
  
      // Send a PUT request to update user data on form submission
      axios
        .put("http://localhost:5500/users/" + id, value)
        .then((res) => {
          console.log(res); // Log the response from the server (you can update this logic as needed)
  
          // Navigate back to the home page after successful update
          navigate("/");
        })
        .catch((err) => console.error(err)); // Log any errors that occur during the PUT request
    };

  return (
    <div>
      <div className="w-[100%] h-screen py-20 flex justify-center items-center bg-gray-50">
        <div className="w-[50%] h-[70vh]">
          <form onSubmit={handelUpdate}>
            <div className="w-[100%] mb-6 flex justify-between">
              <h1 className="text-2xl font-semibold">Update Note</h1>
              <div className="flex justify-center items-center gap-3">
              <NavLink
                to='/'
                className="py-1 px-2 rounded-md shadow-md  bg-blue-500  text-white hover:bg-blue-300"
              >
                Back
              </NavLink>
              <button
                className="py-1 px-2 rounded-md shadow-md text-white bg-green-400 hover:bg-green-300"
              >
                Update
              </button>
              </div>
            </div>
            <div className="w-[100%] flex flex-col shadow-md rounded-md">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={value.title} 
                onChange={(e) => setValue({ ...value, title: e.target.value })}
                className="border p-3 outline-none rounded-t-md bg-white text-black"
              />
              <textarea
                type= 'text'
                name="desc"
                cols="30"
                rows="15"
                placeholder="Description"
                value={value.desc} 
                onChange={(e) => setValue({ ...value, desc: e.target.value })}
                className="border resize-none p-3 rounded-b-md outline-none text-black bg-white"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update;
