import http from 'src/utils/http'
import { Product, ProductConfig, ProductList } from '../types/product.type'
import { SuccessResponse } from 'src/types/utils.type'

const URL = 'products'
const productAPI = {
  getProducts(params: ProductConfig) {
    return http.get<SuccessResponse<ProductList>>(URL, { params })
  },
  getProductDetail(id: string) {
    return http.get<SuccessResponse<Product>>(`${URL}/${id}`)
  }
}
export default productAPI
