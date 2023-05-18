export default function OneWordReview(props) {

  return (
    <div>
      <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
        Quote:
      </label>
      <div
        id="message"
        className="block p-2.5 h-[200px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 resize-y overflow-auto focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {props.oneWordReview}
      </div>
    </div>
  );
}