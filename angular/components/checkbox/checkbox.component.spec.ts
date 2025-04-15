import { CheckboxComponent } from '@/src/app/shared/ui/checkbox/checkbox.component'
import { NgIconComponent } from '@ng-icons/core'
import { fireEvent, render, screen } from '@testing-library/angular'

const setup = () => {
	return render(CheckboxComponent, {
		imports: [NgIconComponent],
	})
}

it('should render checkbox', async () => {
	await setup()
	const checkbox = screen.getByRole('checkbox')

	expect(checkbox).toBeInTheDocument()
})

it('should show icon when the checkbox is clicked once', async () => {
	await setup()
	const checkbox = screen.getByRole('checkbox')

	expect(checkbox).toBeInTheDocument()

	fireEvent.click(checkbox)

	const checkIcon = screen.getByTestId('check-icon')
	expect(checkIcon).toBeInTheDocument()
})

it('should hide icon when the checkbox is clicked twice', async () => {
	await setup()
	const checkbox = screen.getByRole('checkbox')

	expect(checkbox).toBeInTheDocument()

	fireEvent.click(checkbox)
	fireEvent.click(checkbox)

	const checkIcon = screen.queryByTestId('check-icon')
	expect(checkIcon).not.toBeInTheDocument()
})
