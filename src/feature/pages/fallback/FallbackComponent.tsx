const FallbackComponent = () => {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      role="main"
      aria-labelledby="page-title">
      <title>Error 500 - Internal Server Error</title>
      {/* Main Error Heading */}
      <h1
        id="page-title"
        className="text-7xl md:text-9xl font-bold text-white drop-shadow-lg"
        aria-label="Error 404">
        500
      </h1>

      {/* Secondary Heading */}
      <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-gray-200">
        Error ❌
      </h2>

      {/* Description */}
      <p className="mt-2 text-gray-400 max-w-md">
        Oops! An error has occured. Please reload the site.
      </p>
    </main>
  );
};

export default FallbackComponent;
