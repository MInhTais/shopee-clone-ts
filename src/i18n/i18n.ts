import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      'all categories': 'All Categories',
      filters: 'Search filters',
      price_range: 'Price range',
      'price from': '₫ FROM',
      'price to': '₫ TO',
      apply: 'Apply',
      review: 'Review',
      rate_range: '& Up',
      btn_clear: 'Clear All',
      sort_by: 'Sort by',
      popular: 'Popular',
      latest: 'Latest',
      top_sales: 'Top Sales',
      price: 'Price',
      price_low_to_high: 'Price: Low to High',
      price_high_to_low: 'Price: High to Low',
      sold: 'sold',
      my_account: 'My Account',
      purchase: 'My Purchase',
      logout: 'Logout',
      register: 'Register',
      login: 'Login',
      search_placeholder: 'Free Shipping Orders From 0 VND',
      cart_popover_header: 'Recently Added Products',
      cart_popover_bottom_left: 'Add items to cart',
      btn_go_to_cart: 'view my shopping cart'
    }
  },
  vi: {
    translation: {
      'all categories': 'Tất cả danh mục',
      filters: 'Bộ lọc tìm kiếm',
      price_range: 'Khoảng giá',
      'price from': '₫ TỪ',
      'price to': '₫ ĐẾN',
      apply: 'Áp dụng',
      review: 'Đánh giá',
      rate_range: 'Trở lên',
      btn_clear: 'Xóa tất cả',
      sort_by: 'Sắp xếp theo',
      popular: 'Phổ biến',
      latest: 'Mới nhất',
      top_sales: 'Bán chạy',
      price: 'Giá',
      price_low_to_high: 'Giá: Thấp đến cao',
      price_high_to_low: 'Giá: Cao đến thấp',
      sold: 'đã bán',
      my_account: 'Tài khoản của tôi',
      purchase: 'Đơn hàng',
      logout: 'Đăng xuất',
      register: 'Đăng kí',
      login: 'Đăng nhập',
      search_placeholder: 'Free Ship Đơn Từ 0Đ',
      cart_popover_header: 'Sản phẩm mới thêm',
      cart_popover_bottom_left: 'Thêm Hàng Vào Giỏ',
      btn_go_to_cart: 'xem giỏ hàng'
    }
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',
  fallbackLng: 'vi',
  interpolation: {
    escapeValue: false
  }
})
// export default i18n
