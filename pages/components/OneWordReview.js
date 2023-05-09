export default function OneWordReview(props) {

  return (
    <div>
      <h2>Guru Says:</h2>
      <div>
        <p>{props.oneWordReview}</p>
        <button onClick={() => props.onReviewLengthChange(1)}>One Word Review</button>
      </div>
    </div>
  );
}