import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config.js";

const { theme } = resolveConfig(tailwindConfig);

export const darkStyles = {
  control: (provided, state) => {
    const borderColor = theme.colors.dark[700];

    return {
      ...provided,
      backgroundColor: theme.colors.dark[800],
      borderColor,
    };
  },

  input: (provided) => {
    return { ...provided, color: "white" };
  },
  singleValue: (provided) => {
    return { ...provided, color: "white", fontSize: theme.fontSize.xs };
  },
  dropdownIndicator: (provided, state) => {
    const color = state.isActive ? "gray" : "white";
    return { ...provided, color };
  },
  groupHeading: (provided, state) => {
    const color = "white";
    const fontWeight = 600;
    return { ...provided, color, fontWeight };
  },
  option: (provided, state) => {
    const backgroundColor = state.isFocused
      ? theme.colors.dark[600]
      : theme.colors.dark[700];
    const color = theme.colors.dark[200];
    const borderColor = "white";
    return { ...provided, backgroundColor, color };
  },
  menu: (provided, state) => {
    const backgroundColor = theme.colors.dark[700];

    return { ...provided, backgroundColor };
  },
};

export const lightStyles = {
  control: (provided, state) => {
    return {
      ...provided,
      width: "100% !important",
      display: "inline-flex !important",
      alignItems: "center !important",
      borderWidth: "1px !important",
      fontSize: ".875rem !important",
      lineHeight: "1.25rem !important",
      borderRadius: ".5rem !important",
      fontWeight: "500 !important",
      borderStyle: "none !important",
      boxShadow:
        "0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06) !important",
      transitionProperty:
        "background-color,border-color,color,fill,stroke,opacity,box-shadow,transform !important",
      transitionDuration: ".15s !important",
      transitionTimingFunction: "cubic-bezier(.4,0,.2,1) !important",
    };
  },
};

export const greenStyles = {
  option: (provided, state) => {
    const backgroundColor = state.isFocused
      ? theme.colors.green[200]
      : theme.colors.green[100];
    const color = theme.colors.green[800];

    return {
      backgroundColor,
      color,

      "&:hover": {
        backgroundColor: theme.colors.green[300],
      },
    };
  },

  control: (provided, state) => {
    const border = state.isFocused ? 1 : 0;

    return {
      ...provided,
      backgroundColor: theme.colors.green[600],
      color: theme.colors.green[800],
      // This line disable the blue border
      border: 0,
      boxShadow: "none",
      width: "100% !important",

      "&:hover": {
        backgroundColor: theme.colors.green[500],
      },
    };
  },

  placeholder: (provided, state) => {
    return {
      ...provided,
      fontWeight: 500,
      color: theme.colors.white,
    };
  },

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, fontWeight: 500, color: theme.colors.white };
  },

  dropdownIndicator: (provided, state) => {
    const color = state.isActive ? "gray" : "white";
    return { ...provided, color };
  },

  // input: (provided) => {
  //   return { ...provided, color: "white" };
  // },
  // singleValue: (provided) => {
  //   return { ...provided, color: "white", fontSize: theme.fontSize.sm };
  // },
  // dropdownIndicator: (provided, state) => {
  //   const color = state.isActive ? "gray" : "white";
  //   return { ...provided, color };
  // },
  // groupHeading: (provided, state) => {
  //   const color = "white";
  //   const fontWeight = 600;
  //   return { ...provided, color, fontWeight };
  // },
  // option: (provided, state) => {
  //   const backgroundColor = state.isFocused
  //     ? theme.colors.green[200]
  //     : theme.colors.green[100];
  //   const color = theme.colors.green[800];

  //   return { ...provided, backgroundColor, color, fontWeight: 500 };
  // },
  // menu: (provided, state) => {
  //   const backgroundColor = theme.colors.dark[700];

  //   return { ...provided, backgroundColor };
  // },
};
