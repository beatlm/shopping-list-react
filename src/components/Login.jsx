import { useNavigate } from 'react-router-dom';


export function Login ( ){
 

  const handleClick = () => {
    useNavigate('shops');
  };


return (

  <div className="row">
  <form className="col s12">
  <div className="row">
      <div className="input-field col s12">
        <input id="email" type="email" className="validate"/>
        <label htmlFor="email">Email</label>
      </div>
    </div>

    <div className="row">
      <div className="input-field col s12">
        <input id="password" type="password" className="validate" />
        <label htmlFor="password">Contraseña</label>
      </div>
    </div>
    <div className="row">
          <a onClick= {handleClick} className=" col s12 waves-effect waves-light btn-large">Entrar</a>
        </div>
  
  </form>
</div>
)
}
export default Login;

