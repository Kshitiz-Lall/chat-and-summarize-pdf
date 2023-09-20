import React, { useState } from "react";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
} from "@material-ui/core";

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
      <h2>Sections</h2>
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
        <button onClick={handleSectionSubmit}>Submit</button>
      </FormControl>
    </div>
  );
};

export default SectionsList;
