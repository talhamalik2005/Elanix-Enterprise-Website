import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Payoneer Verification - Elanix Enterprise",
  description: "Payoneer verification page for Elanix Enterprise.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
}

export default function PayoneerPage() {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Top section with dark blue background */}
        <div className="bg-purple-600 py-16 md:py-24 text-white text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl text-[#F8F7FF] font-bold mb-6">Payoneer Verification</h1>
            <p className="text-xl">This page is just for Payoneer verification.</p>
          </div>
        </div>
  
        {/* Bottom section with ownership information */}
        <div className="flex-1 bg-gray-200 py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-3xl">
            <p className="text-center text-xl font-medium mb-10">
              This website is Owned & Operated by the following individual:
            </p>
  
            <div className="space-y-12">
        
              {/* Second individual */}
              <div className="text-center">
                <p className="text-xl font-semibold">Taimoor Uz Zaman Chaudhry</p>
                <p className="mt-2">Email: Taimooruzzaman@gmail.com</p>
                <p className="mt-1">Phone: +92 315 5108667</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  