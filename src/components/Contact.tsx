import { useState } from "react";
import {toast} from "react-toastify"

import { notifications } from "../Types/types";

export const Contact = () => {
  const [formData, setFormData] = useState<notifications>({
    name: "",
    surname: "",
    email: "",
    phone: 0,
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);

    try {
        const response = await fetch("/api/notifications", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorText = await response.text(); 
            console.error("Failed to save notifications:", errorText);
            toast.warning("Failed to save notifications")
            return; 
        }

        const results = await response.json();
        console.log("Success:", results.message);
        toast.success("Your message is submitted successfully!!!!!")
        
        setFormData({
            name: "",
            surname: "",
            email: "",
            phone: 0,
            message: "",
        });

    } catch (error) {
        console.error("Error:", error);
    }
};



  return (
    <div className="flex flex-col justify-center py-20 text-gray-800">
      <h1 className="text-center text-4xl uppercase font-bold text-secondaryColor mb-16">
        Contact Us
      </h1>
      <div className="flex flex-wrap md:flex-nowrap px-8 py-12 space-y-8 md:space-y-0 md:space-x-12 text-gray-800 w-[70vw] mx-auto">
        <div className="md:w-1/2 flex flex-col space-y-6">
          <h2 className="text-2xl font-bold text-primaryColor">
            Call to Action
          </h2>
          <p className="text-lg">Email: johannesburg.high@example.com</p>
          <p className="text-lg">Phone: +27 11 123 4567</p>
          <p className="text-lg">Fax: +27 11 765 4321</p>

          <div className="border rounded-lg overflow-hidden">
            <iframe
              title="Johannesburg High School Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28638.037442442223!2d27.961828974316408!3d-26.20465739999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950be10a91ad11%3A0xd2691d17b129e6c4!2sJohannesburg%20Secondary%20School!5e0!3m2!1sen!2sza!4v1729846866041!5m2!1sen!2sza"
              width="100%"
              height="250"
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold mb-6 text-primaryColor">
            Get in Touch
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-primaryColor"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Surname
                </label>
                <input
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-primaryColor"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-primaryColor"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-primaryColor"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-primaryColor"
                rows={4}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-primaryColor text-white py-2 px-4 rounded-full hover:bg-secondaryColor-dark transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
