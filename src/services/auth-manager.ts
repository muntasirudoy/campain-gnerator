export const authManager = {
  logout(path: string) {
    localStorage.clear()
    window.location.href = path 
  }
}
