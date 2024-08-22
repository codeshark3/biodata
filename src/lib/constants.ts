// export const APP_TITLE = "Acme";
// export const DATABASE_PREFIX = "acme";
// export const EMAIL_SENDER = '"Acme" <noreply@acme.com>';

export enum Paths {
  //   Home = "/",
  Login = "/auth/login",
  Signup = "/signup",
  Dashboard = "/",

  Projects = "/projects",
  NewProject = "/projects/new",
  Project = "/projects/:id",

  Samples = "/samples",
  Sample = "/samples/:id",
  SamplesCreate = "/samples/create",

  NewSubmission = "/samples/submissions",

  Profile = "/profile",
  Settings = "/settings",
  VerifyEmail = "/verify-email",
  ResetPassword = "/reset-password",
}
//   Sample = "/samples/:id",

//   Profile = "/profile",
//   Settings = "/settings",
//   VerifyEmail = "/verify-email",
//   ResetPassword = "/reset-password",

export const GenderOptions = ["Male", "Female", "Other"];
