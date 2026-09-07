import IvcaNavbar from "@/components/layout/IvcaNavbar"
import Footer from "@/components/layout/Footer"
import WhatsAppFloat from "@/components/layout/WhatsAppFloat"
import { QuoteCartProvider } from "@/context/QuoteCartContext"

export default function MarketingLayout({ children }) {
  return (
    <QuoteCartProvider>
      <div className="flex min-h-screen flex-col">
        <IvcaNavbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </QuoteCartProvider>
  )
}
