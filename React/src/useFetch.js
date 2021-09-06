import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const abortCont = new AbortController();

        setTimeout(() => {
            fetch(url, { signal: abortCont.signal })
            .then(res => {
                if (!res.ok) {
                    throw new Error('could not fetch a data')
                }
                return res.json()
            })
            .then(data => {
                setError(false);
                setData(data);
                setIsPending(false);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('aborted')
                } else {
                    setError(true);
                    setIsPending(false);
                }
            }) 
        }, 0)
        return () => abortCont.abort();
    }, [url])

    return {data, isPending, error};
}

export default useFetch
