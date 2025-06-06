/**
 * CommonJS version of color utility functions for use with Tailwind
 */

/**
 * Converts a hex color to RGB components
 * @param {string} hex - Hex color code (e.g., "#3D7BFA")
 * @returns {Object} RGB components as {r, g, b}
 */
function hexToRgb(hex) {
  // Remove the hash if it exists
  hex = hex.replace(/^#/, '');

  // Parse the hex values
  let r, g, b;
  if (hex.length === 3) {
    // Short notation (#RGB)
    r = parseInt(hex.charAt(0) + hex.charAt(0), 16);
    g = parseInt(hex.charAt(1) + hex.charAt(1), 16);
    b = parseInt(hex.charAt(2) + hex.charAt(2), 16);
  } else {
    // Full notation (#RRGGBB)
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  }

  return { r, g, b };
}

/**
 * Converts RGB components to a hex color
 * @param {number} r - Red component (0-255)
 * @param {number} g - Green component (0-255)
 * @param {number} b - Blue component (0-255)
 * @returns {string} Hex color code
 */
function rgbToHex(r, g, b) {
  return '#' + [r, g, b]
    .map(x => {
      const hex = Math.max(0, Math.min(255, Math.round(x))).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    })
    .join('');
}

/**
 * Lightens a color by a given percentage
 * @param {string} hex - Hex color code
 * @param {number} percent - Percentage to lighten (0-1)
 * @returns {string} Lightened hex color
 */
function lightenColor(hex, percent) {
  const { r, g, b } = hexToRgb(hex);
  const amount = 255 * percent;
  
  return rgbToHex(
    r + amount,
    g + amount,
    b + amount
  );
}

/**
 * Darkens a color by a given percentage
 * @param {string} hex - Hex color code
 * @param {number} percent - Percentage to darken (0-1)
 * @returns {string} Darkened hex color
 */
function darkenColor(hex, percent) {
  const { r, g, b } = hexToRgb(hex);
  const amount = 255 * percent;
  
  return rgbToHex(
    r - amount,
    g - amount,
    b - amount
  );
}

/**
 * Generates a color palette with different shades from a base color
 * @param {string} baseColor - Base hex color
 * @returns {Object} Object with color shades from 50 to 900
 */
function generateColorPalette(baseColor) {
  return {
    50: lightenColor(baseColor, 0.85),
    100: lightenColor(baseColor, 0.75),
    200: lightenColor(baseColor, 0.55),
    300: lightenColor(baseColor, 0.35),
    400: lightenColor(baseColor, 0.15),
    500: baseColor,
    600: darkenColor(baseColor, 0.15),
    700: darkenColor(baseColor, 0.30),
    800: darkenColor(baseColor, 0.45),
    900: darkenColor(baseColor, 0.60)
  };
}

module.exports = {
  hexToRgb,
  rgbToHex,
  lightenColor,
  darkenColor,
  generateColorPalette
};
