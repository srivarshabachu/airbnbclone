import { useContext, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import axios from "axios"
import { UserContext } from "../UserContext";
const LoginPage = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
 const {setUser} = useContext(UserContext);
    async function LoginUser(ev) {
      ev.preventDefault()
      try {
       const {data} =  await axios.post('http://localhost:4000/login', {
          mail,
          password
       });
        setUser(data)
        setRedirect(true)
        alert("Login successfull")
      }
      catch (e) {
        alert("login failed")
      }
    }
  if (redirect) {
    return <Navigate to ={'/'}/>
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
      <h1 className="text-3xl text-center mb-4">Login Page</h1>
        <form className="mx-auto max-w-md" onSubmit={LoginUser}>
          <input type="email" placeholder="youremail@gmail.com" value={mail} onChange={ev => setMail(ev.target.value)}></input>
          <input type="password" placeholder="enter your password" value={password} onChange={ev => setPassword(ev.target.value)}></input>
          <button className="loginbtn">Login</button>
          <div className="text-center flex justify-between">
            Do not  have an account ?
            <Link to={'/register'} className="underline text-black">Register</Link>
          </div>
        </form>
        
      </div>
      
    </div>
  )
}

export default LoginPage
