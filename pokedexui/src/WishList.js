import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import UserNavbar from './UserNavbar';
import { Button, Image } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const WishList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('username');
    axios.get(`http://localhost:8080/users/username/${username}`, { withCredentials: true })
      .then(response => {
        const wishlist = response.data.wishlist;
        setPokemonList(wishlist);
      })
      .catch(error => {
        console.error('Error fetching wish list:', error);
      });
  }, []);

  const handleRemoveFromWishList = (pokemonId) => {
    const username = localStorage.getItem('username');
    axios.get(`http://localhost:8080/users/username/${username}`, { withCredentials: true })
      .then(response => {
        const userId = response.data.id;
        axios.delete(`http://localhost:8080/users/${userId}/wish/${pokemonId}`, { withCredentials: true })
          .then(response => {
            if (response.status === 200) {
              axios.get(`http://localhost:8080/users/username/${username}`, { withCredentials: true })
                .then(response => {
                  const wishlist = response.data.wishlist;
                  setPokemonList(wishlist);
                })
                .catch(error => {
                  console.error('Error fetching updated wish list:', error);
                });

              setShowModal(true);
            }
          })
          .catch(error => {
            console.error('Error removing from wish list:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  };

  const filteredPokemonList = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <UserNavbar />
      <div style={{ backgroundColor: '#010712', padding: '20px' }}>
        <div className='mt-4' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Image src="./img/pkmn2.png" width={40} height={40} className="mr-2 mt-2" />
          <h1 style={{ color: 'rgb(241, 238, 53)' }} className='mt-5 mb-3'>Wish List</h1>
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
                <th>Remove from Wish List</th>
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
                    <Button variant="danger" onClick={() => handleRemoveFromWishList(pokemon.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your Pokemon has been removed from the Wish List.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default WishList;
