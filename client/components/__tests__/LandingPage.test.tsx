// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import '../../test-utils'
import { screen, render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

import LandingPage from '../LandingPage'

describe('<LandingPage />', () => {
  it('renders a button that has a <button> html tag and a class name', () => {
    render(
      <Router>
        <LandingPage />
      </Router>
    )
    const button = screen.getByRole('button', { name: /Sign Up/ })
    expect(button).toContainHTML('button')
    expect(button).toHaveClass('px-8')
    expect.assertions(2)
  })
})
