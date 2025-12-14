"use client";
import { setTheme } from "@/redux/slices/layoutSlice";
import darkTheme from "@/styles/theme/darkTheme";
import lightTheme from "@/styles/theme/theme";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as MuiTheme } from "@mui/material/styles";
import { useServerInsertedHTML } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const options = { key: "mui" };

export default function ThemeProvider({ children }) {
  const { themeMode } = useSelector((state) => state.layout);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedTheme = localStorage.getItem("themeMode");
    if (savedTheme) {
      dispatch(setTheme(savedTheme));
    }
  }, [dispatch]);

  const theme = useMemo(
    () => (themeMode === "light" ? lightTheme : darkTheme),
    [themeMode]
  );

  const [{ cache, flush }] = React.useState(() => {
    const cache = createCache(options);
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <MuiTheme theme={theme}>
        <CssBaseline />
        {children}
      </MuiTheme>
    </CacheProvider>
  );
}
