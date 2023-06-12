import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { type, searchTerm, sessionID, summary, review, oneWordReview, similar } = req.body;

  try {
    const search = await prisma.search.create({
      data: {
        type,
        searchTerm,
        sessionID
      },
    });

    const searchID = search.id;
    console.log("searchID in searchDB", searchID);

    const result = await prisma.result.create({
      data: {
        searchID,
        summary,
        review,
        oneWordReview,
        similar
      },
    });
    res.status(201).json({ searchID, resultID: result.id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
