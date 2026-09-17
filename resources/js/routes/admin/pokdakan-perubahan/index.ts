import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
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
const pokdakanPerubahan = {
    approve: Object.assign(approve, approve),
reject: Object.assign(reject, reject),
}

export default pokdakanPerubahan