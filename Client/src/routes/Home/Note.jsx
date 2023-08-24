import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function UpdateNote() {
  const navigate = useNavigate();
  const { id } = useParams();
  const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/notes/${id}`;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data from server");
        }
        const data = await response.json();
        setTitle(data.title);
        setDescription(data.description);
      } catch (error) {
        
        console.log("Error while fetching data..", error);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  const updateNote = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(baseUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 2000);
      } else {
        console.log("Failed to submit data.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeNote = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(baseUrl, {
        method: "DELETE",
      });
      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="breadcrump-nav">
        <Link to="/" className="back-button">
          <i
            className="fa fa-arrow-left"
            aria-hidden="true"
            style={{
              letterSpacing: "3px",
              backgroundColor: "black",
              color: "white",
              padding: "10px",
              margin: "5px",
              borderRadius: "5px",
            }}
          > Back
          </i>
        </Link>

        <button onClick={removeNote} className="delete">
        <i className="fa-solid fa-trash"     style={{
              letterSpacing: "3px",
              backgroundColor: "black",
              color: "white",
              padding: "10px",
              margin: "5px",
              borderRadius: "5px",
              cursor : "pointer",
            }}> Remove</i>
        </button>
      </div>

      <form onSubmit={updateNote}>
        <div className="single-note">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="title"
            />
          </div>

          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              rows="4"
              cols="50"
              className="description"
            ></textarea>
          </div>
        </div>
        <input
          style={{ letterSpacing: "3px" , cursor: "pointer" }}
          type="submit"
          value={submitted ? "Updating note..." : "💾 Update Note"}
          disabled={submitted}
        />

        <p className="text-center">
          {submitted && (
            <div className="success-message">Note has been added!</div>
          )}
        </p>
      </form>
    </div>
  );
}

export default UpdateNote;
