import { ItemDelete, ItemGet, ItemUpdate, ItemsGet } from "./CrudAPI";

const api = "Character"

export function CharsGet(setLoading, Session, setItem, onError) { ItemsGet(setLoading, Session, setItem, onError, api); }
export function CharGet(setLoading, Session, id, setItem, onError) { ItemGet(setLoading, Session, id, setItem, onError, api) }
export function CharCreate(setLoading, Session, item, onSuccess, onError) { ItemCreate(setLoading, Session, item, onSuccess, onError, api) }
export function CharUpdate(setLoading, Session, id, item, onSuccess, onError) { ItemUpdate(setLoading, Session, id, item, onSuccess, onError, api) }
export function CharDelete(setLoading, Session, id, onSuccess, onError) { ItemDelete(setLoading, Session, id, onSuccess, onError, api) }
