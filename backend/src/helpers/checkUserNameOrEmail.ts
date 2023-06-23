function isValidUsernameOrEmail(input) {
  const Regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (Regex.test(input)) {
    return 'Email';
  } else {
    return 'Username';
  }
}

export default isValidUsernameOrEmail;
