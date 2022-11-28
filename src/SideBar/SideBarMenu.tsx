import { useSideBarMenuContext } from "./SideBarMenuContext";
import { SideBarMenuItem } from "./SideBarMenuItem";

const SideBarMenu = () => {
  const { items } = useSideBarMenuContext();

  return (
    <div id="layout-sidenav__nav">
      <nav className="sb-sidenav accordion sb-sidenav-dark">
        <div className="sb-sidenav-menu">
          <div className="nav">
            {items?.map((x, i) => (
              <SideBarMenuItem key={i} item={x} />
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SideBarMenu;
