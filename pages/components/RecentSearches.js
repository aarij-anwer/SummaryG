export default function RecentSearches(props) {
  return (
    <div>
      <h2>Recent Searches:</h2>
      {props.searches?.map((search) => (
        <div key={search.id}>
          <p>Search Term: {search.searchTerm}</p>
        </div>
      ))}
    </div>
  );
}