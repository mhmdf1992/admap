export interface IAdItem{
    _id: string;
    title: string;
    description: string;
    location: string;
    price: number;
    currency: string;
    category: string;
    subcategory: string;
    status: AdStatus;
    parent_ad?: string;
    created_on: Date;
    updated_on?: Date;
}
export enum AdStatus{
    Pending = 0,
    Approved = 1,
    Regected = 2
}