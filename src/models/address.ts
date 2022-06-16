export interface Address{ 
    id?: number,
    street: string,
    city_id: number,
    house_number: string,
    country?: string, // Only belgium
}

export interface ICityPostCode {
    postal_code: string,
    city_name: string
}