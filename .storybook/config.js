import React from 'react'
import { addDecorator, addParameters, configure } from '@storybook/react'
// import { withContexts } from '@storybook/addon-contexts/react'
import { withKnobs } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks'

addDecorator(withKnobs)
addDecorator(withA11y)
addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  }
})

const loadStories = () => {
  return [
    require.context('../packages', true, /\.(stories|story)\.(js|jsx|ts|tsx|mdx)$/)
  ]
}

configure(loadStories(), module)
