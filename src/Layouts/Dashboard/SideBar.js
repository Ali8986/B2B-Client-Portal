import React from "react";
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
  const [searchInput, setSearchInput] = React.useState(""); // Search input state
  const [filteredResults, setFilteredResults] = React.useState([]); // Filtered results state

  // Function to handle search input change
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchInput(query);

    // Filter data based on search input
    const results = options.filter((item) =>
      item.title.toLowerCase().includes(query)
    );
    setFilteredResults(results);
  };

  const [inboxOpen, setInboxopen] = React.useState(false);
  const handleInboxOpen = () => setInboxopen(!inboxOpen);

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
            {filteredResults.map((option) => (
              <SidebarOption
                key={option.title}
                option={option}
                handleMobileViewChange={handleMobileViewChange}
              />
            ))}
          </List>
        )}
      </>
    </>
  );

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
