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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-apple-blue via-purple-500 to-pink-500 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse-glow"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse-glow" style={{animationDelay: '1s'}}></div>
      
      <div className="w-full max-w-sm relative z-10 animate-slideInUp">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-4 inline-block p-4 bg-white/20 backdrop-blur-md rounded-full border border-white/30 glow-effect">
            <svg className="w-12 h-12 text-white animate-bounce-subtle" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8m0-12c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">Shopping List</h1>
          <p className="text-white/80 text-base font-medium">v4.0</p>
        </div>

        {/* Form */}
        <div className="apple-card p-8 mb-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-apple-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="apple-input-dark"
                placeholder="Tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-apple-gray-700 mb-2">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                className="apple-input-dark"
                placeholder="Tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={signIn}
          disabled={isLoading || !email || !password}
          className="apple-button-primary w-full mb-4 shadow-lg"
        >
          {isLoading ? (
            <span className="inline-flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Conectando...
            </span>
          ) : (
            "Entrar"
          )}
        </button>

        {/* Footer Text */}
        <p className="text-center text-sm text-white/70 drop-shadow">
          Usa tus credenciales para acceder
        </p>
      </div>
    </div>
  );
}
export default Login;
