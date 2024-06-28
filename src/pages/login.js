import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/input";
import Button from "../components/button";
import digiLogo from "../images/digi-logo.png";
import "./login.css"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const verify = () => {
    if (email === "") {
      alert("Por favor, digite seu e-mail");
      return;
    }
    if (password.length < 8) {
      alert("A senha deve conter pelo menos 8 caracteres");
      return;
    }
    navigate("/list");
  };

  return (
    <div className="login">
      <img src={digiLogo} alt="Logo do digimon"/>
      <h2>Login</h2>
      <div className="login-form">
        <Input
          type="email"
          placeholder="Digite seu e-mail"
          label="E-mail"
          onChange={handleEmailChange}
          value={email}
        />
        <Input
          type="password"
          placeholder="Digite sua senha"
          label="Senha"
          onChange={handlePasswordChange}
          value={password}
        />
        <Button text="Entrar" onClick={verify} />
      </div>
    </div>
  );
};

export default Login;
