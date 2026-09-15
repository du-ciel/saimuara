import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
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
* @see \App\Http\Controllers\InputController::storeLaporanMesin
 * @see app/Http/Controllers/InputController.php:75
 * @route '/input/mesin'
 */
export const storeLaporanMesin = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeLaporanMesin.url(options),
    method: 'post',
})

storeLaporanMesin.definition = {
    methods: ["post"],
    url: '/input/mesin',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InputController::storeLaporanMesin
 * @see app/Http/Controllers/InputController.php:75
 * @route '/input/mesin'
 */
storeLaporanMesin.url = (options?: RouteQueryOptions) => {
    return storeLaporanMesin.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InputController::storeLaporanMesin
 * @see app/Http/Controllers/InputController.php:75
 * @route '/input/mesin'
 */
storeLaporanMesin.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeLaporanMesin.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\InputController::storeLaporanMesin
 * @see app/Http/Controllers/InputController.php:75
 * @route '/input/mesin'
 */
    const storeLaporanMesinForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeLaporanMesin.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\InputController::storeLaporanMesin
 * @see app/Http/Controllers/InputController.php:75
 * @route '/input/mesin'
 */
        storeLaporanMesinForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeLaporanMesin.url(options),
            method: 'post',
        })
    
    storeLaporanMesin.form = storeLaporanMesinForm
/**
* @see \App\Http\Controllers\InputController::storeLaporanRas
 * @see app/Http/Controllers/InputController.php:92
 * @route '/input/ras'
 */
export const storeLaporanRas = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeLaporanRas.url(options),
    method: 'post',
})

storeLaporanRas.definition = {
    methods: ["post"],
    url: '/input/ras',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InputController::storeLaporanRas
 * @see app/Http/Controllers/InputController.php:92
 * @route '/input/ras'
 */
storeLaporanRas.url = (options?: RouteQueryOptions) => {
    return storeLaporanRas.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InputController::storeLaporanRas
 * @see app/Http/Controllers/InputController.php:92
 * @route '/input/ras'
 */
storeLaporanRas.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeLaporanRas.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\InputController::storeLaporanRas
 * @see app/Http/Controllers/InputController.php:92
 * @route '/input/ras'
 */
    const storeLaporanRasForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeLaporanRas.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\InputController::storeLaporanRas
 * @see app/Http/Controllers/InputController.php:92
 * @route '/input/ras'
 */
        storeLaporanRasForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeLaporanRas.url(options),
            method: 'post',
        })
    
    storeLaporanRas.form = storeLaporanRasForm
const InputController = { index, storePokdakan, storeLaporanMesin, storeLaporanRas }

export default InputController