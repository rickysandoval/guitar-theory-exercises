import { ThemeType } from "grommet";

const theme: ThemeType = {
  "global": {
    "colors": {
      "brand": "#5a189a",
      'brand-contrast': '#7D22D8',
      active: '#7A1859',
      "background": "#FFFFFF",
      "background-back": "#EEEEEE",
      "background-front":  "#FFFFFF",
      "background-contrast": "#fafafa",
      "text": "#333333",
      "text-light": "#EEEEEE",
      "text-strong": "#000000",
      "text-weak": "#444444",
      "text-xweak": "#666666",
      "border": "rgba(0,0,0,.12)",
      "control": "brand",
      "active-background": "background-contrast",
      "active-text": "text-strong",
      "selected-background": "brand",
      "selected-text": "text-strong",
      "status-critical": "#FF4040",
      "status-warning": "#FFAA15",
      "status-ok": "#00C781",
      "status-unknown": "#CCCCCC",
      "status-disabled": "#CCCCCC",
      "dark-1": "#333333",
      "dark-2": "#555555",
      "dark-3": "#777777",
      "dark-4": "#999999",
      "dark-5": "#999999",
      "dark-6": "#999999",
      "light-1": "#F8F8F8",
      "light-2": "#F2F2F2",
      "light-3": "#EDEDED",
      "light-4": "#DADADA",
      "light-5": "#DADADA",
      "light-6": "#DADADA",
    },
    "font": {
      "family": "Helvetica",
      "size": "16px",
      "height": "24px",
      "maxWidth": "432px"
    },
    "active": {
      "background": "active-background",
      "color": "active-text"
    },
    "hover": {
      "background": "active-background",
      "color": "active-text"
    },
    "selected": {
      "background": "selected-background",
      "color": "selected-text"
    },
    "control": {
      "border": {
        "radius": "2px"
      }
    },
    "drop": {
      "border": {
        "radius": "2px"
      }
    },
    "borderSize": {
      "xsmall": "1px",
      "small": "2px",
      "medium": "4px",
      "large": "12px",
      "xlarge": "24px"
    },
    "breakpoints": {
      "small": {
        "value": 768,
        "borderSize": {
          "xsmall": "1px",
          "small": "2px",
          "medium": "4px",
          "large": "6px",
          "xlarge": "12px"
        },
        "edgeSize": {
          "none": "0px",
          "hair": "1px",
          "xxsmall": "2px",
          "xsmall": "3px",
          "small": "6px",
          "medium": "12px",
          "large": "24px",
          "xlarge": "48px"
        },
        "size": {
          "xxsmall": "24px",
          "xsmall": "48px",
          "small": "96px",
          "medium": "192px",
          "large": "384px",
          "xlarge": "768px",
          "full": "100%"
        }
      },
      "medium": {
        "value": 1536
      },
      "large": {}
    },
    "edgeSize": {
      "none": "0px",
      "hair": "1px",
      "xxsmall": "3px",
      "xsmall": "6px",
      "small": "12px",
      "medium": "24px",
      "large": "48px",
      "xlarge": "96px",
      "responsiveBreakpoint": "small"
    },
    "input": {
      "padding": "12px",
      "weight": 600
    },
    "spacing": "24px",
    "size": {
      "xxsmall": "48px",
      "xsmall": "96px",
      "small": "192px",
      "medium": "384px",
      "large": "768px",
      "xlarge": "1152px",
      "xxlarge": "1536px",
      "full": "100%"
    }
  },
  "chart": {},
  "diagram": {
    "line": {}
  },
  "meter": {},
  "button": {
    default: {
      background: { color: 'background-contrast' },
      color: 'text',
      padding: {
        horizontal: '10px',
        vertical: '6px',
      },
      border: {
        radius: '0px',
      } as any,
    },
    primary: {
      background: { color: 'brand' },
      color: 'text-light',
      font: { weight: 'bold' },
      padding: {
        horizontal: '22px',
        vertical: '6px',
      }
    },
    secondary: {
      border: { color: 'brand', width: '2px' },
      color: 'brand',
      font: { weight: 'bold' },
      padding: {
        horizontal: '22px',
        vertical: '6px',
      }
    },
    active: {
      background: { color: 'brand-contrast' },
    },
    hover: {
      background: { color: 'light-3' },
      primary: {
        background: { color: 'active' },
        color: 'text-light',
      },
      secondary: {
        border: { color: 'active' },
      },
    },
    disabled: {
      
    },
    extend: (props) => {
      if (!props.plain) {
        return  'font-size: 18px';
      }
      return '';
    }
  },
  "checkBox": {
    "check": {
      "radius": "2px"
    },
    "toggle": {
      "radius": "24px",
      "size": "48px"
    },
    "size": "24px"
  },
  "radioButton": {
    "size": "24px"
  },
  "formField": {
    "border": {
      "color": "border",
      "error": {
        "color": {
          "dark": "white",
          "light": "status-critical"
        }
      },
      "position": "inner",
      "side": "bottom"
    },
    "content": {
      "pad": "small"
    },
    "disabled": {
      "background": {
        "color": "status-disabled",
        "opacity": "medium"
      }
    },
    "error": {
      "color": "status-critical",
      "margin": {
        "vertical": "xsmall",
        "horizontal": "small"
      }
    },
    "help": {
      "color": "dark-3",
      "margin": {
        "start": "small"
      }
    },
    "info": {
      "color": "text-xweak",
      "margin": {
        "vertical": "xsmall",
        "horizontal": "small"
      }
    },
    "label": {
      "margin": {
        "vertical": "xsmall",
        "horizontal": "small"
      }
    },
    "margin": {
      "bottom": "small"
    },
    "round": "2px"
  },
  "calendar": {
    "small": {
      "fontSize": "16px",
      "lineHeight": 1.375,
      "daySize": "27.43px"
    },
    "medium": {
      "fontSize": "18px",
      "lineHeight": 1.45,
      "daySize": "54.86px"
    },
    "large": {
      "fontSize": "24px",
      "lineHeight": 1.11,
      "daySize": "109.71px"
    }
  },
  "clock": {
    "analog": {
      "hour": {
        "width": "8px",
        "size": "24px"
      },
      "minute": {
        "width": "4px",
        "size": "12px"
      },
      "second": {
        "width": "3px",
        "size": "9px"
      },
      "size": {
        "small": "72px",
        "medium": "96px",
        "large": "144px",
        "xlarge": "216px",
        "huge": "288px"
      }
    },
    "digital": {
      "text": {
        "xsmall": {
          "size": "14px",
          "height": 1.5
        },
        "small": {
          "size": "16px",
          "height": 1.43
        },
        "medium": {
          "size": "18px",
          "height": 1.375
        },
        "large": {
          "size": "20px",
          "height": 1.167
        },
        "xlarge": {
          "size": "22px",
          "height": 1.1875
        },
        "xxlarge": {
          "size": "26px",
          "height": 1.125
        }
      }
    }
  },
  "heading": {
    "level": {
      "1": {
        "small": {
          "size": "26px",
          "height": "32px",
          "maxWidth": "624px"
        },
        "medium": {
          "size": "34px",
          "height": "40px",
          "maxWidth": "816px"
        },
        "large": {
          "size": "50px",
          "height": "56px",
          "maxWidth": "1200px"
        },
        "xlarge": {
          "size": "66px",
          "height": "72px",
          "maxWidth": "1584px"
        }
      },
      "2": {
        "small": {
          "size": "24px",
          "height": "30px",
          "maxWidth": "576px"
        },
        "medium": {
          "size": "30px",
          "height": "36px",
          "maxWidth": "720px"
        },
        "large": {
          "size": "36px",
          "height": "42px",
          "maxWidth": "864px"
        },
        "xlarge": {
          "size": "42px",
          "height": "48px",
          "maxWidth": "1008px"
        }
      },
      "3": {
        "small": {
          "size": "22px",
          "height": "28px",
          "maxWidth": "528px"
        },
        "medium": {
          "size": "26px",
          "height": "32px",
          "maxWidth": "624px"
        },
        "large": {
          "size": "30px",
          "height": "36px",
          "maxWidth": "720px"
        },
        "xlarge": {
          "size": "34px",
          "height": "40px",
          "maxWidth": "816px"
        }
      },
      "4": {
        "small": {
          "size": "20px",
          "height": "26px",
          "maxWidth": "480px"
        },
        "medium": {
          "size": "22px",
          "height": "28px",
          "maxWidth": "528px"
        },
        "large": {
          "size": "24px",
          "height": "30px",
          "maxWidth": "576px"
        },
        "xlarge": {
          "size": "26px",
          "height": "32px",
          "maxWidth": "624px"
        }
      },
      "5": {
        "small": {
          "size": "17px",
          "height": "23px",
          "maxWidth": "408px"
        },
        "medium": {
          "size": "17px",
          "height": "23px",
          "maxWidth": "408px"
        },
        "large": {
          "size": "17px",
          "height": "23px",
          "maxWidth": "408px"
        },
        "xlarge": {
          "size": "17px",
          "height": "23px",
          "maxWidth": "408px"
        }
      },
      "6": {
        "small": {
          "size": "16px",
          "height": "22px",
          "maxWidth": "384px"
        },
        "medium": {
          "size": "16px",
          "height": "22px",
          "maxWidth": "384px"
        },
        "large": {
          "size": "16px",
          "height": "22px",
          "maxWidth": "384px"
        },
        "xlarge": {
          "size": "16px",
          "height": "22px",
          "maxWidth": "384px"
        }
      }
    }
  },
  "paragraph": {
    "small": {
      "size": "14px",
      "height": "23px",
      "maxWidth": "408px"
    },
    "medium": {
      "size": "16px",
      "height": "24px",
      "maxWidth": "432px"
    },
    "large": {
      "size": "18px",
      "height": "26px",
      "maxWidth": "480px"
    },
    "xlarge": {
      "size": "20px",
      "height": "28px",
      "maxWidth": "528px"
    },
    "xxlarge": {
      "size": "22px",
      "height": "32px",
      "maxWidth": "624px"
    }
  },
  "text": {
    "xsmall": {
      "size": "12px",
      "height": "22px",
      "maxWidth": "384px"
    },
    "small": {
      "size": "14px",
      "height": "23px",
      "maxWidth": "408px"
    },
    "medium": {
      "size": "16px",
      "height": "24px",
      "maxWidth": "432px"
    },
    "large": {
      "size": "18px",
      "height": "26px",
      "maxWidth": "480px"
    },
    "xlarge": {
      "size": "22px",
      "height": "28px",
      "maxWidth": "528px"
    },
    "xxlarge": {
      "size": "26px",
      "height": "32px",
      "maxWidth": "624px"
    }
  },
}

export default theme;
