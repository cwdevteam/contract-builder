import { useContractBuilderProvider } from '@/providers/ContractBuilderProvider'
import Button from '../Button'
import { CONTRACT_BUILDER_STEP, SPLIT_TYPE } from '@/hooks/useContractBuilder'
import PassedQuestions from '../PassedQuestions'
import ReadHereLink from '../ReadHereLink'
import { splitTypes } from '@/lib/constants/splitTypes'
import FormInput from '../FormInput'

const SubmitForm = () => {
  const {
    setTab,
    songName,
    setSongName,
    recordedVersion,
    setRecordedVersion,
    splitType,
  } = useContractBuilderProvider()

  const handleRecordedVersionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRecordedVersion(e.target.value)
  }

  const formText = splitTypes.find((item) => item.type === splitType)?.formText
  const showRecordedVersion =
    splitType === SPLIT_TYPE.MASTER_RECORDING || splitType === SPLIT_TYPE.BOTH
  return (
    <>
      <div className=" md:size-full flex flex-col md:justify-center justify-start ">
        <div className="hidden md:block">
          {' '}
          <PassedQuestions />
        </div>
        <p className="text-white md:text-3xl tracking-[-0.05rem] font-share pt-6 text-[20px]">
          {formText}
        </p>
        <FormInput
          value={songName}
          label="Song Composition"
          handleChange={(e) => setSongName(e.target.value)}
          labelProps={{ htmlFor: 'songName' }}
        />
        {showRecordedVersion && (
          <FormInput
            value={recordedVersion}
            label="Recorded Version"
            handleChange={handleRecordedVersionChange}
            labelProps={{ htmlFor: 'recordedVersion' }}
          />
        )}
        <ReadHereLink link="/" className="text-[15px] md:text-[24px]  " />
      </div>

      <Button
        className="mt-10 mb-0 mx-auto md:mx-[unset] relative z-[2] md:w-52 md:h-12 w-36 h-12 font-normal md:bg-transparent bg-[#AC444475] border-[#E18583] text-[12px]"
        onClick={() => setTab(CONTRACT_BUILDER_STEP.COLLABORATORS_AMOUNT)}
        disabled={Boolean(!songName)}
      >
        SUBMIT
      </Button>
    </>
  )
}

export default SubmitForm
