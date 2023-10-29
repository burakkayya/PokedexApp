import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import { Button, Image, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './styles/AdminPage.css';
import { FaSearch, FaPen, FaTrash } from 'react-icons/fa';
import Card from 'react-bootstrap/Card';

const AdminPage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPokemon, setNewPokemon] = useState({
    name: '',
    type: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    description: '',
  });

  useEffect(() => {
    axios.get('http://localhost:8080/pokemons', { withCredentials: true })
      .then(response => {
        setPokemonList(response.data);
      })
      .catch(error => {
        console.error('Error fetching Pokemon list:', error);
      });
  }, []);

  const navigate = useNavigate();
  function handleClick(path) {
    navigate(path);
  }

  const handleDelete = (pokemonId) => {
    axios.delete(`http://localhost:8080/pokemons/${pokemonId}`, { withCredentials: true })
      .then(response => {
        if (response.status === 200) {
          axios.get('http://localhost:8080/pokemons', { withCredentials: true })
            .then(response => {
              setPokemonList(response.data);
            })
            .catch(error => {
              console.error('Error fetching updated Pokemon list:', error);
            });
        }
      })
      .catch(error => {
        console.error('Error deleting Pokemon:', error);
      });
  };

  const handleUpdate = (pokemon) => {
    setSelectedPokemon(pokemon);
    setShowUpdateModal(true);
  };

  const handleSaveAdd = () => {
    axios.post('http://localhost:8080/pokemons', newPokemon, { withCredentials: true })
      .then(response => {
        if (response.status === 201) {
          axios.get('http://localhost:8080/pokemons', { withCredentials: true })
            .then(response => {
              setPokemonList(response.data);
              setShowAddModal(false);
              setNewPokemon({
                name: '',
                type: '',
                hp: '',
                attack: '',
                defense: '',
                speed: '',
                description: '',
              });
            })
            .catch(error => {
              console.error('Error fetching updated Pokemon list:', error);
            });
        }
      })
      .catch(error => {
        console.error('Error adding Pokemon:', error);
      });
  };

  const handleSaveUpdate = () => {
    if (selectedPokemon) {
      axios.put(`http://localhost:8080/pokemons/${selectedPokemon.id}`, selectedPokemon, { withCredentials: true })
        .then(response => {
          if (response.status === 200) {
            axios.get('http://localhost:8080/pokemons', { withCredentials: true })
              .then(response => {
                setPokemonList(response.data);
                setShowUpdateModal(false);
                setSelectedPokemon(null);
              })
              .catch(error => {
                console.error('Error fetching updated Pokemon list:', error);
              });
          }
        })
        .catch(error => {
          console.error('Error updating Pokemon:', error);
        });
    }
  };

  return (
    <>
      <AdminNavbar />
      <div style={{ backgroundColor: '#010712', padding: '20px' }}>
        <div className='mt-4 justify-content-center ' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Image src="./img/pikachu2.png" width={120} height={130} className="mx-2 p-1" />
          <h1 style={{ color: '#FFCB05' }} className='mt-5 mb-3'>Pokemon List</h1>
        </div>
        <div className='mt-4' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Button variant="success" style={{ width: '20%', marginTop: '5px' }} onClick={() => setShowAddModal(true)}>
            ADD POKEMON
            <Image src="./img/pkmn2.png" width={40} height={40} className="mx-2 p-1" />
          </Button>
          <div className="d-flex justify-content-end mb-2">
            <div className="position-relative" style={{ display: 'flex', alignItems: 'center', paddingRight: '10px' }}>
              <div className="position-absolute" style={{ paddingLeft: '5px' }}>
                <FaSearch />
              </div>
              <input
                type="text"
                placeholder="Search Pokemon Name"
                className="form-control"
                style={{ width: '250px', paddingLeft: '30px' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="d-flex flex-wrap justify-content-center mt-3">
          {pokemonList
            .filter((pokemon) => pokemon.active)
            .filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((pokemon, index) => (
              <Card border="danger" key={index} className=" mt-5 mx-4" style={{ width: '24rem' }}>
                <Card.Img
                  variant="top"
                  src="/img/pokemonCard.jpg"
                  style={{ height: '300px' }}
                />
                <Card.Body>
                  <Card.Title className="card-header">{pokemon.name}</Card.Title>
                  <Card.Text className='mt-3' style={{ color: 'black' }}>
                    <strong>Type:</strong> {pokemon.type}
                    <br />
                    <strong>HP:</strong> {pokemon.hp}
                    <br />
                    <strong>Attack:</strong> {pokemon.attack}
                    <br />
                    <strong>Defense:</strong> {pokemon.defense}
                    <br />
                    <strong>Speed:</strong> {pokemon.speed}
                    <br />
                    <strong>Description:</strong> {pokemon.description}
                  </Card.Text>
                  <Card.Footer>
                    <div className="d-flex justify-content-center">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="mr-2 editButtons px-2"
                        onClick={() => handleUpdate(pokemon)}
                      >
                        <FaPen />
                      </Button>
                      <Button
                        className="editButtons px-2 mx-2"
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(pokemon.id)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </Card.Footer>
                </Card.Body>
              </Card>
            ))}
        </div>
      </div>
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header style={{ backgroundColor: '#FFCB05', color: 'black' }}>
          <Modal.Title>Edit Pokemon</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#010712' }}>
          {selectedPokemon && (
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedPokemon.name}
                  onChange={(e) => setSelectedPokemon({ ...selectedPokemon, name: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formType">
                <Form.Label>Type</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedPokemon.type}
                  onChange={(e) => setSelectedPokemon({ ...selectedPokemon, type: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formHP">
                <Form.Label>HP</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedPokemon.hp}
                  onChange={(e) => setSelectedPokemon({ ...selectedPokemon, hp: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formAttack">
                <Form.Label>Attack</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedPokemon.attack}
                  onChange={(e) => setSelectedPokemon({ ...selectedPokemon, attack: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formDefense">
                <Form.Label>Defense</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedPokemon.defense}
                  onChange={(e) => setSelectedPokemon({ ...selectedPokemon, defense: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formSpeed">
                <Form.Label>Speed</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedPokemon.speed}
                  onChange={(e) => setSelectedPokemon({ ...selectedPokemon, speed: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedPokemon.description}
                  onChange={(e) => setSelectedPokemon({ ...selectedPokemon, description: e.target.value })}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#010712' }} className='justify-content-center'>
          <Button variant="dark" onClick={() => setShowUpdateModal(false)}>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleSaveUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header style={{ backgroundColor: '#010712', color: 'white' }}>
          <Modal.Title closeButton>Add Pokemon</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#010712' }}>
          <Form>
            <Form.Group controlId="formAddName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={newPokemon.name}
                onChange={(e) => setNewPokemon({ ...newPokemon, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formAddType">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                value={newPokemon.type}
                onChange={(e) => setNewPokemon({ ...newPokemon, type: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formAddHP">
              <Form.Label>HP</Form.Label>
              <Form.Control
                type="text"
                value={newPokemon.hp}
                onChange={(e) => setNewPokemon({ ...newPokemon, hp: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formAddAttack">
              <Form.Label>Attack</Form.Label>
              <Form.Control
                type="text"
                value={newPokemon.attack}
                onChange={(e) => setNewPokemon({ ...newPokemon, attack: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formAddDefense">
              <Form.Label>Defense</Form.Label>
              <Form.Control
                type="text"
                value={newPokemon.defense}
                onChange={(e) => setNewPokemon({ ...newPokemon, defense: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formAddSpeed">
              <Form.Label>Speed</Form.Label>
              <Form.Control
                type="text"
                value={newPokemon.speed}
                onChange={(e) => setNewPokemon({ ...newPokemon, speed: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formAddDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={newPokemon.description}
                onChange={(e) => setNewPokemon({ ...newPokemon, description: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#010712' }} className='justify-content-center'>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSaveAdd}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminPage;
