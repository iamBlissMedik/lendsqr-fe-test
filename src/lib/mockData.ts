export const generateUsers = () => {
  const users = [];
  for (let i = 1; i <= 500; i++) {
    users.push({
      id: i,
      organization: `Org ${i}`,
      username: `user${i}`,
      email: `user${i}@example.com`,
      phone: `+123456789${i}`,
      dateJoined: `2025-12-${(i % 30) + 1}`,
      status: i % 2 === 0 ? "Active" : "Inactive",
    });
  }
  return users;
};
