// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {

  if (req.method === "GET") {
    const searchID = req.query.searchIdState;

    console.log(searchID);

    if (searchID) {
      const prisma = new PrismaClient();
      const content = await prisma.Result.findUnique({
        where: {
          searchID: parseInt(searchID, 10),
        },
      })

      const title = await prisma.Search.findUnique({
        where: {
          id: {
            equals: searchID
          }
        }
      })

      let updatedTitle = title[0].searchTerm;
      let type = title[0].type;

      // Check the search type and modify the title accordingly
      if (title[0].type !== "articles") {
        updatedTitle = capitalizeInitials(updatedTitle);
      }

      content[0].title = updatedTitle;
      content[0].type = type;

      console.log('content = ');
      console.log(content);
      res.send(JSON.stringify({ content: content }))
    } else {
      res.send({ name: 'John Doe' });
    }
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