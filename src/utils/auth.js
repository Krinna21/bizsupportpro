export const authorize = (email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ token: "demo-token-12345" });
    }, 350);
  });
};

export const checkToken = (token) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          name: "Demo User",
          email: "demo@example.com",
          _id: "demo-user-id",
        },
      });
    }, 300);
  });
};

export const register = (name, email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          name,
          email,
          _id: "demo-new-user-id",
        },
      });
    }, 350);
  });
};

//DEMO : Returns fake 