export default function useFetch(endPoint, q) {
  return fetch(`/api/${endPoint}`, {
    body: JSON.stringify({ q }),
    method: "POST",
  })
    .then((res) => res.json())
    .then((data) => data);
}