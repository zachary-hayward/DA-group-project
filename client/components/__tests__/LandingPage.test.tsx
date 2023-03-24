import '@testing-library/jest-dom'
import { screen, render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import store from '../../store'
import LandingPage from '../LandingPage'

describe('<LandingPage />', () => {
  it('renders a button that has a <button> html tag and a class name', () => {
    render(
      <Provider store={store}>
        <Router>
          <LandingPage />
        </Router>
      </Provider>
    )
    const button = screen.getByRole('button', { name: /Sign Up/ })
    expect(button).toContainHTML('button')
    expect(button).toHaveClass('px-8')
    expect.assertions(2)
  })
})
