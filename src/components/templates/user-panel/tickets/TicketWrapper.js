"use client";

import TicketDetails from "@/components/templates/user-panel/tickets/TicketDetails";
import Tickets from "@/components/templates/user-panel/tickets/Tickets";
import SendTicket from "@/components/modules/user-panel/SendTicket";
import { useState } from "react";

function TicketWrapper({ tickets, departments }) {
  const [isPageActive, setIsPageActive] = useState(1);
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  return (
    <div>
      {isPageActive === 1 && (
        <Tickets
          setSelectedTicketId={setSelectedTicketId}
          tickets={tickets}
          setIsPageActive={setIsPageActive}
        />
      )}
      {isPageActive === 2 && (
        <SendTicket
          setIsPageActive={setIsPageActive}
          departments={departments}
        />
      )}
      {isPageActive === 3 && (
        <TicketDetails
          setIsPageActive={setIsPageActive}
          ticketId={selectedTicketId}
        />
      )}
    </div>
  );
}

export default TicketWrapper;
