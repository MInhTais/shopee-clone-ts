import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import userApi from 'src/api/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { userSchema } from 'src/utils/rules'
import { toast } from 'react-toastify'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'

type FormData = {
  password: string | undefined
  confirm_password: string
  new_password: string | undefined
}
// type FormData = Pick<UserSchema, 'password' | 'new_password' | 'confirm_password'>
const ChanePasswordSchema = userSchema.pick(['password', 'new_password', 'confirm_password'])
export default function ChanePassworld() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_password: ''
    },
    resolver: yupResolver(ChanePasswordSchema)
  })
  const updateProfileMutation = useMutation({
    mutationFn: userApi.updateProfile
  })
  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await updateProfileMutation.mutateAsync(omit(data, ['confirm_password']))
      console.log(res)
      reset()
      toast.success(res.data.message)
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData] as string,
              type: 'Server'
            })
          })
        }
      }
    }
  })

  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow  md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6 text-center'>
        <div className=' text-lg font-medium capitalize text-gray-900'>Đổi mật khẩu</div>
        <div className='mt-1 text-sm text-gray-700'>Quản lí thông tin để bảo mật tài khoản</div>
      </div>
      <form className='mr-auto mt-8 max-w-2xl' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Mật khẩu cũ</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                placeholder='Nhập vào mật khẩu cũ'
                type='password'
                className='relative'
                name='password'
                errorsMessgae={errors.password?.message}
                register={register}
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Mật khẩu mới</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                className='relative'
                type='password'
                name='new_password'
                errorsMessgae={errors.new_password?.message}
                register={register}
                placeholder='Nhập vào mậy khẩu mới'
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Nhập Lại Mật Khẩu</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                className='relative'
                type='password'
                name='confirm_password'
                register={register}
                placeholder='Nhập lại mật khẩu'
                errorsMessgae={errors.confirm_password?.message}
                classNameInput='w-full border rounded-sm border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'></div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Button type='submit' className='rounded-sm bg-orange px-5 py-2 text-white hover:bg-orange/95'>
                Lưu
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
