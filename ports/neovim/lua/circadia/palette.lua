local M = {}

M.modes = {
  "light_parchment = {
    name = "Warm Parchment",
    type = "light",
    character = "Daylight / Reading / Cellulose Cast",
    "ui = {
      "bg_canvas = {
        hex = "#f7f2e6",
        oklch = "oklch(96.0% 0.013 85)",
        rgb = [
          247,
          242,
          230
        ]
      },
      "bg_surface = {
        hex = "#eee7d6",
        oklch = "oklch(92.5% 0.016 85)",
        rgb = [
          238,
          231,
          214
        ]
      },
      "bg_element = {
        hex = "#e5dcc6",
        oklch = "oklch(88.5% 0.020 85)",
        rgb = [
          229,
          220,
          198
        ]
      },
      "border = {
        hex = "#d7cdb7",
        oklch = "oklch(83.0% 0.022 85)",
        rgb = [
          215,
          205,
          183
        ]
      },
      "text_primary = {
        hex = "#28323a",
        oklch = "oklch(30.0% 0.020 250)",
        rgb = [
          40,
          50,
          58
        ]
      },
      "text_muted = {
        hex = "#46535f",
        oklch = "oklch(43.0% 0.025 250)",
        rgb = [
          70,
          83,
          95
        ]
      },
      "text_faint = {
        hex = "#43505c",
        oklch = "oklch(42.0% 0.020 250)",
        rgb = [
          67,
          80,
          92
        ]
      },
      "accent = {
        hex = "#0048b3",
        oklch = "oklch(43.8% 0.181 260)",
        rgb = [
          0,
          72,
          179
        ]
      }
    },
    "headings = {
      "h1 = {
        hex = "#1c4470",
        oklch = "oklch(36.0% 0.090 250)",
        rgb = [
          28,
          68,
          112
        ]
      },
      "h2 = {
        hex = "#20538a",
        oklch = "oklch(42.0% 0.100 250)",
        rgb = [
          32,
          83,
          138
        ]
      },
      "h3 = {
        hex = "#1c60a2",
        oklch = "oklch(46.0% 0.110 250)",
        rgb = [
          28,
          96,
          162
        ]
      },
      "h4 = {
        hex = "#236bb5",
        oklch = "oklch(49.0% 0.115 250)",
        rgb = [
          35,
          107,
          181
        ]
      },
      "h5 = {
        hex = "#286fc0",
        oklch = "oklch(51.0% 0.115 250)",
        rgb = [
          40,
          111,
          192
        ]
      },
      "h6 = {
        hex = "#2f75c6",
        oklch = "oklch(52.5% 0.115 250)",
        rgb = [
          47,
          117,
          198
        ]
      }
    },
    "syntax = {
      "keyword = {
        hex = "#0048b3",
        oklch = "oklch(43.8% 0.181 260)",
        rgb = [
          0,
          72,
          179
        ]
      },
      "type = {
        hex = "#843900",
        oklch = "oklch(44.2% 0.162 62)",
        rgb = [
          132,
          57,
          0
        ]
      },
      "function = {
        hex = "#7a1f7a",
        oklch = "oklch(42.4% 0.164 328)",
        rgb = [
          122,
          31,
          122
        ]
      },
      "property = {
        hex = "#4b1fa3",
        oklch = "oklch(39.4% 0.192 290)",
        rgb = [
          75,
          31,
          163
        ]
      },
      "variable = {
        hex = "#364450",
        oklch = "oklch(37.9% 0.027 245)",
        rgb = [
          54,
          68,
          80
        ]
      },
      "string = {
        hex = "#005f2f",
        oklch = "oklch(42.5% 0.110 153)",
        rgb = [
          0,
          95,
          47
        ]
      },
      "number = {
        hex = "#095b62",
        oklch = "oklch(42.5% 0.080 204)",
        rgb = [
          9,
          91,
          98
        ]
      },
      "tag = {
        hex = "#0048b3",
        oklch = "oklch(43.8% 0.181 260)",
        rgb = [
          0,
          72,
          179
        ]
      },
      "comment = {
        hex = "#524b42",
        oklch = "oklch(42.0% 0.018 71)",
        rgb = [
          82,
          75,
          66
        ]
      }
    }
  },
  "dark_ember = {
    name = "Dark Classic (Warm Ember & Espresso)",
    type = "dark",
    character = "Warm / Candlelight / Earth / Editorial & Warm-Lit Setups",
    "ui = {
      "bg_canvas = {
        hex = "#17130f",
        oklch = "oklch(19.0% 0.010 67)",
        rgb = [
          23,
          19,
          15
        ]
      },
      "bg_surface = {
        hex = "#1e1a15",
        oklch = "oklch(22.0% 0.012 67)",
        rgb = [
          30,
          26,
          21
        ]
      },
      "bg_element = {
        hex = "#29241e",
        oklch = "oklch(26.0% 0.015 67)",
        rgb = [
          41,
          36,
          30
        ]
      },
      "border = {
        hex = "#3b342b",
        oklch = "oklch(33.0% 0.018 67)",
        rgb = [
          59,
          52,
          43
        ]
      },
      "text_primary = {
        hex = "#c9c0b1",
        oklch = "oklch(81.1% 0.023 81)",
        rgb = [
          201,
          192,
          177
        ]
      },
      "text_muted = {
        hex = "#aba195",
        oklch = "oklch(70.0% 0.018 81)",
        rgb = [
          171,
          161,
          149
        ]
      },
      "text_faint = {
        hex = "#91887d",
        oklch = "oklch(63.0% 0.018 75)",
        rgb = [
          145,
          136,
          125
        ]
      },
      "accent = {
        hex = "#e89a49",
        oklch = "oklch(75.0% 0.130 65)",
        rgb = [
          232,
          154,
          73
        ]
      }
    },
    "headings = {
      "h1 = {
        hex = "#f8c88f",
        oklch = "oklch(86.0% 0.090 75)",
        rgb = [
          248,
          200,
          143
        ]
      },
      "h2 = {
        hex = "#f2b26c",
        oklch = "oklch(81.0% 0.100 70)",
        rgb = [
          242,
          178,
          108
        ]
      },
      "h3 = {
        hex = "#ea9d49",
        oklch = "oklch(76.0% 0.110 65)",
        rgb = [
          234,
          157,
          73
        ]
      },
      "h4 = {
        hex = "#db8935",
        oklch = "oklch(71.0% 0.110 60)",
        rgb = [
          219,
          137,
          53
        ]
      },
      "h5 = {
        hex = "#c7792e",
        oklch = "oklch(66.0% 0.100 55)",
        rgb = [
          199,
          121,
          46
        ]
      },
      "h6 = {
        hex = "#b56f2b",
        oklch = "oklch(62.0% 0.090 50)",
        rgb = [
          181,
          111,
          43
        ]
      }
    },
    "syntax = {
      "keyword = {
        hex = "#66abc6",
        oklch = "oklch(70.6% 0.080 225)",
        rgb = [
          102,
          171,
          198
        ]
      },
      "type = {
        hex = "#d9a86e",
        oklch = "oklch(76.4% 0.095 70)",
        rgb = [
          217,
          168,
          110
        ]
      },
      "function = {
        hex = "#b991db",
        oklch = "oklch(72.0% 0.114 308.5)",
        rgb = [
          185,
          145,
          219
        ]
      },
      "property = {
        hex = "#de88a6",
        oklch = "oklch(72.4% 0.111 358)",
        rgb = [
          222,
          136,
          166
        ]
      },
      "variable = {
        hex = "#c9c0b1",
        oklch = "oklch(81.1% 0.023 81)",
        rgb = [
          201,
          192,
          177
        ]
      },
      "string = {
        hex = "#8cbb62",
        oklch = "oklch(73.8% 0.129 132)",
        rgb = [
          140,
          187,
          98
        ]
      },
      "number = {
        hex = "#d99148",
        oklch = "oklch(71.5% 0.124 64)",
        rgb = [
          217,
          145,
          72
        ]
      },
      "tag = {
        hex = "#66abc6",
        oklch = "oklch(70.6% 0.080 225)",
        rgb = [
          102,
          171,
          198
        ]
      },
      "comment = {
        hex = "#a69c91",
        oklch = "oklch(68.5% 0.016 75)",
        rgb = [
          166,
          156,
          145
        ]
      }
    }
  },
  "dark_plum = {
    name = "Dark Modern (Plum Noir)",
    type = "dark",
    character = "Sharp / Energetic / Velvet / Devs & Modern UI Workflows",
    "ui = {
      "bg_canvas = {
        hex = "#140e12",
        oklch = "oklch(16.5% 0.014 350)",
        rgb = [
          20,
          14,
          18
        ]
      },
      "bg_surface = {
        hex = "#1b1419",
        oklch = "oklch(20.0% 0.015 350)",
        rgb = [
          27,
          20,
          25
        ]
      },
      "bg_element = {
        hex = "#261e23",
        oklch = "oklch(24.5% 0.018 350)",
        rgb = [
          38,
          30,
          35
        ]
      },
      "border = {
        hex = "#3d3039",
        oklch = "oklch(32.0% 0.020 350)",
        rgb = [
          61,
          48,
          57
        ]
      },
      "text_primary = {
        hex = "#d8c8d2",
        oklch = "oklch(82.5% 0.022 345)",
        rgb = [
          216,
          200,
          210
        ]
      },
      "text_muted = {
        hex = "#b4a3af",
        oklch = "oklch(71.5% 0.018 345)",
        rgb = [
          180,
          163,
          175
        ]
      },
      "text_faint = {
        hex = "#9a8b96",
        oklch = "oklch(63.5% 0.016 345)",
        rgb = [
          154,
          139,
          150
        ]
      },
      "accent = {
        hex = "#e88cb8",
        oklch = "oklch(73.0% 0.145 355)",
        rgb = [
          232,
          140,
          184
        ]
      }
    },
    "headings = {
      "h1 = {
        hex = "#f5b8d0",
        oklch = "oklch(84.0% 0.090 350)",
        rgb = [
          245,
          184,
          208
        ]
      },
      "h2 = {
        hex = "#e89bb8",
        oklch = "oklch(76.0% 0.100 350)",
        rgb = [
          232,
          155,
          184
        ]
      },
      "h3 = {
        hex = "#da7ea0",
        oklch = "oklch(68.0% 0.110 350)",
        rgb = [
          218,
          126,
          160
        ]
      },
      "h4 = {
        hex = "#c96588",
        oklch = "oklch(60.0% 0.110 350)",
        rgb = [
          201,
          101,
          136
        ]
      },
      "h5 = {
        hex = "#b84e72",
        oklch = "oklch(53.0% 0.100 350)",
        rgb = [
          184,
          78,
          114
        ]
      },
      "h6 = {
        hex = "#bd5478",
        oklch = "oklch(55.0% 0.100 350)",
        rgb = [
          189,
          84,
          120
        ]
      }
    },
    "syntax = {
      "keyword = {
        hex = "#82b4ea",
        oklch = "oklch(74.0% 0.100 240)",
        rgb = [
          130,
          180,
          234
        ]
      },
      "type = {
        hex = "#e5b084",
        oklch = "oklch(77.0% 0.100 65)",
        rgb = [
          229,
          176,
          132
        ]
      },
      "function = {
        hex = "#cb94f0",
        oklch = "oklch(73.5% 0.130 310)",
        rgb = [
          203,
          148,
          240
        ]
      },
      "property = {
        hex = "#f08bb2",
        oklch = "oklch(74.0% 0.135 358)",
        rgb = [
          240,
          139,
          178
        ]
      },
      "variable = {
        hex = "#d8c8d2",
        oklch = "oklch(82.5% 0.022 345)",
        rgb = [
          216,
          200,
          210
        ]
      },
      "string = {
        hex = "#9ec97b",
        oklch = "oklch(76.0% 0.135 132)",
        rgb = [
          158,
          201,
          123
        ]
      },
      "number = {
        hex = "#f0a256",
        oklch = "oklch(74.5% 0.135 60)",
        rgb = [
          240,
          162,
          86
        ]
      },
      "tag = {
        hex = "#82b4ea",
        oklch = "oklch(74.0% 0.100 240)",
        rgb = [
          130,
          180,
          234
        ]
      },
      "comment = {
        hex = "#ad9ca8",
        oklch = "oklch(69.5% 0.016 345)",
        rgb = [
          173,
          156,
          168
        ]
      }
    }
  },
  "dark_forest = {
    name = "Dark Focus (Obsidian Pine)",
    type = "dark",
    character = "Restorative / Organic / Deep / Data Science & Deep Terminal Work",
    "ui = {
      "bg_canvas = {
        hex = "#131714",
        oklch = "oklch(17.8% 0.010 145)",
        rgb = [
          19,
          23,
          20
        ]
      },
      "bg_surface = {
        hex = "#1a1e1b",
        oklch = "oklch(21.0% 0.012 145)",
        rgb = [
          26,
          30,
          27
        ]
      },
      "bg_element = {
        hex = "#242a25",
        oklch = "oklch(25.5% 0.015 145)",
        rgb = [
          36,
          42,
          37
        ]
      },
      "border = {
        hex = "#353c36",
        oklch = "oklch(33.0% 0.018 145)",
        rgb = [
          53,
          60,
          54
        ]
      },
      "text_primary = {
        hex = "#c4ccc5",
        oklch = "oklch(81.5% 0.018 145)",
        rgb = [
          196,
          204,
          197
        ]
      },
      "text_muted = {
        hex = "#9fa9a1",
        oklch = "oklch(69.5% 0.016 145)",
        rgb = [
          159,
          169,
          161
        ]
      },
      "text_faint = {
        hex = "#838d85",
        oklch = "oklch(60.0% 0.014 145)",
        rgb = [
          131,
          141,
          133
        ]
      },
      "accent = {
        hex = "#6ec28a",
        oklch = "oklch(74.0% 0.130 145)",
        rgb = [
          110,
          194,
          138
        ]
      }
    },
    "headings = {
      "h1 = {
        hex = "#b8e2c4",
        oklch = "oklch(86.0% 0.090 145)",
        rgb = [
          184,
          226,
          196
        ]
      },
      "h2 = {
        hex = "#9ecfae",
        oklch = "oklch(79.0% 0.100 145)",
        rgb = [
          158,
          207,
          174
        ]
      },
      "h3 = {
        hex = "#83bc97",
        oklch = "oklch(71.0% 0.100 145)",
        rgb = [
          131,
          188,
          151
        ]
      },
      "h4 = {
        hex = "#69a881",
        oklch = "oklch(63.0% 0.090 145)",
        rgb = [
          105,
          168,
          129
        ]
      },
      "h5 = {
        hex = "#569970",
        oklch = "oklch(56.0% 0.090 145)",
        rgb = [
          86,
          153,
          112
        ]
      },
      "h6 = {
        hex = "#45875e",
        oklch = "oklch(49.0% 0.080 145)",
        rgb = [
          69,
          135,
          94
        ]
      }
    },
    "syntax = {
      "keyword = {
        hex = "#72b6d1",
        oklch = "oklch(73.0% 0.090 220)",
        rgb = [
          114,
          182,
          209
        ]
      },
      "type = {
        hex = "#d6b07c",
        oklch = "oklch(76.0% 0.090 75)",
        rgb = [
          214,
          176,
          124
        ]
      },
      "function = {
        hex = "#b599de",
        oklch = "oklch(72.5% 0.110 305)",
        rgb = [
          181,
          153,
          222
        ]
      },
      "property = {
        hex = "#d98fa8",
        oklch = "oklch(72.0% 0.105 355)",
        rgb = [
          217,
          143,
          168
        ]
      },
      "variable = {
        hex = "#c4ccc5",
        oklch = "oklch(81.5% 0.018 145)",
        rgb = [
          196,
          204,
          197
        ]
      },
      "string = {
        hex = "#86cc7e",
        oklch = "oklch(75.0% 0.130 135)",
        rgb = [
          134,
          204,
          126
        ]
      },
      "number = {
        hex = "#e0a255",
        oklch = "oklch(73.5% 0.125 65)",
        rgb = [
          224,
          162,
          85
        ]
      },
      "tag = {
        hex = "#72b6d1",
        oklch = "oklch(73.0% 0.090 220)",
        rgb = [
          114,
          182,
          209
        ]
      },
      "comment = {
        hex = "#95a097",
        oklch = "oklch(67.0% 0.014 145)",
        rgb = [
          149,
          160,
          151
        ]
      }
    }
  }
}

return M
