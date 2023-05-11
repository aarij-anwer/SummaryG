export default function RecentSearches(props) {

  const handleSearchSelect = (searchId) => {
    props.onSearchSelect(searchId);
  };

  return (
    <div>
      <h2>Recent Searches:</h2>
      {props.searches?.map((search) => (
        <div key={search.id} onClick={()=> handleSearchSelect(search.id)}>
          <p>Search Term: {search.searchTerm}</p>
        </div>
      ))}
    </div>
  );
}