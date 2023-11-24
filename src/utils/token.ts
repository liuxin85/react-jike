// 封装存取方法

const TOKENKEY = 'token_key'

function setToken(token: string) {
  return localStorage.setItem(TOKENKEY, token)
}

function getToken() {
  return localStorage.getItem(TOKENKEY)
}

function removeToken() {
  return localStorage.removeItem(TOKENKEY)
}

export { setToken, getToken, removeToken }
