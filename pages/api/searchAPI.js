// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  
  if (req.method === "GET") {
    let searchID = Number(req.query.searchIdState)
    
    if (searchID) {
      const prisma = new PrismaClient();
      const content = await prisma.Result.findMany({
        where: {
          searchID: {
            equals: searchID
          }
        }
      })

      const title = await prisma.Search.findMany({
        where: {
          id: {
            equals: searchID
          }
        }
      })

      content[0].title = title[0].searchTerm;

      // console.log('content = ');
      // console.log(content);
      res.send(JSON.stringify({ content: content }))
    } else {
      res.send({ name: 'John Doe' });
    }
  }

}