import { FunctionComponent } from 'react';

const CiteUsView: FunctionComponent = () => (
  <div className="px-14 flex flex-col gap-5">
    <p>Citations</p>
    <p>Any published work which has made use of RNArefiner should cite the following paper:</p>
    <p>
      M. Antczak, D. Poda, R. Pylnyk, P. Ravliv, D. Hromniuk, M. Popenda, M. Szachniuk, RNArefiner:
      a webserver for stereochemical refinement of RNA 3D structures
    </p>
    <p>The following paper can be also cited:</p>
    <p>
      Popenda M, Zok T, Sarzynska J, Korpeta A, Adamiak RW, Antczak M, Szachniuk M (2021)
      Entanglements of structure elements revealed in RNA 3D models,Nucleic Acids Research, 2021,
      49(17):9625-9632 (doi:10.1093/nar/gkab716).
    </p>
  </div>
);

export default CiteUsView;
