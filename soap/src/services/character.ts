import * as BnetCharacter from '~/battle-net/character';
import * as FirebaseCharacter from '~/firebase/character';

export const mapToFirebaseModel = (character: BnetCharacter.Model): FirebaseCharacter.Attributes => ({
  achievementPoints: character.achievement_points,
  klass: character.character_class.name,
  experience: character.experience,
  lastLoginTimestamp: character.last_login_timestamp,
  level: character.level,
  name: character.name,
});
