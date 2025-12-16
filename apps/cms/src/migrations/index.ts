import * as migration_20251215_220757 from './20251215_220757';
import * as migration_20251216_003640 from './20251216_003640';
import * as migration_20251216_011023 from './20251216_011023';
import * as migration_20251216_031716 from './20251216_031716';
import * as migration_20251216_041202 from './20251216_041202';

export const migrations = [
  {
    up: migration_20251215_220757.up,
    down: migration_20251215_220757.down,
    name: '20251215_220757',
  },
  {
    up: migration_20251216_003640.up,
    down: migration_20251216_003640.down,
    name: '20251216_003640',
  },
  {
    up: migration_20251216_011023.up,
    down: migration_20251216_011023.down,
    name: '20251216_011023',
  },
  {
    up: migration_20251216_031716.up,
    down: migration_20251216_031716.down,
    name: '20251216_031716',
  },
  {
    up: migration_20251216_041202.up,
    down: migration_20251216_041202.down,
    name: '20251216_041202'
  },
];
