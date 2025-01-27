import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Navbar from '../Navbar';
import "./BookAppointments.css";
import axios from "axios";

const BookAppointments = () => {
  const [specialty, setSpecialty] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [showAppointmentsModal, setShowAppointmentsModal] = useState(false);

  useEffect(() => {
    if (specialty) {
      // Fetch doctors based on specialty
      axios
        .get(`http://localhost:5000/api/doctors?specialty=${specialty}`)
        .then((response) => {
          setDoctors(response.data);
        })
        .catch((error) => {
          console.error("Error fetching doctors:", error);
        });
    } else {
      setDoctors([]);
    }
  }, [specialty]);

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

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("You must be logged in to book an appointment.");
      return;
    }

    const appointmentDetails = {
      patientName: e.target.formName.value,
      patientEmail: e.target.formEmail.value,
      appointmentDate: e.target.formDate.value,
      appointmentTime: e.target.formTime.value,
      doctorId: selectedDoctor._id,
      doctorName: selectedDoctor["Doctor's Name"],
      userId,
    };

    axios
      .post(`http://localhost:5000/api/appointments`, appointmentDetails)
      .then((response) => {
        console.log("Appointment booked successfully:", response.data);
        alert("Appointment booked successfully!");
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error booking appointment:", error);
        alert("Failed to book appointment.");
      });
  };

  const fetchAppointments = () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("You must be logged in to view appointments.");
      return;
    }

    axios
      .get(`http://localhost:5000/api/fetch-appointments?userId=${userId}`)
      .then((response) => {
        setAppointments(response.data);
        setShowAppointmentsModal(true);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  };

  const handleCloseAppointmentsModal = () => {
    setShowAppointmentsModal(false);
  };

  return (
    <div className='background'>
      <div className='navbar-appointments'>
        <Navbar />
      </div>
      <div className="container appointment">
        <h1>Book Appointments</h1>
        <Form.Group controlId="specialtySelect" className='form-group'>
          <Form.Label className='form-label'>Select Specialty</Form.Label>
          <Form.Control className='form-control' as="select" value={specialty} onChange={handleSpecialtyChange}>
            <option value="">Select...</option>
            <option value="Dentist">Dentist</option>
            <option value="Gynecologist">Gynecologist</option>
            <option value="Acupuncturist">Acupuncturist</option>
            {/* ...add more options as needed */}
          </Form.Control>
        </Form.Group>
        <div className="mt-3">
          {specialty &&
            doctors.map((doctor, index) => (
              <div key={index} className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{doctor["Doctor's Name"]}</h5>
                  <p className="card-text">{doctor.speciality}</p>
                  <Button
                    variant="primary"
                    onClick={() => handleBookClick(doctor)}
                  >
                    Book Appointment
                  </Button>
                </div>
              </div>
            ))}
        </div>
        <Button className="mt-4" variant="secondary" onClick={fetchAppointments}>
          View Appointments
        </Button>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              Book Appointment with {selectedDoctor?.["Doctor's Name"]}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAppointmentSubmit}>
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

        <Modal show={showAppointmentsModal} onHide={handleCloseAppointmentsModal}>
  <Modal.Header closeButton>
    <Modal.Title>Your Appointments</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {appointments.length > 0 ? (
      <ul>
        {appointments.map((appointment, index) => (
          <li key={index}>
            <strong>Doctor:</strong> {appointment.doctorName} <br />
            <strong>Date:</strong> {appointment.appointmentDate} <br />
            <strong>Time:</strong> {appointment.appointmentTime} <br />
            <Button
              variant="primary"
              onClick={() =>
                window.location.href = `/room/${appointment.appointmentId}`
              }
            >
              Join Video Call
            </Button>
          </li>
        ))}
      </ul>
    ) : (
      <p>No appointments found.</p>
    )}
  </Modal.Body>
</Modal>

      </div>
    </div>
  );
};

export default BookAppointments;
