import Wrapper from '../assets/wrappers/Navbar';
import { FaHome, FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import { useAppContext } from '../context/appContext';
import Logo from './Logo';
import { useState } from 'react';
const Navbar = () => {
  const { toggleSidebar, user, logout } = useAppContext()
  const [showLogout, setShowLogout] = useState(false)
  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='btn toggle-btn' onClick={() => toggleSidebar()}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className='logo-text'>dashboard</h3>
        </div>
        <div className='btn-container'>
          <button type='button' className='btn' onClick={() => setShowLogout(!showLogout)}>
            <FaUserCircle />
            {user && user.name}
            {/* user?.name */}
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : 'dropdown'}>
            <button type='button' className='dropdown-btn' onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
export default Navbar