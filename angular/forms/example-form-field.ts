import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { ReactiveFormExtension } from '@/src/app/shared/ui/form-fields/reactive-form.extension'
import { InputDirective } from '@/src/app/shared/ui/input/input.directive'
import { FieldErrorComponent } from '@/src/app/shared/ui/form-fields/field-handle-error/field-handler-error.component'

@Component({
	selector: 'form-example',
	standalone: true,
	imports: [ReactiveFormsModule, InputDirective, FieldErrorComponent],
	template: `
		<form [formGroup]="form">
			<label>
				<div>Name</div>
				<input appInput formControlName="name" [attr.aria-invalid]="invalidField('name', form)" />
			</label>
			<field-error
				[control]="form.controls.name"
				[errors]="form.controls.name.errors"
				[errorMap]="errorMap"
				clickable
				(clickedError)="handleClicked($event)"
			/>
			<hr />
			<ng-container formArrayName="info">
				@for (inf of form.controls.info.controls; let idx = $index; track idx) {
					<div [formGroup]="inf">
						<label>
							<span>age</span>
							<input appInput formControlName="age" />
						</label>
						<field-error
							[errorMap]="errorMap"
							[control]="form.controls.info.controls[idx].controls.age"
							[errors]="form.controls.info.controls[idx].controls.age.errors"
						/>
						<br />
						<label [class.text-red-500]="invalidFieldInArray(idx, 'email')">
							<span>email</span>
							<input appInput formControlName="email" />
						</label>
						<field-error
							[control]="form.controls.info.controls[idx].controls.email"
							[errors]="form.controls.info.controls[idx].controls.email.errors"
						/>
					</div>
					<button (click)="remove(idx)">Remove</button>
				}
			</ng-container>
			<button (click)="add()">Add</button>
		</form>

		<button (click)="setAsyncError()">Submit</button>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleFormField {
	errorMap = {
		required: 'Required field',
		email: 'Email format incorrect',
	}
	fb = new FormBuilder()

	infoFormField = this.fb.nonNullable.group({
		age: ['', [Validators.required]],
		email: ['', [Validators.required, Validators.email]],
	})

	form = this.fb.nonNullable.group({
		name: ['', [Validators.required]],
		info: this.fb.nonNullable.array([this.infoFormField]),
	})

	/*form2 = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    info: this.fb.nonNullable.array([
      this.fb.nonNullable.group({
        age: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
      }),
    ]),
  })*/

	invalidFieldInArray = ReactiveFormExtension.invalidFieldInArray(this.form, 'info')

	setAsyncError() {
		/*this.form.controls.info.at(0).controls.email.setErrors({
      email: undefined,
    })*/
		/*console.log({
      invalid: this.form.invalid,
      errors: this.form.controls.name.errors,
      form: this.form,
    })*/

		/**
		 * example for handle conflict id,
		 * <field-error
		 *    clickable
		 *    (clickedError)="handleClicked($event)"
		 *  />
		 *
		 **/
		ReactiveFormExtension.setAsyncError(this.form, ReactiveFormExtension.handleAsyncConflictId(this.err))

		this.form.markAllAsTouched()
	}

	err = {
		name: ['This is duplicated, please try again.'],
		'name.conflictingRecordId': ['136'],
	}

	add() {
		this.form.controls.info.push(
			this.fb.nonNullable.group({
				age: ['', [Validators.required]],
				email: [''],
			})
		)
	}

	/**
	 * remove item in array
	 *
	 * */
	remove(index: number) {
		this.form.controls.info.removeAt(index)
	}

	invalidField = ReactiveFormExtension.invalidField(this.form)

	handleClicked($event: string) {
		console.log($event.length)
	}
}
