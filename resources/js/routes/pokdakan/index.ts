import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\PokdakanPerubahanController::requestUpdate
 * @see app/Http/Controllers/PokdakanPerubahanController.php:14
 * @route '/pokdakan/{pokdakan}/request-update'
 */
export const requestUpdate = (args: { pokdakan: number | { id: number } } | [pokdakan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: requestUpdate.url(args, options),
    method: 'post',
})

requestUpdate.definition = {
    methods: ["post"],
    url: '/pokdakan/{pokdakan}/request-update',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PokdakanPerubahanController::requestUpdate
 * @see app/Http/Controllers/PokdakanPerubahanController.php:14
 * @route '/pokdakan/{pokdakan}/request-update'
 */
requestUpdate.url = (args: { pokdakan: number | { id: number } } | [pokdakan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return requestUpdate.definition.url
            .replace('{pokdakan}', parsedArgs.pokdakan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PokdakanPerubahanController::requestUpdate
 * @see app/Http/Controllers/PokdakanPerubahanController.php:14
 * @route '/pokdakan/{pokdakan}/request-update'
 */
requestUpdate.post = (args: { pokdakan: number | { id: number } } | [pokdakan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: requestUpdate.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PokdakanPerubahanController::requestUpdate
 * @see app/Http/Controllers/PokdakanPerubahanController.php:14
 * @route '/pokdakan/{pokdakan}/request-update'
 */
    const requestUpdateForm = (args: { pokdakan: number | { id: number } } | [pokdakan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: requestUpdate.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PokdakanPerubahanController::requestUpdate
 * @see app/Http/Controllers/PokdakanPerubahanController.php:14
 * @route '/pokdakan/{pokdakan}/request-update'
 */
        requestUpdateForm.post = (args: { pokdakan: number | { id: number } } | [pokdakan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: requestUpdate.url(args, options),
            method: 'post',
        })
    
    requestUpdate.form = requestUpdateForm
const pokdakan = {
    requestUpdate: Object.assign(requestUpdate, requestUpdate),
}

export default pokdakan