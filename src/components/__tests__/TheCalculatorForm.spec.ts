import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/vue'
import { expect } from 'vitest'

import TheCalculatorForm from '@/components/TheCalculatorForm.vue'

describe('TheCalculatorForm.vue', () => {
  test('should render the form', () => {
    const { getByTestId } = render(TheCalculatorForm)

    expect(getByTestId('calculator-form')).toBeVisible()
  })

  test('should render radio buttons for rate types', () => {
    const { getByLabelText } = render(TheCalculatorForm)

    expect(getByLabelText('Variabel rente')).toBeVisible()
    expect(getByLabelText('Fast rente')).toBeVisible()
  })

  test('should render input fields', () => {
    const { getByLabelText } = render(TheCalculatorForm)

    expect(getByLabelText('Restgæld')).toBeVisible()
    expect(getByLabelText('Bidragssats')).toBeVisible()
    expect(getByLabelText('Rentesats')).toBeVisible()
    expect(getByLabelText('Fremtidig Rentesats')).toBeVisible()
  })
})
