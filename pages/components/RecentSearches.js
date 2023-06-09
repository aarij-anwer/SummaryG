export default function RecentSearches(props) {
  const handleSearchSelect = (searchId) => {
    props.onSearchSelect(searchId);
  };

  return (
    <div className="sidebar top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900 hidden">
      <div className="text-gray-100 text-xl">
        <div className="p-2.5 mt-1 flex items-center">
          <i className="bi bi-app-indicator px-2 py-1 rounded-md bg-blue-600"></i>
          <h1 className="font-bold text-gray-200 text-[15px] ml-3">Recent Searches</h1>
        </div>
        <div className="my-2 bg-gray-600 h-[1px]"></div>
      </div>

      <div id="recentSearches" className="text-gray-100">
        {props.searches?.map((search) => (
          <div
            key={search.id}
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
            onClick={() => handleSearchSelect(search.id)}
          >
            <span className="text-[15px] ml-4 text-gray-200 font-bold">{search.searchTerm}</span>
          </div>
        ))}
      </div>
    </div>
  );
}