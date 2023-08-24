import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Notes = () => {
  const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/notes`;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data from server");
        }
        const data = await response.json();
        console.log(data);
        setData(data);
        setIsLoading(false);
      } catch (error) {
        setError("Error while fetching data..", error);
        setIsLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {/* <pre>
      {JSON.stringify(data, null , 2)}
    </pre> */}
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className="notes">
          <li className="add-note-button">
            <i className="fa-solid fa-plus">
              <Link to={"/add-note"}></Link>
            </i>
          </li>

          {data.map((item) => (
            <li key={item._id}>
              <Link to={`/note/${item._id}`}>
                <h3>{item.title}</h3>

                <p>
                  {item.description.length > 50
                    ? `${item.description.substring(0, 50)}...`
                    : item.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notes;
