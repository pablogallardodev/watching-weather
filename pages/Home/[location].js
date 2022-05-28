import { useRouter } from "next/router"
import Home from "./index"

const Location = () => {
  const router = useRouter()
  const { location } = router.query

  return <Home actual={location} />
}

export default Location