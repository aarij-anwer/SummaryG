export default function SimilarContent(props) {
  
  return (
    <div>
      <h2>Similar Content:</h2>
      {props.similarContent && props.similarContent.map((content, index) => (
        <a key={index} href={content.url}>{content.title}</a>
      ))}
    </div>
  );
}