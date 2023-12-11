import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/FormData.css";

function FormData() {
  const [result, setResult] = useState([]);
  const [dataToInsert, setDataToInsert] = useState({
    JogosNome: "",
    ImagemJogo: "", 
    PlataformaNome: "",
    GeneroNome: "",
    Decricao: "",
    DataDeLancamento: "",
  });
  const [redirected, setRedirected] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000")
      .then((res) => res.json())
      .then((data) => {
        setResult(data);

        const foundItem = data.find(
          (item) => window.location.pathname === `/modify/${item.ProductID}`
        );

        if (foundItem) {
          setDataToInsert((prevState) => ({
            ...prevState,
            ...foundItem,
          }));
        } else {
          if (!redirected) {
            setRedirected(true);
            navigate("/");
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSubmit = (e) => {
    const foundItem = result.find(
      (item) => window.location.pathname === `/modify/${item.ProductID}`
    );
    if (foundItem) {
      fetch("http://localhost:3000", {
        method: "PUT",
        body: JSON.stringify(dataToInsert),
        headers: { "Content-Type": "application/json" },
      });
      navigate("/");
    } else {
      fetch("http://localhost:3000", {
        method: "POST",
        body: JSON.stringify(dataToInsert),
        headers: { "Content-Type": "application/json" },
      });
    }
  };

  const handleChange = (e) => {
    setDataToInsert({
      ...dataToInsert,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    const fileInput = document.getElementById("imagesLink");
    fileInput.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    // Atualiza o estado com o nome do arquivo selecionado
    setDataToInsert({
      ...dataToInsert,
      ImagemJogo: selectedFile.name,
    });
  };

  return (
    <div>
      <div className="voltar">
        <a href="/src/index.html">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
          >
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>
        </a>
      </div>

      <div className="all-container">
        <form onSubmit={handleSubmit} className="form">
          <div className="tittle-crud">
            <h1>Adicionar Novo Jogo</h1>
          </div>

          <div className="form-container">
            <div className="left-column">
              <div className="form-group">

                <input  type="text"
                        id="title"
                        placeholder="Nome do Jogo"
                        value={dataToInsert.JogosNome}
                        onChange={(e) => handleChange(e, "JogosNome")}
                />

              </div>

              <div className="form-group">

                <select id="genero"
                        name="genero"
                        value={dataToInsert.GeneroNome}
                        onChange={(e) => handleChange(e, "GeneroNome")}
                >
                  <option value="Ação">Ação</option>
                  <option value="Aventura">Aventura</option>
                  <option value="RPG">RPG</option>

                </select>

              </div>
              
              <div className="form-group">
                
                <select id="publisher"
                        name="publisher"
                        value={dataToInsert.PlataformaNome}
                        onChange={(e) => handleChange(e, "PlataformaNome")}
                >
                  <option value="PC">PC</option>
                  <option value="PlayStation">PlayStation</option>
                  <option value="Xbox">Xbox</option>
                </select>

              </div>

              <div className="form-group">

                <input type="date"
                       id="releseDate"
                       value={dataToInsert.DataDeLancamento}
                       onChange={(e) => handleChange(e, "DataDeLancamento")}
                />
              </div>

              <div className="form-group">

                <textarea id="description"
                          placeholder="Descrição do Jogo"
                          value={dataToInsert.Descricao}
                          onChange={(e) => handleChange(e, "Descricao")}
                />

              </div>
            </div>

            <div className="right-column">

              <button className="imagem-button" onClick={handleClick}>
                Adicionar Imagem
              </button>
              <input
                type="file"
                id="imagesLink"
                accept="image/svg+xml"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <div className="form-group">
                <button id="addButton" onClick={handleSubmit}>Adicionar</button>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}

export default FormData;
