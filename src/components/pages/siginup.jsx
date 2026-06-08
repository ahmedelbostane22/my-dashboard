import React, { useState } from 'react';
import { auth, db } from '../Layout/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import Inputs from "../Layout/inputs";

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;

      await setDoc(doc(db, "Admin", user.uid), {
        username: name,
        email: email,
        phone: phone,
        createdAt: new Date().toISOString(),
      });

      console.log("Admin created successfully with ID:", user.uid);
    } catch (error) {
      console.error("Error creating admin:", error);
    }
  };

  return (
    <div className="bg-indigo-100 flex justify-center items-center h-screen w-screen">
      <div className="border-t-8 rounded-sm border-indigo-600 bg-white p-12 shadow-2xl shadow-indigo-900/20 w-96">
        <h1 className="font-bold text-center block text-2xl">Sign Up</h1>
        <form onSubmit={handleSignup}>
          <Inputs
            type="text"
            id="name"
            name="name"
            onChange={(e) => setName(e.target.value)}
            label="Name"
          />
          <Inputs
            type="phone"
            id="phone"
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
            label="Phone"
            placeholder="Your phone"
            autofocus={false}
          />
          <Inputs
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder="me@example.com"
            autofocus={false}
          />
          <Inputs
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="••••••••••"
          />

          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-md text-sm font-medium transition"
          >
            Submit
          </button>

          <p className="text-center mt-4 text-gray-100 p-2 rounded">
            Already have an account?{' '}
            <a href="/login" className="text-indigo-600 hover:underline">
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
