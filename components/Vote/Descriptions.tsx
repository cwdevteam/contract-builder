import { useContractBuilderProvider } from '@/providers/ContractBuilderProvider'

const Descriptions = () => {
  const { votePercentage } = useContractBuilderProvider()
  return (
    <>
      <p className="font-roboto_thin text-2xl">
        Your contract has yet to be completed. Continue to fill out the decision
        tree.
      </p>
      <p className="font-roboto_medium text-2xl">
        2.0 Rights and Duties of the Parties
      </p>
      <p className="font-roboto text-2xl">
        None of the parties may perform legally relevant acts on the musical
        work without the written authorization of the{' '}
        <span className="text-danger-dark font-rubik">
          {votePercentage || '51'}%
        </span>{' '}
        of the ownership, such as but not limited to the following:
      </p>
      <ul className="list-decimal pl-5 space-y-2 font-roboto text-lg ml-4">
        <li>Grant exclusive licenses for the use of the Musical Work.</li>
        <li>
          Edit, alter or modify the musical work, especially the contributions
          of the other parties, in uses or sound recordings other than the one
          produced under this agreement unless authorized verbally or in writing
          by the co-author.
        </li>
        <li>
          Exploiting the name of other parties in a manner that suggests
          approval or endorsement of a third-party product or service other than
          the musical work itself.
        </li>
      </ul>
    </>
  )
}

export default Descriptions
