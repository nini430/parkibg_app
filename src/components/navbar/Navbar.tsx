import { Link } from 'react-router-dom';

import Logo from '../logo/Logo';

const Navbar = () => {
  return (
    <div className="flex justify-between  items-center h-20  px-4 border border-b-gray-200 w-full sticky top-0">
      <Link to="/">
        <Logo />
      </Link>
      User
    </div>
  );
};

export default Navbar;
