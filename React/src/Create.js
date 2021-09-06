import { useState } from "react";
import { useHistory } from "react-router";

const Create = () => {
    const [titleValue, setTitleValue] = useState('');
    const [bodyValue, setBodyValue] = useState('');
    const [authorValue, setAuthorValue] = useState('mario');
    const [sending, setSending] = useState(false);

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setSending(true);
        const blog = {
           title: titleValue,
           body: bodyValue,
           author: authorValue,
        }

        fetch('http://localhost:7000/blogs', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(blog),
        }).then(() => {
            setSending(false)
            // history.go(-1);
            history.push('/')
        })
        
        setTitleValue('');
        setBodyValue('');

    }

    return (
        <div className="create">
            <h2>Add new blog</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Blog title:</label>
                <input 
                value={titleValue}
                onChange={(e) => setTitleValue(e.target.value)}
                type="text" 
                required
                />

                <label>Blog body:</label>
                <textarea
                value={bodyValue}
                onChange={(e) => setBodyValue(e.target.value)}
                required
                >
                </textarea>

                <label>Blog author:</label>
                <select
                value={authorValue}
                onChange={(e) => setAuthorValue(e.target.value)}
                >
                    <option value="mario">Mario</option>
                    <option value="yoshi">Yoshi</option>
                </select>

                { !sending && <button>Add blog</button> }
                {sending && <button>Sending...</button>}
            </form>
        </div>
    )
}

export default Create
