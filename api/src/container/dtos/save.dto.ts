import {LocationEntity} from "../../location/location.entity";

interface SaveDto{
    id?: number
    name: string
    tags: string
    code: string
    location: LocationEntity
}