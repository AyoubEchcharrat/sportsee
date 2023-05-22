import { useEffect, useState } from "react";

function UseFetch(url) {
    console.log(url)
    const [data, setData] = useState([])
    useEffect(() => {
        fetch(url, { headers: { 'Content-Type': 'application/json', Accept: 'application/json' } })
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                }
                throw Error("Cette page n'existe pas")
            })
            .then(items => { setData(items) })
            .catch(function () {
                throw Error("Cette page n'existe pas")
            });
    }, [url])
    console.log(data)
    return data
}

export default UseFetch