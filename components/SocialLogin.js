import React from 'react'

const SocialLogin = () => {
  return (
    <div className="flex flex-col space-y-4">
      <a
        href="/api/auth/fb"
        className="flex items-center justify-center px-4 py-2 border border-blue-700 space-x-2 transition-colors duration-300 rounded-md group hover:bg-blue-700 focus:outline-none"
      >
        <span>
          <svg className="w-6 h-6" viewBox="0 0 50 50">
            <path
              d="M40,0H10C4.486,0,0,4.486,0,10v30c0,5.514,4.486,10,10,10h30c5.514,0,10-4.486,10-10V10C50,4.486,45.514,0,40,0z M39,17h-3 c-2.145,0-3,0.504-3,2v3h6l-1,6h-5v20h-7V28h-3v-6h3v-3c0-4.677,1.581-8,7-8c2.902,0,6,1,6,1V17z"
              fill="#4267B2"
            ></path>
          </svg>
        </span>
        <span className="text-sm font-medium text-blue-700 group-hover:text-white">
          Facebook
        </span>
      </a>
      <a
        href="/api/auth/in"
        className="flex items-center justify-center px-4 py-2 border border-blue-500 space-x-2 transition-colors duration-300 rounded-md group hover:bg-blue-500 focus:outline-none"
      >
        <span>
          <svg className="w-6 h-6  rounded-md bg-white" viewBox="0 0 24 24">
            <path
              d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
              fill="#0a66c2"
            />
          </svg>
        </span>
        <span className="text-sm font-medium text-blue-500 group-hover:text-white">
          LinkedIn
        </span>
      </a>
    </div>
  )
}

export default SocialLogin
