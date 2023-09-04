import http from 'src/utils/http'
import { category } from '../types/product.type'
import { SuccessResponse } from 'src/types/utils.type'
const URL = 'categories'

const categoryAPI = {
  getCategories() {
    return http.get<SuccessResponse<category[]>>(URL)
  }
}
export default categoryAPI
