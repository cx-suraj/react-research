import { generate } from "@pdfme/generator";
import { Viewer } from "@pdfme/ui";
import React, { useState } from "react";

const DynamicPDF = () => {
  const [link, setLink] = useState("");
  const template = {
    schemas: [
      {
        CampaignName: {
          type: "text",
          position: {
            x: 0.12144999999993615,
            y: 46.83,
          },
          width: 210.14,
          height: 6.98,
          alignment: "center",
          fontSize: 13,
          characterSpacing: 0,
          lineHeight: 1,
        },
        temp1231: {
          type: "text",
          position: {
            x: 5.121449999999936,
            y: 51.83,
          },
          width: 210.14,
          height: 6.98,
          alignment: "center",
          fontSize: 13,
          characterSpacing: 0,
          lineHeight: 1,
        },
      },
    ],
    basePdf:
      "data:application/pdf;base64,JVBERi0xLjQKJfbk/N8KMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovVmVyc2lvbiAvMS40Ci9QYWdlcyAyIDAgUgovVmlld2VyUHJlZmVyZW5jZXMgMyAwIFIKL0xhbmcgKGVuKQo+PgplbmRvYmoKNCAwIG9iago8PAovS2V5d29yZHMgKERBRlJiZlQ0cGVvLEJBRXhnZzM0TWl3KQovQXV0aG9yIChTdXJhaiBLdXNod2FoYSkKL0NyZWF0b3IgKENhbnZhKQovUHJvZHVjZXIgKENhbnZhKQovVGl0bGUgKGN1bHR1cmV4KQovQ3JlYXRpb25EYXRlIChEOjIwMjIxMTA5MTExNjM4KzAwJzAwJykKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFs1IDAgUl0KL0NvdW50IDEKPj4KZW5kb2JqCjMgMCBvYmoKPDwKL0Rpc3BsYXlEb2NUaXRsZSB0cnVlCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9UeXBlIC9QYWdlCi9SZXNvdXJjZXMgNiAwIFIKL01lZGlhQm94IFswLjAgNy44Mjk5ODEzIDU5NS41IDg1MC4wNzk5Nl0KL0NvbnRlbnRzIDcgMCBSCi9TdHJ1Y3RQYXJlbnRzIDAKL1BhcmVudCAyIDAgUgovVGFicyAvUwovQmxlZWRCb3ggWzAuMCA3LjgyOTk4MTMgNTk1LjUgODUwLjA3OTk2XQovVHJpbUJveCBbMC4wIDcuODI5OTgxMyA1OTUuNSA4NTAuMDc5OTZdCi9Dcm9wQm94IFswLjAgNy44Mjk5ODEzIDU5NS41IDg1MC4wNzk5Nl0KL1JvdGF0ZSAwCi9Bbm5vdHMgW10KPj4KZW5kb2JqCjYgMCBvYmoKPDwKL1Byb2NTZXQgWy9QREYgL1RleHQgL0ltYWdlQiAvSW1hZ2VDIC9JbWFnZUldCi9FeHRHU3RhdGUgOCAwIFIKPj4KZW5kb2JqCjcgMCBvYmoKPDwKL0xlbmd0aCAxMjYKL0ZpbHRlciAvRmxhdGVEZWNvZGUKPj4Kc3RyZWFtDQp4nMWNsQ7CMAxEd3+FZ6Qa25c0yRd0pgsfgKATSJT/l3DDAmJF4m7x6ax34mhdrOFB3mLNKlpaG/l0pTttvacKQYiRk0oq6rye6bjjW3xAzMvoqJ31mQJhvHme+HWsC+0n8PLo5NISm6HjLnQIfy+aC9zyTxcd/1x8AisATIkNCmVuZHN0cmVhbQplbmRvYmoKOCAwIG9iago8PAovRzMgOSAwIFIKPj4KZW5kb2JqCjkgMCBvYmoKPDwKL2NhIDEKL0JNIC9Ob3JtYWwKPj4KZW5kb2JqCnhyZWYKMCAxMAowMDAwMDAwMDAwIDY1NTM1IGYNCjAwMDAwMDAwMTUgMDAwMDAgbg0KMDAwMDAwMDI4OSAwMDAwMCBuDQowMDAwMDAwMzQ2IDAwMDAwIG4NCjAwMDAwMDAxMTQgMDAwMDAgbg0KMDAwMDAwMDM4OSAwMDAwMCBuDQowMDAwMDAwNjgyIDAwMDAwIG4NCjAwMDAwMDA3NjYgMDAwMDAgbg0KMDAwMDAwMDk2NiAwMDAwMCBuDQowMDAwMDAwOTk3IDAwMDAwIG4NCnRyYWlsZXIKPDwKL1Jvb3QgMSAwIFIKL0lEIFs8NUJCQ0M5ODQ2QTNDQjA3MDlDQzQxM0Y1OEEwRjI4MDA+IDw1QkJDQzk4NDZBM0NCMDcwOUNDNDEzRjU4QTBGMjgwMD5dCi9TaXplIDEwCi9JbmZvIDQgMCBSCj4+CnN0YXJ0eHJlZgoxMDM2CiUlRU9GCg==",
  };
  const inputs = [
    {
      CampaignName: "Temp data",
      temp1231: "hello",
    },
  ];
  const addTempValues = () => {
    let x = -100;
    let y = 0;
    for (let index = 0; index < 150; index++) {
      if (x > 100) {
        x = 0;
        y+=5;
      }
      x += 15;
      //   y += 10;
      let code = `temp${index}`;
      template.schemas[0][code] = {
        type: "text",
        position: {
          x: x,
          y: y,
        },
        width: 210.14,
        height: 6.98,
        alignment: "center",
        fontSize: 13,
        characterSpacing: 0,
        lineHeight: 1,
        "fontColor": "#14b351"
      };
      //   template.schemas.push(object);
      //   let inputObject = {};
      inputs[0][code] = `(${x},${y})`;
      //   inputs.push(inputObject);
    }
  };
  const handleGeneratePDF = () => {
    console.log(template);
    console.log(inputs);
    generate({ template, inputs }).then((pdf) => {
      const blob = new Blob([pdf.buffer], { type: "application/pdf" });
      setLink(URL.createObjectURL(blob));
      const dom = document.getElementById("pdfview");
      const viewer = new Viewer({ dom, template, inputs });
    });
  };

  return (
    <>
      <button
        onClick={handleGeneratePDF}
        type="button"
        className="btn btn-primary"
      >
        Generate PDF
      </button>
      <button
        onClick={addTempValues()}
        type="button"
        className="btn btn-primary"
      >
        Submit
      </button>
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
    </>
  );
};

export default DynamicPDF;
