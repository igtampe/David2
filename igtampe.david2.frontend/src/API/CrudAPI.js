import { GenerateGet, APIURL, GenerateJSONPost, GenerateJSONPut, GenerateDelete } from "./common";

export function ItemsGet(setLoading, Session, setItem, onError, api) {
    setLoading(true);
    fetch(`${APIURL}/API/${api}`, GenerateGet(Session))
        .then(response =>{
            if(!response.ok){
                return {
                    "Error" : true,
                    "Reason" : `From Server: ${response.status}`,
                }
            }
            return response.json()
        }).then(data => {
            if (data.Error) {
                onError(data)
                setLoading(false)
                return;
            }
            setItem(data)
            setLoading(false)
        })
}

export function ItemGet(setLoading, Session, id, setItem, onError, api) {
    setLoading(true);
    fetch(`${APIURL}/API/${api}/${id}`, GenerateGet(Session))
        .then(response =>{
            if(!response.ok){
                return {
                    "Error" : true,
                    "Reason" : `From Server: ${response.status}`,
                }
            }
            return response.json()
        }).then(data => {
            if (data.Error) {
                onError(data)
                setLoading(false)
                return;
            }
            setItem(data)
            setLoading(false)
        })

}

export function ItemCreate(setLoading, Session, item, onSuccess, onError, api) {
    setLoading(true);
    fetch(`${APIURL}/API/${api}`, GenerateJSONPost(Session,item))
        .then(response => {
            if(!response.ok){
                return {
                    "Error" : true,
                    "Reason" : `From Server: ${response.status}`,
                }
            }
            return response.json()
        }).then(data => {
            if (data.Error) {
                onError(data)
                setLoading(false)
                return;
            }
            onSuccess(data)
            setLoading(false)
        })
}


export function ItemUpdate(setLoading, Session, id, item, onSuccess, onError, api) { 
    setLoading(true);
    fetch(`${APIURL}/API/${api}/${id}`, GenerateJSONPut(Session,item))
        .then(response => {
            if(!response.ok){
                return {
                    "Error" : true,
                    "Reason" : `From Server: ${response.status}`,
                }
            }
            return response.json()
        }).then(data => {
            if (data.Error) {
                onError(data)
                setLoading(false)
                return;
            }
            onSuccess(data)
            setLoading(false)
        })
}

export function ItemDelete(setLoading, Session, id, onSuccess, onError, api) { 
    setLoading(true);
    fetch(`${APIURL}/API/${api}/${id}`, GenerateDelete(Session))
        .then(response => {
            if(!response.ok){
                return {
                    "Error" : true,
                    "Reason" : `From Server: ${response.status}`,
                }
            }
            return response.json()
        }).then(data => {
            if (data.Error) {
                onError(data)
                setLoading(false)
                return;
            }
            onSuccess(data)
            setLoading(false)
        })
}
