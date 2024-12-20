import Post from '../models/Post.js'

export const getAllPosts = async (req, res) => {
    const posts = await Post.find().populate('user_id', '-password')
    return res.json(posts)
}

export const createPost = async (req, res) => {
    const {title, author, content} = req.body
    const user_id = req.user
    try {
        const newPost = await new Post({ title, author, content, user_id })
        newPost.save()
        return res.status(201).json(newPost)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur lors de la création du post' });
    }

}