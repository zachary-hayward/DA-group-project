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
import Avatar from '../Avatar.tsx'
import { ChangeEvent } from 'react'
import Register from '../Register.tsx'
import UserProfileForm from '../UserProfileForm.tsx'

beforeAll(() => {
  nock.disableNetConnect()
})

afterEach(() => nock.cleanAll())

describe('Avatar', () => {
  it('displays avatars to pick', async () => {
    const screen = renderComponent(
      <Avatar
        formImage={''}
        handleChange={function (
          e:
            | ChangeEvent<
                HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
              >
            | { target: { name: string; value: string } },
        ): void {
          throw new Error('Function not implemented.')
        }}
      />,
    )

    const ava_one = await screen.findByAltText(`Avatar number 1`)
    const ava_seven = await screen.findByAltText('Avatar number 7')
    const ava_nine = screen.queryByAltText('Avatar number 9')

    expect(ava_one).toBeVisible()
    expect(ava_seven).toBeVisible()
    expect(ava_nine).toBeNull()
  })
  it('scroll avatars on click', async () => {
    const screen = renderComponent(
      <Avatar
        formImage={''}
        handleChange={function (
          e:
            | ChangeEvent<
                HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
              >
            | { target: { name: string; value: string } },
        ): void {
          throw new Error('Function not implemented.')
        }}
      />,
    )
    const avatarOneAlt = `Avatar number 1`
    const avatarEightAlt = 'Avatar number 8'

    const nextButton = await screen.findByTestId('nextButton')
    const prevButton = await screen.findByTestId('prevButton')

    const ava_one = await screen.findByAltText(avatarOneAlt)
    expect(ava_one).toBeVisible()

    await userEvent.click(nextButton)
    const avaOneAfterClick = screen.queryByAltText(avatarOneAlt)
    expect(avaOneAfterClick).toBeNull()

    const avaEight = await screen.findByAltText(avatarEightAlt)
    expect(avaEight).toBeVisible()

    await userEvent.click(prevButton)
    const avaEightAfterClick = screen.queryByAltText(avatarEightAlt)
    expect(avaEightAfterClick).toBeNull()
  })
  it('selects an avatar', async () => {
    let selected: { name: string; value: string } = { name: '', value: '' }
    const avatarOneAlt = `Avatar number 1`
    const buttonOneTestId = 'button number 1'
    let formImage = ''
    const screen = renderComponent(
      <Avatar
        formImage={formImage}
        handleChange={function (
          e:
            | ChangeEvent<
                HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
              >
            | { target: { name: string; value: string } },
        ): void {
          selected = e.target
          formImage = selected.value
        }}
      />,
    )

    const circledUnclicked = await screen.findByTestId(buttonOneTestId)

    await userEvent.click(circledUnclicked)

    expect(selected.name).toEqual('image')
    expect(selected.value).toEqual('ava-01.png')
  })
  it('shows a circle when an avatar is selected', async () => {
    const scope = nock('http://localhost').get('/api/v1/users').reply(200, {
      id: 1,
      auth0Id: 'auth0|123',
      username: 'paige',
      full_name: 'Paige turner',
      location: 'Auckland',
      image: 'ava-03.png',
    })

    const screen = renderComponent(
      <UserProfileForm
        onSubmit={(_) => {}}
        auth0Id={'auth0|123'}
        username={'paige'}
        fullName={'Paige turner'}
        location={'Auckland'}
        image={'ava-03.png'}
      />,
    )

    const avatarOneAlt = `Avatar number 1`
    const buttonOneTestId = 'button number 1'

    const notYetTransformed = screen.getByTestId(buttonOneTestId)

    expect(notYetTransformed).not.toHaveClass('transform')

    await userEvent.click(notYetTransformed)

    expect(notYetTransformed).toHaveClass('transform')
  })

  it('gives feedback when you hit the end of avatar scrolling', async () => {
    const screen = renderComponent(
      <Avatar
        formImage={''}
        handleChange={function (
          e:
            | ChangeEvent<
                HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
              >
            | { target: { name: string; value: string } },
        ): void {
          throw new Error('Function not implemented.')
        }}
      />,
    )
    const edgeClassName = 'font-thin'
    const maxRightScroll = 11

    const nextButton = await screen.findByTestId('nextButton')
    const prevButton = await screen.findByTestId('prevButton')

    expect(prevButton).toHaveClass(edgeClassName)

    for (let i = 0; i < maxRightScroll - 1; i++) {
      await userEvent.click(nextButton)
      expect(nextButton).not.toHaveClass(edgeClassName)
      expect(prevButton).not.toHaveClass(edgeClassName)
    }

    await userEvent.click(nextButton)
    expect(nextButton).toHaveClass(edgeClassName)
  })
})
