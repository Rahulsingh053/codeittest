export function signupapi(values) {
  if (localStorage.getItem(values.email) === null) {
    localStorage.setItem(values.email, JSON.stringify(values));
    return { sucsess: true };
  } else return { error: "email already registered" };
}
export function signinapi(values) {
  const data = JSON.parse(localStorage.getItem(values.email));
  if (data?.password === values.password) return { sucsess: true, data };
  else return { error: "Invalid Username or password" };
}
export function deleteuserapi(email) {
  localStorage.removeItem(email)
}
