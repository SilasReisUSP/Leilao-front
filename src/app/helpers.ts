export const getUser = () => {
  const user = localStorage.getItem('usuario');
  if (user) return JSON.parse(user);
  return {};
}