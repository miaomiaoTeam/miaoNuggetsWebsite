import DraftLog from 'draftlog'

export default defineEventHandler(() => {
  DraftLog.into(console)
})
