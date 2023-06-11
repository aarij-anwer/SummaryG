import { PrismaClient } from '@prisma/client';

async function addResultsToDB(searchID, summary, review, oneWordReview, similar) {
  const prisma = new PrismaClient();
  const result = await prisma.Result.create({
    data: {
      searchID,
      summary,
      review,
      oneWordReview,
      similar
    },
  });

  return result.id;
}

export default async function handler(req, res) {

  const searchID = parseInt(req.query.searchID, 10);
  console.log("searchID in resultsdb", searchID);
  
  const summary = req.query.summary;
  // console.log("summary", summary);
  
  const review = req.query.review;
  // console.log("review", review);

  const oneword = req.query.oneword;
  // console.log("oneword", oneword);

  const similar = req.query.similar;
  // console.log("similar", similar);

  const resultID = await addResultsToDB(searchID, summary, review, oneword, similar);
  console.log("resultID in resultsdb", resultID);

  res.status(200).json({ resultID });
};