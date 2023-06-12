export default function Title(props) {

  return (
    <div>
      <h1 className={`pt-10 pl-5 text-4xl font-extrabold light:text-black bg-gray-200 ${!props.searchIdState ? 'hidden' : ''}`}>{props.title}</h1>
    </div>
  );
}