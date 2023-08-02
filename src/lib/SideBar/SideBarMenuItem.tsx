import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ISideBarMenuItem } from "./ISideBarMenuItem";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { NavItem, Collapse } from "reactstrap";
import { useSideBarMenuContext } from "./SideBarMenuContext";

interface SideBarMenuItemProps {
  item: ISideBarMenuItem;
  depth?: number;
}

const SideBarMenuItem = ({ item, depth = 0 }: SideBarMenuItemProps) => {
  const { toggleItem, LinkRenderer } = useSideBarMenuContext();

  const hasChildren = (item.children?.length || 0) > 0;
  const isOpen = item?.expanded === true;

  if (item.display === false) {
    return null;
  }

  return (
    <>
      <div>
        <NavItem
          onClick={() => toggleItem(item.id)}
          className={classNames({ "menu-open": isOpen })}
          style={{ paddingLeft: `${0.5 * depth}rem` }}
        >
          {hasChildren ? (
            <>
              <div className={classNames({ dropend: !isOpen })}>
                <a role="button" className={classNames("nav-link", { "dropdown-toggle": hasChildren })}>
                  <div className="d-flex">
                    {item.icon && <FontAwesomeIcon icon={item.icon as IconProp} className="me-2" />}
                    <div className="text-justify">{item.title}</div>
                  </div>
                </a>
              </div>
            </>
          ) : (
            <>
              <LinkRenderer item={item}>
                <span className="nav-link">
                  {item.icon && <FontAwesomeIcon icon={item.icon as IconProp} className="me-2" />}
                  {item.title}
                </span>
              </LinkRenderer>
            </>
          )}
        </NavItem>
        {hasChildren && (
          <Collapse isOpen={isOpen} navbar className={classNames("items-menu", { "mb-1": isOpen })}>
            {item.children?.map((item, index) => (
              <SideBarMenuItem key={index} item={item} depth={depth + 1}></SideBarMenuItem>
            ))}
          </Collapse>
        )}
      </div>
    </>
  );
};

export { SideBarMenuItem };
