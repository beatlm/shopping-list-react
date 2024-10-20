import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth'

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'

export function Login ( ){
 
  const firebaseConfig = {
    apiKey: "AIzaSyBdY-IZN1csG71W8tJmejqpDjvVaIQSsqs",
    authDomain: "mishoppinglist-c74d2.firebaseapp.com",
    databaseURL: "https://mishoppinglist-c74d2.firebaseio.com",
    projectId: "mishoppinglist-c74d2",
    storageBucket: "mishoppinglist-c74d2.appspot.com",
    messagingSenderId: "302200915672",
    appId: "1:302200915672:web:4d3e3f9e830d2416d6f9ad",
    measurementId: "G-R2FPE3YFNM"
  };
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const loggedUser = email==='beatlm@gmail.com'? 'Bea':'Rover';
  const app = initializeApp(firebaseConfig);
  const navigate = useNavigate()

  const auth = getAuth(app)


  

  const signIn = () => {
    console.log('password ',password);
    console.log('email', email);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {


})


    
      .catch((error) => {
        console.error('Error al iniciar sesión:', error)
      })
      
console.log(loggedUser+' loggedUser')

      navigate('/shops',{ state: { loggedUser } })

  }

return (
  <div className="row">
  <form className="col s12">
  <div className="row">
      <div className="input-field col s12">
        <input id="email" type="email"  className="validate" 
        onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="email">Email</label>

      </div>
    </div>

    <div className="row">
      <div className="input-field col s12">
        <input id="password" type="password" className="validate" 
        onChange={(e) => setPassword(e.target.value)}/>
        <label htmlFor="password">Contraseña</label>
      </div>
    </div>
    <div className="row">
          <a onClick= {signIn} className=" col s12 waves-effect waves-light btn-large">Entrar</a>
        </div>
  
  </form>
</div>
)
}
export default Login;

