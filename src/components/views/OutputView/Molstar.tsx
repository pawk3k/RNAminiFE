import { useEffect, FunctionComponent, useRef } from 'react';
import molstar from './molstar';
//@ts-ignore
import { Viewer } from 'molstar/build/viewer/molstar';

// function initViewer(target: string | HTMLElement) {
//   return new Viewer(target, {
//     /* options */
//   });
// }
// Molstar react component to read from file pdb
const Molstara: FunctionComponent<MolProps> = (props) => {
  var pdbId = props.pdbId,
    url = props.url,
    dimensions = props.dimensions;
  var viewerElement = useRef(null);
  var viewer = useRef(null);

  useEffect((): void => {
    var mandatoryOptions = dimensions
      ? {
          layoutIsExpanded: false,
        }
      : {};

    // var viewerOptions = (...({}, ), mandatoryOptions);

    viewer.current = new Viewer(viewerElement.current, mandatoryOptions);

    if (viewer.current) {
      if (pdbId) viewer.current.loadPdb(pdbId);
      if (url) viewer.current?.loadStructureFromUrl(url);
    }
    // return (): void => (viewer.current = null);
  }, []);

  // if (!dimensions) {
  //   return <div ref={viewerElement} />;
  // }
  return (
    <div className="relative left-0 right-0">
      <div className="absolute" ref={viewerElement} />
    </div>
  );
};

type MolProps = {
  pdbId: string;
  url: string;
  dimensions: [number, number];
};

export default Molstara;
