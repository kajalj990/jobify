import Wrapper from '../assets/wrappers/BigSidebar';
import { useAppContext } from '../context/appContext'
import Logo from './Logo';
import Navlinks from './Navlinks';
const BigSideBar = () => {
  const { showSidebar } = useAppContext();
  return (
    <Wrapper>
      <div className={!showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
        <div className="content">
          <header>
            <Logo />
          </header>
          <Navlinks />
        </div>
      </div>
    </Wrapper>
  )
}
export default BigSideBar