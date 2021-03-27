export default config;

/**
 * Type declarations for
 *    import config from 'my-app/config/environment'
 */
declare const config: {
  environment: string;
  modulePrefix: string;
  podModulePrefix: string;
  locationType: string;
  rootURL: string;
  APP: {
    API_URL: string;
    FILE_URL: string;
    GITHUB_OWNER: string;
    GITHUB_REPOSITORY: string;
  };
  MIRAGE_SCENARIO?: string;
};
