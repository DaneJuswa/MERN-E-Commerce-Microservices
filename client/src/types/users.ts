export type user = {
    id: number,
    name: string,
    email: string,
    password: string,
    phone: string,
    address: {
        street: string, 
        city: string,
        province: string,
        zipCode: string
    }, 
    role: "customer" | "seller" | "admin",
    createdAt: Date,
    updatedAt: Date,

}