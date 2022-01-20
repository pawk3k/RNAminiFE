import { FunctionComponent } from 'react';

const Link: FunctionComponent<{ href: string }> = ({ children, href }) => (
  <a href={href} className="text-dashas-purple hover:underline">
    {children}
  </a>
);

export default Link;
