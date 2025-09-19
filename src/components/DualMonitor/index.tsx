import { Container } from './styles'

import { decToHex } from 'utils/utils'

import { useMonitoring } from 'hooks'
import { useKrakenStore } from 'store/kraken'

import { FiCpu as CpuIcon } from 'react-icons/fi'
import { BsGpuCard as GpuIcon } from 'react-icons/bs'

import { Progress } from 'components/Progress'

export const DualMonitor = () => {
  const krakenStore = useKrakenStore()

  const { cpu, gpu } = useMonitoring()

  // Helper function to determine if URL is a YouTube embed
  const isYouTubeEmbed = (url: string): boolean => {
    return url?.includes('youtube.com/embed/') || false
  }
  const Cpu = () => (
    <div className="info-container cpu-container">
      <div className="info-title">
        {krakenStore.visibility?.cpuIcon !== false && (
          <CpuIcon color={krakenStore.cpuIcon.color} opacity={krakenStore.cpuIcon.alpha} />
        )}
        {krakenStore.visibility?.cpuLabel !== false && (
          <span
            style={{
              color: krakenStore.cpuLabel.color,
              opacity: krakenStore.cpuLabel.alpha,
              fontSize: `${(krakenStore.text.size ?? 1) * 125}%`,
              marginLeft: "-5px",
              marginTop: "15px",
            }}
          >
            {cpu?.name?.replace(/(core|ryzen \d)/gi, '').trim() ?? 'i9 11900K'}
          </span>
        )}
      </div>
      <div className="info-data">
        <div className="data" style={{ fontSize: `${(krakenStore.text.size ?? 1) * 10}vw`, marginLeft: "-25px" }}>
          {cpu?.temperature ?? 42}°
        </div>
      </div>
      <div className="info-data">
        <div className="data" style={{ fontSize: `${(krakenStore.text.size ?? 1) * 10}vw` }}>
          {cpu?.load ?? 3}%
        </div>
      </div>
    </div>
  )

  const Gpu = () => (
    <div className="info-container gpu-container">
      <div className="info-title">
        {krakenStore.visibility?.gpuIcon !== false && (
          <GpuIcon color={krakenStore.gpuIcon.color} opacity={krakenStore.gpuIcon.alpha} />
        )}
        {krakenStore.visibility?.gpuLabel !== false && (
          <span
            style={{
              color: krakenStore.gpuLabel.color,
              opacity: krakenStore.gpuLabel.alpha,
              fontSize: `${(krakenStore.text.size ?? 1) * 125}%`,
              marginRight: "-15px",
              marginTop: "15px",
            }}
          >
            {gpu?.name?.replace(/nvidia geforce/gi, '').replace(/amd radeon/gi, '').replace(/SUPER/gi, 'S').replace(/RTX/gi, '') ??
              'RTX 3080 Ti'}
          </span>
        )}
      </div>
      <div className="info-data">
        <div className="data" style={{ fontSize: `${(krakenStore.text.size ?? 1) * 10}vw`, marginRight: "-35px" }}>
          {gpu?.temperature ?? 45}°
        </div>
      </div>
      <div className="info-data">
        <div className="data" style={{ fontSize: `${(krakenStore.text.size ?? 1) * 10}vw` }}>
          {gpu?.load ?? 12}%
        </div>
      </div>
    </div>
  )

  return (
    <Container
      style={{
        fontFamily: krakenStore.text.font,
        backgroundColor: krakenStore.visibility?.background !== false
          ? krakenStore.background.color + decToHex(krakenStore.background.alpha * 100)
          : 'transparent',
      }}
    >
      <video
        autoPlay
        loop
        muted
        src={krakenStore.gif.url}
        poster={krakenStore.gif.url}
        width={`${(krakenStore.gif.size ?? 1) * 500}%`}
        style={{
          mixBlendMode: krakenStore.gif.blend,
          filter: `blur(${(krakenStore.gif.blur ?? 1) * 10}px) opacity(${krakenStore.gif.alpha
            }) brightness(${(krakenStore.gif.brightness ?? 1) * 2}) contrast(${(krakenStore.gif.contrast ?? 1) * 2
            })`,
          display: isYouTubeEmbed(krakenStore.gif.url || '') ? 'none' : 'block',
        }}
      />

      {isYouTubeEmbed(krakenStore.gif.url || '') && (
        <iframe
          src={krakenStore.gif.url}
          width={`${(krakenStore.gif.size ?? 1) * 500}%`}
          height="100%"
          style={{
            border: 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            mixBlendMode: krakenStore.gif.blend,
            filter: `blur(${(krakenStore.gif.blur ?? 1) * 10}px) opacity(${krakenStore.gif.alpha
              }) brightness(${(krakenStore.gif.brightness ?? 1) * 2}) contrast(${(krakenStore.gif.contrast ?? 1) * 2
              })`,
          }}
          allow="autoplay; encrypted-media"
        />
      )}

      <Progress
        leftValue={cpu?.temperature}
        rightValue={gpu?.temperature}
        leftCircleStart={krakenStore.leftCircleStart}
        leftCircleEnd={krakenStore.leftCircleEnd}
        rightCircleStart={krakenStore.rightCircleStart}
        rightCircleEnd={krakenStore.rightCircleEnd}
        background={krakenStore.circleBackground}
      >
        <div
          className="monitoring"
          style={{
            color: krakenStore.text.color + decToHex(krakenStore.text.alpha * 100),
            fontSize: `${(krakenStore.text.size ?? 1) * 100}%`,
            width: `${(krakenStore.separator.size ?? 0.6) * 200}%`,
          }}
        >
          <Cpu />
          {krakenStore.visibility?.separator !== false && (
            <div
              className="info-separator"
              style={{
                borderColor: krakenStore.separator.color,
                opacity: krakenStore.separator.alpha,
              }}
            ></div>
          )}
          <Gpu />
        </div>
      </Progress>
    </Container>
  )
}
