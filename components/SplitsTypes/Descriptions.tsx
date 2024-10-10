import { useContractBuilderProvider } from '@/providers/ContractBuilderProvider'
import { splitTypes } from './constants'

const Descriptions = () => {
  const { splitType } = useContractBuilderProvider()
  const text = splitTypes.find(
    (splitTypeInfo) => splitTypeInfo.type === splitType,
  )?.text
  const date = new Date()
  const currentDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
  return (
    <>
      <p className="font-roboto_thin text-2xl">
        Your contract has yet to be completed. Continue to fill out the decision
        tree.
      </p>
      <p className="font-roboto_medium text-2xl">
        Copyright ownership agreement for{' '}
        <span className="text-danger-dark">{text || 'Music composition'}</span>{' '}
        work.
      </p>
      <p className="font-roboto text-2xl pt-6">
        This agreement is entered into on{' '}
        <span className="font-rubik text-danger-dark">{currentDate}</span>
      </p>
    </>
  )
}

export default Descriptions
