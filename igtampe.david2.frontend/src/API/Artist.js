import { ItemCreate, ItemDelete, ItemGet, ItemUpdate, ItemsGet } from "./CrudAPI";

const api = "Artist"

export function ArtistsGet(setLoading, Session, setItem, onError) { ItemsGet(setLoading, Session, setItem, onError, api); }
export function ArtistGet(setLoading, Session, id, setItem, onError) { ItemGet(setLoading, Session, id, setItem, onError, api) }
export function ArtistCreate(setLoading, Session, item, onSuccess, onError) { ItemCreate(setLoading, Session, item, onSuccess, onError, api) }
export function ArtistUpdate(setLoading, Session, id, item, onSuccess, onError) { ItemUpdate(setLoading, Session, id, item, onSuccess, onError, api) }
export function ArtistDelete(setLoading, Session, id, onSuccess, onError) { ItemDelete(setLoading, Session, id, onSuccess, onError, api) }

