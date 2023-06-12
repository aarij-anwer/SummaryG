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

    const updatedRecentSearches = recentSearches.map((search) => {
      if (search.type !== "articles") {
        search.searchTerm = capitalizeInitials(search.searchTerm);
      }
      return search;
    });


    console.log('recentSearches = ');
    console.log(recentSearches);
    res.send(JSON.stringify({ recentSearches: updatedRecentSearches }));
  }

  // Function to capitalize the initials of each word in the title
  function capitalizeInitials(title) {
    const words = title.split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1).toLowerCase();
    }
    return words.join(" ");
  }

}