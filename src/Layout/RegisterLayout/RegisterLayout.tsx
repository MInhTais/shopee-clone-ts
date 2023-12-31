import RegisterHeader from 'src/components/RegisterHeader'
import Footer from 'src/components/footer'

interface Props {
  children?: React.ReactNode
}
export default function RegisterLayout({ children }: Props) {
  return (
    <div>
      <RegisterHeader />
      {children}
      <Footer />
    </div>
  )
}
