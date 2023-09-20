import React from "react";
import jsPDF from "jspdf";
import "./PDFDownloader.css";

const PDFDownloader = ({ dynamicData, demographics }) => {
  const formatDate = (dateString) => {
    console.log(dateString);
    if (!dateString) return "N/A";

    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Get the month name using the month number
    const monthName = monthNames[parseInt(month, 10) - 1];

    return `${day} ${monthName} ${year}`;
  };

  const downloadPDF = () => {
    if (!dynamicData || !demographics) return;

    const doc = new jsPDF();

    // Set default font size and font style
    doc.setFontSize(12);
    doc.setFont("titillium", "normal");

    // Reset text color and font size
    doc.setTextColor(0, 0, 0); // Reset to black
    doc.setFontSize(12);

    let y = 10;

    // Add title
    doc.text("CCDA Document", 10, y);
    y += 10;

    // Add generated date with a different font style
    doc.setFont("times", "italic");
    doc.text("Generated on: " + new Date().toLocaleString(), 10, y);
    doc.setFont("titillium", "normal"); // Reset font style
    y += 20;

    // Demographics
    doc.text("Demographics", 10, y);
    y += 10;

    const demographicDataArray = [
      ["Name:", demographics.Name || "N/A"],
      ["Date of Birth:", formatDate(demographics.Birthdate)],
      ["Gender:", demographics.Gender || "N/A"],
      ["Marital Status:", demographics.Marital_Status || "N/A"],
      [
        "Address:",
        demographics.Contact_Details
          ? [
              demographics.Contact_Details.PST.streetAddressLine || "N/A",
              demographics.Contact_Details.PST.city || "N/A",
              demographics.Contact_Details.PST.state || "N/A",
              demographics.Contact_Details.PST.country || "N/A",
              demographics.Contact_Details.PST.postalCode || "N/A",
            ].join(", ")
          : "N/A",
      ],
    ];

    doc.autoTable({
      startY: y,
      head: [["Field", "Value"]],
      body: demographicDataArray,
      theme: "striped", // Add stripes to the table
      align: "left", // Align text in the table to the left
      valign: "middle", // Vertically center text in the table cells
    });

    y = doc.autoTable.previous.finalY + 10;

    // Other sections
    Object.keys(dynamicData).forEach((sectionKey) => {
      const sectionData = dynamicData[sectionKey][sectionKey] || [];
      const headers = Object.keys(sectionData[0] || {});

      doc.text(sectionKey, 10, y);
      y += 10;

      if (sectionData.length === 0) {
        // Add "None Recorded" message in the specified style
        doc.setFont("times", "bolditalic");
        doc.text(
          "NONE RECORDED",
          doc.internal.pageSize.width / 2,
          y,
          null,
          null,
          "center"
        );
        doc.setFont("titillium", "normal"); // Reset font style
        y += 10;
      } else {
        doc.autoTable({
          startY: y,
          head: [headers.map((header) => header.replace(/_/g, " "))],
          body: sectionData.map((data) =>
            headers.map((header) =>
              data[header] === "none_recorded" ? "None Recorded" : data[header]
            )
          ),
          theme: "striped", // Add stripes to the table
          align: "left", // Align text in the table to the left
          valign: "middle", // Vertically center text in the table cells
        });

        y = doc.autoTable.previous.finalY + 10;
      }
    });

    doc.save("Genzeon-ccda.pdf");
  };

  return <button onClick={downloadPDF}>DOWNLOAD PDF</button>;
};

export default PDFDownloader;
