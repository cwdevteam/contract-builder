import { useContractBuilderProvider } from '@/providers/ContractBuilderProvider'
import Button from '../Button'
import { CONTRACT_BUILDER_STEP } from '@/hooks/useContractBuilder'
import PassedQuestions from '../PassedQuestions'
import ReadHereLink from '../ReadHereLink'

const SubmitForm = () => {
  const { setTab, songName, setSongName } = useContractBuilderProvider()

  return (
    <>
      <div className=" md:size-full flex flex-col md:justify-center justify-start ">
        <div className="hidden md:block">
          {' '}
          <PassedQuestions />
        </div>
        <p className="text-white md:text-3xl tracking-[-0.05rem] font-share pt-6 text-[20px]">
          What is the name of the song?
        </p>
        <label
          htmlFor="#songName"
          className="mt-6 flex flex-col gap-2 text-[#696969] text-[15px]"
        >
          <p>Song composition</p>
          <input
            id="songName"
            type="text"
            className="!outline-none font-rubik rounded-md border-white border !bg-transparent p-2 max-w-[350px]"
            placeholder="The One"
            onChange={(e) => setSongName(e.target.value)}
            value={songName}
          />
        </label>
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
