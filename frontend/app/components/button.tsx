import * as React from 'react'

import './button.css'

type Props = {
  name: string
}

const Button: React.FC<Props> = ({name}) => {

  return <button className="btn-primary">
      Connect {name}
    </button>
}

export default Button