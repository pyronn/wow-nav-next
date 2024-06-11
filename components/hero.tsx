export default function Hero() {
    return (
        <div className="bg-hero bg-cover bg-center h-96 flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl m-2 font-bold gradient-to-tr from-foreground to-foreground-500 text-foreground">
                    <span
                        className="bg-gradient-to-tl from-purple-200 to-red-700 text-transparent bg-clip-text border-none">
                Next.js Starter
              </span>
                </h1>

                <p className="text-foreground m-2 ">A starter template for Next.js with Tailwind CSS</p>
            </div>
        </div>
    )
}
