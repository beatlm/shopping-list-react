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
  const [isLoading, setIsLoading] = useState(false);
  const loggedUser = email === "beatlm@gmail.com" ? "Bea" : "Rover";
  const app = initializeApp(firebaseConfig);
  const navigate = useNavigate();

  const auth = getAuth(app);

  const signIn = () => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/shops", { state: { loggedUser } });
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-apple-gray-50">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-4 inline-block p-3 bg-apple-blue/10 rounded-full">
            <svg className="w-12 h-12 text-apple-blue" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8m0-12c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-apple-gray-900 mb-2">Shopping List</h1>
          <p className="text-apple-gray-500 text-base">v4.0</p>
        </div>

        {/* Form */}
        <div className="apple-card p-6 mb-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-apple-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="apple-input"
                placeholder="Tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-apple-gray-700 mb-2">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                className="apple-input"
                placeholder="Tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={signIn}
          disabled={isLoading || !email || !password}
          className="apple-button-primary w-full mb-4"
        >
          {isLoading ? "Conectando..." : "Entrar"}
        </button>

        {/* Footer Text */}
        <p className="text-center text-xs text-apple-gray-500">
          Usa tus credenciales para acceder
        </p>
      </div>
    </div>
  );
}
export default Login;
