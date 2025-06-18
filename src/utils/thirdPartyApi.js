export function fetchSubscriptions() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "sub_001",
          name: "Basic Plan",
          price: "$9.99/month",
          status: "active",
        },
        {
          id: "sub_002",
          name: "Pro Plan",
          price: "$19.99/month",
          status: "inactive",
        },
        {
          id: "sub_003",
          name: "Premium Plan",
          price: "$29.99/month",
          status: "active",
        },
        {
          id: "sub_004",
          name: "Enterprise",
          price: "$99.99/month",
          status: "active",
        },
      ]);
    }, 900);
  });
}
