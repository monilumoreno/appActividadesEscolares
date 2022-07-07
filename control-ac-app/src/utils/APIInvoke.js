import config from '../config'

class APIInvoke {
    async invokeGET(resource, queryParams) {

        queryParams = queryParams || []
        const queryString = queryParams.reduce((last, q, i) => last + `${i === 0 ? '?' : "&"}${q}`, '')
        
        const token = localStorage.getItem('token');
        let bearer = "";

        if (token !== "") {
            bearer = `Bearer ${token}`;
        }

        const data = {
            method: 'GET',
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json'
            }

        }
        const url = `${config.api.baseURL}${resource}${queryString}`

        try {
            let response = (await (await fetch(url, data)).json())
            return response
        } catch (err) {
            console.log('Error: ', err)
        }
    }

    async invokePUT(resource, body) {
        const token = localStorage.getItem('token');
        let bearer = "";

        if (token !== "") {
            bearer = `Bearer ${token}`;
        }

        const data = {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: { 
                'Authorization': bearer,
                'Content-Type': 'application/json' 
            }
        }
        const url = `${config.api.baseURL}${resource}`        
        
        try {
            let response = (await (await fetch(url, data)).json())
            return response
        } catch (err) {
            console.log('Error: ', err)
        }       
    }

    async invokePOST(resource, body) {
        
        const token = localStorage.getItem('token');
        let bearer = "";

        if (token !== "") {
            bearer = `Bearer ${token}`;
        }
        
        const data = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 
                'Authorization': bearer,
                'Content-Type': 'application/json'                 
            }
        }
        const url = `${config.api.baseURL}${resource}`
        let response = (await (await fetch(url, data)).json())
        return response
    }

    async invokeDELETE(resource) {
        const token = localStorage.getItem('token');
        let bearer = "";

        if (token !== "") {
            bearer = `Bearer ${token}`;
        }

        const data = {
            method: 'DELETE',
            headers: { 
                'Authorization': bearer,
                'Content-Type': 'application/json' 
            }
        }
        const url = `${config.api.baseURL}${resource}`
        let response = (await (await fetch(url, data)).json())
        return response
    }
}

export default new APIInvoke()