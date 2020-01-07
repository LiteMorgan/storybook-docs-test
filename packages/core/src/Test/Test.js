import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import styles from './Test.module.scss'

export const Test = ({
  text: textProp,
}) => {
  return (
    <div className={clsx(styles.root)}>
      { textProp }
    </div>
  )
}

Test.defaultProps = {
  text: 'Hello world',
}

Test.propTypes = {
  /**
   * A block of text to display.
   */
  text: PropTypes.string.isRequired,
}