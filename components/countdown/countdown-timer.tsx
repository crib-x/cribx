"use client"

import { useCountdown } from '@/hooks/use-countdown'
import { CountdownUnit } from './countdown-unit'

interface CountdownTimerProps {
  targetDate: Date
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const { days, hours, minutes, seconds } = useCountdown(targetDate)

  return (
    <div className="text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-12">Coming Soon</h1>
      <div className="flex gap-4 md:gap-8">
        <CountdownUnit value={days} label="Days" />
        <CountdownUnit value={hours} label="Hours" />
        <CountdownUnit value={minutes} label="Minutes" />
        <CountdownUnit value={seconds} label="Seconds" />
      </div>
    </div>
  )
}