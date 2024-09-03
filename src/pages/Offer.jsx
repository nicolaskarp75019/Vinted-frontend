import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/v2/offers/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <main className="offer-container">
      <div className="offer-image">
        <img src={data.product_image.secure_url} alt={data.product_name} />
      </div>
      <div className="offer-details">
        <p className="offer-price">{data.product_price} €</p>
        <div className="offer-description">
          {data.product_details.map((detail, index) => {
            const key = Object.keys(detail)[0];
            return (
              <div key={index}>
                <span className="offer-detail-key">{key.toUpperCase()}</span> :{" "}
                <span className="offer-detail-value">{detail[key]}</span>
              </div>
            );
          })}
        </div>
        <hr />
        <p className="offer-product-name">{data.product_name}</p>
        <p className="offer-product-description">{data.product_description}</p>
        <div className="offer-user-info">
          {data.owner.account.avatar && (
            <img
              src={data.owner.account.avatar.secure_url}
              alt={data.owner.account.username}
              className="offer-user-avatar"
            />
          )}
          <span className="offer-user-username">
            {data.owner.account.username}
          </span>
        </div>
        <button className="offer-buy-button">Acheter</button>
      </div>
    </main>
  );
};

export default Offer;
