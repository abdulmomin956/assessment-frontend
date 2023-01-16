import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const nameReg = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/

const Home = () => {
    const [selectors, setSelectors] = useState([])
    const [newName, setNewName] = useState('')
    const [newSectors, setNewSector] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        if (loading) {
            setLoading(false)
            axios.get('http://localhost:5000/sectors')
                .then(res => setSelectors(res.data))
                .catch(err => console.log(err))
        }
    }, [loading])

    const handleSave = (e) => {
        e.preventDefault();
        // console.log(newName, newSelectors);
        if (nameReg.test(newName)) {
            axios.post('http://localhost:5000/users', { name: newName, sectors: newSectors, agree: true })
                .then(res => setLoading(true))
                .catch(err => { console.log(err); setLoading(true) })
        } else {
            setError('Name is not valid')
        }
    }

    // const selectors = [
    //     {
    //         value: "1",
    //         label: 'Manufacturing',
    //         sub: [
    //             { value: "19", label: 'Construction materials' },
    //             { value: "18", label: 'Electronics and Optics' },
    //             {
    //                 value: "6", label: 'Food and Beverage',
    //                 sub2: [
    //                     { value: "342", label: 'Bakery & confectionery products' },
    //                     { value: "43", label: 'Beverages' },
    //                     { value: "42", label: 'Fish & fish products' },
    //                     { value: "40", label: 'Meat & meat products' },
    //                     { value: "39", label: 'Milk & dairy products' },
    //                     { value: "437", label: 'Other ' },
    //                     { value: "378", label: 'Sweets & snack food' },
    //                 ]
    //             },

    //             {
    //                 value: "13", label: 'Furniture',
    //                 sub2: [
    //                     { value: "389", label: 'Bathroom / sauna' },
    //                     { value: "385", label: 'Bedroom' },
    //                     { value: "390", label: 'Children’s room' },
    //                     { value: "98", label: 'Kitchen' },
    //                     { value: "101", label: 'Living room' },
    //                     { value: "392", label: 'Office' },
    //                     { value: "394", label: 'Other(Furniture)' },
    //                     { value: "341", label: 'Outdoor' },
    //                     { value: "99", label: 'Project furniture' },
    //                 ]
    //             },

    //             {
    //                 value: "12", label: 'Machinery',
    //                 sub2: [
    //                     { value: "94", label: 'Machinery components' },
    //                     { value: "91", label: 'Machinery equipment / tools' },
    //                     { value: "224", label: 'Manufacture of machinery' },
    //                     {
    //                         value: "97", label: 'Maritime',
    //                         sub3: [
    //                             { value: "271", label: 'Aluminium and steel workboats' },
    //                             { value: "269", label: 'Boat / Yacht building' },
    //                             { value: "230", label: 'Ship repair and conversion' },
    //                         ]
    //                     },

    //                     { value: "93", label: 'Metal structures' },
    //                     { value: "508", label: 'Other' },
    //                     { value: "227", label: 'Repair and maintenance service' },
    //                 ]
    //             },

    //             {
    //                 value: "11", label: 'Metalworking',
    //                 sub2: [
    //                     { value: "67", label: 'Construction of metal structures' },
    //                     { value: "263", label: 'Houses and buildings' },
    //                     { value: "267", label: 'Metal products' },
    //                     {
    //                         value: "542", label: 'Metal works',
    //                         sub3: [
    //                             { value: "75", label: 'CNC - machining' },
    //                             { value: "62", label: 'Forgings, Fasteners' },
    //                             { value: "69", label: 'Gas, Plasma, Laser cutting' },
    //                             { value: "66", label: 'MIG, TIG, Aluminum welding' },
    //                         ]
    //                     },
    //                 ]
    //             },


    //             {
    //                 value: "9", label: 'Plastic and Rubber',
    //                 sub2: [
    //                     { value: "54", label: 'Packaging' },
    //                     { value: "556", label: 'Plastic goods' },
    //                     {
    //                         value: "559", label: 'Plastic processing technology',
    //                         sub3: [
    //                             { value: "55", label: 'Blowing' },
    //                             { value: "57", label: 'Moulding' },
    //                             { value: "53", label: 'Plastics welding and processing' },
    //                         ]
    //                     },

    //                     { value: "560", label: 'Plastic profiles' },
    //                 ]
    //             },

    //             {
    //                 value: "5", label: 'Printing',
    //                 sub2: [
    //                     { value: "148", label: 'Advertising' },
    //                     { value: "150", label: 'Book / Periodicals printing' },
    //                     { value: "145", label: 'Labelling and packaging printing' },
    //                 ]
    //             },

    //             {
    //                 value: "7", label: 'Textile and Clothing',
    //                 sub2: [
    //                     { value: "44", label: 'Clothing' },
    //                     { value: "45", label: 'Textile' },
    //                 ]
    //             },

    //             {
    //                 value: "8", label: 'Wood',
    //                 sub2: [
    //                     { value: "337", label: 'Other(Wood)' },
    //                     { value: "51", label: 'Wooden building materials' },
    //                     { value: "47", label: 'Wooden houses' },
    //                 ]
    //             },

    //         ]
    //     },

    //     {
    //         value: "3", label: 'Other',
    //         sub: [
    //             { value: "37", label: 'Creative industries' },
    //             { value: "29", label: 'Energy technology' },
    //             { value: "33", label: 'Environment' },
    //         ]
    //     },

    //     {
    //         value: "2", label: 'Service',
    //         sub: [
    //             { value: "25", label: 'Business services' },
    //             { value: "35", label: 'Engineering' },
    //             {
    //                 value: "28", label: 'Information Technology and Telecommunications',
    //                 sub2: [
    //                     { value: "581", label: 'Data processing, Web portals, E - marketing' },
    //                     { value: "576", label: 'Programming, Consultancy' },
    //                     { value: "121", label: 'Software, Hardware' },
    //                     { value: "122", label: 'Telecommunications' },
    //                 ]
    //             },

    //             { value: "22", label: 'Tourism' },
    //             { value: "141", label: 'Translation services' },
    //             {
    //                 value: "21", label: 'Transport and Logistics',
    //                 sub2: [
    //                     { value: "111", label: 'Air' },
    //                     { value: "114", label: 'Rail' },
    //                     { value: "112", label: 'Road' },
    //                     { value: "113", label: 'Water' },
    //                 ]
    //             },
    //         ]
    //     },
    // ]

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
                    <Form.Select onChange={e => setNewSector(e.target.value)} aria-label="Default select example" required defaultValue=''>
                        <option value='' disabled>Open this select menu</option>
                        {
                            selectors.map(main => {
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
        </div>
    );
};

export default Home;