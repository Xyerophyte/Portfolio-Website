"use client"

import { useState } from "react"

export default function EmailDebug() {
  const [testing, setTesting] = useState(false)
  const [result, setResult] = useState<any>(null)

  const testEmail = async () => {
    setTesting(true)
    setResult(null)

    try {
      const response = await fetch("/api/test-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      setResult({ success: false, error: errorMessage })
    } finally {
      setTesting(false)
    }
  }

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 border border-gray-700 rounded-lg p-4 max-w-sm">
      <h3 className="text-sm font-semibold mb-2">Email Debug</h3>
      <button
        onClick={testEmail}
        disabled={testing}
        className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-600 px-3 py-1 rounded text-sm"
      >
        {testing ? "Testing..." : "Test Email"}
      </button>

      {result && (
        <div className="mt-2 text-xs">
          <div
            className={`p-2 rounded ${result.success ? "bg-green-900/20 text-green-400" : "bg-red-900/20 text-red-400"}`}
          >
            {result.success ? "✅ Success!" : "❌ Failed"}
            <pre className="mt-1 text-xs overflow-auto">{JSON.stringify(result, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  )
}
