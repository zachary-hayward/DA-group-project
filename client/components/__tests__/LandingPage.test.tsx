// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'

import { renderRoute } from '../../test-utils'

describe('<LandingPage />', () => {
  it('renders a button that has a <button> html tag and a class name', () => {
    renderRoute('/login')

    const button = screen.getByRole('button', { name: /Sign Up/ })
    expect(button).toContainHTML('button')
    expect(button).toHaveClass('px-8')
    expect.assertions(2)
  })
})
