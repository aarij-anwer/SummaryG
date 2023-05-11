export default function Summary(props) {
  return (
    <div>
      <div>
        <span>Summary:</span>
        <p>{props.summary}</p>
      </div>
      {props.relatedContent && (
        <div>
          <span>Related Content:</span>
          <a href={props.relatedContent.url}>{props.relatedContent.title}</a>
        </div>
      )}
    </div>
  );
}