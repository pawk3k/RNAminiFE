import { FunctionComponent } from 'react';

const HamburgerMenu: FunctionComponent<{ isOpen: boolean }> = ({ isOpen }) => (
  <div className="w-6 flex flex-col items-center justify-center relative">
    <span
      className={` ${
        isOpen ? 'translate-y-0 rotate-45 ' : '-translate-y-2'
      }  transform transition w-full h-px bg-current absolute" `}
    />

    <div
      className={` ${
        isOpen ? 'opacity-0 translate-x-3' : 'opacity-100'
      } transform transition w-full h-px bg-current absolute" `}
    />
    <span
      className={` ${
        isOpen ? '-translate-y-0.5 -rotate-45 ' : 'translate-y-2'
      } transform transition w-full h-px bg-current absolute" `}
    />
  </div>
);
export default HamburgerMenu;
