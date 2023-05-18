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
                return '404'
            })
            .then(items => { setData(items) })
            .catch(function () {
                console.log("error");
            });
    }, [url])
    console.log(data)
    return data
}

export default UseFetch