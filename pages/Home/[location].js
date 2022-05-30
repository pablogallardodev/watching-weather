import { useRouter } from "next/router"
import Home from "./index"

const Location = () => {
  const router = useRouter()
  const { location } = router.query

  return <Home searchLocation={location} />
}

export default Location