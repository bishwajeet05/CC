export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-500"></div>
      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">Converting...</span>
    </div>
  );
} 