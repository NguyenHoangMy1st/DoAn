import Footer from 'src/components/Footer'
import Header from 'src/components/Header'
import 'src/styles/body.scss'
interface Props {
  children?: React.ReactNode
}
export default function MainLayout({ children }: Props) {
  return (
    <div className='font'>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
