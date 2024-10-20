import { createClient } from './client'

export const isPdfDownloaded = async (id: string) => {
  const supabase = createClient()

  const { error } = await supabase
    .from('contracts')
    .update({ download_clicked: true })
    .eq('id', id)

  if (error) {
    console.error(error)
  }
}
