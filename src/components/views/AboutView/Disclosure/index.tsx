import { FunctionComponent } from 'react';

const Disclosure: FunctionComponent<{ summary: string; details: string }> = ({
  summary,
  details,
}) => (
  <details className="mx-24 text-1xl text-dashas-purple bg-pink-100 mb-10 rounded-xl shadow ">
    <summary className="font-bold text-xl cursor-pointer py-1 px-10">
      <span className="">{summary}</span>
    </summary>
    <div className="ml-9 whitespace-pre">{details}</div>
  </details>
);

export default Disclosure;
