class ErrorMessage {
  static InvlidToken = "Access denied. Invalid token.";
  static NoToken = "Access denied. No token provided.";
  static SyntaxError = "Error executing SQL query";
  static MissMatch = "Password Missmatch Error";
  static Error = "Password Incorrect";
  static NoEmailExist = "No email existed";
  static HashError = "Error hashing password";
  static UserNotFound = "User not found";
}

module.exports = ErrorMessage;
