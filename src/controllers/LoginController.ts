import { genJwe } from '@utils/Jwt'

export = async (req, res) => {
  const { username, chatId } = req.body

  if (!req.body.username || !req.body.password) {
    res.json({
      success: false
    })
  }

  genJwe({ username, chatId }).then(jwe => {
    res.json({
      success: true,
      auth_token: 'test'
    })
  })
}
