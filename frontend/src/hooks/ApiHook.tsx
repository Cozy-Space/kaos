import {useContext, useEffect, useState} from "react";
import {ApiContext} from "../App";

export interface Api {data: any[], load: () => void, save: (row: any) => void, remove: (row: any) => void}

export function useApi(endpoint: string): Api{
    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        load()
    }, [])

    const load = async () => {
        await fetch(endpoint)
            .then(r => r.json())
            .then(setData)
    }

    const save = async (row: any) => {
        await fetch(endpoint, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(row)})
    }

    const remove = async (row: any) => {
        await fetch(endpoint, {method: 'DELETE', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({id: row.id})})
    }

    return {data, load, save, remove}
}

export function useLocationApi(): Api{
    return useContext(ApiContext).locationApi
}

export function useContainerApi(): Api{
    return useContext(ApiContext).containerApi
}