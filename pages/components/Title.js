export default function Title(props) {

  return (
    <div>
      <h1 className={`text-4xl font-extrabold light:text-black bg-gray-200 ${!props.searchIdState ? 'hidden' : ''}`}>Title: {props.title}</h1>
    </div>
  );
}