export default function useLocalStorage() {
  const getValue = (key) => JSON.parse(localStorage.getItem(key))
  const setValue = ({ key, value }) =>
    localStorage.setItem(key, JSON.stringify(value))
  const removeValue = (key) => localStorage.removeItem(key)

  return { getValue, setValue, removeValue }
}
