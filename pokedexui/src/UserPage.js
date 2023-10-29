import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import UserNavbar from './UserNavbar';
import { Button, Image } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState({
    open: false,
    listname: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/pokemons', { withCredentials: true });
        setPokemonList(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCatchList = async (pokemonId) => {
    try {
      const username = localStorage.getItem('username');
      const userResponse = await axios.get(`http://localhost:8080/users/username/${username}`, { withCredentials: true });
      const userId = userResponse.data.id;

      const response = await axios.post(`http://localhost:8080/users/${userId}/catch/${pokemonId}`, null, { withCredentials: true });

      if (response.status === 200) {
        setShowModal({
          open: true,
          listname: 'catch'
        });
      }
    } catch (error) {
      console.error('Error adding to catch list:', error);
    }
  };

  const handleAddToWishList = async (pokemonId) => {
    try {
      const username = localStorage.getItem('username');
      const userResponse = await axios.get(`http://localhost:8080/users/username/${username}`, { withCredentials: true });
      const userId = userResponse.data.id;

      const response = await axios.post(`http://localhost:8080/users/${userId}/wish/${pokemonId}`, null, { withCredentials: true });

      if (response.status === 200) {
        setShowModal({
          open: true,
          listname: 'wish'
        });
      }
    } catch (error) {
      console.error('Error adding to wish list:', error);
    }
  };

  return (
    <>
      <UserNavbar />
      <div style={{ backgroundColor: '#010712', padding: '20px' }}>
        <div className='mt-4' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Image src="./img/pkmn2.png" width={40} height={40} className="mr-2 mt-2" />
          <h1 style={{ color: 'rgb(241, 238, 53)' }} className='mt-5 mb-3'>Pokemon List</h1>
          <Image src="./img/pkmn.png" width={40} height={40} className="mr-2 mt-2" />
        </div>
        <div className="table-responsive">
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
          <Table className='mt-2 text-center' striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>HP</th>
                <th>Attack</th>
                <th>Defense</th>
                <th>Speed</th>
                <th>Description</th>
                <th>Add To Wish List</th>
                <th>Add To Catch List</th>
              </tr>
            </thead>
            <tbody>
              {filteredPokemonList.map((pokemon) => (
                <tr key={pokemon.id}>
                  <td>{pokemon.name}</td>
                  <td>{pokemon.type}</td>
                  <td>{pokemon.hp}</td>
                  <td>{pokemon.attack}</td>
                  <td>{pokemon.defense}</td>
                  <td>{pokemon.speed}</td>
                  <td>{pokemon.description}</td>
                  <td>
                    <Button variant="info" onClick={() => handleAddToWishList(pokemon.id)}>Add to Wish List</Button>
                  </td>
                  <td>
                    <Button variant="success" onClick={() => handleAddToCatchList(pokemon.id)}>Add to Catch List</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <Modal show={showModal.open} onHide={() => setShowModal({ open: false, listname: '' })}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "green" }}>Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body className='align-item-center justify-content-center'>
          {showModal.listname === 'wish' ? (
            "Your Pokemon has been added to the Wish List."
          ) : (
            "Your Pokemon has been added to the Catch List."
          )}
        </Modal.Body>
        <Modal.Footer className='align-item-center justify-content-center'>
          {showModal.listname === 'wish' ? (
            <Button variant="secondary" onClick={() => navigate('/WishList')}>View Your Wish List</Button>
          ) : (
            <Button variant="secondary" onClick={() => navigate('/CatchList')}>View Your Catch List</Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserPage;
