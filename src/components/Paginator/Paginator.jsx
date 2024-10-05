import axiosErrorHandler from "components/axiosErrorHandler"
import { api_host } from "config/api_host"
import { useState } from "react"
import axiosInstance from "services/axiosClient"

export default function Paginator({resources, nPages, dataSetter , query}) {
  
    const [ nextUrl, setNextUrl ] = useState("?page=2")
    const [ prevUrl, setPrevUrl ] = useState(null)
    const [ currentPage , setCurrentPage ] = useState(1)
  
  
    const fetchData = (url) => {
      axiosInstance.get(url).then(
        response => {
          const responseData = Array.isArray(response.data.data) ? response.data.data : [response.data.data]
          dataSetter(responseData)
          
          setCurrentPage(response.data.current_page)
          setPrevUrl(response.data.prev_page_url)
          setNextUrl(response.data.next_page_url)
        }
      ).catch(error => {
        axiosErrorHandler(error)
      })
    }
  
    const queryString = query ? `&${query}` : ""
  
    const pages = [];
  
    for(let i = 1; i <= nPages ; i++) {
      pages.push(
        <button 
        className={currentPage === i ? "bg-blue-600 p-2 rounded-lg text-white" : "p-2"}
        onClick={() => fetchData(`${api_host}/${resources}/?page=${i}${queryString}`)}>{i}</button>
      )
    }
  
    return nPages > 1 ? 
      (
        <div className="flex flex-row justify-center items-center gap-10">
          <button disabled={nextUrl ? false : true} className={(nextUrl ? "bg-blue-600 text-white" : "bg-gray-400") + " px-6 py-2 rounded-2xl"} onClick={() => fetchData(`${api_host + `/${resources}` + nextUrl + queryString}`)}> {"<"} التالي</button> 
          {
            pages.reverse()      
          }
          <button disabled={prevUrl ? false : true} className={(prevUrl ? "bg-blue-600 text-white" : "bg-gray-400") + " px-6 py-2 rounded-2xl"} onClick={() => fetchData(`${api_host + `/${resources}` + prevUrl + queryString}`)}>السابق {">"}</button>
        </div>
      ) :
      <></>
  }
  