import { Link } from "react-router-dom";

const Header = ({ token, handleToken, search, setSearch }) => {
  return (
    <header>
      <div className="header-container">
        <Link to="/">
          <img src="images/vinted9809.jpg" alt="Vinted logo" className="logo" />
        </Link>
        <input
          type="text"
          placeholder="Recherche des articles"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="auth-buttons">
          {token ? (
            <button
              onClick={() => {
                handleToken(null);
              }}
            >
              Déconnexion
            </button>
          ) : (
            <>
              <Link to="/signup">S'inscrire</Link>
              <Link to="/login">Se connecter</Link>
            </>
          )}
          <Link to="/sell" className="btn-sell">
            Vends tes articles
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
