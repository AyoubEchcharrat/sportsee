import UseFetch from "../hooks/UseFetch";


/*
* Fonction Loader de react router */
export const dataLoader = async ({ params }) => {
    const res = await fetch(getUserURL(params.id, ''), { headers: { 'Content-Type': 'application/json', Accept: 'application/json' } })
    if (!res.ok) {
        return Promise.reject(new Error("La page n'est pas disponible"))
    }
    const data = await res.json();
    return { data };
}

export function getUserURL(id, endpoint) {
    let getUrl;
    if (process.env.NODE_ENV === "development") {
        if (endpoint) {
            endpoint = '-' + endpoint
        }
        getUrl = "/users/data-user-" + id + endpoint + ".json";
        console.log(getUrl)
        return getUrl
    } else if (process.env.NODE_ENV === "production") {
        getUrl = "http://localhost:9000/user/" + id + '/' + endpoint
        console.log(getUrl)
    }
    return getUrl;
}

/*
* Création d'une classe de modélisation des données,
* renvoyant les données formatées. */
export class DataModelization {
    constructor(url) {
        this.url = url
    }

    getUsername() {
        const response = UseFetch(this.url)
        const user = response.data?.userInfos.firstName;
        return user
    }

    getActivity() {
        const response = UseFetch(this.url)
        const activity = response?.data ? response.data : {}
        return activity
    }

    getAverageSessions() {
        const response = UseFetch(this.url)
        const averageSessions = response?.data?.sessions ? response.data.sessions : {}
        return averageSessions
    }

    getPerformance() {
        const response = UseFetch(this.url)
        const mapOfKinds = response ? response.data?.kind : {}
        if (!mapOfKinds || Object.keys(mapOfKinds).length === 0) {
            return []
        }
        let nameOfEachData = Object.values(mapOfKinds)?.map(name => {
            if (name === 'intensity') {
                name = 'Intensité'
            }
            if (name === 'cardio') {
                name = 'Cardio'
            }
            if (name === 'speed') {
                name = 'Vitesse'
            }
            if (name === 'strength') {
                name = 'Force'
            }
            if (name === 'endurence') {
                name = 'Endurence'
            }
            if (name === 'energy') {
                name = 'Énergie'
            }
            return name
        })
        const performance = response.data?.data.map((value, index) => {
            return { 'value': value.value, 'kind': nameOfEachData[index] }
        }, [])
        return performance
    }

    getScore() {
        const response = UseFetch(this.url)
        const score = response.data?.todayScore ?
            response.data?.todayScore * 100 : response.data?.score * 100
        return score
    }

    getNutrients() {
        const response = UseFetch(this.url)
        const nutrients = response?.data
        return nutrients
    }
}