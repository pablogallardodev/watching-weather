import { useEffect, useState } from 'react'
import { onUserChanged } from 'services/firebase/client'
import { useRouter } from 'next/router'

export default function useUser() {
  const [user, setUser] = useState(undefined)
  const router = useRouter()

  useEffect(() => {
    onUserChanged(setUser)
  }, [])

  useEffect(() => {
    user === null && router.replace('/')
  }, [user])

  return user
}