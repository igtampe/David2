import { ItemDelete, ItemGet, ItemUpdate, ItemsGet } from "./CrudAPI";

const api = "Tag"

export function TagsGet(setLoading, Session, setItem, onError) { ItemsGet(setLoading, Session, setItem, onError, api); }
export function TagGet(setLoading, Session, id, setItem, onError) { ItemGet(setLoading, Session, id, setItem, onError, api) }
export function TagCreate(setLoading, Session, item, onSuccess, onError) { ItemCreate(setLoading, Session, item, onSuccess, onError, api) }
export function TagUpdate(setLoading, Session, id, item, onSuccess, onError) { ItemUpdate(setLoading, Session, id, item, onSuccess, onError, api) }
export function TagDelete(setLoading, Session, id, onSuccess, onError) { ItemDelete(setLoading, Session, id, onSuccess, onError, api) }
