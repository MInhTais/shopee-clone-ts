import { purchasesStatus } from '../../../../constants/purchase'
import useQueryPrams from 'src/hooks/useQueryPrams'
import { useQuery } from '@tanstack/react-query'
import purchaseApi from 'src/api/purchase.api'
import { PurchaseStatus } from 'src/types/purchase.type'
import { Link, createSearchParams } from 'react-router-dom'
import path from 'src/constants/path'
import classNames from 'classnames'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import { useMemo } from 'react'

const purchaseTabs = [
  {
    status: purchasesStatus.all,
    name: 'Tất cả'
  },
  { status: purchasesStatus.waitForConfirmation, name: 'Chờ xác nhận' },
  { status: purchasesStatus.waitForGetting, name: 'Chờ lấy hàng' },
  { status: purchasesStatus.inProgress, name: 'Đang giao' },
  { status: purchasesStatus.delivered, name: 'Đã giao' },
  { status: purchasesStatus.cancelled, name: 'Đã hủy' }
]
export default function HistoryPurchase() {
  const queryParams: { status?: string } = useQueryPrams()
  const status = Number(queryParams.status) || purchasesStatus.all
  // const [data, setData] = useState<Purchase[]>([])
  const { data: purchasesInCartData, isLoading } = useQuery({
    queryKey: ['purchases', { status }],
    queryFn: () => purchaseApi.getPurchases({ status: status as PurchaseStatus })
  })

  // useEffect(() => {
  //   const purchases = async () => {
  //     try {
  //       const response = await purchaseApi.getPurchases({ status: status as PurchaseStatus })
  //       console.log(response.data.data)
  //       const { data } = response.data
  //       setData(data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   purchases()
  // }, [status])
  const products = useMemo(() => {
    return purchasesInCartData?.data.data
  }, [purchasesInCartData])

  const purchaseTabsLink = purchaseTabs.map((tabs) => (
    <Link
      key={tabs.status}
      to={{
        pathname: path.historyPurchase,
        search: createSearchParams({
          status: String(tabs.status)
        }).toString()
      }}
      className={classNames('flex flex-1 items-center justify-center  border-b-2 bg-white py-4 text-center', {
        'border-b-orange text-orange': status === tabs.status,
        'border-b-black/10 text-gray-900': status !== tabs.status
      })}
    >
      {tabs.name}
    </Link>
  ))
  return (
    <div>
      <div className='overflow-x-auto'>
        <div className='min-w-[700px]'>
          <div className='sticky top-0 flex rounded-t-sm shadow-sm'>{purchaseTabsLink}</div>
          {isLoading === false ? (
            <div>
              {products?.map((purchase) => (
                <div
                  key={purchase._id}
                  className='mt-3 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm'
                >
                  <Link
                    to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                    className='flex'
                  >
                    <div className='flex-shrink-0'>
                      <img
                        className='h-20 w-20 object-cover'
                        src={purchase.product.image}
                        alt={purchase.product.name}
                      />
                    </div>
                    <div className='ml-3 flex-grow overflow-hidden'>
                      <div className='truncate'>{purchase.product.name}</div>
                      <div className='mt-3'>x{purchase.buy_count}</div>
                    </div>
                    <div className='ml-3 flex flex-shrink-0'>
                      <div className='truncate text-gray-500 line-through'>
                        ₫{formatCurrency(purchase.product.price_before_discount)}
                      </div>
                      <div className='ml-2 truncate text-orange'>₫{formatCurrency(purchase.product.price)}</div>
                    </div>
                  </Link>
                  <div className='flex justify-end'>
                    <div>
                      <span>Tổng giá tiền</span>
                      <span className='ml-4 text-xl text-orange'>
                        ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='max-h-screen min-h-screen'>
              <div className='absolute left-[50%] top-[50%] text-center'>
                <div role='status'>
                  <svg
                    aria-hidden='true'
                    className='mr-2 inline h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600'
                    viewBox='0 0 100 101'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                      fill='currentColor'
                    />
                    <path
                      d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                      fill='currentFill'
                    />
                  </svg>
                  <span className='sr-only'>Loading...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
