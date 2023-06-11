
async function addSearchToDB(type, searchTerm, sessionID) {
  // console.log("searchTerm", searchTerm);
  const search = await prisma.Search.create({
    data: {
      type,
      searchTerm,
      sessionID
    },
  });
  return search;
}

async function addResultsToDB(searchID, summary, review, oneWordReview, similar) {
  const result = await prisma.Result.create({
    data: {
      searchID,
      summary,
      review,
      oneWordReview,
      similar
    },
  });

  sID = result.searchID;
  rID = result.id;

  return result;
}

export default async function handler(req, res) {

};