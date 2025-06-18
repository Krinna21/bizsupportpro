export function getTickets() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Issue with login",
          description: "User cannot log in with correct credentials.",
          status: "Open",
        },
        {
          id: 2,
          title: "Payment not processed",
          description: "Payment failed but user was charged.",
          status: "In Progress",
        },
        {
          id: 3,
          title: "Feature request: Dark mode",
          description: "Please add dark mode to the app.",
          status: "Closed",
        },
      ]);
    }, 400);
  });
}

export function createTicket(ticket) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...ticket, id: Date.now() });
    }, 300);
  });
}

export function deleteTicket(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: `Ticket ${id} deleted` });
    }, 250);
  });
}
