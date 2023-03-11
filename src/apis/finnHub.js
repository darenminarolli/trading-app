import axios from "axios"

const TOKEN= "cg4bgbpr01qun3gir970cg4bgbpr01qun3gir97g"
export default axios.create({
  baseURL:'https://finnhub.io/api/v1',
  params: {
    token: TOKEN
  }
})

