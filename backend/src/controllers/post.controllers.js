import Post from "../models/Post.js"

// CREATE POST
export const createPost = async (req, res, next) => {
    try {
        const { title, content } = req.body;

        if (!title || !content){
            return res.status(400).json({
                message: "Title and content are required!"
            })
        }

        const post = await Post.create({
            title,
            content,
            author: req.user.userId
        });

        res.status(201).json(post);
    } catch (error) {
        next(error);
    }
}

// FETCH ALL POST
export const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find({ published: true }).populate("author", "username").sort({ createdAt: -1 });
        res.json(posts);
    } catch(error) {
        next(error);
    }
}

// FETCH SINGLE POST
export const getPostById = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id).populate("author", "username");

        if (!post) { return res.status(404).json({ message: "Post not found!" }); }
        res.json(post);
    } catch(error) {
        next(error);
    }
}

// UPDATE POST
export const updatePost = async (req, res, next) => {
  try {
    const { title, content, published } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    if (title) post.title = title;
    if (content) post.content = content;
    if (published !== undefined) post.published = published;

    await post.save();

    res.json(post);
  } catch (error) {
    next(error);
}
}

// DELETE POST
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await post.deleteOne();

    res.json({ message: "Post deleted" });
  } catch (error) {
    next(error);
  }
};

