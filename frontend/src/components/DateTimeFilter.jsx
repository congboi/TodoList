import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

import { options } from "@/lib/data"

export default function DateTimeFilter({ dateQuery, setDateQuery }) {
  return (
    <Combobox items={options} value={dateQuery} onValueChange={setDateQuery}>
      <ComboboxInput placeholder = {dateQuery ? options.find((option) => option.value === dateQuery)?.label : options[0]?.label} />

      <ComboboxContent>
        <ComboboxEmpty>
          Không tìm thấy mục nào.
        </ComboboxEmpty>

        <ComboboxList>
          {(item) => (
            <ComboboxItem
              key={item.value}
              value={item.value}
            >
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}