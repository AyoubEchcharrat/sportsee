import { useEffect, useState } from "react";

function UseFetch(url) {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch(url, { headers: { 'Content-Type': 'application/json', Accept: 'application/json' } })
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                }
            })
            .then(items => { setData(items) })
    }, [url])
    return data
}

export default UseFetch