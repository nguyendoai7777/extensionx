import { Component, computed } from '@angular/core'
import { DataListLayoutComponent } from '@/src/app/shared/ui/data-list-layout/data-list-layout.component'
import { HeaderComponent } from '@/src/app/shared/layout/default-layout/_ui/header/header.component'
import { ButtonDirective } from '@/src/app/shared/ui/button/button.directive'
import { InputDirective } from '@/src/app/shared/ui/input/input.directive'
import { InputGroupComponent } from '@/src/app/shared/ui/input/input-group.component'
import { PopoverComponent } from '@/src/app/shared/ui/popover/popover.component'
import { PopoverContainerDirective } from '@/src/app/shared/ui/popover/popover-container.directive'
import { PopoverItemDirective } from '@/src/app/shared/ui/popover/popover-item.directive'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterLink } from '@angular/router'
import { SvgIconComponent } from '@/src/app/shared/ui/svg/svg.component'
import { TableComponent } from '@/src/app/shared/ui/table/table.component'
import { TemplateInferType } from '@/src/app/shared/conmon/typed-template.directive'
import { injectQuery, injectQueryClient } from '@tanstack/angular-query-experimental'
import { ListBaseComponent } from '@/src/app/shared/ui/list-base/list-base.component'
import { ExportType } from '@/src/app/shared/types/common.types'
import { NgClass } from '@angular/common'
import { DialogConfirmComponent } from '@/src/app/shared/ui/common/dialog-confirm/dialog-confirm.component'
import { CheckboxComponent } from '@/src/app/shared/ui/checkbox/checkbox.component'
import { CommonSkeletonComponent } from '@/src/app/shared/ui/skeleton/common-skeleton'
import { fromEvent, lastValueFrom, takeUntil } from 'rxjs'
import { AdvancedFilter } from '@/src/app/shared/types/_data'
import { injectSellingPriceDataService } from '@/src/app/routes/master/selling-price/selling-price-data.service'
import { SortingComponent } from '@/src/app/shared/ui/sorting/sorting.component'
import { PaginationComponent } from '@/src/app/shared/ui/pagination/pagination.component'
import { SellingPriceProps } from '@/src/app/routes/master/selling-price/selling-price.types'
import {
	CUSTOMER_PO_QUERY_FIELDS,
	CUSTOMER_PO_TABLE_DEFS,
	CUSTOMER_PO_TABLE_HEADERS,
} from '@/src/app/routes/master/selling-price-customer-po/customer-po-list.const'

@Component({
	selector: 'selling-price-list',
	standalone: true,
	imports: [
		DataListLayoutComponent,
		HeaderComponent,
		ButtonDirective,
		InputDirective,
		InputGroupComponent,
		PopoverComponent,
		PopoverContainerDirective,
		PopoverItemDirective,
		ReactiveFormsModule,
		RouterLink,
		SvgIconComponent,
		FormsModule,
		NgClass,
		CheckboxComponent,
		CommonSkeletonComponent,
		TableComponent,
		SortingComponent,
		TemplateInferType,
		PaginationComponent,
	],
	templateUrl: './customer-po-list.component.html',
	styleUrl: './customer-po-list.component.scss',
})
export class CustomerPoListComponent extends ListBaseComponent<SellingPriceProps, { index: number }> {
	readonly queryClient = injectQueryClient()
	private readonly data$$ = injectSellingPriceDataService()

	tableSettingDefs = CUSTOMER_PO_TABLE_DEFS
	TableHeader = CUSTOMER_PO_TABLE_HEADERS
	readonly dataQuery = injectQuery(() => ({
		queryKey: [
			'CustomerPoDataList',
			this.page(),
			this.searchTemp(),
			this.sortBy(),
			this.orderBy(),
			this.advancedFilterModel(),
			this.pageSizes(),
		],
		keepPreviousData: true,
		queryFn: (context) => {
			const abort$ = fromEvent(context.signal, 'abort'),
				orderBy = this.sortBy() ? [`${this.sortBy()} ${this.orderBy()}`] : []
			return lastValueFrom(
				this.crud
					.getList<SellingPriceProps>({
						pageNumber: this.page(),
						pageSize: this.pageSizes(),
						advancedFilter: this.advancedFilterModel() as AdvancedFilter,
						advancedSearch: {
							fields: CUSTOMER_PO_QUERY_FIELDS,
							keyword: this.searchTemp(),
						},
						orderBy,
					})
					.pipe(takeUntil(abort$))
			)
		},
		placeholderData: (previousData) => previousData,
	}))

	data = computed(() => this.dataQuery.data()?.result.data ?? [])
	paginator = computed(() => this.dataQuery.data()?.result)
	isSelectedAll = computed(() => this.data().length > 0 && this.data().every((el) => this.selectedItems()[el.id]))

	exportData(ctx: PopoverComponent, type: ExportType) {
		this.handleExport({
			ctx,
			type,
			data: this.data(),
			errorMessage: 'customer po',
			fileName: `CustomerPo`,
			queryFields: CUSTOMER_PO_QUERY_FIELDS,
		})
	}

	openDialogConfirmDelete(ids: number[]) {
		const confirmDialog = this.dialog.open(DialogConfirmComponent, {
			width: '480px',
			data: {
				title: 'Are you sure you want to Delete ?',
			},
			disableClose: true,
		})
		confirmDialog.closed.subscribe((isConfirm) => {
			if (isConfirm) {
				this.crud.delete(ids).subscribe(() => {
					this.toast.success({
						message: `Deleted successfully.`,
					})
					void this.queryClient.invalidateQueries({
						queryKey: [
							'CustomerPoDataList',
							this.page(),
							this.searchTemp(),
							this.sortBy(),
							this.orderBy(),
							this.advancedFilterModel(),
							this.pageSizes(),
						],
					})
					this.selectedItems.set({})
				})
				// this.deleteBankAccountMasterMutation.mutate(ids)
			}
		})
	}

	handleClickDeleteMultiple() {
		const keys = Object.keys(this.selectedItems())
		this.openDialogConfirmDelete(keys.map((key) => Number(key)))
	}

	initFilterOption() {
		if (!this.filterInitialed) {
			this.data$$.getFilterOptions().subscribe((data) => {
				const tableDefs = structuredClone(this.tableSettingDefs)

				this.tableSettingDefs = tableDefs
			})
		}
		this.filterInitialed = true
	}
}
