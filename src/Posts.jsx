import Post from "./Post";
import { getAll } from "./utils"
import { useEffect, useState } from "react"
import AddPost from "./AddPost";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

export default function Posts({ id }) {

  const [allPosts, setAllPosts] = useState([]);
  const [isAddPost, setIsAddPost] = useState(false);

  useEffect(() => {
    async function fetchData() {
      let { data } = await getAll(POSTS_URL);
      setAllPosts(data)
    }
    fetchData();

  }, [])

  const posts = allPosts.filter((post) => {
    return post.userId === id;
  })

  const handleAddPost = () => {
    setIsAddPost(true)
  }
  const cancleAddPostCallback = (childValue) => {
    setIsAddPost(childValue)
  }

  const addPostCallback = (postData) => {
    const newPost = {
      ...postData,
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      userId: id
    }
    setAllPosts([...allPosts, newPost])
    alert(`New post ${postData.title} added`)
    setIsAddPost(false)
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
        <b>Posts - User {id} </b>
        <button style={{ marginLeft: 'auto', marginBottom: '5px' }} onClick={handleAddPost}>Add</button>
      </div>
      <div style={{ border: "1px solid black" }}>
        {
          isAddPost ? (<AddPost cancleAddPostCallback={cancleAddPostCallback} addPostCallback={addPostCallback} />)
            :
            posts.map((post) => <Post key={post.id} post={post} />)
        }
      </div>
    </>
  )
}  