import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';




export default function MarketplaceProducts() {
  const { t } = useTranslation()

    const [products, setProducts] = useState([]);


function getProducts() {

    axios.get(`https://fb-m90x.onrender.com/seller/getProducts`)
    .then((res)=>{
        setProducts(res.data.data)
    })
    .catch((res)=>{})


}

useEffect(() => {
    getProducts()
}, [])


  return (
    <>
    
<div className="embla_container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-2">
{products.map((product) =>(

<div key={product.id} className="product embla__slide overflow-hidden relative">

<div className="card lg:w-[60%]">
<img className="w-full" src={product.mainImage} alt="Product" />
<div className="absolute bottom-0 left-0 top-0 w-full bg-black bg-opacity-40 text-white text-center p-2 z-50 text-start pt-36 lg:pt-[100px]">

<h3>{product.title}</h3>
<p className="text-sm font-normal line-clamp-3">{product.description}</p>
<div className="flex justify-around ">
                      <div className="">
                      <span className="bg-slate-100 rounded-lg text-[#086302] text-[20px] w-32 h-10 px-6 lg:px-3 text-center py-[6px] mt-2">
                       ${product.price} 
                      </span>
                      </div>
                      <div className="">
                      <Link to={`/moredetails/${product.id}`}>
                        <button className="bg-slate-100 rounded-lg text-black text-[20px] ltr:px-11 rtl:px-5 py-1">
                        {t('moreDetailsbutton')}
                        </button>
                      </Link>
                      </div>
                    </div>


</div>

</div>

</div>


) )}

    
    </div>    
    
    </>
  )
}



