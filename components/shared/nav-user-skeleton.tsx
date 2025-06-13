import React from 'react'

export default function NavUserSkeleton() {
  return (

<div className="space-y-2 animate-pulse">
  <div className="relative">
    <div className="h-auto ps-2 flex items-center gap-2">
      <div className="h-10 w-10 bg-gray-200 rounded-xl"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 w-16 rounded-xl"></div>
        <div className="h-2 bg-gray-200 w-28 rounded-xl"> </div>
      </div>
    </div>
  </div>
</div>
  )
}
