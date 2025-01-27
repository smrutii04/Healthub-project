import React, { useState } from "react";
import axios from "axios";
import "./ePrescriptionForm.css";

const EPrescriptionForm = ({ doctorId, patientId }) => {
  const [medicines, setMedicines] = useState([{ name: "", dosage: "", duration: "", instructions: "" }]);
  const [tests, setTests] = useState([{ name: "", reason: "" }]);
  const [notes, setNotes] = useState("");

  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index][field] = value;
    setMedicines(updatedMedicines);
  };

  const handleTestChange = (index, field, value) => {
    const updatedTests = [...tests];
    updatedTests[index][field] = value;
    setTests(updatedTests);
  };

  const addMedicine = () => {
    setMedicines([...medicines, { name: "", dosage: "", duration: "", instructions: "" }]);
  };

  const addTest = () => {
    setTests([...tests, { name: "", reason: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:5000/api/eprescriptions", {
            doctorId,
            patientId,
            medicines,
            tests,
            notes,
        });
        alert("ePrescription created successfully!");
        setMedicines([{ name: "", dosage: "", duration: "", instructions: "" }]);
        setTests([{ name: "", reason: "" }]);
        setNotes(""); // Clear the form after successful submission
    } catch (error) {
        console.error("Error creating ePrescription:", error);
        alert("Error creating ePrescription.");
    }
};


  return (
    <form className="eprescription-form" onSubmit={handleSubmit}>
      <h2>ePrescription Form</h2>

      <h3>Medicines</h3>
      {medicines.map((medicine, index) => (
        <div key={index} className="medicine">
          <input
            type="text"
            placeholder="Medicine Name"
            value={medicine.name}
            required
            onChange={(e) => handleMedicineChange(index, "name", e.target.value)}
          />
          <input
            type="text"
            placeholder="Dosage (e.g., 1 tablet, twice a day)"
            value={medicine.dosage}
            required
            onChange={(e) => handleMedicineChange(index, "dosage", e.target.value)}
          />
          <input
            type="text"
            placeholder="Duration (e.g., 7 days)"
            value={medicine.duration}
            required
            onChange={(e) => handleMedicineChange(index, "duration", e.target.value)}
          />
          <input
            type="text"
            placeholder="Special Instructions (e.g., Take after food)"
            value={medicine.instructions}
            required
            onChange={(e) => handleMedicineChange(index, "instructions", e.target.value)}
          />
        </div>
      ))}
      <button type="button" onClick={addMedicine}>Add Medicine</button>

      <h3>Tests</h3>
      {tests.map((test, index) => (
        <div key={index} className="test">
          <input
            type="text"
            placeholder="Test Name"
            value={test.name}
            required
            onChange={(e) => handleTestChange(index, "name", e.target.value)}
          />
          <input
            type="text"
            placeholder="Reason for Test"
            value={test.reason}
            required
            onChange={(e) => handleTestChange(index, "reason", e.target.value)}
          />
        </div>
      ))}
      <button type="button" onClick={addTest}>Add Test</button>

      <h3>Additional Notes</h3>
      <textarea
        placeholder="Any additional notes for the patient"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      ></textarea>

      <button className="button" type="submit">Save ePrescription</button>
    </form>
  );
};

export default EPrescriptionForm;
