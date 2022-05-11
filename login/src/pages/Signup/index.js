import React, { useState } from 'react';
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import * as C from "./styles"


const Signup = () => {
  // states creation
  const [email, setEmail] = useState("");
  const [emailConf, setEmailConf] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { signup } = useAuth();

  const handleSignup = () => {
    if (!email | !emailConf | !senha) {
      setError("Fill in all fields");
      return;
    } else if (email !== emailConf) {
      setError("Emails are not the same");
      return;
    }  

    const res = signup(email, senha);

    if (res) {
      setError(res);
      return;
    }

    alert("User registered successfully!");
    navigate("/");
  };



  return (
    <C.Container>
      <C.Label>LOGIN SYSTEM</C.Label>
      <C.Content>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="email"
          placeholder="Confirm your email"
          value={emailConf}
          onChange={(e) => [setEmailConf(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Create your password"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <C.LabelError>{error}</C.LabelError>
        <Button Text="Sign Up" onClick={handleSignup} />
        <C.LabelSignin>
          Already have an account?
          <C.Strong>
            <Link to="/">&nbsp;Enter</Link>
          </C.Strong>
        </C.LabelSignin>
      </C.Content>
    </C.Container>
  )
}

export default Signup;