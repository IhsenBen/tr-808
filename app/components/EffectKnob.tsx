interface EffectKnobProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  unit?: string;
}

const EffectKnob: React.FC<EffectKnobProps> = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
  unit = "",
}) => {
  return (
    <div className="flex flex-col items-center">
      <label className="text-xs font-semibold text-gray-300 mb-1">
        {label}
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
      />
      <span className="text-xs text-gray-400 mt-1">
        {value.toFixed(step < 1 ? 2 : 0)}
        {unit}
      </span>
    </div>
  );
};
export default EffectKnob;
