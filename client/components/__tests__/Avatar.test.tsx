// @vitest-environment jsdom
import { setupApp } from './setup.tsx'
import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import nock from 'nock'
import Avatar from '../Avatar.tsx'

beforeAll(() => nock.disableNetConnect())

afterEach(() => nock.cleanAll())

describe('Avatar', () => {
  
})