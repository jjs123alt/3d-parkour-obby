const levels = [
  {
    name: "Beginner Training",
    start: { x: 0, y: 5, z: 0 },
    finish: { x: 28, y: 5, z: 0 },
    platforms: [
      { x: 0, y: 3, z: 0, w: 8, h: 1, d: 8, color: 0x1c355d },
      { x: 10, y: 3, z: 0, w: 6, h: 1, d: 6, color: 0x2d5b4f },
      { x: 18, y: 3, z: 0, w: 6, h: 1, d: 6, color: 0x2d5b4f },
      { x: 28, y: 3, z: 0, w: 4, h: 1, d: 4, color: 0x38d39b }
    ]
  },
  {
    name: "Rising Steps",
    start: { x: 0, y: 5, z: 0 },
    finish: { x: 0, y: 23, z: 40 },
    platforms: [
      { x: 0, y: 3, z: 0, w: 8, h: 1, d: 8, color: 0x1c355d },
      { x: 0, y: 8, z: 10, w: 6, h: 1, d: 6, color: 0x2d5b4f },
      { x: 0, y: 13, z: 20, w: 6, h: 1, d: 6, color: 0x2d5b4f },
      { x: 0, y: 18, z: 30, w: 6, h: 1, d: 6, color: 0x2d5b4f },
      { x: 0, y: 23, z: 40, w: 6, h: 1, d: 6, color: 0x38d39b }
    ]
  },
  {
    name: "Precision Hop",
    start: { x: 0, y: 5, z: 0 },
    finish: { x: 45, y: 5, z: 0 },
    platforms: [
      { x: 0, y: 3, z: 0, w: 8, h: 1, d: 8, color: 0x1c355d },
      { x: 12, y: 3, z: 0, w: 3, h: 1, d: 8, color: 0x2d5b4f },
      { x: 22, y: 3, z: 0, w: 3, h: 1, d: 8, color: 0x2d5b4f },
      { x: 32, y: 3, z: 0, w: 3, h: 1, d: 8, color: 0x2d5b4f },
      { x: 45, y: 3, z: 0, w: 4, h: 1, d: 4, color: 0x38d39b }
    ]
  },
  {
    name: "Spiral Tower",
    start: { x: 0, y: 5, z: 0 },
    finish: { x: 0, y: 38, z: 0 },
    platforms: [
      { x: 0, y: 3, z: 0, w: 8, h: 1, d: 8, color: 0x1c355d },
      { x: 12, y: 8, z: 0, w: 5, h: 1, d: 5, color: 0x2d5b4f },
      { x: 12, y: 13, z: 12, w: 5, h: 1, d: 5, color: 0x2d5b4f },
      { x: 0, y: 18, z: 12, w: 5, h: 1, d: 5, color: 0x2d5b4f },
      { x: -12, y: 23, z: 0, w: 5, h: 1, d: 5, color: 0x2d5b4f },
      { x: -12, y: 28, z: -12, w: 5, h: 1, d: 5, color: 0x2d5b4f },
      { x: 0, y: 33, z: -12, w: 5, h: 1, d: 5, color: 0x2d5b4f },
      { x: 12, y: 38, z: 0, w: 5, h: 1, d: 5, color: 0x38d39b }
    ]
  },
  {
    name: "Bridge Sprint",
    start: { x: 0, y: 5, z: 0 },
    finish: { x: 55, y: 12, z: 0 },
    platforms: [
      { x: 0, y: 3, z: 0, w: 8, h: 1, d: 8, color: 0x1c355d },
      { x: 10, y: 5, z: 0, w: 3, h: 1, d: 3, color: 0x2d5b4f },
      { x: 15, y: 8, z: 4, w: 3, h: 1, d: 3, color: 0x2d5b4f },
      { x: 20, y: 10, z: -4, w: 3, h: 1, d: 3, color: 0x2d5b4f },
      { x: 25, y: 12, z: 4, w: 3, h: 1, d: 3, color: 0x2d5b4f },
      { x: 30, y: 14, z: 0, w: 3, h: 1, d: 3, color: 0x2d5b4f },
      { x: 35, y: 15, z: -4, w: 3, h: 1, d: 3, color: 0x2d5b4f },
      { x: 40, y: 13, z: 0, w: 3, h: 1, d: 3, color: 0x2d5b4f },
      { x: 45, y: 11, z: 5, w: 3, h: 1, d: 3, color: 0x2d5b4f },
      { x: 55, y: 12, z: 0, w: 5, h: 1, d: 5, color: 0x38d39b }
    ]
  },
  {
    name: "The Gauntlet",
    start: { x: 0, y: 5, z: 0 },
    finish: { x: 80, y: 25, z: 40 },
    platforms: [
      { x: 0, y: 3, z: 0, w: 8, h: 1, d: 8, color: 0x1c355d },
      { x: 15, y: 5, z: 0, w: 8, h: 1, d: 8, color: 0x2d5b4f },
      { x: 30, y: 8, z: 0, w: 6, h: 1, d: 6, color: 0x2d5b4f },
      { x: 42, y: 11, z: 0, w: 4, h: 1, d: 4, color: 0x2d5b4f },
      { x: 52, y: 14, z: 8, w: 3, h: 1, d: 3, color: 0x2d5b4f },
      { x: 60, y: 18, z: 15, w: 4, h: 1, d: 4, color: 0x2d5b4f },
      { x: 68, y: 22, z: 25, w: 4, h: 1, d: 4, color: 0x2d5b4f },
      { x: 80, y: 25, z: 40, w: 6, h: 1, d: 6, color: 0x38d39b }
    ]
  },
  {
    name: "Master Challenge",
    start: { x: 0, y: 5, z: 0 },
    finish: { x: 80, y: 5, z: 80 },
    platforms: [
      { x: 0, y: 3, z: 0, w: 8, h: 1, d: 8, color: 0x1c355d },
      { x: 12, y: 5, z: 0, w: 2, h: 1, d: 8, color: 0x2d5b4f },
      { x: 20, y: 5, z: 0, w: 2, h: 1, d: 8, color: 0x2d5b4f },
      { x: 28, y: 10, z: 10, w: 4, h: 1, d: 4, color: 0x2d5b4f },
      { x: 36, y: 15, z: 20, w: 4, h: 1, d: 4, color: 0x2d5b4f },
      { x: 46, y: 12, z: 30, w: 4, h: 1, d: 4, color: 0x2d5b4f },
      { x: 54, y: 10, z: 45, w: 3, h: 1, d: 3, color: 0x2d5b4f },
      { x: 65, y: 8, z: 52, w: 3, h: 1, d: 3, color: 0x2d5b4f },
      { x: 75, y: 7, z: 68, w: 4, h: 1, d: 4, color: 0x2d5b4f },
      { x: 80, y: 5, z: 80, w: 6, h: 1, d: 6, color: 0x38d39b }
    ]
  }
];
