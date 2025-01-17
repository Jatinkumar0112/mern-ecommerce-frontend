// eslint-disable-next-line
import React, { useState, Fragment, useEffect } from "react";
import Pagination from "../../common/Pagination";
import {  StarIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   increment,
//   incrementAsync,
//   incrementByAmount,

// } from './productListSlice';
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { selectAllProducts,fetchProductsByFiltersAsync, selectTotalItems, selectBrands, selectCategories, fetchBrandsAsync, fetchCategoriesAsync } from "../productSlice";
import {ITEMS_PER_PAGE, discountedPrice} from '../../../app/constants'


// const oldproducts = [
//   {
//     id: 1,
//     name: "Basic Tee",
//     href: "#",
//     thumbnail:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 1,
//     name: "Basic Tee",
//     href: "#",
//     thumbnail:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 1,
//     name: "Basic Tee",
//     href: "#",
//     thumbnail:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 1,
//     name: "Basic Tee",
//     href: "#",
//     thumbnail:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
// ];
// const products = [{
//       "id": 1,
//       "title": "iPhone 9",
//       "description": "An apple mobile which is nothing like apple",
//       "price": 549,
//       "discountPercentage": 12.96,
//       "rating": 4.69,
//       "stock": 94,
//       "brand": "Apple",
//       "category": "smartphones",
//       "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
//       "images": [
//         "https://i.dummyjson.com/data/products/1/1.jpg",
//         "https://i.dummyjson.com/data/products/1/2.jpg",
//         "https://i.dummyjson.com/data/products/1/3.jpg",
//         "https://i.dummyjson.com/data/products/1/4.jpg",
//         "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
//       ]
//     }];


const sortOptions = [
  { name: "Best Rating", sort: "rating",  order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc", current: false },
];
// const filters = [
//   {
//     id: "brand",
//     name: "brand",
//     options: [
//       { value: "Apple", label: "Apple", checked: false },
//       { value: "Samsung", label: "Samsung", checked: false },
//       { value: "OPPO", label: "OPPO", checked: true },
//       { value: "Huwei", label: "Huwei", checked: false },
//       { value: "Microsoft Surface", label: "Microsoft Surface", checked: false },
//       { value: "Infinix", label: "Infinix", checked: false },
//       { value: "HP Pavilion", label: "HP Pavilion", checked: false },
//       { value: "Impression of Acqua Di Gio", label: "Impression of Acqua Di Gio", checked: false },
//       { value: "Royal_Mirage", label: "Royal_Mirage", checked: false },
//       { value: "Fog Scent xpression", label: "Fog Scent xpression", checked: false },
//       { value: "Al Munakh", label: "PurpAl Munakhle", checked: false },
//       { value: "Lord AI Rehab", label: "Lord AI Rehab", checked: false },
//       { value: "L'Oreal Paris", label: "L'Oreal Paris", checked: false },
//       { value: "Hemani Tea", label: "Hemani Tea", checked: false },
//       { value: "Dermive", label: "Dermive", checked: false },
//       { value: "ROREC White Rice", label: "ROREC White Rice", checked: false },
//       { value: "Fair & Clear", label: "Fair & Clear", checked: false },
//       { value: "Saaf & Khass", label: "Saaf & Khass", checked: false },
//       { value: "Bake Parlor Big", label: "Bake Parlor Big", checked: false },
//       { value: "Baking Food items", label: "Baking Food items", checked: false },
//       { value: "fauji", label: "fauji", checked: false },
//       { value: "Dry Rose", label: "Dry Rose", checked: false },
//       { value: "Boho Decor", label: "Boho Decor", checked: false },
//       { value: "Flying Wooden", label: "Flying Wooden", checked: false },
//       { value: "LED Lights", label: "LED Lights", checked: false },
//       { value: "luxury place", label: "luxury place", checked: false },
//       { value: "Golden", label: "Golden", checked: false },
//     ],
//   },
//   {
//     id: "category",
//     name: "Category",
//     options: [
//       { value: 'smartphones', label: 'smartphones', checked: false },
//       { value: 'laptops', label: 'laptops', checked: false },
//       { value: 'fragrances', label: 'fragrances', checked: false },
//       { value: 'skincare', label: 'skincare', checked: false },
//       { value: 'groceries', label: 'groceries', checked: false },
//       { value: 'home-decoration', label: 'home decoration', checked: false },
//       { value: 'furniture', label: 'furniture', checked: false },
//       { value: 'tops', label: 'tops', checked: false },
//       { value: 'womens-dresses', label: 'womens dresses', checked: false },
//       { value: 'womens-shoes', label: 'womens shoes', checked: false },
//       { value: 'mens-shirts', label: 'mens shirts', checked: false },
//       { value: 'mens-shoes', label: 'mens shoes', checked: false },
//       { value: 'mens-watches', label: 'mens watches', checked: false },
//       { value: 'womens-watches', label: 'womens watches', checked: false },
//       { value: 'womens-bags', label: 'womens bags', checked: false },
//       { value: 'womens-jewellery', label: 'womens jewellery', checked: false },
//       { value: 'sunglasses', label: 'sunglasses', checked: false },
//       { value: 'automotive', label: 'automotive', checked: false },
//       { value: 'motorcycle', label: 'motorcycle', checked: false },
//       { value: 'lighting', label: 'lighting', checked: false },
//     ],
//   }
// ];
// const items = [
//   {
//     id: 1,
//     title: "Back End Developer",
//     department: "Engineering",
//     type: "Full-time",
//     location: "Remote",
//   },
//   {
//     id: 2,
//     title: "Front End Developer",
//     department: "Engineering",
//     type: "Full-time",
//     location: "Remote",
//   },
//   {
//     id: 3,
//     title: "User Interface Designer",
//     department: "Design",
//     type: "Full-time",
//     location: "Remote",
//   },
// ];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductList() {

  const dispatch = useDispatch();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const products = useSelector(selectAllProducts)
  const totalItems = useSelector(selectTotalItems)
  const brands = useSelector(selectBrands)
  const categories = useSelector(selectCategories)
  const filters = [
    {
      id: 'category',
      name: 'Category',
      options: categories,
    },
    {
      id: 'brand',
      name: 'Brands',
      options: brands,
    },
  ];
  // console.log(products)
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);

  
  
  
  const handleFilter  = (e,section,option)=>{
    const newFilter = {...filter};

    if(e.target.checked){
      if(newFilter[section.id]){
        newFilter[section.id].push(option.value)
      }else{
        newFilter[section.id] = [option.value]
      }
      

    }else{
      const index = newFilter[section.id].findIndex(el=>el===option.value)
      newFilter[section.id].splice(index,1)
     
    }
    // const newFilter = {...filter,[section.id]:option.value};
    setFilter(newFilter);
    console.log(newFilter);
    
    
  }


  
  const handleSort = (e,option)=>{
    const sort = {_sort:option.sort, _order:option.order};
    setSort(sort);
    
  }
  const handlePage = (page)=>{
    console.log({page})
    setPage(page);
    
  }
  useEffect(()=>{
    const pagination = {_page:page,_limit:ITEMS_PER_PAGE};
    //TODO: Server will fitler the deleted products
    dispatch(fetchProductsByFiltersAsync({filter,sort,pagination}))
    
  },[dispatch,filter,sort,page])
  useEffect(()=>{
    setPage(1)
  },[totalItems,sort])
  useEffect(()=>{
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync())
  },[])
  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <MobileFilter mobileFiltersOpen={mobileFiltersOpen} filters={filters} setMobileFiltersOpen={setMobileFiltersOpen} handleFilter={handleFilter} ></MobileFilter>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <p
                              onClick={e=>handleSort(e,option)}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </p>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
             <DestopFilter handleFilter={handleFilter} filters={filters}></DestopFilter>

              {/* Product grid start */}
              <div className="lg:col-span-3">
               <ProductGrid products={products}></ProductGrid>
              </div>
              {/* product grid end*/}
            </div>
          </section>
          {/* section of products paggination  */}
       
            
            <Pagination page={page} setPage={setPage} totalItems={totalItems} handlePage={handlePage}></Pagination>
            
       
        </main>
      </div>
    </div>
  );
}
function MobileFilter({mobileFiltersOpen,setMobileFiltersOpen, handleFilter,filters}){
  
  return(
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
  );
}
function DestopFilter({handleFilter,filters}){
  
  return(
    <form className="hidden lg:block">
    {filters.map((section) => (
      <Disclosure
        as="div"
        key={section.id}
        className="border-b border-gray-200 py-6"
      >
        {({ open }) => (
          <>
            <h3 className="-my-3 flow-root">
              <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                <span className="font-medium text-gray-900">
                  {section.name}
                </span>
                <span className="ml-6 flex items-center">
                  {open ? (
                    <MinusIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  ) : (
                    <PlusIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  )}
                </span>
              </Disclosure.Button>
            </h3>
            <Disclosure.Panel className="pt-6">
              <div className="space-y-4">
                {section.options.map((option, optionIdx) => (
                  <div
                    key={option.value}
                    className="flex items-center"
                  >
                    <input
                      id={`filter-${section.id}-${optionIdx}`}
                      name={`${section.id}[]`}
                      defaultValue={option.value}
                      type="checkbox"
                      defaultChecked={option.checked}
                      
                      // onChange={e=>e.console.log(option.checked)}
                      onChange={e=>handleFilter(e,section,option)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor={`filter-${section.id}-${optionIdx}`}
                      className="ml-3 text-sm text-gray-600"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    ))}
  </form>
  );
}

function ProductGrid({products}){
 
  return(
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <Link to={`/product-detail/${product.id}`} key={product.id}>
              <div className="group relative border-solid border-2 p-2 border-gray-200">
                <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <div href={product.thumbnail}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.title}
                      </div>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      <StarIcon className="w-6 h-6 inline"></StarIcon>
                      <span className=" align-bottom">{product.rating}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm block font-medium text-gray-900">
                      $
                      {discountedPrice(product)}
                    </p>
                    <p className="text-sm block line-through font-medium text-gray-400">
                      ${product.price}
                    </p>
                  </div>
                </div>
                {product.deleted && (
                  <div>
                    <p className="text-sm text-red-400">product deleted</p>
                  </div>
                )}
                {product.stock<=0 && (
                  <div>
                    <p className="text-sm text-red-400">Out of stock </p>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}