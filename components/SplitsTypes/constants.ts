import { SPLIT_TYPE } from '@/hooks/useContractBuilder'

export const splitTypes = [
  {
    label: 'Song Writing',
    type: SPLIT_TYPE.SONG_WRITING,
    text: 'Song Writing',
  },
  {
    label: 'Master Recording',
    type: SPLIT_TYPE.MASTER_RECORDING,
    text: 'Master Recording',
  },
  {
    label: 'Both',
    type: SPLIT_TYPE.BOTH,
    text: 'Song Writing and Master Recording',
  },
]
