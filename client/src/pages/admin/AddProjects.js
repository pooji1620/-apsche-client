import React, { useState } from "react";
import axios from "axios";
import "./Addprojects.css";

const AddProjectForm = ({ onProjectAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: "",
    budget: "",
    clientId: "admin",
    clientName: "Admin",
    clientEmail: "admin@example.com",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:6001/new-project", {
        ...formData,
        skills: formData.skills.split(",").map((s) => s.trim()),
      });
      alert("Project added successfully");
      setFormData({
        title: "",
        description: "",
        skills: "",
        budget: "",
        clientId: "admin",
        clientName: "Admin",
        clientEmail: "admin@example.com",
      });
      onProjectAdded();
    } catch (err) {
      console.error(err);
      alert("Failed to add project");
    }
  };

  return (
    <div className="form-container">
      <h3>Add New Project</h3>
      <form className="project-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Project Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="skills"
          placeholder="Skills (comma-separated)"
          value={formData.skills}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="budget"
          placeholder="Budget (₹)"
          value={formData.budget}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Project</button>
      </form>
    </div>
  );
};

export default AddProjectForm;
