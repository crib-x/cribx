import { Loader2 } from 'lucide-react'

interface LoadingStateProps {
  message?: string
}

export function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-gray-500">
      <Loader2 className="h-8 w-8 animate-spin" />
      <p className="mt-2">{message}</p>
    </div>
  )
}
