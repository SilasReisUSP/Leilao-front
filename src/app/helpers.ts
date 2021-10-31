//Constante utilizada para buscar valores do usuario que sao armazenadas no localStorage
export const getUser = () => {
  const user = localStorage.getItem('usuario');
  if (user) return JSON.parse(user);
  return {};
}