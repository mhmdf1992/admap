import { AdStatus, IAdItem } from "@/types/ad-item";
import { FormEvent } from "react";

const CardDetails = ({ad, onsubmit, ondelete, onaprove, onreject, success, error, isadmin} : {ad? : IAdItem, onsubmit: (event: FormEvent<HTMLFormElement>) => void, ondelete: () => void, onaprove: () => void, onreject: () => void, success?: string, error?: string, isadmin?: boolean}) => {
    const adStatusMsg = {
        1: "Waiting For Approval",
        2: "Approved",
        3: "Regected"
    }
    return(
        <div className="px-4 mx-auto max-w-2xl">
            {error ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
					{error}
				</div> : ''}
            {success ? <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                {success}
              </div> : ''}
            <form onSubmit={onsubmit}>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div className="sm:col-span-2 relative">
                        {!ad?._id ? '' : 
                        <div className="text-right sm:col-span-2 absolute right-0 top-0">
                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400 m-3">{adStatusMsg[ad?.status ?? 1]}</label>
                        </div>}
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                        <input disabled={isadmin} defaultValue={ad?.title || ''} type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Title" required />
                    </div>
                    <div>
                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                        <input disabled={isadmin} defaultValue={ad?.category || ''} type="text" name="category" id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Category" required />
                    </div>
                    <div>
                        <label htmlFor="subcategory" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subcategory</label>
                        <input disabled={isadmin} defaultValue={ad?.subcategory || ''} type="text" name="subcategory" id="subcategory" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Subcategory" required />
                    </div>
                    <div className="w-full flex-2 gap-1" style={{display: 'flex'}}>
                        <div className="w-full">
                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                            <input disabled={isadmin} defaultValue={ad?.price} type="number" step=".01" name="price" id="price" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required />    
                        </div>
                        <div className="w-full">
                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Currency</label>
                            <select disabled={isadmin} defaultValue={ad?.currency || 'USD'} id="currency" name="currency" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option value="USD">USD</option>
                            </select>
                        </div>
                    </div>
                    <div className="w-full flex-2 gap-1" style={{display: 'flex'}}>
                        <div className="w-full">
                            <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                            <input disabled={isadmin} defaultValue={ad?.country || ''} type="text" name="country" id="country" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Country" required />
                        </div>
                        <div className="w-full">
                            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                            <input disabled={isadmin} defaultValue={ad?.city || ''} type="text" name="city" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="City" required />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <textarea disabled={isadmin} defaultValue={ad?.description || ''} id="description" name="description" rows={8} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here"></textarea>
                    </div>
                </div>
                {isadmin ?
                    ad?.status === AdStatus.Pending ? 
                    <><input defaultValue="Aprove" type="button" onClick={onaprove} className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-500 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800" />
                    <input value="Reject" type="button" onClick={onreject} className="float-right inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-red-500 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800" /></>: '' :<> 
                    <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-500 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                        Save
                    </button>
                    <input defaultValue="Delete" onClick={ondelete} className="float-right inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-red-500 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800" />
                </>}
            </form>
        </div>
    );
}
export default CardDetails;