export default function ConvoCard() {
  return (
    <div className="flex flex-col w-full h-full p-4 bg-white rounded-lg shadow-lg">
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row items-center">
          <img
            className="w-8 h-8 mr-2 rounded-full"
            src="https://pbs.twimg.com/profile_images/1352777458756300800/7LgZbW8n_400x400.jpg"
          />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-900">@dom__inic</span>
            <span className="text-xs text-gray-500">1h</span>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <span className="text-xs text-gray-500">1.5k</span>
          <svg
            className="w-5 h-5 ml-2 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>
      <div className="flex flex-col w-full mt-4">
        <span className="text-sm text-gray-900">
          @dom__inic: Hello, my name is Dominic and I am a software engineer. I
          love to build things and I am currently working on a project called
          ShareGPT. It is a Chrome extension that allows you to share your
          wildest ChatGPT conversations with one click. You can check it out at
          sharegpt.com.
        </span>
      </div>
      <div className="flex flex-row w-full mt-4">
        <div className="flex flex-row items-center justify-center w-1/2 h-12 text-sm font-bold text-white bg-blue-500 rounded-lg shadow-lg">
          <svg
            className="w-5 h-5 mr-2 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span>Share</span>
        </div>
        <div className="flex flex-row items-center justify-center w-1/2 h-12 ml-4 text-sm font-bold text-white bg-red-500 rounded-lg shadow-lg">
          <svg
            className="w-5 h-5 mr-2 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <span>Report</span>
        </div>
      </div>
    </div>
  );
}
