import qs from 'query-string';
interface UrlQueryParams {
    params: string,
    key: string,
    value: string | null
}

interface RemoveUrlQueryParams {
    params: string,
    keyToRemove: string[]
}

export const formUrlQuery = ({params, key, value}: UrlQueryParams) => {
    const queryString = qs.parse(params)

    queryString[key] = value

    return qs.stringifyUrl({
        url: window.location.pathname,
        query: queryString
    })
}

export const removeKeysFromQuery = ({params, keyToRemove}: RemoveUrlQueryParams) => {
    const queryString = qs.parse(params)

    keyToRemove.forEach((key) => {
        delete queryString[key]
    })
    return qs.stringifyUrl({
        url: window.location.pathname,
        query: queryString
    }, {skipNull: false})
}