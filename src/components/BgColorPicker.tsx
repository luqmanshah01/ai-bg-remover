"use client";

interface BgColorPickerProps {
  selected: string | null;
  onSelect: (color: string | null) => void;
}

const COLORS = [
  { label: "Transparent", value: null },
  { label: "White", value: "#ffffff" },
  { label: "Black", value: "#000000" },
  { label: "Gray", value: "#9ca3af" },
  { label: "Red", value: "#ef4444" },
  { label: "Orange", value: "#f97316" },
  { label: "Yellow", value: "#eab308" },
  { label: "Green", value: "#22c55e" },
  { label: "Teal", value: "#14b8a6" },
  { label: "Blue", value: "#3b82f6" },
  { label: "Indigo", value: "#6366f1" },
  { label: "Purple", value: "#a855f7" },
  { label: "Pink", value: "#ec4899" },
  { label: "Light Blue", value: "#bae6fd" },
  { label: "Light Green", value: "#bbf7d0" },
  { label: "Cream", value: "#fef3c7" },
];

export default function BgColorPicker({ selected, onSelect }: BgColorPickerProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-gray-500 text-center">Choose Background</p>
      <div className="flex flex-wrap justify-center gap-2">
        {COLORS.map((color) => (
          <button
            key={color.label}
            title={color.label}
            onClick={() => onSelect(color.value)}
            className={`
              w-8 h-8 rounded-full border-2 transition-transform hover:scale-110
              ${selected === color.value ? "border-purple-500 scale-110 shadow-md" : "border-gray-200"}
            `}
            style={
              color.value
                ? { backgroundColor: color.value }
                : {
                    background:
                      "linear-gradient(135deg, #e5e7eb 25%, white 25%, white 50%, #e5e7eb 50%, #e5e7eb 75%, white 75%)",
                    backgroundSize: "8px 8px",
                  }
            }
          />
        ))}
      </div>
    </div>
  );
}
