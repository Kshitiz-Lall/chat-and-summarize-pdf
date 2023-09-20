import React, { useState } from "react";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import "./SectionList.css";

const SectionsList = ({ onSectionSubmit }) => {
  const [selectedSection, setSelectedSection] = useState("");
  const handleSectionSubmit = () => {
    if (selectedSection) {
      onSectionSubmit(selectedSection);
    }
  };
  const sections = [
    "Inpatient Registration & Summary Form",
    "Consent Form",
    "Drug Therapy Summary Report",
    "Discharge Summary",
    "History and Physical",
    "Physician Progress Notes",
    "Operative Progress Notes",
    "Radiology Report",
    "Surgery Consent Form",
    "Anesthesia Record",
    "Operative Report",
    "Surgical Pathology Report",
    "Patient Admission Assessment",
    "Patient Vitals Assessment",
  ];

  const handleChange = (event) => {
    setSelectedSection(event.target.value);
  };

  return (
    <div className="sections-list">
      <div className="header-section">
        <h2>Sections</h2>
        <button
          onClick={handleSectionSubmit}
          className="submit-button"
          disabled={!selectedSection}
        >
          Submit
        </button>
      </div>

      <FormControl component="fieldset">
        <FormLabel component="legend">Choose a section</FormLabel>
        <RadioGroup
          aria-label="sections"
          name="sections"
          value={selectedSection}
          onChange={handleChange}
        >
          {sections.map((section, index) => (
            <FormControlLabel
              key={index}
              value={section}
              control={<Radio />}
              label={section}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default SectionsList;
