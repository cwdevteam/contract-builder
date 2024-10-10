import { useContractBuilderProvider } from '@/providers/ContractBuilderProvider'

const UnsignedVersion = () => {
  const {
    splitType,
    governanceType,
    adminName,
    votePercentage,
    songName,
    collaborators,
  } = useContractBuilderProvider()

  return (
    <div
      className="fixed w-screen h-screen left-0 top-0 z-[-1] p-10 text-black text-lg flex flex-col justify-center pointer-events-none"
      id="unsigned-version"
    >
      <p className="font-rubik text-6xl text-center">Unsigned Version</p>
      <p className="font-share pt-6">
        1. What type of splits contract would you like to create?
      </p>
      <p className="font-share pt-2 pl-7">{splitType}</p>
      <p className="font-share pt-2">2. What is the name of the song?</p>
      <p className="font-share pt-2 pl-7">{songName}</p>
      <p className="font-share pt-2">
        3. How many collaborators contributed to writing the song?
      </p>

      {collaborators.map((collaborator, index) => (
        <p key={index} className="font-share pt-2 pl-7">
          Collaborator {index + 1}: <br />
          Legal Name: {collaborator.legalName} <br />
          Email address: {collaborator.email} <br />
          Contribution : {collaborator.typeOfcontribution} <br />
          Ownership percentage: {collaborator.split} <br />
        </p>
      ))}
      <p className="font-share pt-2">
        4. Would you like to vote when making business decisions or designate an
        administrator?
      </p>
      <p className="font-share pt-2 pl-7">
        {governanceType === 'Vote' && <span>Vote : {votePercentage} </span>}
        {governanceType === 'Designate Administrator' && (
          <span>Designate Administrator : {adminName && adminName} </span>
        )}
      </p>
    </div>
  )
}

export default UnsignedVersion
