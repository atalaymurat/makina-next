const auth = require('../controllers/auth')

test("Auth signUp Function" , () => {
  expect(auth.signUp({body: {email: "xx@xx.com" }}, res).toEqual({
message: 'Session Saved'
  }))
})