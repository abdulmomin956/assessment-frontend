import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const nameReg = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/

const Home = () => {
    const [sectors, setSectors] = useState([])
    const [newName, setNewName] = useState('')
    const [newSectors, setNewSector] = useState('')
    const [error, setError] = useState()
    const navigate = useNavigate()


    useEffect(() => {
        axios.get('https://inc-bernardine-abdulmomin956.koyeb.app/sectors')
            .then(res => setSectors(res.data))
            .catch(err => console.log(err))
    }, [])

    const handleSave = (e) => {
        e.preventDefault();
        // console.log(newName, newSelectors);
        if (nameReg.test(newName)) {
            axios.post('https://inc-bernardine-abdulmomin956.koyeb.app/users', { name: newName, sectors: newSectors, agree: true })
                .then(res => {
                    if (res.status === 200) {
                        toast.success("User Added Successfully!", {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        })
                        setNewName('')
                        setNewSector('')
                    }
                })
                .catch(err => { console.log(err); })
        } else {
            setError('Name is not valid')
        }
    }



    return (
        <div style={{ height: '100vh' }} className='d-flex flex-column justify-content-center align-items-center bg-light'>
            <div className='w-25 d-flex flex-column'>
                <Button onClick={() => navigate('/users')} className=''>Check all users</Button>
                <Form onSubmit={handleSave} className='mt-3 bg-white border shadow-sm p-4'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control value={newName} onChange={e => { setNewName(e.target.value); setError('') }} type="text" placeholder="Enter name" required />
                        {error && <small className='text-danger'>{error}</small>}
                    </Form.Group>
                    <Form.Label>Sectors</Form.Label>
                    <Form.Select onChange={e => setNewSector(e.target.value)} aria-label="Default select example" required value={newSectors}>
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
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Agree to terms" required />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </Form>
            </div>
            <ToastContainer position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />
        </div>
    );
};

export default Home;