import { useParams } from "react-router"
import useFetch from './useFetch'
import { useHistory } from "react-router";

const BlogDetails = () => {
    const {id} = useParams();
    const { data: blog, isPending, error } = useFetch('http://localhost:7000/blogs/' + id);
    const history = useHistory();

    const handleClick = () => {
        fetch('http://localhost:7000/blogs/' + blog.id, {
            method: 'DELETE',
        }).then(() => {
            history.push('');
        })
    }

    return (
        <div className="blog-details">
            {isPending && <div>Loading</div>}
            {error && <div>Error</div>}
            {blog && (
                <article>
                    <h2>{ blog.title }</h2>
                    <p>{'written by ' + blog.author}</p>
                    <div>{blog.body}</div>
                    <button onClick={handleClick}>delete</button>
                </article>
            )}
        </div>
    )
}

export default BlogDetails
