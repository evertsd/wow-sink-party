import * as React from 'react';
import { CharacterRow } from './Character';
import { connectMembers, MemberProps } from './connect'
import './styles.css';

const Component: React.FC<MemberProps> = ({ members }) => (
  <ul>
    {members.map((character: string, i) => (
      <CharacterRow key={i} id={character} />
    ))}
  </ul>
);

export const ViewMembers = connectMembers(Component);
