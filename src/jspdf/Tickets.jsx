import React, { useEffect, useState } from "react";
import generatePDF from "./generatePDF";
import TicketsComponent from "./TicketsComponent";

const Tickets = () => {
  const [tickets, setTickets] = useState([
    { id: 1, title: "Hellop", request: "dasdas" },
    { id: 2, title: "Hellop", request: "dasdas" },
    { id: 3, title: "Hellop", request: "dasdas" },
    { id: 4, title: "Hellop", request: "dasdas" },
    { id: 5, title: "Hellop", request: "dasdas" },
  ]);

  //   useEffect(() => {
  // const getAllTickets = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:3000/tickets");
  //     setTickets(response.data.tickets);
  //   } catch (err) {
  //     console.log("error");
  //   }
  // };
  // getAllTickets();
  //   }, []);

  const reportTickets = tickets.filter(
    (ticket) => ticket.status === "completed"
  );

  return (
    <div>
      <div className="container mb-4 mt-4 p-3">
        <div className="row">
          <button
            className="btn btn-primary"
            onClick={() => generatePDF(reportTickets)}
          >
            Generate monthly report
          </button>
        </div>
      </div>
      <TicketsComponent tickets={tickets} />
    </div>
  );
};

export default Tickets;
