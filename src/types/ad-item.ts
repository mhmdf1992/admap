export interface IAdItem{
    _id: string;
    title: string;
    description: string;
    country: string;
    city: string;
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
    Pending = 1,
    Approved = 2,
    Rejected = 3
}