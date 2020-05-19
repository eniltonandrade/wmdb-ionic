import { CastTmdb } from './castTmdb.model';
import { CrewTmdbd } from './crewTmdb.model';

export interface CastsTmdb {
  cast: CastTmdb[];
  crew: CrewTmdbd[];
}
