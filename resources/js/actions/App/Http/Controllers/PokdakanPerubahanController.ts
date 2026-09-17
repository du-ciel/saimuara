import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PokdakanPerubahanController::store
 * @see app/Http/Controllers/PokdakanPerubahanController.php:14
 * @route '/pokdakan/{pokdakan}/request-update'
 */
export const store = (args: { pokdakan: number | { id: number } } | [pokdakan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/pokdakan/{pokdakan}/request-update',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PokdakanPerubahanController::store
 * @see app/Http/Controllers/PokdakanPerubahanController.php:14
 * @route '/pokdakan/{pokdakan}/request-update'
 */
store.url = (args: { pokdakan: number | { id: number } } | [pokdakan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pokdakan: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { pokdakan: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    pokdakan: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        pokdakan: typeof args.pokdakan === 'object'
                ? args.pokdakan.id
                : args.pokdakan,
                }

    return store.definition.url
            .replace('{pokdakan}', parsedArgs.pokdakan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PokdakanPerubahanController::store
 * @see app/Http/Controllers/PokdakanPerubahanController.php:14
 * @route '/pokdakan/{pokdakan}/request-update'
 */
store.post = (args: { pokdakan: number | { id: number } } | [pokdakan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PokdakanPerubahanController::store
 * @see app/Http/Controllers/PokdakanPerubahanController.php:14
 * @route '/pokdakan/{pokdakan}/request-update'
 */
    const storeForm = (args: { pokdakan: number | { id: number } } | [pokdakan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PokdakanPerubahanController::store
 * @see app/Http/Controllers/PokdakanPerubahanController.php:14
 * @route '/pokdakan/{pokdakan}/request-update'
 */
        storeForm.post = (args: { pokdakan: number | { id: number } } | [pokdakan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\PokdakanPerubahanController::approve
 * @see app/Http/Controllers/PokdakanPerubahanController.php:110
 * @route '/admin/pokdakan-perubahan/{perubahan}/approve'
 */
export const approve = (args: { perubahan: number | { id: number } } | [perubahan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

approve.definition = {
    methods: ["post"],
    url: '/admin/pokdakan-perubahan/{perubahan}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PokdakanPerubahanController::approve
 * @see app/Http/Controllers/PokdakanPerubahanController.php:110
 * @route '/admin/pokdakan-perubahan/{perubahan}/approve'
 */
approve.url = (args: { perubahan: number | { id: number } } | [perubahan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { perubahan: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { perubahan: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    perubahan: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        perubahan: typeof args.perubahan === 'object'
                ? args.perubahan.id
                : args.perubahan,
                }

    return approve.definition.url
            .replace('{perubahan}', parsedArgs.perubahan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PokdakanPerubahanController::approve
 * @see app/Http/Controllers/PokdakanPerubahanController.php:110
 * @route '/admin/pokdakan-perubahan/{perubahan}/approve'
 */
approve.post = (args: { perubahan: number | { id: number } } | [perubahan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PokdakanPerubahanController::approve
 * @see app/Http/Controllers/PokdakanPerubahanController.php:110
 * @route '/admin/pokdakan-perubahan/{perubahan}/approve'
 */
    const approveForm = (args: { perubahan: number | { id: number } } | [perubahan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: approve.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PokdakanPerubahanController::approve
 * @see app/Http/Controllers/PokdakanPerubahanController.php:110
 * @route '/admin/pokdakan-perubahan/{perubahan}/approve'
 */
        approveForm.post = (args: { perubahan: number | { id: number } } | [perubahan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: approve.url(args, options),
            method: 'post',
        })
    
    approve.form = approveForm
/**
* @see \App\Http\Controllers\PokdakanPerubahanController::reject
 * @see app/Http/Controllers/PokdakanPerubahanController.php:140
 * @route '/admin/pokdakan-perubahan/{perubahan}/reject'
 */
export const reject = (args: { perubahan: number | { id: number } } | [perubahan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/admin/pokdakan-perubahan/{perubahan}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PokdakanPerubahanController::reject
 * @see app/Http/Controllers/PokdakanPerubahanController.php:140
 * @route '/admin/pokdakan-perubahan/{perubahan}/reject'
 */
reject.url = (args: { perubahan: number | { id: number } } | [perubahan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { perubahan: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { perubahan: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    perubahan: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        perubahan: typeof args.perubahan === 'object'
                ? args.perubahan.id
                : args.perubahan,
                }

    return reject.definition.url
            .replace('{perubahan}', parsedArgs.perubahan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PokdakanPerubahanController::reject
 * @see app/Http/Controllers/PokdakanPerubahanController.php:140
 * @route '/admin/pokdakan-perubahan/{perubahan}/reject'
 */
reject.post = (args: { perubahan: number | { id: number } } | [perubahan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PokdakanPerubahanController::reject
 * @see app/Http/Controllers/PokdakanPerubahanController.php:140
 * @route '/admin/pokdakan-perubahan/{perubahan}/reject'
 */
    const rejectForm = (args: { perubahan: number | { id: number } } | [perubahan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reject.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PokdakanPerubahanController::reject
 * @see app/Http/Controllers/PokdakanPerubahanController.php:140
 * @route '/admin/pokdakan-perubahan/{perubahan}/reject'
 */
        rejectForm.post = (args: { perubahan: number | { id: number } } | [perubahan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reject.url(args, options),
            method: 'post',
        })
    
    reject.form = rejectForm
const PokdakanPerubahanController = { store, approve, reject }

export default PokdakanPerubahanController