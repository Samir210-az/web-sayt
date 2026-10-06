'use client'

import { createContext, useContext } from 'react'

export interface Account {
  email: string
  signOut: () => void
}

export const AccountContext = createContext<Account | null>(null)

export function useAccount(): Account | null {
  return useContext(AccountContext)
}
