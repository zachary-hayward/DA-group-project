// @vitest-environment jsdom
import {
  describe,
  it,
  expect,
  beforeAll,
  beforeEach,
  afterEach,
  vi,
} from 'vitest'
import '@testing-library/jest-dom/vitest'
import { renderRoute, renderComponent } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import nock from 'nock'
import { ChangeEvent } from 'react'
import UserProfileForm from '../UserProfileForm.tsx'
import { UserData } from '../../../models/user.ts'

beforeAll(() => {
  nock.disableNetConnect()
})

afterEach(() => nock.cleanAll())


describe('User profile form', () => {
  it('Submits when the button is clicked', async () => {
    let submitted = false
    
    renderComponent(<UserProfileForm onSubmit={function (_: UserData): void {
      submitted = true
    } } auth0Id={''} username={''} fullName={''} location={''} image={''} />)


    const submitButton = await screen.findByTestId('submit-button')

    await userEvent.click(submitButton)

    expect(submitted).toEqual(true)
  })

  // it('Selects an avatar on click', async() => {
    
  // })
})