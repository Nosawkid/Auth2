import User from "../models/User.js";

export const getUsers = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit
    const total = await User.countDocuments()
    const users = await User.find().skip(skip).limit(limit).select("-password")
    return res.status(200).json({ users, total, totalPages: Math.ceil(total / limit), currentPage: page })
}


export const deleteUser = async (req, res) => {
    console.log("Deletion request received")
    const user = await User.findById(req.params.id)
    if (!user) return res.status(400).json({ message: "No user found" })
    if (user.role === 'admin') {
        return res.status(401).json({ message: "Cannot Delete admin users" })
    }
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "User was deleted successfully" })
}


export const getProfile = async (req, res) => {
    const user = await User.findById(req.user.id).select("-password")
    if (!user) return res.status(404).json({ message: "User not found" })
    res.status(200).json(user)
}