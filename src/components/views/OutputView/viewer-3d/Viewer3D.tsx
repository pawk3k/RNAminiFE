import React, { useEffect, FunctionComponent, useLayoutEffect, useRef, useState } from 'react';
import { MolstarWrapper } from './MolstarWrapper';
import { RNAspiderTypes as RST } from './punctures/types';

type Viewer3DProps = {
  model3D: string;
  model3DName: string;
  report: RST.RNAspiderReportRaw;
  showControls: boolean;
  selectedEntanglementIndex: number;
  setSelectedEntanglementIndex: (index: number) => void;
};

function getExtension(filename: string): 'mmcif' | 'pdb' {
  const splitted = filename.toLowerCase().split('.');
  let orig_format = splitted.pop();
  if (orig_format === 'gz') orig_format = splitted.pop();

  if (orig_format === 'pdb') {
    return 'pdb';
  } else if (orig_format === 'cif') {
    return 'mmcif';
  } else {
    // Should never reach here
    return 'pdb';
  }
}

const MolstarViewer: FunctionComponent<Viewer3DProps> = ({
  model3D,
  model3DName,
  report,
  showControls,
  selectedEntanglementIndex,
  setSelectedEntanglementIndex,
}) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [molstarPlugin, setMolstarPlugin] = useState<MolstarWrapper | undefined>();

  useLayoutEffect(() => {
    if (viewerRef.current != null) {
      setMolstarPlugin(new MolstarWrapper(viewerRef.current));
    }
  }, []);

  useEffect(() => {
    async function initViewer3d() {
      if (molstarPlugin) {
        if (model3D && model3DName) {
          await molstarPlugin.loadStructureFromData(model3D, getExtension(model3DName), {
            dataLabel: model3DName,
          });
          await molstarPlugin.loadPunctures(report);
        }
      }
    }
    initViewer3d();
  }, [model3D, molstarPlugin, model3DName, report]);

  useEffect(() => {
    if (molstarPlugin) {
      molstarPlugin.selectEntanglement(selectedEntanglementIndex);
    }
  }, [selectedEntanglementIndex, molstarPlugin]);

  useEffect(() => {
    if (molstarPlugin) {
      molstarPlugin.switchControls(showControls);
    }
  }, [showControls, molstarPlugin]);

  return (
    <div id="viewer3d-molstar">
      <div id="structure-3d-viewer" ref={viewerRef} />
    </div>
  );
};

export default MolstarViewer;
