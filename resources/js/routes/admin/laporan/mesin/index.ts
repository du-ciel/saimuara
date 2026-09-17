import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AdminLaporanController::update
 * @see app/Http/Controllers/AdminLaporanController.php:49
 * @route '/admin/laporan/mesin/{laporanMesin}'
 */
export const update = (args: { laporanMesin: number | { id: number } } | [laporanMesin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/laporan/mesin/{laporanMesin}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\AdminLaporanController::update
 * @see app/Http/Controllers/AdminLaporanController.php:49
 * @route '/admin/laporan/mesin/{laporanMesin}'
 */
update.url = (args: { laporanMesin: number | { id: number } } | [laporanMesin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { laporanMesin: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { laporanMesin: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    laporanMesin: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        laporanMesin: typeof args.laporanMesin === 'object'
                ? args.laporanMesin.id
                : args.laporanMesin,
                }

    return update.definition.url
            .replace('{laporanMesin}', parsedArgs.laporanMesin.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminLaporanController::update
 * @see app/Http/Controllers/AdminLaporanController.php:49
 * @route '/admin/laporan/mesin/{laporanMesin}'
 */
update.put = (args: { laporanMesin: number | { id: number } } | [laporanMesin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\AdminLaporanController::update
 * @see app/Http/Controllers/AdminLaporanController.php:49
 * @route '/admin/laporan/mesin/{laporanMesin}'
 */
    const updateForm = (args: { laporanMesin: number | { id: number } } | [laporanMesin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AdminLaporanController::update
 * @see app/Http/Controllers/AdminLaporanController.php:49
 * @route '/admin/laporan/mesin/{laporanMesin}'
 */
        updateForm.put = (args: { laporanMesin: number | { id: number } } | [laporanMesin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\AdminLaporanController::destroy
 * @see app/Http/Controllers/AdminLaporanController.php:119
 * @route '/admin/laporan/mesin/{laporanMesin}'
 */
export const destroy = (args: { laporanMesin: number | { id: number } } | [laporanMesin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/laporan/mesin/{laporanMesin}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\AdminLaporanController::destroy
 * @see app/Http/Controllers/AdminLaporanController.php:119
 * @route '/admin/laporan/mesin/{laporanMesin}'
 */
destroy.url = (args: { laporanMesin: number | { id: number } } | [laporanMesin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { laporanMesin: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { laporanMesin: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    laporanMesin: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        laporanMesin: typeof args.laporanMesin === 'object'
                ? args.laporanMesin.id
                : args.laporanMesin,
                }

    return destroy.definition.url
            .replace('{laporanMesin}', parsedArgs.laporanMesin.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminLaporanController::destroy
 * @see app/Http/Controllers/AdminLaporanController.php:119
 * @route '/admin/laporan/mesin/{laporanMesin}'
 */
destroy.delete = (args: { laporanMesin: number | { id: number } } | [laporanMesin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\AdminLaporanController::destroy
 * @see app/Http/Controllers/AdminLaporanController.php:119
 * @route '/admin/laporan/mesin/{laporanMesin}'
 */
    const destroyForm = (args: { laporanMesin: number | { id: number } } | [laporanMesin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AdminLaporanController::destroy
 * @see app/Http/Controllers/AdminLaporanController.php:119
 * @route '/admin/laporan/mesin/{laporanMesin}'
 */
        destroyForm.delete = (args: { laporanMesin: number | { id: number } } | [laporanMesin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const mesin = {
    update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default mesin