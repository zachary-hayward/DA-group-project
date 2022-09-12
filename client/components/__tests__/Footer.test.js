import React from 'react'
import '@testing-library/jest-dom'
import { screen, render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import store from '../../store'
import Footer from '../Footer'

describe('<Footer/>', () => {
  it.skip('renders something soon...', () => {
    render(
      <Provider store={store}>
        <Router>
          <Footer />
        </Router>
      </Provider>
    )
  })
})