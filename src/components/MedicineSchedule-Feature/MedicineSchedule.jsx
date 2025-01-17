import React, { useState, useEffect } from "react";
import "./MedicineSchedule.css";

export default function MedicineSchedule() {
  const [medicines, setMedicines] = useState([]);
  const [newMedicine, setNewMedicine] = useState({ name: "", time: "" });

  // Add a new medicine to the schedule
  const handleAddMedicine = () => {
    if (newMedicine.name && newMedicine.time) {
      setMedicines([...medicines, newMedicine]);
      setNewMedicine({ name: "", time: "" });
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMedicine({ ...newMedicine, [name]: value });
  };

  // Check and send reminders for the scheduled times
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      console.log('Current Time:', currentTime);
      const updatedMedicines = medicines.map((medicine) => {
        console.log('Medicine Scheduled Time:', medicine.time);
        if (medicine.time === currentTime && !medicine.doseTaken) {
          console.log(`Reminder Triggered for: ${medicine.name}`);
          toast.info(`Time to take your medicine: ${medicine.name}`);
          return { ...medicine, doseTaken: true }; // Mark as taken
        }
        return medicine;
      });
      setMedicines(updatedMedicines);
    }, 1000); // Check every second for better accuracy
  
    return () => clearInterval(interval);
  }, [medicines]);
      

  return (
    <div className="medicine-schedule">
      <h1>Medicine Schedule</h1>
      <div className="schedule-form">
        <input
          type="text"
          name="name"
          placeholder="Medicine Name"
          value={newMedicine.name}
          onChange={handleChange}
        />
        <input
          type="time"
          name="time"
          value={newMedicine.time}
          onChange={handleChange}
        />
        <button onClick={handleAddMedicine}>Add Medicine</button>
      </div>
      <div className="schedule-list">
        <h2>Your Schedule</h2>
        {medicines.length === 0 ? (
          <p>No medicines scheduled yet.</p>
        ) : (
          <ul>
            {medicines.map((medicine, index) => (
              <li key={index}>
                <span>{medicine.name}</span> at <span>{medicine.time}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
