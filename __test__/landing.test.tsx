import {expect, test} from 'vitest';
import {render, screen} from '@testing-library/react';
import Landing from '@/app/(landing)/page';


/**
 * Example of a test using vitest
 * @see https://nextjs.org/docs/app/building-your-application/testing
 */
test('Landing', () => {
    render(<Landing />)
    expect(screen.getByRole('heading', { level: 1, name: 'Next Boilerplate' })).toBeDefined()
  })