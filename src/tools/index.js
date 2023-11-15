// Validates authentication credentials
export const validateCredentials = (email, password) => {
  const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const validPassword = password.length >= 8;

  if (!validEmail && !validPassword) {
    return 'Enter a valid email and password of at least 8 characters';
  }

  if (!validEmail) {
    return 'Enter a valid email';
  }

  if (!validPassword) {
    return 'Your password must have at least 8 characters';
  }

  return '';
};
