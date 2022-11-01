import { ReactNode } from "react"
import { ApiContext } from "../context/ApiContext"
import { useApi } from "../hooks/ApiHook";

interface Props{
    children: ReactNode | ReactNode[]
}

export function ApiProvider({children}: Props){

    const locationApi = useApi("/api/location");
  const containerApi = useApi("/api/container");

    return <ApiContext.Provider value={{locationApi, containerApi} }>{children}</ApiContext.Provider>
}