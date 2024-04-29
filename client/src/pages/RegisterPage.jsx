import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
const RegisterPage = () => {
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    function RegisterUser(ev) {
        ev.preventDefault()
        try {
            axios.post('http://localhost:4000/register', {
                name,
                mail,
                password
            })
        }
        catch (e) {
            alert("reg failed")
        }
    }
  return (
      <div className="mt-4 grow flex items-center justify-around">
          <div className="mb-32">
              <h1 className="text-3xl text-center mb-4">Register Page</h1>
              <form className="mx-auto max-w-md" onSubmit={RegisterUser}>
                  <input type="text" placeholder="yourname"
                      value={name}
                      onChange={ev=>setName(ev.target.value)}
                  ></input>
                  <input type="email" placeholder="youremail@gmail.com"
                      value={mail}
                      onChange={ev => setMail(ev.target.value)}
                  ></input>
                  <input type="password" placeholder="enter your password"
                      value={password}
                      onChange={ev => setPassword(ev.target.value)}
                  ></input>
                  <button className="loginbtn">
                      <Link to={'/'}>Submit</Link>
                  </button>
                  
              </form>

          </div>

      </div>
  )
}

export default RegisterPage
