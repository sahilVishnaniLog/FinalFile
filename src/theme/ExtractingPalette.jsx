import React, { useState, useRef ,useCallback , useEffect} from "react";
import { useTheme } from "./ThemeContext.jsx";
import { defaultPalette } from "../assets/defaultPalette.js"; //  default palette from the defaultPalette.js file

export default function ExtractingPalette() {
  const { backgroundImg, paletteX, setPaletteX } = useTheme();

  const extractPaletteFromImageData = useCallback( (ImageData, colorCount=6 ) => { 
    const getAvgArray = (arr) => { 
      if(!arr || arr.length === 0 ) return 
    }

  }


  useEffect(() => {
    if (backgroundImg) {
      handlebackgroundImageChange();
    } else {
      setPaletteX(defaultPalette);
      return; // when there is no background image to fetch the palette from set the palette to default palette
    }
  }, [backgroundImg]);

  return (
    <div aria-label="Extracting palette is mounted ">
      {" "}
      Extracting Palette is mounted{" "}
    </div>
  );
}
