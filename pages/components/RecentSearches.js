export default function RecentSearches(props) {
  const handleSearchSelect = (searchId) => {
    props.onSearchSelect(searchId);
  };

  return (
    <div className="sidebar top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900">
      <div class="text-gray-100 text-xl">
        <div class="p-2.5 mt-1 flex items-center">
          <i class="bi bi-app-indicator px-2 py-1 rounded-md bg-blue-600"></i>
          <h1 class="font-bold text-gray-200 text-[15px] ml-3">Recent Searches</h1>
        </div>
        <div class="my-2 bg-gray-600 h-[1px]"></div>
      </div>

      <div id="recentSearches" class="text-gray-100">
        {props.searches?.map((search) => (
          <div
            key={search.id}
            class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
            onClick={() => handleSearchSelect(search.id)}
          >
            <span class="text-[15px] ml-4 text-gray-200 font-bold">{search.searchTerm}</span>
          </div>
        ))}
      </div>
    </div>
  );
}