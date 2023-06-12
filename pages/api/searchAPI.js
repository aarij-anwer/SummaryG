// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {

  if (req.method === "GET") {
    const searchID = req.query.searchIdState;
    console.log("searchID in searchAPI", searchID);

    try {
      const result = await getSearchAndResultBySearchID(parseInt(searchID), 10);
      console.log("Result in DB call", result);
      res.send({ result });
    } catch (error) {
      console.log("Error in DB call", error);
      res.send({ name: 'John Doe' });
    }
  }
}

// async function getSearchAndResultBySearchID(searchID) {
//   const searchAndResult = await prisma.result.findUnique({
//     where: { id: searchID },
//     select: {
//       search: {
//         select: {
//           searchTerm: true,
//           type: true,
//         },
//       },
//       summary: true,
//       review: true,
//       oneWordReview: true,
//       similar: true,
//     },
//   });

//   return searchAndResult;
// }

async function getSearchAndResultBySearchID(searchID) {
  const searchAndResult = await prisma.search.findUnique({
    where: { id: searchID },
    select: {
      searchTerm: true,
      type: true,
      Result: {
        select: {
          summary: true,
          review: true,
          oneWordReview: true,
          similar: true
        }
      }
    }
  });

  return searchAndResult;
}