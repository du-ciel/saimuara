import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ExportController::exportExcel
* @see app/Http/Controllers/ExportController.php:137
* @route '/admin/export/excel'
*/
export const exportExcel = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportExcel.url(options),
    method: 'get',
})

exportExcel.definition = {
    methods: ["get","head"],
    url: '/admin/export/excel',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ExportController::exportExcel
* @see app/Http/Controllers/ExportController.php:137
* @route '/admin/export/excel'
*/
exportExcel.url = (options?: RouteQueryOptions) => {
    return exportExcel.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ExportController::exportExcel
* @see app/Http/Controllers/ExportController.php:137
* @route '/admin/export/excel'
*/
exportExcel.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportExcel.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ExportController::exportExcel
* @see app/Http/Controllers/ExportController.php:137
* @route '/admin/export/excel'
*/
exportExcel.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportExcel.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ExportController::exportExcel
* @see app/Http/Controllers/ExportController.php:137
* @route '/admin/export/excel'
*/
const exportExcelForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportExcel.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ExportController::exportExcel
* @see app/Http/Controllers/ExportController.php:137
* @route '/admin/export/excel'
*/
exportExcelForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportExcel.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ExportController::exportExcel
* @see app/Http/Controllers/ExportController.php:137
* @route '/admin/export/excel'
*/
exportExcelForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportExcel.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

exportExcel.form = exportExcelForm

/**
* @see \App\Http\Controllers\ExportController::exportPdf
* @see app/Http/Controllers/ExportController.php:152
* @route '/admin/export/pdf'
*/
export const exportPdf = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportPdf.url(options),
    method: 'get',
})

exportPdf.definition = {
    methods: ["get","head"],
    url: '/admin/export/pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ExportController::exportPdf
* @see app/Http/Controllers/ExportController.php:152
* @route '/admin/export/pdf'
*/
exportPdf.url = (options?: RouteQueryOptions) => {
    return exportPdf.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ExportController::exportPdf
* @see app/Http/Controllers/ExportController.php:152
* @route '/admin/export/pdf'
*/
exportPdf.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportPdf.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ExportController::exportPdf
* @see app/Http/Controllers/ExportController.php:152
* @route '/admin/export/pdf'
*/
exportPdf.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportPdf.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ExportController::exportPdf
* @see app/Http/Controllers/ExportController.php:152
* @route '/admin/export/pdf'
*/
const exportPdfForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportPdf.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ExportController::exportPdf
* @see app/Http/Controllers/ExportController.php:152
* @route '/admin/export/pdf'
*/
exportPdfForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportPdf.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ExportController::exportPdf
* @see app/Http/Controllers/ExportController.php:152
* @route '/admin/export/pdf'
*/
exportPdfForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportPdf.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

exportPdf.form = exportPdfForm

const ExportController = { exportExcel, exportPdf }

export default ExportController