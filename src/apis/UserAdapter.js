const USER_URL = "http://localhost:4000/api/v1/users"

export default class UserAdapter{
  static createUser(username, password) {
    return fetch(`${USER_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(r => r.json())
    .then(json => json)
  }
  static getUsers() {
    return fetch(`${USER_URL}`)
    .then(r=>r.json())
    .then(json => json)
  }
}
