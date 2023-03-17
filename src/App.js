import logo from "./logo.svg";
import "./App.css";
import HomePDF from "./react-pdff/HomePDF";
import Tickets from "./jspdf/Tickets";
import { PdfPaint } from "./jspdf/withhtml2canvas/PdfPraint";
import Pdfme from "./Pdfme/Pdfme";
import DynamicPDF from "./Pdfme/DynamicPDF";
import { Main } from "./CSV/Main";

function App() {
  return (
    <div className="container">
      {/* <HomePDF /> */}
      {/* <Tickets /> */}
      {/* Works with htm/css but have define fixed px html file*/}
      {/* <PdfPaint /> */}
      {/* <Pdfme /> */}
      {/* <DynamicPDF/> */}
      <Main />
    </div>
  );
}

export default App;
