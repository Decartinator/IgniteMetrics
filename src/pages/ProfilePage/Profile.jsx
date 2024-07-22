import React, { useState, useRef } from "react";
import { PencilIcon } from "@heroicons/react/solid"; // You need to install @heroicons/react

function Profile() {
  const [isEditable, setIsEditable] = useState({
    name: false,
    surname: false,
    contactNumber: false,
  });

  const inputRefs = {
    name: useRef(null),
    surname: useRef(null),
    contactNumber: useRef(null),
  };

  const user = {
    name: "Mzambiya",
    surname: "Doe",
    role: "Store Owner",
    email: "mzambiya.doe@example.com",
    contactNumber: "+1234567890",
  };

  const handleEditClick = (field) => {
    setIsEditable({ ...isEditable, [field]: !isEditable[field] });
    if (!isEditable[field]) {
      setTimeout(() => inputRefs[field].current.focus(), 100);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 pt-8">
      <div className="flex items-center mb-8">
        <div className="rounded-full h-12 w-12 bg-gray-300 mr-4"></div>{" "}
        {/* Placeholder for smaller profile picture */}
        <div>
          <h2 className="text-lg font-bold">
            {user.name} {user.surname}
          </h2>
          <p className="text-sm text-gray-500">{user.role}</p>
        </div>
      </div>
      <form className="w-full max-w-sm space-y-6">
        {[
          { label: "Name", value: user.name, field: "name" },
          { label: "Surname", value: user.surname, field: "surname" },
          { label: "Role", value: user.role, field: "role", readOnly: true },
          { label: "Email", value: user.email, field: "email", readOnly: true },
          {
            label: "Contact Number",
            value: user.contactNumber,
            field: "contactNumber",
          },
        ].map(({ label, value, field, readOnly }) => (
          <div key={field} className="flex items-center">
            <label
              className="block text-gray-700 text-sm font-bold mr-4 w-32"
              htmlFor={field}
            >
              {label}
            </label>
            <div className="relative flex-grow">
              <input
                ref={inputRefs[field]}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  !isEditable[field] && !readOnly ? "cursor-not-allowed" : ""
                }`}
                id={field}
                type="text"
                defaultValue={value}
                readOnly={!isEditable[field] || readOnly}
              />
              {!readOnly && (
                <PencilIcon
                  className="absolute right-2 top-2 h-5 w-5 text-gray-500 cursor-pointer"
                  onClick={() => handleEditClick(field)}
                />
              )}
            </div>
          </div>
        ))}
      </form>
    </div>
  );
}

export default Profile;
