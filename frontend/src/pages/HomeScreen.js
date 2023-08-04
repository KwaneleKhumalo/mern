import AuthNav from '../component/AuthNav'
import Header from '../component/Header'

const HomeScreen = () => {
  return (
    <>
      <Header authNav={<AuthNav />} />
    </>
  )
}

export default HomeScreen
