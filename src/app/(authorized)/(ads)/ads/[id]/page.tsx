"use client";
import CardDetails from "@/components/card-details"
import { AdStatus, IAdItem } from "@/types/ad-item";
import { IApiResponse } from "@/types/api-response";
import { useParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from "react";
import IFormInput, { FormValidator } from '@/form-validator';
import { ICreateAdResponse } from "@/types/create-ad-response";
import { IJWTPayload, UserRole } from "@/types/jwt-payload";

const EditAdPage = () => {
    const params = useParams<{ id: string }>();
    const [me, setMe] = useState<IJWTPayload>();
    const [adItem, setAdItem] = useState<IAdItem>();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const validations: IFormInput[] = [
        {
            name: 'title',
            validate: val => val && (val as string).length > 3 && (val as string).length < 64,
            error: 'Title is not valid',
            onerror: err => setError(err)
        },
        {
            name: 'category',
            validate: val => val && (val as string).length > 3 && (val as string).length < 64,
            error: 'Category is not valid',
            onerror: err => setError(err)
        },
        {
            name: 'subcategory',
            validate: val => val && (val as string).length > 3 && (val as string).length < 64,
            error: 'Subcategory is not valid',
            onerror: err => setError(err)
        },
        {
            name: 'price',
            validate: val => val > 0,
            error: 'Price is not valid',
            onerror: err => setError(err)
        },
        {
            name: 'currency',
            validate: val => /^[A-Z]{3}$/.test(val),
            error: 'Currency is not valid',
            onerror: err => setError(err)
        },
        {
            name: 'country',
            validate: val => /^[a-zA-Z]{3,64}$/.test(val),
            error: 'Country is not valid',
            onerror: err => setError(err)
        },
        {
            name: 'city',
            validate: val => /^[a-zA-Z]{3,64}$/.test(val),
            error: 'City is not valid',
            onerror: err => setError(err)
        },
        {
            name: 'description',
            validate: val => val && (val as string).length > 3 && (val as string).length < 500,
            error: 'Description is not valid',
            onerror: err => setError(err)
        }
    ];
    const fetchAd = async (id: string) => {
        await fetch(`/api/ads/${id}`)
         .then(async res => {
            const result = await res.json() as IApiResponse<IAdItem>;
            if(res.status !== 200){
                setError(result.message);
                return;
            }
            setAdItem(result.data);
         })
    }

    const onsubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        if(!FormValidator.validate(formData, validations))
            return;
        const data = {
            title: formData.get('title'), 
            description: formData.get('description'),
            category: formData.get('category'),
            subcategory: formData.get('subcategory'),
            price: formData.get('price'),
            currency: formData.get('currency'),
            country: formData.get('country'),
            city: formData.get('city')
        };
        await fetch(`/api/ads${adItem?._id ? `/${adItem._id}` : ''}`, {
            method: adItem?._id ? 'PUT' : 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async res => {
            const result = await res.json() as IApiResponse<ICreateAdResponse>;
            if(res.status !== 200){
                setError(result.message);
                return;
            }
            setError("");
            setSuccess("Saved successfully!");
        })
    }
    const ondelete = async () => {
        await fetch(`/api/ads/${params.id}`, {
            method: 'DELETE'
        }).then(async res => {
            const result = await res.json() as IApiResponse<any>;
            if(res.status !== 200){
                setError(result.message);
                return;
            }
            setError("");
            setSuccess("Deleted successfully!");
        })
    }

    const onapprove = async () => {
        await fetch(`/api/ads/${params.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ status: AdStatus.Approved })
        }).then(async res => {
            const result = await res.json() as IApiResponse<any>;
            if(res.status !== 200){
                setError(result.message);
                return;
            }
            setError("");
            setSuccess("Approved successfully!");
            fetchAd(params.id);
        })
    }

    const onreject = async () => {
        await fetch(`/api/ads/${params.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ status: AdStatus.Rejected })
        }).then(async res => {
            const result = await res.json() as IApiResponse<any>;
            if(res.status !== 200){
                setError(result.message);
                return;
            }
            setError("");
            setSuccess("Rejected successfully!");
            fetchAd(params.id);
        })
    }
    useEffect(() => {
        if(params.id && /^[0-9a-fA-F]{24}$/.test(params.id))
            fetchAd(params.id);
        const me = localStorage.getItem('me');
        if(me)
            setMe(JSON.parse(me));
    }, [params]);
    return(
        <section className="bg-white dark:bg-gray-900">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">Ad Details</h2>
            <CardDetails ad={adItem} onsubmit={onsubmit} ondelete={ondelete} onaprove={onapprove} onreject={onreject} success={success} error={error} isadmin={me?.role === UserRole.ADMIN} />
        </section>
    );
}
export default EditAdPage;