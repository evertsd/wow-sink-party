import * as React from 'react';
import { CharacterRow } from './Character';
import { connectSorter, MemberProps } from './connectSorter'
import './styles.css';

const Component: React.FC<MemberProps> = ({ party, sortMembers }) => (
  <ul>
    {(party.members || [])
      .sort(sortMembers)
      .map((character: string, i) => (
        <CharacterRow key={i} id={character} />
      ))}
  </ul>
);


export const ViewMembers = connectSorter(Component);
