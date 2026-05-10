import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { initializeApp } from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export function Login() {
  const firebaseConfig = {
    apiKey: "AIzaSyBdY-IZN1csG71W8tJmejqpDjvVaIQSsqs",
    authDomain: "mishoppinglist-c74d2.firebaseapp.com",
    databaseURL: "https://mishoppinglist-c74d2.firebaseio.com",
    projectId: "mishoppinglist-c74d2",
    storageBucket: "mishoppinglist-c74d2.appspot.com",
    messagingSenderId: "302200915672",
    appId: "1:302200915672:web:4d3e3f9e830d2416d6f9ad",
    measurementId: "G-R2FPE3YFNM",
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loggedUser = email === "beatlm@gmail.com" ? "Bea" : "Rover";
  const app = initializeApp(firebaseConfig);
  const navigate = useNavigate();

  const auth = getAuth(app);

  const signIn = () => {
    console.log("password ", password);
    console.log("email", email);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {})

      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
      });

    console.log(loggedUser + " loggedUser");

    navigate("/shops", { state: { loggedUser } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-medium p-8 sm:p-10 slideUp">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">Shopping List</h1>
            <p className="text-gray-600 text-sm">v4.0 </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); signIn(); }} className="space-y-6">
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors bg-gray-50 placeholder-gray-400"
                placeholder="tu@email.com"
              />
              <label htmlFor="email" className="absolute -top-2.5 left-4 bg-white px-1 text-sm font-medium text-gray-700">
                Email
              </label>
            </div>

            <div className="relative">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors bg-gray-50 placeholder-gray-400"
                placeholder="Contraseña"
              />
              <label htmlFor="password" className="absolute -top-2.5 left-4 bg-white px-1 text-sm font-medium text-gray-700">
                Contraseña
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-lg font-semibold text-white text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 active:scale-95 transition-all shadow-medium hover:shadow-lg"
            >
              Entrar
            </button>
          </form>

       
        </div>

        
      </div>
    </div>
  );
}
export default Login;
