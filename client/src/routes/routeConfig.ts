export const ROOT_PATH = '/';
export const LOGIN_PATH = '/login';
export const SIGNUP_PATH = '/signup';
export const DOCS_PATH = '/docs';
export const DOCS_NESTED_ROUTES_PATH = '/docs/nestedroutesguide';
export const DOCS_API_EXAMPLE_PATH = '/docs/apidataexample';

export const publicRoutes: string[] = [
  ROOT_PATH,
  LOGIN_PATH,
  SIGNUP_PATH,
];

// Route mapping configuration
export const ROUTE_MAPPINGS = {
  // Map root path to home page
  [ROOT_PATH]: '/home',
} as const;

