import Navbar from './Navbar';

type MenubarProps = {
    children: React.ReactNode;
  };

const Menubar = ( {children} : MenubarProps ) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Menubar;