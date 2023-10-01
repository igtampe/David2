import { GenerateGet, APIURL, GenerateJSONPost, GenerateJSONPut, GenerateDelete } from "./common";

export function ItemsGet(setLoading, Session, setItem, onError, api) {
    setLoading(true);
    fetch(`${APIURL}/API/${api}`, GenerateGet(Session))
        .then(response => response.json()).then(data => {
            if (data.error) {
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
        .then(response => response.json()).then(data => {
            if (data.error) {
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
        .then(response => response.json()).then(data => {
            if (data.error) {
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
        .then(response => response.json()).then(data => {
            if (data.error) {
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
        .then(response => response.json()).then(data => {
            if (data.error) {
                onError(data)
                setLoading(false)
                return;
            }
            onSuccess(data)
            setLoading(false)
        })
}
