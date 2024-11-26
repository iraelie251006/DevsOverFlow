import Navbar from "@/components/navigation/navbar"
import { ReactNode } from "react"

export interface ChidrenProps {
    children: ReactNode
}

const RootLayout = ({children}: ChidrenProps) => {
  return (
    <main>
        <Navbar />
        {children}
    </main>
  )
}

export default RootLayout
