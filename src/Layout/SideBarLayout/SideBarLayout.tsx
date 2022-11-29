import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { PropsWithChildren, ReactNode, useState } from "react";
import SideBarMenu from "src/SideBar/SideBarMenu";
import "../../../styles/Layout/SideBarLayout.scss";
import { SideBarLayoutContent } from "./SideBarLayoutContent";
import { useSideBarLayoutContext } from "./SideBarLayoutContext";

interface SideBarLayoutProps extends PropsWithChildren {
  brand?: ReactNode;
  footer?: ReactNode;
}

export const SideBarLayout = (props: SideBarLayoutProps) => {
  const { brand, children, footer } = props;

  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const { brand: contextBrand } = useSideBarLayoutContext();

  return (
    <>
      <nav id="nav-top" className="navbar navbar-expand navbar-dark">
        {/* Navbar Brand*/}
        <div className="navbar-brand">{brand ?? contextBrand}</div>
        
        {/* Sidebar Toggle*/}
        <button id="sidebar-toggle" className="btn btn-link btn-sm order-0 me-lg-0" onClick={() => toggleSidebar()}>
          <FontAwesomeIcon icon={faBars} size="2x" />
        </button>

        {/* <NavbarUser /> */}
      </nav>
      <section id="layout-sidenav" className={classNames({ toggled: !isOpen })}>
        <SideBarMenu />
        <SideBarLayoutContent footer={footer}>{children}</SideBarLayoutContent>
      </section>
    </>
  );
};
