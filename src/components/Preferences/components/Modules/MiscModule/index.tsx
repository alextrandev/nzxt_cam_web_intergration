import { usePreferencesStore } from 'store/preferences'
import { IModules } from 'store/preferences/types'

import { ColorPicker } from 'components/Preferences/components/ColorPicker'
import { Range } from 'components/Preferences/components/Range'

// Temporary inline Switch component
const Switch = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '1.2rem', width: '100%', marginBottom: '0.5rem' }}>
    <div style={{ color: 'var(--text-color)' }}>{label}</div>
    <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px' }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ opacity: 0, width: 0, height: 0 }}
      />
      <span style={{
        position: 'absolute',
        cursor: 'pointer',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: checked ? 'var(--primary-color)' : 'var(--background-contrast-lighter-color)',
        transition: '0.3s',
        borderRadius: '24px',
      }}>
        <span style={{
          position: 'absolute',
          content: '""',
          height: '18px',
          width: '18px',
          left: '3px',
          bottom: '3px',
          backgroundColor: 'var(--background-contrast-color)',
          transition: '0.3s',
          borderRadius: '50%',
          transform: checked ? 'translateX(20px)' : 'translateX(0)',
        }}></span>
      </span>
    </label>
  </div>
)

const modules: { name: keyof IModules; label: string }[] = [
  { name: 'background', label: 'Background' },
  { name: 'separator', label: 'Separator' },
  { name: 'cpuLabel', label: 'CPU label' },
  { name: 'gpuLabel', label: 'GPU label' },
]

export const MiscModule = () => {
  const preferencesStore = usePreferencesStore()

  return (
    <div className="module-segmentList">
      <div className="module">
        <ColorPicker
          label={'Text'}
          value={preferencesStore.current.text.color}
          onChange={value =>
            preferencesStore.updateModule('text', {
              color: value,
            })
          }
        />

        <div className="selectContainer">
          <div className="label">Font</div>

          <select
            defaultValue={preferencesStore.current.text.font}
            onChange={event =>
              preferencesStore.updateModule('text', { font: event.target.value })
            }
          >
            <option value="Segoe UI">Segoe UI</option>
            <option value="Staatliches">Staatliches</option>
            <option value="DotGothic16">DotGothic16</option>
            <option value="Pixelify Sans">Pixelify Sans</option>
            <option value="Minecraft">Minecraft</option>
          </select>
        </div>

        <Range
          label="size"
          value={preferencesStore.current.text.size}
          onChange={value =>
            preferencesStore.updateModule('text', {
              size: value,
            })
          }
        />

        <Range
          label="alpha"
          value={preferencesStore.current.text.alpha}
          onChange={value =>
            preferencesStore.updateModule('text', {
              alpha: value,
            })
          }
        />
      </div>

      {modules.map(({ name, label }) => {
        const isVisible = preferencesStore.current.visibility?.[name as keyof typeof preferencesStore.current.visibility] ?? true

        return (
          <div className="module" key={name}>
            <Switch
              label={`Show ${label}`}
              checked={isVisible}
              onChange={(checked: boolean) => preferencesStore.updateVisibility(name as keyof typeof preferencesStore.current.visibility, checked)}
            />

            <ColorPicker
              label={label}
              value={preferencesStore.current[name].color}
              onChange={value =>
                preferencesStore.updateModule(name, {
                  color: value,
                })
              }
            />
            <Range
              label="alpha"
              value={preferencesStore.current[name].alpha}
              onChange={value =>
                preferencesStore.updateModule(name, {
                  alpha: value,
                })
              }
            />
            {name === 'separator' && (
              <Range
                label="width"
                value={preferencesStore.current[name].size}
                onChange={value =>
                  preferencesStore.updateModule(name, {
                    size: value,
                  })
                }
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
