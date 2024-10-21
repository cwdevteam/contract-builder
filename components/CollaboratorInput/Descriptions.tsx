import { useContractBuilderProvider } from '@/providers/ContractBuilderProvider'

const Descriptions = () => {
  const { collaborators, currentCollaborator, splitType } =
    useContractBuilderProvider()

  return (
    <>
      <p className="font-roboto_thin text-2xl">
        Your contract has yet to be completed. Continue to fill out the decision
        tree.
      </p>
      <p className="font-roboto_medium text-2xl">
        1.0 Music Work Identification
      </p>
      <p className="font-roboto text-2xl">
        The parties acknowledge and accept their contribution to the authorship
        or composition of the musical work and agree to the distribution of
        copyright ownership as follows:
      </p>
      <p className="font-roboto_medium text-2xl mt-4">
        Collaborator {currentCollaborator + 1}:
      </p>
      <p className="font-roboto text-2xl">
        Legal Name:
        <span className="text-danger-dark font-extrabold font-rubik">
          {collaborators[currentCollaborator].legalName}
        </span>
      </p>
      <p className="font-roboto text-2xl">
        Email Address:
        <span className="text-danger-dark font-extrabold font-rubik">
          {collaborators[currentCollaborator].email}
        </span>
      </p>
      <p className="font-roboto text-2xl">
        Contribution:
        <span className="text-danger-dark font-extrabold font-rubik">
          {splitType === 'Song Writing' &&
            collaborators[currentCollaborator].typeOfSongWritingContribution}

          {splitType === 'Master Recording' &&
            collaborators[currentCollaborator].typeOfMasterContribution}

          {splitType === 'Both' && (
            <>
              {collaborators[currentCollaborator].typeOfSongWritingContribution}
              ,{collaborators[currentCollaborator].typeOfMasterContribution}
            </>
          )}
        </span>
      </p>
      <p className="font-roboto text-2xl">
        Ownership percentage:
        <span className="text-danger-dark font-extrabold font-rubik">
          {collaborators[currentCollaborator].split}
        </span>
      </p>
    </>
  )
}

export default Descriptions
