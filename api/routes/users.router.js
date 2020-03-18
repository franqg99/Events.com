const router = require('express').Router()
const { authUser } = require('../utils')

const {
  //getAllUsers,
  getUserById,
  deleteUserById,
  updateUser,
  //addFavSupById,
  //getFavSupById,
  //deleteFavSupById,
  //addCommentToFavSup

} = require('../controllers/users.controller')

//router.get('/', getAllUsers)
router.get('/:userId', getUserById)
router.delete('/:userId', deleteUserById)
router.put('/userId', updateUser)
//router.post('/:userId/:fav_supId', authUser, addFavSupById)
//router.get('/:userId/:fav_supId', authUser, getFavSupById)
//router.delete('/:userId/:fav_supId', authUser, deleteFavSupById)
//router.post('/:userId/:fav_supId/comments', authUser, addCommentToFavSup)


module.exports = router
