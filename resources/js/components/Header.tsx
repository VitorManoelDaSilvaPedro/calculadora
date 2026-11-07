export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 h-20">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="https://onp.nyc3.cdn.digitaloceanspaces.com/logo-preta" 
            alt="ONP" 
            className="h-8 md:h-10 w-auto"
          />
          <div className="h-8 w-px bg-gray-300" />
          <h1 className="text-base md:text-lg font-semibold text-primary-dark">
            Calculadora de investimentos para desenvolvedores 
          </h1>
        </div>
        <a 
          href="https://onovoprogramador.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-black text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-800 transition-colors hidden md:block"
        >
          Conheça nossa escola de programação
        </a>
      </div>
    </header>
  )
}
