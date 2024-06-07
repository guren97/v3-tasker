const validatePassword = (password) => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
  if (password.toString().length < 6) {
    return "Password must be 6 characters";
  }
  if (!passwordRegex.test(password)) {
    return "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
  }
  return null; // Password is valid
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Invalid email address";
  }
};

export { validatePassword, validateEmail };
