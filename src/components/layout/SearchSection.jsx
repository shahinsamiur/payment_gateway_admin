import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  OutlinedInput,
  Popover,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { extractLastLevelMenus } from "@/config/menu";
import { useDebouncer } from "@/hooks/useDebouncer";
import { useRouter } from "next/navigation";

function SearchSection() {
  const searchInputRef = useRef(null);
  const [value, setValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const searchValue = useDebouncer(value, 500);
  const menus = extractLastLevelMenus();
  const [filteredMenus, setFilteredMenus] = useState(menus);
  const router = useRouter();

  // Handle Ctrl + K shortcut
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        const searchInput = searchInputRef.current;
        if (searchInput) {
          searchInput.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter menus
  useEffect(() => {
    if (searchValue) {
      const filtered = menus.filter((menu) =>
        menu.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredMenus(filtered);
    } else {
      setFilteredMenus(menus);
    }
  }, [searchValue]);

  // Handlers for focus/blur
  const handleFocus = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setAnchorEl(null);
    }, 100);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <OutlinedInput
        inputRef={searchInputRef}
        fullWidth
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Ctrl + K"
      />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        disableAutoFocus
        disableEnforceFocus
        slotProps={{
          paper: {
            sx: {
              width: anchorEl
                ? anchorEl.getBoundingClientRect().width
                : undefined,
            },
          },
        }}
      >
        <List sx={{ width: "100%", maxHeight: 300, overflow: "auto" }}>
          {filteredMenus.length > 0 ? (
            filteredMenus.map((menu, idx) => (
              <ListItemButton
                key={idx}
                onClick={() => {
                  router.push(menu.path);
                  setAnchorEl(null);
                  setValue("");
                }}
              >
                <ListItemText primary={menu.title} />
              </ListItemButton>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No matches found" />
            </ListItem>
          )}
        </List>
      </Popover>
    </Box>
  );
}

export default SearchSection;
