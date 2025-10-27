import { Header } from "@/components/Header"
import { CalculatorPage } from "@/pages/CalculatorPage"

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <CalculatorPage />
      </main>
    </div>
  )
}

export default App
