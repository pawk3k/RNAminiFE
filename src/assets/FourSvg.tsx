import { FunctionComponent } from 'react';

const FourSvg: FunctionComponent<{ className: string; fill: string }> = ({ className, fill }) => (
  <div className={className}>
    <svg
      className={className}
      style={{ width: '200px', height: '200px' }}
      viewBox="0 0 32 32"
      id="icon"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>number--4</title>
      <path fill={fill} d="M18,10v8h0V10m1-1H17v8H14V9H12V19h5v4h2V19h1V17H19V9Z" />
    </svg>
  </div>
);

export default FourSvg;
