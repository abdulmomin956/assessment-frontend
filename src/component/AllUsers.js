import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTrash, FaUserEdit } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';


const nameReg = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/

const AllUsers = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [sectors, setSectors] = useState([])
    const [users, setUsers] = useState([])
    const [show, setShow] = useState(false);
    const [newSectors, setNewSector] = useState()
    const [error, setError] = useState()
    const [newName, setNewName] = useState('')
    const [id, setId] = useState('')

    const handleClose = () => setShow(false);

    const handleShow = (id) => {
        setId(id)
        setNewSector(users.find(u => u._id === id)?.sectors)
        setNewName(users.find(u => u._id === id)?.name)
        setShow(true);
    }

    useEffect(() => {
        axios.get('https://inc-bernardine-abdulmomin956.koyeb.app/sectors')
            .then(res => setSectors(res.data))
            .catch(err => console.log(err))

    }, [])

    useEffect(() => {
        if (loading) {
            setLoading(false)
            axios.get('https://inc-bernardine-abdulmomin956.koyeb.app/users')
                .then(res => setUsers(res.data))
                .catch(err => console.log(err))
        }
    }, [loading])

    const filtArr = [...sectors.flat(), ...sectors.map(s => s.sub.flat()).flat(), ...sectors.map(s => s.sub.map(sub => sub.sub2).flat()).flat(), ...sectors.map(s => s.sub.map(sub => sub?.sub2?.map(sub2 => sub2?.sub3).flat()).flat()).flat()];

    const definedArr = filtArr.filter(item => item);
    // console.log(definedArr);

    const handleDelete = (id) => {
        axios.delete(`https://inc-bernardine-abdulmomin956.koyeb.app/user/${id}`)
            .then(res => {
                toast("Deleted")
                setLoading(true)
                setShow(false)
            })
            .catch(err => { console.log(err); setLoading(true); setShow(false) })
    }

    const handleSave = (id) => {
        if (nameReg.test(newName)) {
            axios.patch(`https://inc-bernardine-abdulmomin956.koyeb.app/user/${id}`, { name: newName, sectors: newSectors })
                .then(res => {
                    toast("Updated")
                    setLoading(true)
                    setShow(false)
                })
                .catch(err => { console.log(err); setLoading(true); setShow(false) })
        } else {
            setError('Name is not valid')
        }
    }



    return (
        <div style={{ height: '100vh' }} className='d-flex flex-column justify-content-center align-items-center bg-light'>
            <div className='w-50 d-flex flex-column'>
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
                                    onClick={() => handleShow(u._id)}
                                >
                                    <FaUserEdit className="h4 text-primary mb-0 py-0"></FaUserEdit>
                                </button>
                            </td>
                        </tr>)}
                    </tbody>
                </Table>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSave} className=' bg-white'>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control value={newName} onChange={e => { setNewName(e.target.value); setError('') }} type="text" placeholder="Enter name" required />
                                {error && <small className='text-danger'>{error}</small>}
                            </Form.Group>
                            <Form.Label>Sectors</Form.Label>
                            <Form.Select defaultValue={newSectors} onChange={e => setNewSector(e.target.value)} aria-label="Default select example" required>
                                <option value='' disabled>Open this select menu</option>
                                {
                                    sectors.map(main => {
                                        return <><option key={main.value} value={main.value}>{main.label}</option>
                                            {main.sub ? main.sub.map(sub => <><option value={sub.value}>&nbsp;&nbsp;&nbsp;&nbsp;{sub.label}</option>
                                                {sub.sub2 ? sub.sub2.map(sub2 => <><option value={sub2.value}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{sub2.label}</option>
                                                    {sub2.sub3 ? sub2.sub3.map(sub3 => <option value={sub3.value}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{sub3.label}</option>) : ''}</>) : ''}</>) : ''} </>
                                    })
                                }
                            </Form.Select>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => handleSave(id)}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AllUsers;