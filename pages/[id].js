import { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Title from './components/Title';
import Summary from './components/Summary';
import Review from './components/Review';
import OneWordReview from './components/OneWordReview';
import SimilarContent from './components/SimilarContent';
import { PrismaClient } from '@prisma/client';


export default function getID(props) {
  const { id, title, summary, review, oneWordReview, similarContent } = props;

  const [searchIdState, setSearchIdState] = useState(parseInt(id, 10));

  return (
    <>
      <Head>
        <title>SummaryAI - {title}</title>
        <meta name="description" content="Get rich summaries for articles and awesome reviews for movies/books using the power of ChatGPT!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Bruno+Ace+SC&display=swap" rel="stylesheet" />
      </Head>
      <Title
        searchIdState={searchIdState}
        title={title}
      />
      <div className="flex">
        <div className={"flex h-screen bg-gray-200 " + (!searchIdState ? 'hidden' : '')}>
          <div className={"flex-1 p-4 "}>
            <br />
            <Summary summary={summary} />
            <br />
            <Review review={review} similarContent={similarContent} />
          </div>
          <div className={"relative overflow-x-auto shadow-md min-w-[200px] max-w-[400px] sm:w-auto w-1/4 mt-4 pr-4 pl-4 text-sm text-left text-gray-500 dark:text-gray-400" + (!searchIdState ? 'hidden' : '')}>
            <br />
            <OneWordReview oneWordReview={oneWordReview} />
            <br />
            <SimilarContent similarContent={similarContent} />
          </div>
        </div>
      </div>
    </>
  );
}

const capitalizeInitials = (title) => {
  const words = title.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1).toLowerCase();
  }
  return words.join(" ");
};

export async function getServerSideProps(context) {
  const { id } = context.query;

  // const response = await axios.get(`/api/searchAPI/?searchIdState=${id}`);
  // const data = response.data;
  const prisma = new PrismaClient();
  const searchID = parseInt(id, 10);

  const data = await prisma.search.findUnique({
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

  console.log("data", data);

  // return { props: { id } };

  return {
    props: {
      id,
      title: capitalizeInitials(data.searchTerm),
      summary: data.Result.summary,
      review: data.Result.review,
      oneWordReview: data.Result.oneWordReview,
      similarContent: data.Result.similar,
    },
  };

}
