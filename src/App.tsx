import { useState } from "react"
import AppRoutes from "./router"
import { BrowserRouter } from "react-router-dom"
import { ConfigProvider, theme } from "antd"

function App() {
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <BrowserRouter>
        <AppRoutes isDark={isDark} toggleTheme={toggleTheme} />
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
