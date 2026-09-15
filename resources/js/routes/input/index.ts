import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\InputController::index
 * @see app/Http/Controllers/InputController.php:13
 * @route '/input'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/input',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InputController::index
 * @see app/Http/Controllers/InputController.php:13
 * @route '/input'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InputController::index
 * @see app/Http/Controllers/InputController.php:13
 * @route '/input'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\InputController::index
 * @see app/Http/Controllers/InputController.php:13
 * @route '/input'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\InputController::index
 * @see app/Http/Controllers/InputController.php:13
 * @route '/input'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\InputController::index
 * @see app/Http/Controllers/InputController.php:13
 * @route '/input'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\InputController::index
 * @see app/Http/Controllers/InputController.php:13
 * @route '/input'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\InputController::storePokdakan
 * @see app/Http/Controllers/InputController.php:34
 * @route '/input/pokdakan'
 */
export const storePokdakan = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storePokdakan.url(options),
    method: 'post',
})

storePokdakan.definition = {
    methods: ["post"],
    url: '/input/pokdakan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InputController::storePokdakan
 * @see app/Http/Controllers/InputController.php:34
 * @route '/input/pokdakan'
 */
storePokdakan.url = (options?: RouteQueryOptions) => {
    return storePokdakan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InputController::storePokdakan
 * @see app/Http/Controllers/InputController.php:34
 * @route '/input/pokdakan'
 */
storePokdakan.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storePokdakan.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\InputController::storePokdakan
 * @see app/Http/Controllers/InputController.php:34
 * @route '/input/pokdakan'
 */
    const storePokdakanForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storePokdakan.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\InputController::storePokdakan
 * @see app/Http/Controllers/InputController.php:34
 * @route '/input/pokdakan'
 */
        storePokdakanForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storePokdakan.url(options),
            method: 'post',
        })
    
    storePokdakan.form = storePokdakanForm
/**
* @see \App\Http\Controllers\InputController::storeMesin
 * @see app/Http/Controllers/InputController.php:75
 * @route '/input/mesin'
 */
export const storeMesin = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeMesin.url(options),
    method: 'post',
})

storeMesin.definition = {
    methods: ["post"],
    url: '/input/mesin',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InputController::storeMesin
 * @see app/Http/Controllers/InputController.php:75
 * @route '/input/mesin'
 */
storeMesin.url = (options?: RouteQueryOptions) => {
    return storeMesin.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InputController::storeMesin
 * @see app/Http/Controllers/InputController.php:75
 * @route '/input/mesin'
 */
storeMesin.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeMesin.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\InputController::storeMesin
 * @see app/Http/Controllers/InputController.php:75
 * @route '/input/mesin'
 */
    const storeMesinForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeMesin.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\InputController::storeMesin
 * @see app/Http/Controllers/InputController.php:75
 * @route '/input/mesin'
 */
        storeMesinForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeMesin.url(options),
            method: 'post',
        })
    
    storeMesin.form = storeMesinForm
/**
* @see \App\Http\Controllers\InputController::storeRas
 * @see app/Http/Controllers/InputController.php:92
 * @route '/input/ras'
 */
export const storeRas = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeRas.url(options),
    method: 'post',
})

storeRas.definition = {
    methods: ["post"],
    url: '/input/ras',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InputController::storeRas
 * @see app/Http/Controllers/InputController.php:92
 * @route '/input/ras'
 */
storeRas.url = (options?: RouteQueryOptions) => {
    return storeRas.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InputController::storeRas
 * @see app/Http/Controllers/InputController.php:92
 * @route '/input/ras'
 */
storeRas.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeRas.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\InputController::storeRas
 * @see app/Http/Controllers/InputController.php:92
 * @route '/input/ras'
 */
    const storeRasForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeRas.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\InputController::storeRas
 * @see app/Http/Controllers/InputController.php:92
 * @route '/input/ras'
 */
        storeRasForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeRas.url(options),
            method: 'post',
        })
    
    storeRas.form = storeRasForm
const input = {
    index: Object.assign(index, index),
storePokdakan: Object.assign(storePokdakan, storePokdakan),
storeMesin: Object.assign(storeMesin, storeMesin),
storeRas: Object.assign(storeRas, storeRas),
}

export default input