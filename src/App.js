import React, {useState, useEffect} from "react";
import './services/api.js'
import "./styles.css";
import api from "./services/api.js";

function App() {

  const [repositories, setRepositories] = useState([]);
  useEffect(()=> {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    });
  },[]);

  async function handleAddRepository() {
    // TODO
    const response = await api.post('/repositories', 
      {
        title: `Novo repositorio ${Date.now()}`,
        url: "http://wwww.google.com",
        techs: ["node", "react"]
      }
    );

    const repository = response.data;

    setRepositories([... repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // TODO
   await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id !== id
    ));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}          
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
