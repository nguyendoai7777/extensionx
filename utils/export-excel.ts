/*
install file-saver [^2.0.5], xlsx [^0.17.0]
*/

import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

export interface ExportXLSXProps<T = any> {
	header: string[][];
	data: T[];
	filename?: string;
}

class FileExporter {
	#saveAsExcelFile(buffer: any, fileName: string): void {
		const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
		const EXCEL_EXTENSION = '.xlsx';
		const data: Blob = new Blob([buffer], {
			type: EXCEL_TYPE,
		});
		FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
	}

	exportToExcelWithHeader({ header, data, filename = 'cms-export' }: ExportXLSXProps) {
		const wb = XLSX.utils.book_new();
		const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
		XLSX.utils.sheet_add_aoa(ws, header);
		XLSX.utils.sheet_add_json(ws, data, { origin: 'A2', skipHeader: true });
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
		XLSX.writeFile(wb, `${filename}.xlsx`);
	}

	exportAsExcelFileRaw<T = any[]>(json: T, excelFileName: string): void {
		const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
		const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
		const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
		this.#saveAsExcelFile(excelBuffer, excelFileName);
	}

	exportSample() {
		const sheet = []; // array of object;
		this.exportToExcelWithHeader({
			header: [['MT5 ID', 'Opening Data', 'Parent IB ID', 'MAMPAMM', 'MT5 User Type', 'Username', 'Username(JP)', 'Email', 'KYC', 'Activated', 'Status']],
			data: sheet,
		});
	}
}
