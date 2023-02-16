export const enum AuthErrorMessages {
  INVALID_CREDENTIALS = 'Invalid Credentials',
  CANNOT_CREATE_USER = 'Cannot create user',
  CANNOT_CREATE_ADMIN = 'Cannot create admin',
  CANNOT_LOG_IN = 'Cannot Login',
  INVALID_ROLE = 'Invalid Role',
  EMAIL_ALREADY_EXITS = 'This email is already exists',
  INVALID_TOKEN = 'Invalid token',
  TOKEN_TIME_EXPIRED = 'Token time expired',
  PASSWORD_RESET_FAILED = 'Password reset failed',
}

export const enum AuthSuccessMessages {
  USER_SIGN_UP_SUCCESSFULLY = 'User signup successful',
  ADMIN_SIGN_UP_SUCCESSFULLY = 'Admin signup successful',
  PASSWORD_RESET_SUCCESSFUL = 'Password reset successful',
}

export const enum UserErrorMessages {
  CANNOT_FIND_USER = 'Can not find this user',
  CANNOT_UPDATE_USER = 'Cannot update user',
  CANNOT_UPDATE_PASSWORD = 'Cannot update password',
  CANNOT_DELETE_USER = 'Can not delete user',
  // change password
  CURRENT_PASSWORD_IS_INCORRECT = 'Current password is incorrect',
  PASSWORD_CHANGED_FAILED = 'Failed to change password',
}

export const enum UserSuccessMessages {
  PASSWORD_CHANGED_SUCCESSFUL = 'Password changed Successful',
  USER_DELETED_SUCCESSFUL = 'User deleted Successful',
}

export const enum ConfigurationThresholdErrorMessages {
  CANNOT_UPDATE_CONFIGURATION_THRESHOLD = 'Cannot update configuration threshold values',
  CANNOT_FIND_CONFIGURATION_THRESHOLD = 'Cannot find configuration threshold values',
}

export const enum NIDValidatorErrorMessages {
  UNSUPPORTED_FILE = 'Unsupported File',
}

export const enum LoggerResponseErrorMessages {
  INCORRECT_DATE_RANGE = 'Incorrect date range',
}
