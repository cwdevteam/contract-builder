import { useContractBuilderProvider } from '@/providers/ContractBuilderProvider'
import Button from '../Button'
import { CONTRACT_BUILDER_STEP } from '@/hooks/useContractBuilder'
import ReadHereLink from '../ReadHereLink'
import getSplitTypeText from '@/lib/getSplitTypeText'
import PassedQuestions from '../PassedQuestions'
import { useState } from 'react'
import InfoDialog from '../InfoDialog'
import VoteInfo from './Info'

const SubmitForm = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { setTab, setVotePercentage, votePercentage, splitType } =
    useContractBuilderProvider()

  return (
    <>
      <PassedQuestions />
      <p className="text-white text-3xl tracking-[-0.05rem] font-share pt-6">
        What percentage of ownership of the {getSplitTypeText(splitType)}{' '}
        agreement is necessary to make business decisions about the song
        composition?
      </p>
      <fieldset className="mt-6">
        <p className="font-share text-base/4 pb-1">{`(%)`}</p>
        <input
          type="text"
          className="!outline-none font-rubik rounded-md border-white border !bg-transparent p-2 max-w-[90px]"
          placeholder="2"
          onChange={(e) => setVotePercentage(parseInt(e.target.value, 10))}
          maxLength={3}
          value={votePercentage}
        />
      </fieldset>
      <ReadHereLink
        label="Still not clear about voting? read here."
        className="pt-3"
        open={() => setIsOpen(true)}
      />
      <Button
        className="mt-10 relative z-[2]"
        onClick={() => setTab(CONTRACT_BUILDER_STEP.SUCCESS)}
        disabled={Boolean(!votePercentage)}
      >
        SUBMIT
      </Button>
      <InfoDialog isOpen={isOpen} close={() => setIsOpen(false)}>
        <VoteInfo />
      </InfoDialog>
    </>
  )
}

export default SubmitForm
