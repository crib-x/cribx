interface CountdownUnitProps {
    value: number
    label: string
  }
  
  export function CountdownUnit({ value, label }: CountdownUnitProps) {
    return (
      <div className="flex flex-col items-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6 min-w-[80px] md:min-w-[100px]">
          <span className="text-3xl md:text-5xl font-bold text-white">
            {value.toString().padStart(2, '0')}
          </span>
        </div>
        <span className="text-sm md:text-base text-white/80 mt-2">{label}</span>
      </div>
    )
  }