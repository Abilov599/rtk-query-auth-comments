import { useRouteError } from 'react-router-dom';

type Error = {
  status: number;
  statusText: string;
  internal: boolean;
  data: string;
  error: unknown;
};

function ErrorBoundary() {
  const routeError = useRouteError();
  const error = routeError as Error;

  // Uncaught ReferenceError: path is not defined
  return (
    <div className="text-center">
      <h1>{error.status}</h1>
      <h2>{error.statusText}</h2>
    </div>
  );
}

export { ErrorBoundary };
