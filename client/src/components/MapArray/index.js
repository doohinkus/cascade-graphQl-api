import React from "react";
/**
 *
 * @param {Array} array // array to be mapped
 * @param {Function} mapFunc // the function passed to map
 * @returns
 */
export default function MapArray({ mapFunc, array }) {
  // console.log(array, ">>>>", render);
  if (array) {
    return <React.Fragment>{array.map(mapFunc)}</React.Fragment>;
  }
  return null;
}
