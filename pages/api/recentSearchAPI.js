// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  if (req.method === "GET") {
    let sessionID = req.query.sessionID;
    console.log("sessionID in recentSearchAPI", sessionID);

    const recentSearches = await prisma.Search.findMany({
      where: {
        sessionID: sessionID 
      },
      orderBy: {
        id: 'desc'
      },
      take: 10
    })

    console.log('recentSearches = ');
    console.log(recentSearches);
    res.send(JSON.stringify({ recentSearches: recentSearches }))
  }

}