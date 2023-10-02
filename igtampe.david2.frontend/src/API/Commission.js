import { ItemCreate, ItemDelete, ItemGet, ItemUpdate, ItemsGet } from "./CrudAPI";
import { APIURL, GeneratePut } from "./common";

const api = "Commission"

export function CommissionsGet(setLoading, Session, setItem, onError) { ItemsGet(setLoading, Session, setItem, onError, api); }
export function CommissionGet(setLoading, Session, id, setItem, onError) { ItemGet(setLoading, Session, id, setItem, onError, api) }
export function CommissionCreate(setLoading, Session, item, onSuccess, onError) { ItemCreate(setLoading, Session, item, onSuccess, onError, api) }
export function CommissionUpdate(setLoading, Session, id, item, onSuccess, onError) { ItemUpdate(setLoading, Session, id, item, onSuccess, onError, api) }
export function CommissionDelete(setLoading, Session, id, onSuccess, onError) { ItemDelete(setLoading, Session, id, onSuccess, onError, api) }

export function CommissionsByArtist(setLoading, Session, id, setItem, onError) {ItemGet(setLoading,Session,id,setItem,onError,`${api}/Artist`)}
export function CommissionsByCharacter(setLoading, Session, id, setItem, onError) {ItemGet(setLoading,Session,id,setItem,onError,`${api}/Character`)}
export function CommissionsByTag(setLoading, Session, id, setItem, onError) {ItemGet(setLoading,Session,id,setItem,onError,`${api}/Tag`)}

export function CommissionUpdateState(setLoading, Session, id, status, onSuccess, onError){
    ReusablePut(setLoading, Session, `${APIURL}/API/${api}/${id}/status/${status}`, onSuccess, onError)
}

export function CommissionPaid(setLoading, Session, id, onSuccess, onError){
    ReusablePut(setLoading, Session, `${APIURL}/API/${api}/${id}/paid`, onSuccess, onError)
}

export function CommissionFinished(setLoading, Session, id, onSuccess, onError){
    ReusablePut(setLoading, Session, `${APIURL}/API/${api}/${id}/finish`, onSuccess, onError)
}


function ReusablePut(setLoading, Session, url, onSuccess, onError){
    setLoading(true);
    fetch(url, GeneratePut(Session,item))
    .then(response => response.json()).then(data => {
        if (data.Error) {
            onError(data)
            setLoading(false)
            return;
        }
        onSuccess(data)
        setLoading(false)
    })
}
