import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = ({ search }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/v2/offers?title=${search}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search]);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <main>
      <div className="hero-banner">
        <div className="cta-box">
          <h1>Prêts à faire du tri dans vos placards ?</h1>
          <button>Commencer à vendre</button>
        </div>
      </div>

      <div className="offers-container">
        {data.offers.map((offer) => (
          <Link to={`/offers/${offer._id}`} key={offer._id}>
            <article>
              <div>
                {offer.owner.account.avatar && (
                  <img
                    src={offer.owner.account.avatar?.secure_url}
                    alt={offer.owner.account.username}
                  />
                )}
                <span>{offer.owner.account.username}</span>
              </div>
              <div>
                <img
                  src={offer.product_image.secure_url}
                  alt={offer.product_name}
                />
              </div>
              <div>
                <p>{offer.product_price} €</p>
                <p>{offer.product_details[1].TAILLE}</p>
                <p>{offer.product_details[0].MARQUE}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Home;
