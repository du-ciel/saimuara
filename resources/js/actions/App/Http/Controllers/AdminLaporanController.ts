import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AdminLaporanController::updateMesin
 * @see app/Http/Controllers/AdminLaporanController.php:49
 * @route '/admin/laporan/mesin/{laporanMesin}'
 */
export const updateMesin = (args: { laporanMesin: number | { id: number } } | [laporanMesin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateMesin.url(args, options),
    method: 'put',
})

updateMesin.definition = {
    methods: ["put"],
    url: '/admin/laporan/mesin/{laporanMesin}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\AdminLaporanController::updateMesin
 * @see app/Http/Controllers/AdminLaporanController.php:49
 * @route '/admin/laporan/mesin/{laporanMesin}'
 */
updateMesin.url = (args: { laporanMesin: number | { id: number } } | [laporanMesin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return updateMesin.definition.url
            .replace('{laporanMesin}', parsedArgs.laporanMesin.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminLaporanController::updateMesin
 * @see app/Http/Controllers/AdminLaporanController.php:49
 * @route '/admin/laporan/mesin/{laporanMesin}'
 */
updateMesin.put = (args: { laporanMesin: number | { id: number } } | [laporanMesin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateMesin.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\AdminLaporanController::updateMesin
 * @see app/Http/Controllers/AdminLaporanController.php:49
 * @route '/admin/laporan/mesin/{laporanMesin}'
 */
    const updateMesinForm = (args: { laporanMesin: number | { id: number } } | [laporanMesin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateMesin.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AdminLaporanController::updateMesin
 * @see app/Http/Controllers/AdminLaporanController.php:49
 * @route '/admin/laporan/mesin/{laporanMesin}'
 */
        updateMesinForm.put = (args: { laporanMesin: number | { id: number } } | [laporanMesin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateMesin.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateMesin.form = updateMesinForm
/**
* @see \App\Http\Controllers\AdminLaporanController::destroyMesin
 * @see app/Http/Controllers/AdminLaporanController.php:119
 * @route '/admin/laporan/mesin/{laporanMesin}'
 */
export const destroyMesin = (args: { laporanMesin: number | { id: number } } | [laporanMesin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyMesin.url(args, options),
    method: 'delete',
})

destroyMesin.definition = {
    methods: ["delete"],
    url: '/admin/laporan/mesin/{laporanMesin}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\AdminLaporanController::destroyMesin
 * @see app/Http/Controllers/AdminLaporanController.php:119
 * @route '/admin/laporan/mesin/{laporanMesin}'
 */
destroyMesin.url = (args: { laporanMesin: number | { id: number } } | [laporanMesin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroyMesin.definition.url
            .replace('{laporanMesin}', parsedArgs.laporanMesin.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminLaporanController::destroyMesin
 * @see app/Http/Controllers/AdminLaporanController.php:119
 * @route '/admin/laporan/mesin/{laporanMesin}'
 */
destroyMesin.delete = (args: { laporanMesin: number | { id: number } } | [laporanMesin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyMesin.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\AdminLaporanController::destroyMesin
 * @see app/Http/Controllers/AdminLaporanController.php:119
 * @route '/admin/laporan/mesin/{laporanMesin}'
 */
    const destroyMesinForm = (args: { laporanMesin: number | { id: number } } | [laporanMesin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroyMesin.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AdminLaporanController::destroyMesin
 * @see app/Http/Controllers/AdminLaporanController.php:119
 * @route '/admin/laporan/mesin/{laporanMesin}'
 */
        destroyMesinForm.delete = (args: { laporanMesin: number | { id: number } } | [laporanMesin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroyMesin.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroyMesin.form = destroyMesinForm
/**
* @see \App\Http\Controllers\AdminLaporanController::updateRas
 * @see app/Http/Controllers/AdminLaporanController.php:132
 * @route '/admin/laporan/ras/{laporanRas}'
 */
export const updateRas = (args: { laporanRas: number | { id: number } } | [laporanRas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateRas.url(args, options),
    method: 'put',
})

updateRas.definition = {
    methods: ["put"],
    url: '/admin/laporan/ras/{laporanRas}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\AdminLaporanController::updateRas
 * @see app/Http/Controllers/AdminLaporanController.php:132
 * @route '/admin/laporan/ras/{laporanRas}'
 */
updateRas.url = (args: { laporanRas: number | { id: number } } | [laporanRas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return updateRas.definition.url
            .replace('{laporanRas}', parsedArgs.laporanRas.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminLaporanController::updateRas
 * @see app/Http/Controllers/AdminLaporanController.php:132
 * @route '/admin/laporan/ras/{laporanRas}'
 */
updateRas.put = (args: { laporanRas: number | { id: number } } | [laporanRas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateRas.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\AdminLaporanController::updateRas
 * @see app/Http/Controllers/AdminLaporanController.php:132
 * @route '/admin/laporan/ras/{laporanRas}'
 */
    const updateRasForm = (args: { laporanRas: number | { id: number } } | [laporanRas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateRas.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AdminLaporanController::updateRas
 * @see app/Http/Controllers/AdminLaporanController.php:132
 * @route '/admin/laporan/ras/{laporanRas}'
 */
        updateRasForm.put = (args: { laporanRas: number | { id: number } } | [laporanRas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateRas.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateRas.form = updateRasForm
/**
* @see \App\Http\Controllers\AdminLaporanController::destroyRas
 * @see app/Http/Controllers/AdminLaporanController.php:229
 * @route '/admin/laporan/ras/{laporanRas}'
 */
export const destroyRas = (args: { laporanRas: number | { id: number } } | [laporanRas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyRas.url(args, options),
    method: 'delete',
})

destroyRas.definition = {
    methods: ["delete"],
    url: '/admin/laporan/ras/{laporanRas}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\AdminLaporanController::destroyRas
 * @see app/Http/Controllers/AdminLaporanController.php:229
 * @route '/admin/laporan/ras/{laporanRas}'
 */
destroyRas.url = (args: { laporanRas: number | { id: number } } | [laporanRas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroyRas.definition.url
            .replace('{laporanRas}', parsedArgs.laporanRas.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminLaporanController::destroyRas
 * @see app/Http/Controllers/AdminLaporanController.php:229
 * @route '/admin/laporan/ras/{laporanRas}'
 */
destroyRas.delete = (args: { laporanRas: number | { id: number } } | [laporanRas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyRas.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\AdminLaporanController::destroyRas
 * @see app/Http/Controllers/AdminLaporanController.php:229
 * @route '/admin/laporan/ras/{laporanRas}'
 */
    const destroyRasForm = (args: { laporanRas: number | { id: number } } | [laporanRas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroyRas.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AdminLaporanController::destroyRas
 * @see app/Http/Controllers/AdminLaporanController.php:229
 * @route '/admin/laporan/ras/{laporanRas}'
 */
        destroyRasForm.delete = (args: { laporanRas: number | { id: number } } | [laporanRas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroyRas.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroyRas.form = destroyRasForm
const AdminLaporanController = { updateMesin, destroyMesin, updateRas, destroyRas }

export default AdminLaporanController