import { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Email là bắt buộc'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email không đúng định dạng'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 5 - 160 kí tự'
    },
    minLength: {
      value: 5,
      message: 'Độ dài từ 5 - 160 kí tự'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password là bắt buộc'
    },

    maxLength: {
      value: 160,
      message: 'Độ dài từ 6 - 160 kí tự'
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6 - 160 kí tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Nhập password là bắt buộc'
    },

    maxLength: {
      value: 160,
      message: 'Độ dài từ 6 - 160 kí tự'
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6 - 160 kí tự'
    },
    validate:
      typeof getValues === 'function' ? (value) => value === getValues('password') || 'Mật khẩu không khớp' : undefined
  }
})
const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required('Nhập lại password là bắt buộc')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 - 160 ký tự')
    .oneOf([yup.ref(refString)], 'Nhập lại password không khớp')
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email không đúng định dạng')
    .min(5, 'Độ dài từ 5 - 160 kí tự')
    .max(160, 'Độ dài từ 5 - 160 kí tự'),
  password: yup
    .string()
    .required('Password là bắt buộc ')
    .min(6, 'Độ dài từ 6 - 150 kí tự')
    .max(160, 'Độ dài từ 6 - 150 kí tự'),
  confirm_password: handleConfirmPasswordYup('password'),

  price_min: yup
    .string()
    .required('Nhập vào giá')
    .test({
      name: 'price not allowed',
      message: 'Giá không phù hợp',
      test: function (value) {
        const price_min = value
        const { price_max } = this.parent as { price_min: string; price_max: string }
        if (price_min !== '' && price_max !== '') {
          return Number(price_max) >= Number(price_min)
        }
        return price_min !== '' || price_max !== ''
      }
    }),
  price_max: yup
    .string()
    .required('Nhập vào giá')
    .test({
      name: 'price not allowed',
      message: 'Giá không phù hợp',
      test: function (value) {
        const price_max = value
        const { price_min } = this.parent as { price_min: string; price_max: string }
        if (price_min !== '' && price_max !== '') {
          return Number(price_max) >= Number(price_min)
        }
        return price_min !== '' || price_max !== ''
      }
    }),
  name: yup.string().trim().required('Nhập vào tên sản phẩm')
})

export const userSchema = yup.object({
  name: yup.string().max(160, 'Độ dài tối đa là 160 ký tự'),
  phone: yup.string().max(20, 'Độ dài tối đa là 20 ký tự'),
  address: yup.string().max(160, 'Độ dài tối đa là 160 ký tự'),
  avatar: yup.string().max(1000, 'Độ dài tối đa là 1000 ký tự'),
  date_of_birth: yup.date().max(new Date(), 'Hãy chọn một ngày trong quá khứ'),
  password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  new_password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  confirm_password: handleConfirmPasswordYup('new_password')
})

export type UserSchema = yup.InferType<typeof userSchema>

export type Schema = yup.InferType<typeof schema>
