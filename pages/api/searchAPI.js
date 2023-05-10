// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  if(req.method === "GET") {

  }

  if(req.method === "POST") {
    const userInput = req.body.userInput
    const searchType = req.body.searchType
    console.log(userInput);
    
    const search = await prisma.Search.create({
      data: {
        type: searchType,
        searchTerm: userInput,
      },
    })

    //generate chatGPT requests here and add responses to database

  }

  if(req.method === "DELETE") {
    
  }
  // res.status(200).json({ name: 'John Doe' })

}