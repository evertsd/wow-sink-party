import * as React from 'react';

interface Props {
  link: string;
  creator: string;
}

export const Component: React.FC<Props> = ({ creator, link }) => (
  <div>
    Icons made by
    <a href={link} title={creator} target="_blank">{creator}</a>
    from
    <a
      href="https://www.flaticon.com/"
      title="Flaticon"
      target="_blank">
      www.flaticon.com
    </a>
    is licensed by
    <a
      href="http://creativecommons.org/licenses/by/3.0/"
      title="Creative Commons BY 3.0"
      target="_blank">
      CC 3.0 BY
    </a>
  </div>
);
