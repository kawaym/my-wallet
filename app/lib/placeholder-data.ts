const users = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    name: "User",
    email: "user@nextmail.com",
    password: "123456",
  },
];

const transactions = [
  {
    id: "f2525343-7442-400b-bd45-4801fd2256f3",
    name: "Freela",
    description: "Freela que fiz dia tal",
    type: "credit",
    amount: 90000,
    date: "2024-07-20",
    userId: "410544b2-4001-4271-9855-fec4b6a6442a",
  },
  {
    id: "5b1784a5-295b-47a9-ad76-a8f22200504d",
    name: "Almoco",
    description: "Almoco",
    type: "debit",
    amount: 4500,
    date: "2024-06-10",
    userId: "410544b2-4001-4271-9855-fec4b6a6442a",
  },
  {
    id: "3ba695ef-f1b8-4a1b-b2ce-560b726225b5",
    name: "Teste",
    description: "Não deveria estar aparecendo",
    type: "credit",
    amount: 9000000,
    date: "2024-12-31",
    userId: "44c0dee9-ffdb-46b3-a08b-4d80c2e8ddc2",
  },
];

export { users, transactions };
