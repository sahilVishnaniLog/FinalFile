//light mode color boundaries  and tooltip labels

const colorBoundariesLight = [
  { start: "#f7f7f7", end: "#b7b9be", popperLabel: "Stone gray" }, // start = top-left, end = bottom--right
  { start: "#cfe1fd", end: "#eed8fc", popperLabel: "Space Purple" },
  { start: "#e8f1fe", end: "#689ef1", popperLabel: "Polished Blue" },
  { start: "#e6f9ff", end: "#6dc3e0", popperLabel: "Serious Teal" },
  { start: "#dbfff0", end: "#4dcf98", popperLabel: "Canply Green" },
  { start: "#fdd0ec", end: "#fd9992", popperLabel: "Peach Brulee" },
  { start: "#f0f1f2", end: "#f0f1f2", popperLabel: "Gray" },
  { start: "#f8eefe", end: "#f8eefe", popperLabel: "Purple" },
  { start: "#e9f2fe", end: "#e9f2fe", popperLabel: "Blue" },
  { start: "#e7f9ff", end: "#e7f9ff", popperLabel: "Teal" },
  { start: "#dcfff1", end: "#dcfff1", popperLabel: "Green" },
  { start: "#ffecf8", end: "#ffecf8", popperLabel: "Peach" },
  { start: "#ffffff", end: "#ffffff", popperLabel: "none(white)" },
];

// dark mode colors

const colorBoundariesDark = [
  { start: "#292b2f", end: "#6b6e76", popperLabel: "Stone gray" },
  { start: "#133263", end: "#48245d", popperLabel: "Space Purple" },
  { start: "#1c2b43", end: "#1868da", popperLabel: "Polished Blue" },
  { start: "#1e3238", end: "#227c9a", popperLabel: "Serious Teal" },
  { start: "#1c342a", end: "#1f845a", popperLabel: "Canopy Green" },
  { start: "#50253f", end: "#ad2e24", popperLabel: "Peach Brŭlĕe" },
  { start: "#242528", end: "#242528", popperLabel: "Gray" },
  { start: "#48245d", end: "#48245d", popperLabel: "Purple" },
  { start: "#1c2b42", end: "#1c2b42", popperLabel: "Blue" },
  { start: "#164555", end: "#164555", popperLabel: "Teal" },
  { start: "#164b35", end: "#164b35", popperLabel: "Green" },
  { start: "#50253f", end: "#50253f", popperLabel: "Peach" },
  { start: "#1f1f21", end: "#1f1f21", popperLabel: "none(black)" },
];

//"linear-gradient(45deg, #FFC700, #E91E63)"
const backgroundString = (modeChoice) =>
  (modeChoice === "light" ? colorBoundariesLight : colorBoundariesDark).map(
    (color) => {
      return {
        background: `linear-gradient(135deg, ${color.start}, ${color.end})`,
        label: color.popperLabel,
      };
    }
  );

export default backgroundString;
