export const authorize = (email, password) => {
  // Demo: always returns a "token"
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ token: "demo-token-12345" });
    }, 350);
  });
};

export const checkToken = (token) => {
  // Demo: always returns fake user
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
  // Demo: always resolves with new user data
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
