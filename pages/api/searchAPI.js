// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {

  if (req.method === "GET") {
    const searchID = req.query.searchIdState;
    console.log(searchID);

    try {
      const result = await getSearchAndResultBySearchID(parseInt(searchID),10);
      console.log("Result in DB call", result);
      res.send({ result });
    } catch (error) {
      console.log("Error in DB call", error);
      res.send({ name: 'John Doe' });
    } finally {
    }
  }
}

// if (searchID) {
//   const content = await prisma.Result.findUnique({
//     where: {
//       searchID: parseInt(searchID, 10),
//     },
//   })

//   const title = await prisma.Search.findUnique({
//     where: {
//       id: {
//         equals: searchID
//       }
//     }
//   })

//   let updatedTitle = title[0].searchTerm;
//   let type = title[0].type;

// // Check the search type and modify the title accordingly
// if (title[0].type !== "articles") {
//   updatedTitle = capitalizeInitials(updatedTitle);
// }

// content[0].title = updatedTitle;
// content[0].type = type;

// console.log('content = ');
// console.log(content);
// res.send(JSON.stringify({ content: content }))
//   res.send({ name: 'John Doe' });
// } else {
//   res.send({ name: 'John Doe' });
// }
// }

async function getSearchAndResultBySearchID(searchID) {
  const searchAndResult = await prisma.result.findUnique({
    where: { id: searchID },
    select: {
      search: {
        select: {
          searchTerm: true,
          type: true,
        },
      },
      summary: true,
      review: true,
      oneWordReview: true,
      similar: true,
    },
  });

  return searchAndResult;
}

