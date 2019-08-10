import cx from 'classnames';
import moment from 'moment';
import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import { DownArrow, UpArrow } from '~/assets/icons';
import { Character } from '~/firebase';

const DATE_FORMAT = 'MMMM Do YYYY, HH:mm';

export const Component: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  console.info('createTextShadow("#000000")', createTextShadow('#000'));
  return (
    <div className={cx('parties-list-party', { "members-visible": isOpen })}>
      <h2 className="party-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="party-header-content">
          Test Party
          <span className="party-header-subtext">{`${moment().format(DATE_FORMAT)}`}</span>
        </div>
        {isOpen ? <UpArrow /> : <DownArrow />}
      </h2>
      <CSSTransition in={isOpen} timeout={360} classNames="collapsible">
        <ul>
          {Object.values(Character.WoWClassType).map((klass, i) => (
            <li
              key={i}
              className="party-member"
              style={{
                color: Character.getClassBackground(klass),
                textShadow: createTextShadow(Character.getClassColor({ klass } as Character.Attributes)),
                // color: Character.getClassColor({ klass } as Character.Attributes),
                // textShadow: createTextShadow(Character.getClassBackground(klass)),
              }}>
              <div className="party-member-name">
                {klass}
              </div>
              <div className="party-member-level">
                {i}
              </div>
            </li>
          ))}
        </ul>
      </CSSTransition>
    </div>
  );
};

const createTextShadow = (color: string) => `
-1px -1px 0 ${color},\
1px -1px 0 ${color},\
-1px 1px 0 ${color},\
1px 1px 0 ${color}
`
