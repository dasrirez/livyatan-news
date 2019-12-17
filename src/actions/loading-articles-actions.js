export const LOADING = 'loadingArticles:loading'
export const NOT_LOADING = 'loadingArticles:notLoading'

export const loading = () => {
  return {
    type: LOADING
  }
}

export const notLoading = () => {
  return {
    type: NOT_LOADING
  }
}