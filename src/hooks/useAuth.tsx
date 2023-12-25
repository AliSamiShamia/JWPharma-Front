import { AuthContext } from '@/components/context/AuthContext'
import { useContext } from 'react'

export const useAuth = () => useContext(AuthContext)
