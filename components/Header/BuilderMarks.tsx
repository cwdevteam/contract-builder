import { CONTRACT_BUILDER_STEP } from '@/hooks/useContractBuilder'
import { useContractBuilderProvider } from '@/providers/ContractBuilderProvider'
import Image from 'next/image'

const BuilderMarks = () => {
  const { tab } = useContractBuilderProvider()

  return (
    <>
      {tab === CONTRACT_BUILDER_STEP.SPLITS_TYPE && (
        <Image src="/images/splits-type.svg" alt="" width={117} height={106} />
      )}
      {tab === CONTRACT_BUILDER_STEP.SONG_NAME && (
        <Image src="/images/song-name.svg" alt="" width={310} height={77} />
      )}
      {tab === CONTRACT_BUILDER_STEP.SUCCESS && (
        <Image src="/images/success.svg" alt="" width={310} height={77} />
      )}
    </>
  )
}

export default BuilderMarks