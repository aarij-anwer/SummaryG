import { PrismaClient } from '@prisma/client';

export default function DB(props) {
  console.log("props", props);
  const results = props.results;
  const searches = props.searches;
  return (
    <div>
      <h1>DB Access</h1>
      {results && results.map(result => (
        <div key={result.id}>
          <p>Summary: {result.summary}</p>
          <p>Review: {result.review}</p>
        </div>))}
    </div>
  );
}

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  const results = await prisma.result.findMany();
  const searches = await prisma.search.findMany();

  return {
    props: { results, searches }
  };
}