export default function Summary(props) {
  return (
    <div>
      <div>
        <span>Executive Summary:</span>
        <p>{props.executiveSummary}</p>
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