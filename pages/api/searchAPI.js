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
      // console.log("here");
      res.send({ name: 'John Doe' });
    }
  }

  // if (req.method === "POST") {
  //   const userInput = req.body.userInput
  //   const searchType = req.body.searchType
  //   //console.log(userInput);

  //   const search = await prisma.Search.create({
  //     data: {
  //       type: searchType,
  //       searchTerm: userInput,
  //     },
  //   })

  //   //generate chatGPT requests here and add responses to database

  // }

  // if (req.method === "DELETE") {

  // }
  // // res.status(200).json({ name: 'John Doe' })

}