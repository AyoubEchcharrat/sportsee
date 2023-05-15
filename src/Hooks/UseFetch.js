import { useEffect, useState } from "react";

function UseFetch(url) {
    console.log(url)
    const [data, setData] = useState([])
    useEffect(() => {
        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
            .then(resp => resp.json())
            .then(items => { setData(items) })
    }, [url])
    console.log(data)
    return data
}

export default UseFetch