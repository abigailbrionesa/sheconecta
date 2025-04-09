export const formatName = (text) => {
    return text
      .replace(/[^a-zA-Z]/g, "")
      .replace(/^(\w)(\w*)$/, (match, p1, p2) => p1.toUpperCase() + p2.toLowerCase());
};
  