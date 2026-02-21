const PageErrorRedirect = () => {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      role="main"
      aria-labelledby="page-title">
      <title>Error 404 - Page Not Found</title>

      <h1
        id="page-title"
        className="text-7xl md:text-9xl font-bold text-white drop-shadow-lg"
        aria-label="Error 404">
        404
      </h1>

      <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-gray-200">
        Page Not Found ❌
      </h2>

      <p className="mt-2 text-gray-400 max-w-md">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>
    </main>
  );
};
export default PageErrorRedirect;
