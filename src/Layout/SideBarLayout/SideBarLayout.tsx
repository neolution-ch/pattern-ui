import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { PropsWithChildren, ReactNode, useState } from "react";
import { DropdownMenu, DropdownToggle, Nav, NavItem, UncontrolledDropdown } from "reactstrap";
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

  const { brand: contextBrand, userDropDownMenu, userDropDownMenuToggle } = useSideBarLayoutContext();

  return (
    <>
      <nav id="nav-top" className="navbar navbar-expand navbar-dark">
        {/* Sidebar Toggle*/}
        <button id="sidebar-toggle" className="btn btn-link btn-sm order-0 me-lg-0" onClick={() => toggleSidebar()}>
          <FontAwesomeIcon icon={faBars} size="2x" />
        </button>
        {/* Navbar Brand*/}
        <div className="navbar-brand me-auto">{brand ?? contextBrand}</div>
        {/* <NavbarUser /> */}
        <Nav className="ms-auto" pills>
          <NavItem>
            <UncontrolledDropdown>
              <DropdownToggle nav className="user-dropdown">
                {userDropDownMenuToggle}
              </DropdownToggle>
              <DropdownMenu>{userDropDownMenu}</DropdownMenu>
            </UncontrolledDropdown>
          </NavItem>
        </Nav>
      </nav>
      <section id="layout-sidenav" className={classNames({ toggled: !isOpen })}>
        <SideBarMenu />
        <SideBarLayoutContent footer={footer}>{children}</SideBarLayoutContent>
      </section>
    </>
  );
};
