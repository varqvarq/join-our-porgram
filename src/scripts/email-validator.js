const VALID_EMAIL_ENDINGS = ['gmail.com', 'outlook.com', 'yandex.ru'];

export const validate = function(email) {
  const emailEnd = email.split('@')[1];
  return VALID_EMAIL_ENDINGS.includes(emailEnd);
}

export const validateAsync = function(email) {
  return new Promise(resolve => {
    resolve(validate(email));
  })
}

export const validateWithThrow = function(email) {
  const isValid = validate(email);

  if (!isValid) {
    throw new Error("Email is not valid");
  }
  return true;
}

export const validateWithLog = function(email) {
  const isValid = validate(email);
  console.log(isValid);
  return isValid;
}


