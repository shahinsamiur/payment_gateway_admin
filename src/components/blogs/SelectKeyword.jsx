import { blogKeywords } from "@/_mock/blogs";
import { useDebouncer } from "@/hooks/useDebouncer";
import {
  Button,
  Chip,
  FormHelperText,
  List,
  ListItemButton,
  OutlinedInput,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

const SelectKeyword = ({ error, selectedKeywords, setValue }) => {
  const [keywords, setKeywords] = useState([]);
  const [keywordsValue, setKeywordsValue] = useState("");
  const keywordSearchValue = useDebouncer(keywordsValue, 500);
  const keywordsRef = useRef(null);

  useEffect(() => {
    if (keywordSearchValue) {
      const matched = blogKeywords.filter(
        (key) =>
          key.toLowerCase().includes(keywordSearchValue.toLowerCase()) &&
          !selectedKeywords.includes(key)
      );
      setKeywords(matched);
    } else {
      setKeywords([]);
    }
  }, [selectedKeywords, keywordSearchValue]);

  const handleAddKeyword = () => {
    if (keywordSearchValue && !selectedKeywords.includes(keywordSearchValue)) {
      setValue("keywords", [...selectedKeywords, keywordSearchValue], {
        shouldValidate: true,
      });
      setKeywordsValue("");
      setKeywords([]);
    }
  };

  return (
    <div>
      <Typography>Keywords</Typography>
      <FormHelperText error>{error?.message}</FormHelperText>
      <OutlinedInput
        ref={keywordsRef}
        value={keywordsValue}
        onChange={(e) => setKeywordsValue(e.target.value)}
        placeholder="Enter keywords"
        error={!!error}
      />
      <Popover
        open={!!keywordsValue}
        anchorEl={keywordsRef.current}
        onClose={() => setKeywords([])}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "bottom", horizontal: "left" }}
        disableAutoFocus
        disableEnforceFocus
        slotProps={{
          paper: {
            sx: {
              width: keywordsRef.current
                ? keywordsRef.current.getBoundingClientRect().width
                : undefined,
            },
          },
        }}
      >
        <List sx={{ maxHeight: 200, overflowY: "auto" }}>
          {keywords.length > 0 ? (
            keywords.map((key, index) => (
              <ListItemButton
                type="button"
                onClick={() => {
                  setValue("keywords", [...selectedKeywords, key], {
                    shouldValidate: true,
                  });
                  setKeywordsValue("");
                  setKeywords([]);
                }}
                key={index}
              >
                {key}
              </ListItemButton>
            ))
          ) : (
            <Stack p={2} spacing={1} alignItems="flex-start">
              <Typography variant="body2" color="text.secondary">
                No keywords match
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={handleAddKeyword}
              >
                Add "{keywordSearchValue}"
              </Button>
            </Stack>
          )}
        </List>
      </Popover>

      {selectedKeywords.length > 0 && (
        <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
          {selectedKeywords.map((key, index) => (
            <Chip
              key={index}
              label={key}
              onDelete={() => {
                setValue(
                  "keywords",
                  selectedKeywords.filter((k) => k !== key),
                  { shouldValidate: true }
                );
              }}
            />
          ))}
        </Stack>
      )}
    </div>
  );
};

export default SelectKeyword;
