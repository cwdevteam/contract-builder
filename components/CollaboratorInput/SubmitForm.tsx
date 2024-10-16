import { useContractBuilderProvider } from '@/providers/ContractBuilderProvider'
import Button from '../Button'
import { CONTRACT_BUILDER_STEP } from '@/hooks/useContractBuilder'
import CollaboratorValues from './CollaboratorValues'
import PassedQuestions from '../PassedQuestions'
import { upsertContract } from '@/lib/supabase/upsertContract'

const SubmitForm = () => {
  const {
    setTab,
    collaborators,
    currentCollaborator,
    collaboratorsAmount,
    setCollaborator,
    splitType,
    setCollaboratorDbId,
  } = useContractBuilderProvider()
  const {
    legalName,
    email,
    split,
    typeOfMasterContribution,
    typeOfSongWritingContribution,
  } = collaborators[currentCollaborator]

  let isContributor = false

  if (splitType === 'Master Recording') {
    isContributor = Boolean(!typeOfMasterContribution)
  } else if (splitType === 'Song Writing') {
    isContributor = Boolean(!typeOfSongWritingContribution)
  } else if (splitType === 'Both') {
    isContributor =
      Boolean(!typeOfMasterContribution) ||
      Boolean(!typeOfSongWritingContribution)
  }

  const handleSubmit = async () => {
    if (collaborators.length !== collaboratorsAmount) {
      setCollaborator()

      return
    }

    const names = collaborators.map(({ legalName }) => legalName)
    const emails = collaborators.map(({ email }) => email)

    const data = await upsertContract(names, emails)

    if (data) {
      setCollaboratorDbId(data.id)
      setTab(CONTRACT_BUILDER_STEP.GOVERNANCE_TYPE)
    }
  }

  return (
    <>
      <PassedQuestions />
      <p className="text-white text-3xl tracking-[-0.05rem] font-share pt-6  hidden md:block">
        Collaborator {currentCollaborator + 1}:
      </p>
      <CollaboratorValues />
      <Button
        className="mt-10 mb-0 mx-auto md:mx-[unset] relative z-[2] md:w-52 md:h-12 w-36 h-12 font-normal md:bg-transparent bg-[#AC444475] border-[#E18583] text-[12px]"
        onClick={handleSubmit}
        disabled={
          Boolean(!legalName) ||
          Boolean(!email) ||
          Boolean(!split) ||
          isContributor
        }
      >
        SUBMIT
      </Button>
    </>
  )
}

export default SubmitForm
