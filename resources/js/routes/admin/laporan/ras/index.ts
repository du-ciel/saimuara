import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AdminLaporanController::update
 * @see app/Http/Controllers/AdminLaporanController.php:132
 * @route '/admin/laporan/ras/{laporanRas}'
 */
export const update = (args: { laporanRas: number | { id: number } } | [laporanRas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/laporan/ras/{laporanRas}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\AdminLaporanController::update
 * @see app/Http/Controllers/AdminLaporanController.php:132
 * @route '/admin/laporan/ras/{laporanRas}'
 */
update.url = (args: { laporanRas: number | { id: number } } | [laporanRas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { laporanRas: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { laporanRas: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    laporanRas: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        laporanRas: typeof args.laporanRas === 'object'
                ? args.laporanRas.id
                : args.laporanRas,
                }

    return update.definition.url
            .replace('{laporanRas}', parsedArgs.laporanRas.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminLaporanController::update
 * @see app/Http/Controllers/AdminLaporanController.php:132
 * @route '/admin/laporan/ras/{laporanRas}'
 */
update.put = (args: { laporanRas: number | { id: number } } | [laporanRas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\AdminLaporanController::update
 * @see app/Http/Controllers/AdminLaporanController.php:132
 * @route '/admin/laporan/ras/{laporanRas}'
 */
    const updateForm = (args: { laporanRas: number | { id: number } } | [laporanRas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/AdminLaporanController.php:132
 * @route '/admin/laporan/ras/{laporanRas}'
 */
        updateForm.put = (args: { laporanRas: number | { id: number } } | [laporanRas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/AdminLaporanController.php:229
 * @route '/admin/laporan/ras/{laporanRas}'
 */
export const destroy = (args: { laporanRas: number | { id: number } } | [laporanRas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/laporan/ras/{laporanRas}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\AdminLaporanController::destroy
 * @see app/Http/Controllers/AdminLaporanController.php:229
 * @route '/admin/laporan/ras/{laporanRas}'
 */
destroy.url = (args: { laporanRas: number | { id: number } } | [laporanRas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { laporanRas: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { laporanRas: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    laporanRas: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        laporanRas: typeof args.laporanRas === 'object'
                ? args.laporanRas.id
                : args.laporanRas,
                }

    return destroy.definition.url
            .replace('{laporanRas}', parsedArgs.laporanRas.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminLaporanController::destroy
 * @see app/Http/Controllers/AdminLaporanController.php:229
 * @route '/admin/laporan/ras/{laporanRas}'
 */
destroy.delete = (args: { laporanRas: number | { id: number } } | [laporanRas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\AdminLaporanController::destroy
 * @see app/Http/Controllers/AdminLaporanController.php:229
 * @route '/admin/laporan/ras/{laporanRas}'
 */
    const destroyForm = (args: { laporanRas: number | { id: number } } | [laporanRas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/AdminLaporanController.php:229
 * @route '/admin/laporan/ras/{laporanRas}'
 */
        destroyForm.delete = (args: { laporanRas: number | { id: number } } | [laporanRas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const ras = {
    update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default ras