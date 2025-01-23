import useAsync from "./useAsync"

export default function useFetch(promiseFunc, dependencies = []) {
  return useAsync(() => {
    return promiseFunc.then(res => {
      return Promise.resolve(res)
    }).catch((error) => {
      console.error("Error fetching todos:", error)
      return Promise.reject(error)
    })
  }, dependencies)
}
