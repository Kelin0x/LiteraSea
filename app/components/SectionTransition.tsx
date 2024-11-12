const SectionTransition = () => {
  return (
    <div className="relative -mt-32 h-32 pointer-events-none">
      {/* 渐变过渡 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#EEF2FF] z-10" />
      
      {/* 可选：添加波浪效果 */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          viewBox="0 0 1440 48" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-12 text-[#EEF2FF] opacity-50"
        >
          <path 
            d="M0 48h1440V0c-211.06 37.15-451.47 48-721.24 32.48C449 17 211.06 7.86 0 4.2z" 
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  )
}

export default SectionTransition 