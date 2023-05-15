import user12activity from '../MockedDatas/data-user-12-activity.json'
import user12averagesession from '../MockedDatas/data-user-12-average-sessions.json'
import user12performance from '../MockedDatas/data-user-12-performance.json'
//import user12 from '../MockedDatas/data-user-12.json'
import user18activity from '../MockedDatas/data-user-18-activity.json'
import user18averagesession from '../MockedDatas/data-user-18-average-sessions.json'
import user18performance from '../MockedDatas/data-user-18-performance.json'
//import user18 from '../MockedDatas/data-user-18.json'


export const APIcall = (id, endpoint) => {
    const data = fetch(`http://localhost:9000/user/${id}/${endpoint}`)
        .then((resp) => {
            if (!resp.ok) {
                throw new Error(
                    'An error occure in the fetch method: ',
                    resp.status)
            }
            return resp
        })
        .then(resp => {
            return resp.json()
        })
    return data
}

//fonction pour call des mocked datas
export const mockedCall = (id, endpoint) => {
    let mockedData
    if (id === 12) {
        if (endpoint === 'activity') {
            mockedData = user12activity
        }
        if (endpoint === 'average-sessions') {
            mockedData = user12averagesession
        }
        if (endpoint === 'performance') {
            mockedData = user12performance
        }
        if (endpoint === '') {
            //mockedData = user12
        }
    } else if (id === 18) {
        if (endpoint === 'activity') {
            mockedData = user18activity
        }
        if (endpoint === 'average-sessions') {
            mockedData = user18averagesession
        }
        if (endpoint === 'performance') {
            mockedData = user18performance
        }
        if (endpoint === '') {
            //mockedData = user18
        }
    } else {
        mockedData = false
    }
    return mockedData
}
