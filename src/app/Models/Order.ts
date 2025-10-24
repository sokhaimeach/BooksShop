export interface Order{
    id: string,
    orderDate: string,
    total: number,
    userName: string,
    orderListInfo: List[]
}
export interface List{
    id: string,
    title: string,
    price: number,
    quantity: number
}