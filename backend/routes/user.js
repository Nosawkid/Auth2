import express from 'express'
import { verfiyToken, verifyRole } from '../middleware/authMiddleware.js'
import { deleteUser, getProfile, getUsers } from '../controllers/userController.js'
const router = express.Router()


router.get("/", verfiyToken, verifyRole("admin"), getUsers)
router.delete("/:id", verfiyToken, verifyRole("admin"), deleteUser)
router.get("/me", verfiyToken, getProfile)





export default router