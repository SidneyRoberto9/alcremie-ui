export function LoadingPage() {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <svg
        className="animate-spin h-28 w-28"
        fill="none"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path
          className="text-violet-600"
          d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22Z"
          fill="currentColor"
        />
        <path
          className="text-white"
          d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
