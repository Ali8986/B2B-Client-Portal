import { useEffect, useState } from "react";
import { Drawer, Divider, List } from "@mui/material";
import SearchAppBar from "../../Components/GeneralComponents/searchBar";
import Logo from "../../Components/SideBar/SideBarLogo";
import SidebarOption from "../../Components/SideBar/SideBarOptions";
import SidebarSubMenu from "../../Components/SideBar/SideBarSubMenu";
import { options } from "../../Components/SideBar/SideBarConfig";

const AppSidebar = ({
  drawerWidth,
  container,
  mobileOpen,
  handleDrawerClose,
}) => {
  const [openSubmenus, setOpenSubmenus] = useState(() => {
    const storedValue = localStorage.getItem("openSubmenus");
    return storedValue ? JSON.parse(storedValue) : {};
  });
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchInput(query);
    const results = options
      .map((item) => {
        if (item.title.toLowerCase().includes(query)) {
          return item;
        }
        const filteredChildren = item.children?.filter((child) =>
          child.title.toLowerCase().includes(query)
        );
        if (filteredChildren && filteredChildren.length > 0) {
          return { ...item, children: filteredChildren };
        }
        return null;
      })
      .filter(Boolean);
    setFilteredResults(results);
  };

  const handleSubmenuToggle = (key) => {
    setOpenSubmenus((prevOpenSubmenus) => {
      const newOpenSubmenus = {
        ...prevOpenSubmenus,
        [key]: !prevOpenSubmenus[key],
      };
      localStorage.setItem("openSubmenus", JSON.stringify(newOpenSubmenus));
      return newOpenSubmenus;
    });
  };

  const handleMobileViewChange = () => {
    if (mobileOpen) handleDrawerClose();
  };

  const drawerContent = (
    <>
      <Logo />
      <div className="Search-Bar">
        <SearchAppBar
          handleSearchChange={handleSearchChange}
          searchInput={searchInput}
          filteredResults={filteredResults}
        />
      </div>
      <Divider className="divider" />
      <List className="Main-Menu-list">
        {(filteredResults.length === 0 ? options : filteredResults).map(
          (option) =>
            option.children ? (
              <SidebarSubMenu
                key={option.title}
                option={option}
                isOpen={!!openSubmenus[option.title]}
                handleToggle={() => handleSubmenuToggle(option.title)}
                handleMobileViewChange={handleMobileViewChange}
              />
            ) : (
              <SidebarOption
                key={option.title}
                option={option}
                handleMobileViewChange={handleMobileViewChange}
              />
            )
        )}
      </List>
    </>
  );

  useEffect(() => {
    const storedOpenSubmenus = localStorage.getItem("openSubmenus");
    if (storedOpenSubmenus !== null) {
      setOpenSubmenus(JSON.parse(storedOpenSubmenus));
    }
  }, []);

  return (
    <div
      className="drawer-container"
      style={{ "--drawer-width": `${drawerWidth}px` }}
    >
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerClose}
        sx={{
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        className="drawer-temporary"
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        className="drawer-permanent"
        open
      >
        {drawerContent}
      </Drawer>
    </div>
  );
};

export default AppSidebar;
