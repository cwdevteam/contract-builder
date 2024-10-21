import { createClient } from './client'

export const addCid = async (id: string, ipfs_cid: string) => {
  const supabase = createClient()

  const { error } = await supabase
    .from('contracts')
    .update({ ipfs_cid })
    .eq('id', id)

  if (error) {
    console.error(error)

    throw new Error(error.message)
  }
}
