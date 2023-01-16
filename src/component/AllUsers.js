import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTrash, FaUserEdit } from "react-icons/fa";

const AllUsers = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [sectors, setSectors] = useState([])
    const [users, setUsers] = useState([])
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        setLoading(false)
        axios.get('http://localhost:5000/sectors')
            .then(res => setSectors(res.data))
            .catch(err => console.log(err))

    }, [])

    useEffect(() => {
        if (loading) {
            setLoading(false)
            axios.get('http://localhost:5000/users')
                .then(res => setUsers(res.data))
                .catch(err => console.log(err))
        }
    }, [loading])
    const filtArr = [...sectors.flat(), ...sectors.map(s => s.sub.flat()).flat(), ...sectors.map(s => s.sub.map(sub => sub.sub2).flat()).flat(), ...sectors.map(s => s.sub.map(sub => sub?.sub2?.map(sub2 => sub2?.sub3).flat()).flat()).flat()];

    const definedArr = filtArr.filter(item => item);
    // console.log(definedArr);

    const handleDelete = (id) => {

    }
    return (
        <div style={{ height: '100vh' }} className='d-flex flex-column justify-content-center align-items-center bg-light'>
            <div className='w-25 d-flex flex-column'>
                <Button onClick={() => navigate('/')} className=''>Add a new user</Button>
                <Table className='bg-white shadow-sm' responsive="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Sector</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => <tr key={u._id}>
                            <td>1</td>
                            <td>{u.name}</td>
                            <td>{definedArr.find(s => s.value === u.sectors)?.label}</td>
                            <td>
                                <button
                                    className="btn btn-ghost btn-sm py-0 me-2"
                                    onClick={() => handleDelete(u._id)}
                                >
                                    <FaTrash className="h5 text-danger mb-0"></FaTrash>
                                </button>
                                <button
                                    className="btn btn-ghost btn-sm py-0"
                                    onClick={handleShow}
                                >
                                    <FaUserEdit className="h4 text-primary mb-0 py-0"></FaUserEdit>
                                </button>
                            </td>
                        </tr>)}
                    </tbody>
                </Table>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default AllUsers;