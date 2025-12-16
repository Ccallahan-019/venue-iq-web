import * as migration_20251215_220757 from './20251215_220757';
import * as migration_20251216_003640 from './20251216_003640';

export const migrations = [
  {
    up: migration_20251215_220757.up,
    down: migration_20251215_220757.down,
    name: '20251215_220757',
  },
  {
    up: migration_20251216_003640.up,
    down: migration_20251216_003640.down,
    name: '20251216_003640'
  },
];
