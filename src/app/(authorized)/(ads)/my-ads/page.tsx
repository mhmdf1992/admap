"use client";
import Card from "@/components/card";
import './page.css';
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IApiResponse } from "@/types/api-response";
import { IPagedList } from "@/types/paged-list";
import { IAdItem } from "@/types/ad-item";

export default function MyAdsPage() {
  const [adList, setAdList] = useState<IPagedList<IAdItem>>();
    const [page, setPage] = useState<number>(1);
    const [isfetching, setIsfetching] = useState<boolean>(false);
    const firstRender = useRef(true);
    const infiniteScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight){
        if(adList && adList.page < adList.total_pages){
          setPage(page + 1);
        }
      }
    };
    const fetchAds = ({page, pageSize}: {page?: number, pageSize?: number}) =>{
      if(isfetching)
        return;
      setIsfetching(true);
      fetch('/api/ads/my', {
        method: 'GET',
        headers: {
          'page': `${page}`,
          'page_size': `${pageSize}`
        }
      }).then(async response => {
        const result = await response.json() as IApiResponse<IPagedList<IAdItem>>;
        setAdList({
          items: [...adList?.items ?? [],...result.data.items],
          total_items: result.data.total_items,
          page_size: result.data.page_size,
          page: result.data.page,
          total_pages: result.data.total_pages
        });
        setIsfetching(false);
      });
    };
    useEffect(() =>{
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }
      if(!adList || !adList.items || adList.items.length == 0)
        return;
      window.addEventListener("scroll", infiniteScroll);
      return () => window.removeEventListener("scroll", infiniteScroll);
    },[adList])
    useEffect (() => {
      fetchAds({page: page});
    }, [page]);
  return (
    <section className="bg-white dark:bg-gray-900 pr-5 pl-5">
        <button onClick={() => redirect('ads/add')} type="button" className="float-right inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-500 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
          New
          <span className="ml-4 text-xl">+</span>
        </button>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">My Ads</h2>
      <div className="card-container">
      {adList?.items.map(ad => <Card key={ad._id} ad={ad} />)}
      </div>
    </section>
  );
}
