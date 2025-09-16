import ChatApp from "../component/ChatApp/ChatApp"

function App() {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-background to-muted/30">
      <div className="mx-auto max-w-6xl p-4 md:p-8">
        <header className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Azure IA Dashboard</h1>
            <p className="text-sm text-muted-foreground">Chatbot</p>
          </div>
        </header>

        <div className="mt-6">
          <ChatApp />
        </div>
      </div>
    </div>
  )
}

export default App
