import React, { useState } from 'react';
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Signin = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email | !senha) {
      setError("Fill in all fields");
      return;
    }

    const res = signin(email, senha);

    if (res) {
      setError(res);
      return;
    }

    navigate("/home");
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
          type="password"
          placeholder="Enter your password"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <C.LabelError>{error}</C.LabelError>
        <Button Text="Log In" onClick={handleLogin} />
        <C.LabelSignup>
          Don't have an account?
          <C.Strong>
            <Link to="/signup">&nbsp;Sign Up</Link>
          </C.Strong>
        </C.LabelSignup>
      </C.Content>

    </C.Container>
  )
}

export default Signin