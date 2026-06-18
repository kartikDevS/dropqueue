export function getUserColor(username) {
  if (!username) return '#a855f7'  

  let hash = 0
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash)
  }


  const colors = [
    '#a855f7',  
    '#3b82f6',
    '#10b981', 
    '#f59e0b', 
    '#ef4444',
    '#06b6d4',
    '#f97316',  
    '#ec4899',
    '#84cc16',
    '#8b5cf6',  
  ]

  return colors[Math.abs(hash) % colors.length]
}