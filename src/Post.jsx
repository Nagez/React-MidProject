export default function Post({ post }) {
    return (
        <div style={{ border: "1px solid purple", padding: "10px", margin: "15px 10px", overflow: 'hidden' }}>
            <p><b>Title:</b> {post.title}</p>
            <p><b>Body:</b>{post.body}</p>
        </div>
    )
}