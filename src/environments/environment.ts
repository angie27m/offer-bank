// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8081',
  flexUrl: 'http://localhost:8081',
  snackBarTime: 8000,
  //variables para AWS
  amazonRegion : "us-east-1",
  amazonAccessKey : "AKIAV5XXEQ6SMPU7XJ5T",
  amazonSecretKey : "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",
  amazonBucketName : "storage-angular-s3",
  // variables para sentry (monitoreo de errores y performance)
  sentryDsn: 'https://1258acecb88d41a8860c42580852140a@o942895.ingest.sentry.io/5891750',
  sentryEnv: 'dev'
};
