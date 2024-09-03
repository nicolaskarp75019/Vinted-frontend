import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Signup = ({ handleToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email,
          username,
          password,
          newsletter,
        }
      );
      handleToken(response.data.token);
      navigate("/");
    } catch (error) {
      if (error.response.status === 409) {
        setErrorMessage("Cet email est déjà utilisé");
      } else if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Veuillez remplir tous les champs");
      } else {
        setErrorMessage("Une erreur est survenue, veuillez réessayer");
      }
    }
  };

  return (
    <main className="signup-container">
      <h1>S'inscrire</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <div>
          <input
            type="checkbox"
            checked={newsletter}
            onChange={() => setNewsletter(!newsletter)}
          />
          <label>S'inscrire à la newsletter</label>
        </div>
        <button type="submit">S'inscrire</button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
    </main>
  );
};

export default Signup;
