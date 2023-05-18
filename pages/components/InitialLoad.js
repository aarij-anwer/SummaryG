export default function InitialLoad(props) {
  return (
    <div className={`flex justify-evenly items-center w-full h-full ${props.searchIdState ? 'hidden' : ''}`}>
      <img className="w-[15%]" src='/robot.png' />
      <div>
        <span className="text-3xl text-black">Search for an Article, Movie, or Book to get a summary, review, quote and similar content!</span>
      </div>
    </div>
  );
}