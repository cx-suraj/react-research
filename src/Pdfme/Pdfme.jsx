import React, { useState } from "react";
import template from "./PDFTemplete";
import { Template, generate } from "@pdfme/generator";
import { Viewer } from "@pdfme/ui";
import { Designer } from "@pdfme/ui";

const Pdfme = () => {
  const [link, setLink] = useState("");
  const [inputs, setInputs] = useState([
    {
      QR: "",
      Name: "",
      field3: "",
    },
  ]);

  const handleGeneratePDF = () => {
    setLink("");
    console.log(inputs);
    generate({ template, inputs }).then((pdf) => {
      // Browser
      const blob = new Blob([pdf.buffer], { type: "application/pdf" });
      console.log(blob);
      setLink(URL.createObjectURL(blob));
      const domContainer = document.getElementById("pdfview");
      const viewer = new Viewer({ domContainer, template, inputs });
      //   window.open(URL.createObjectURL(blob));
      // Node.js
      // fs.writeFileSync(path.join(__dirname, `test.pdf`), pdf);
    });
  };
  const handleOnChange = (e) => {
    const data = [{ ...inputs[0], [e.target.name]: e.target.value }];
    console.log(data);

    setInputs(data);
  };
  const desigener = document.getElementById("pdfview");
  const templateNew = {
    // skip...　Check the Template section.
  };
  //   const designer = new Designer({ desigener, templateNew });

  return (
    <>
      <form>
        <div className="mb-3">
          <label htmlFor="Name" className="form-label">
            Enter Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="Name"
            name="Name"
            value={inputs[0].Name}
            onChange={handleOnChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="Title"
            name="field3"
            value={inputs[0].field3}
            onChange={handleOnChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="qrcode" className="form-label">
            QR code text
          </label>
          <input
            type="text"
            className="form-control"
            id="qrcode"
            name="QR"
            onChange={handleOnChange}
            value={inputs[0].QR}
          />
        </div>

        <button
          onClick={handleGeneratePDF}
          type="button"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
      <br />
      {link && (
        <a href={link} target="_blank" rel="noreferrer">
          Click here to open pdf in new tab
        </a>
      )}
      <br />
      {link && (
        <a href={link} download="temp.pdf">
          Click here to download the pdf
        </a>
      )}
      <div id="pdfview"></div>
      <div id="designpdf"></div>
    </>
  );
};

export default Pdfme;
