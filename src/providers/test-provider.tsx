import { TestContext } from '@/src/hooks/use-test-context'
import { PropsWithChildren, useState } from 'react'

export default function TestProvider({ children }: PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  return (
    <TestContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated, 
      }}
    >
      {children}
    </TestContext.Provider>
  )
}
