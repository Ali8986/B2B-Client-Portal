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
  const [inboxOpen, setInboxopen] = useState(() => {
    const storedValue = localStorage.getItem("inboxOpen");
    return storedValue ? JSON.parse(storedValue) : true;
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
          if (filteredResults) {
            setInboxopen(true);
          } else {
            setInboxopen(false);
          }
          return { ...item, children: filteredChildren };
        }
        return null;
      })
      .filter(Boolean);
    setFilteredResults(results);
  };
  const handleInboxOpen = () => {
    const newInboxOpen = !inboxOpen;
    setInboxopen(newInboxOpen);
    localStorage.setItem("inboxOpen", JSON.stringify(newInboxOpen));
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
      <>
        {filteredResults.length === 0 ? (
          <List className="Main-Menu-list">
            {options.map((option) =>
              option.children ? (
                <SidebarSubMenu
                  key={option.title}
                  option={option}
                  inboxOpen={inboxOpen}
                  handleInboxOpen={handleInboxOpen}
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
        ) : (
          <List className="Main-Menu-list">
            {filteredResults.map((option) =>
              option.children && option.children.length > 0 ? (
                <SidebarSubMenu
                  key={option.title}
                  option={option}
                  inboxOpen={inboxOpen}
                  handleInboxOpen={handleInboxOpen}
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
        )}
      </>
    </>
  );
  useEffect(() => {
    const storedInboxOpen = localStorage.getItem("inboxOpen");
    if (storedInboxOpen !== null) {
      setInboxopen(JSON.parse(storedInboxOpen));
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
