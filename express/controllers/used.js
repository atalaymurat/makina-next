module.exports = {
  index: async (req, res) => {
    console.log('Controller machines index')
  },
  show: async (req, res) => {
    console.log('Controller machines show')
  },
  create: async (req, res) => {
    const sessionUser = req.session.get('user')
    if (!sessionUser) return res.status(403)
    console.log('Controller machines create')
  },
  edit: async (req, res) => {
    const sessionUser = req.session.get('user')
    if (!sessionUser) return res.status(403)
    console.log('Controller machines edit')
  },
  update: async (req, res) => {
    const sessionUser = req.session.get('user')
    if (!sessionUser) return res.status(403)
    console.log('Controller machines update')
  },
  destroy: async (req, res) => {
    const sessionUser = req.session.get('user')
    if (!sessionUser) return res.status(403)
    console.log('Controller machines destroy')
  },
}
