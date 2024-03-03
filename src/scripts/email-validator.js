const VALID_EMAIL_ENDINGS = ['gmail.com', 'outlook.com', 'yandex.ru'];

export default function validate(email) {
  const emailEnd = email.split('@')[1];
  return VALID_EMAIL_ENDINGS.includes(emailEnd);
}
