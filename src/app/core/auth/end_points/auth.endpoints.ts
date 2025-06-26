export enum AuthEndPoints {
  Login = `api/v1/auth/signin`,
  Register = `api/v1/auth/signup`,
  ForgetPassword = `api/v1/auth/forgotPassword`,
  ResetPassword = `api/v1/auth/resetPassword`,
  DeleteAcc = `api/v1/auth/deleteMe`,
  VerifyCode = `api/v1/auth/verifyResetCode`,
  GetLoggedUserData = `api/v1/auth/profileData`,
  EditProfile = `api/v1/auth/editProfile`,
  ChangePassword = `api/v1/auth/changePassword`,
  Logout = `api/v1/auth/logout`,
}
