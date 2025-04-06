import axios from 'axios';

//const  BASE_URL = 'http://localhost:5000/api/entity';
const BASE_URL = 'https://realmapagent.onrender.com/api/entity' ;

interface Entity {
    _id: string;
    name: string;
    location: string;
    totalSqftAvailable: number;
    pricePerSqft: number;
    totalPrice: number;
    threeYear: number;
    fiveYear: number;
    sevenYear: number;
}


export const fetchEntities = () => axios.get(BASE_URL);
export const createEntity = (data: Omit<Entity, '_id'>) => axios.post(BASE_URL, data);
export const updateEntity = (id: string, data: Omit<Entity, '_id'>) => axios.put(`${BASE_URL}/${id}`, data);
export const deleteEntity = (id: string) => axios.delete(`${BASE_URL}/${id}`);
