import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Navbar from '../Navbar';
import "./BookAppointments.css"

const BookAppointments = () => {
  const [specialty, setSpecialty] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const doctors = {
    dentist: [{ name: 'Dr. Smith', info: 'Experienced Dentist' }],
    gynecologist: [{ name: 'Dr. Johnson', info: 'Experienced Gynecologist' }],
    // ...add more specialties and doctors as needed
  };

  const handleSpecialtyChange = (e) => {
    setSpecialty(e.target.value);
  };

  const handleBookClick = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDoctor(null);
  };

  return (
    <div className='background'>
   <div className='navbar-appointments'>
   <Navbar/>
   </div>
    <div className="container appointment">
   
      <h1>Book Appointments</h1>
      <Form.Group controlId="specialtySelect" className='form-group'>
        <Form.Label className='form-label'>Select Specialty</Form.Label>
        <Form.Control className='form-control' as="select" value={specialty} onChange={handleSpecialtyChange}>
          <option value="">Select...</option>
          <option value="dentist">Dentist</option>
          <option value="gynecologist">Gynecologist</option>
          {/* ...add more options as needed */}
        </Form.Control>
      </Form.Group>
      <div className="mt-3">
        {specialty && doctors[specialty] && doctors[specialty].map((doctor, index) => (
          <div key={index} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{doctor.name}</h5>
              <p className="card-text">{doctor.info}</p>
              <Button variant="primary" onClick={() => handleBookClick(doctor)}>Book Appointment</Button>
            </div>
          </div>
        ))}
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Book Appointment with {selectedDoctor?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => 
          { e.preventDefault();
            const name = e.target.formName.value;
            const email = e.target.formEmail.value;
            const date = e.target.formDate.value;
            const time = e.target.formTime.value;
            console.log(`Name: ${name}, Email: ${email}, Date: ${date}, Time: ${time}`);

            window.location.href = '/room';
            handleCloseModal();
          }
          }>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>
            <Form.Group controlId="formDate">
              <Form.Label>Preferred Date</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Form.Group controlId="formTime">
              <Form.Label>Preferred Time</Form.Label>
              <Form.Control type="time" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
    </div>
  );
};

export default BookAppointments;