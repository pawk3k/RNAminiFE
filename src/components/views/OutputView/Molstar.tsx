// import React from 'react';
// import FunctionComponent, { useEffect, useRef } from 'react';

// // Molstar react component to read from file pdb
// const Molstara: FunctionComponent = (props) => {
//   var pdbId = props.pdbId,
//     url = props.url,
//     dimensions = props.dimensions,
//     options = props.options;
//   var viewerElement = useRef(null);
//   var viewer = useRef(null);
//   useEffect(function () {
//     var mandatoryOptions = dimensions
//       ? {
//           layoutIsExpanded: false,
//         }
//       : {};

//     var viewerOptions = (...({}, options || {}), mandatoryOptions);

//     viewer.current = new molstar.exports.Viewer(viewerElement.current, viewerOptions);
//     if (pdbId) viewer.current.loadPdb(pdbId);
//     if (url) viewer.current.loadStructureFromUrl(url);
//     return function () {
//       return (viewer.current = null);
//     };
//   }, []);

//   if (!dimensions)
//     return /*#__PURE__*/ React.createElement('div', {
//       ref: viewerElement,
//     });
//   return /*#__PURE__*/ React.createElement(
//     'div',
//     {
//       style: {
//         position: 'relative',
//         width: dimensions[0],
//         height: dimensions[1],
//       },
//     },
//     /*#__PURE__*/ React.createElement('div', {
//       ref: viewerElement,
//       style: {
//         position: 'absolute',
//         width: dimensions[0],
//         height: dimensions[1],
//         left: 0,
//         right: 0,
//       },
//     }),
//   );
// };

// Molstar.propTypes = {
//   pdbId: PropTypes.string,
//   url: PropTypes.string,
//   dimensions: PropTypes.array,
//   options: PropTypes.object
// };

export default Molstara;
