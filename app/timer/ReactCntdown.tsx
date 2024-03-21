'use client'
import { FC } from 'react'
import Countdown from 'react-countdown'

interface ReactCountdownProps {}

const ReactCntdown: FC<ReactCountdownProps> = ({}) => {
  return (
    <div className="w-full h-full">
      <Countdown
        date={Date.now() + 10000}
        intervalDelay={0}
        precision={3}
        renderer={(props) => <div>{props.total}</div>}
      />
      ,
    </div>
  )
}

export default ReactCntdown
