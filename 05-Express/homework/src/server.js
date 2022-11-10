// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests

server.get('/',(req, res)=>{
    res.json(posts)
})

server.post('/posts', (req,res)=>{
    const {author, title , contents} = req.body
    if (!author||!title||!contents) return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"})
    const newPost = {
        id: posts.length + 1,
        author,
        title,
        contents
    }
    posts.push(newPost)
    res.json(newPost)
})

server.post('/posts/author/:author',(req,res)=>{
    const {title , contents} = req.body;
    const {author} = req.params;
    if (!author||!title||!contents) return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"})
    const newPost = {
        id: posts.length + 1,
        author,
        title,
        contents
    }
    posts.push(newPost)
    res.json(newPost)
})

server.get('/posts',(req,res)=>{
    const {term}=req.query;
    if(!term)return res.json(posts);
    const filteredPosts = posts.filter(p => p.title.includes(term)||p.contents.includes(term))
    res.json(filteredPosts)
})

server.get('/posts/:author',(req,res)=>{
    const {author} = req.params;
    const postByAuthor = posts.filter(p => p.author === author);
    if(!postByAuthor.length) return res.status(STATUS_USER_ERROR).json({error: "No existe ningun post del autor indicado"}) 
    res.json(postByAuthor)
})

module.exports = { posts, server };
