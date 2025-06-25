import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Game from './features/components/Game/Game.jsx'
import { ProductProvider } from './features/components/ProductContext/ProductContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductProvider>
      <Game />
    </ProductProvider>
  </StrictMode>,
)
