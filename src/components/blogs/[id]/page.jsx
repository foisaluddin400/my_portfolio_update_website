'use client'
import { useGetSingleBlogQuery } from '@/redux/Api/blogsApi'
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
    const {id} = useParams()
    const {data:singleBlogData} = useGetSingleBlogQuery({id})
  return (
    <div>page</div>
  )
}

export default page