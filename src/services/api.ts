import axios from 'axios';

//const API_URL = 'http://localhost:5000/api/entity';
const API_URL = 'https://realmapagent.onrender.com/api/entity' ;

interface Entity {
    _id: string;
    name: string;
    location: string;
    totalSqftAvailable: number;
    pricePerSqft: number;
}

export const fetchEntities = () => axios.get(API_URL);
export const createEntity = (data: Entity) => axios.post(API_URL, data);
export const updateEntity = (id: string, data: Entity) => axios.put(`${API_URL}/${id}`, data);
export const deleteEntity = (id: string) => axios.delete(`${API_URL}/${id}`);
