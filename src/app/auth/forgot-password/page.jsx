import React, { Suspense } from 'react'
import ForgotPassword from './ForgotPassword'

const page = () => {
  return (
     <Suspense fallback={<div>Loading...</div>}><ForgotPassword /> </Suspense>
  )
}

export default page