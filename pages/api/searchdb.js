import { PrismaClient } from '@prisma/client';

async function addSearchToDB(type, searchTerm, sessionID) {
  // console.log("searchTerm", searchTerm);
  const prisma = new PrismaClient();
  const search = await prisma.Search.create({
    data: {
      type,
      searchTerm,
      sessionID
    },
  });
  return search.id;
}

export default async function handler(req, res) {
  const searchID = await addSearchToDB(req.query.type, req.query.searchTerm, req.query.sessionID);
  res.status(200).json({ searchID });
};