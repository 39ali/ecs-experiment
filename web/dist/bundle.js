/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../sim-ecs/dist/ecs/ecs-entity.js":
/*!*****************************************!*\
  !*** ../sim-ecs/dist/ecs/ecs-entity.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.unregisterEntityId = exports.unregisterEntity = exports.registerEntity = exports.getEntity = exports.clearRegistry = void 0;\nconst entities = new Map();\n/**\n * Remove any referenced deleted entities\n */\nfunction clearRegistry() {\n    let entity;\n    let entityRef;\n    for (entityRef of entities.values()) {\n        entity = entityRef.deref();\n        if (entity) {\n            unregisterEntity(entity);\n        }\n    }\n}\nexports.clearRegistry = clearRegistry;\n/**\n * Get a tracked entity\n * @param id\n */\nfunction getEntity(id) {\n    return entities.get(id)?.deref();\n}\nexports.getEntity = getEntity;\n/**\n * Register an entity by its ID\n * @param entity\n */\nfunction registerEntity(entity) {\n    entities.set(entity.id, new WeakRef(entity));\n}\nexports.registerEntity = registerEntity;\n/**\n * Remove an entity\n * @param entity\n */\nfunction unregisterEntity(entity) {\n    unregisterEntityId(entity.id);\n}\nexports.unregisterEntity = unregisterEntity;\n/**\n * Remove an entity by id\n * @param id\n */\nfunction unregisterEntityId(id) {\n    entities.delete(id);\n}\nexports.unregisterEntityId = unregisterEntityId;\n//# sourceMappingURL=ecs-entity.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/ecs/ecs-entity.js?");

/***/ }),

/***/ "../sim-ecs/dist/ecs/ecs-query.js":
/*!****************************************!*\
  !*** ../sim-ecs/dist/ecs/ecs-query.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.queryEntities = exports.queryComponents = void 0;\nconst entities_query_1 = __webpack_require__(/*! ../query/entities-query */ \"../sim-ecs/dist/query/entities-query.js\");\nconst components_query_1 = __webpack_require__(/*! ../query/components-query */ \"../sim-ecs/dist/query/components-query.js\");\nfunction queryComponents(query) {\n    return new components_query_1.ComponentsQuery(query);\n}\nexports.queryComponents = queryComponents;\nfunction queryEntities(...query) {\n    return new entities_query_1.EntitiesQuery(query);\n}\nexports.queryEntities = queryEntities;\n//# sourceMappingURL=ecs-query.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/ecs/ecs-query.js?");

/***/ }),

/***/ "../sim-ecs/dist/ecs/ecs-sync-point.js":
/*!*********************************************!*\
  !*** ../sim-ecs/dist/ecs/ecs-sync-point.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.removeSyncPoint = exports.getSyncPoint = exports.addSyncPoint = void 0;\nconst syncPoints = new Map();\n/**\n * Register a sync-point by name\n * @param syncPoint\n */\nfunction addSyncPoint(syncPoint) {\n    if (!syncPoint.name) {\n        throw new Error('Cannot register a sync point without a name!');\n    }\n    {\n        const name = syncPoint.name;\n        if (syncPoints.has(name) && syncPoints.get(name) != syncPoint) {\n            throw new Error(`Another sync point with the name \"${name}\" has already been registered!`);\n        }\n        syncPoints.set(name, syncPoint);\n    }\n}\nexports.addSyncPoint = addSyncPoint;\n/**\n * Find a sync-point by name, if it exists\n * @param name\n */\nfunction getSyncPoint(name) {\n    return syncPoints.get(name);\n}\nexports.getSyncPoint = getSyncPoint;\n/**\n * Remove a sync-point from the registry by name, if it exists\n * @param name\n */\nfunction removeSyncPoint(name) {\n    syncPoints.delete(name);\n}\nexports.removeSyncPoint = removeSyncPoint;\n//# sourceMappingURL=ecs-sync-point.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/ecs/ecs-sync-point.js?");

/***/ }),

/***/ "../sim-ecs/dist/ecs/ecs-world.js":
/*!****************************************!*\
  !*** ../sim-ecs/dist/ecs/ecs-world.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.removeWorld = exports.getWorlds = exports.getWorld = exports.buildWorld = exports.addWorld = void 0;\nconst world_builder_1 = __webpack_require__(/*! ../world/world-builder */ \"../sim-ecs/dist/world/world-builder.js\");\nconst serde_1 = __webpack_require__(/*! ../serde/serde */ \"../sim-ecs/dist/serde/serde.js\");\nconst worlds = new Set();\n/**\n * Register a world\n * @param world\n */\nfunction addWorld(world) {\n    worlds.add(world);\n}\nexports.addWorld = addWorld;\n/**\n * Build a new world and automatically add it to the list of worlds inside the ECS\n */\nfunction buildWorld() {\n    const serde = new serde_1.SerDe();\n    return new world_builder_1.WorldBuilder(serde).addCallback(world => worlds.add(world));\n}\nexports.buildWorld = buildWorld;\n/**\n * Get a world with a name\n * @param name\n */\nfunction getWorld(name) {\n    let world;\n    for (world of worlds) {\n        if (world.name == name) {\n            return world;\n        }\n    }\n}\nexports.getWorld = getWorld;\n/**\n * Iterate over all registered worlds\n */\nfunction getWorlds() {\n    return worlds.values();\n}\nexports.getWorlds = getWorlds;\n/**\n * Remove a world\n * @param world\n */\nfunction removeWorld(world) {\n    worlds.delete(world);\n}\nexports.removeWorld = removeWorld;\n//# sourceMappingURL=ecs-world.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/ecs/ecs-world.js?");

/***/ }),

/***/ "../sim-ecs/dist/entity/entity-builder.js":
/*!************************************************!*\
  !*** ../sim-ecs/dist/entity/entity-builder.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.EntityBuilder = void 0;\nconst tslib_1 = __webpack_require__(/*! tslib */ \"../sim-ecs/node_modules/tslib/tslib.es6.js\");\nconst entity_1 = __webpack_require__(/*! ./entity */ \"../sim-ecs/dist/entity/entity.js\");\ntslib_1.__exportStar(__webpack_require__(/*! ./entity-builder.spec */ \"../sim-ecs/dist/entity/entity-builder.spec.js\"), exports);\nclass EntityBuilder {\n    constructor(uuid, callback) {\n        this.uuid = uuid;\n        this.callback = callback;\n        this.components = new Map();\n    }\n    build() {\n        const entity = new entity_1.Entity(this.uuid);\n        let component;\n        for (component of this.components) {\n            entity.addComponent(component[0], ...component[1]);\n        }\n        this.callback?.(entity);\n        return entity;\n    }\n    with(component, ...args) {\n        this.components.set(component, args);\n        return this;\n    }\n    withAll(...components) {\n        let component;\n        for (component of components) {\n            this.with(component);\n        }\n        return this;\n    }\n}\nexports.EntityBuilder = EntityBuilder;\n//# sourceMappingURL=entity-builder.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/entity/entity-builder.js?");

/***/ }),

/***/ "../sim-ecs/dist/entity/entity-builder.spec.js":
/*!*****************************************************!*\
  !*** ../sim-ecs/dist/entity/entity-builder.spec.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n//# sourceMappingURL=entity-builder.spec.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/entity/entity-builder.spec.js?");

/***/ }),

/***/ "../sim-ecs/dist/entity/entity.js":
/*!****************************************!*\
  !*** ../sim-ecs/dist/entity/entity.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Entity = void 0;\nconst tslib_1 = __webpack_require__(/*! tslib */ \"../sim-ecs/node_modules/tslib/tslib.es6.js\");\nconst ecs_entity_1 = __webpack_require__(/*! ../ecs/ecs-entity */ \"../sim-ecs/dist/ecs/ecs-entity.js\");\ntslib_1.__exportStar(__webpack_require__(/*! ./entity.spec */ \"../sim-ecs/dist/entity/entity.spec.js\"), exports);\nlet idCounter = BigInt(0);\nclass Entity {\n    constructor(uuid) {\n        this.components = new Map();\n        this.tags = new Set();\n        this.uuid = uuid ?? Entity.uuidFn();\n        (0, ecs_entity_1.registerEntity)(this);\n    }\n    get id() {\n        return this.uuid;\n    }\n    addComponent(component, ...args) {\n        const obj = this.asObject(component, ...args);\n        if (this.hasComponent(obj.constructor)) {\n            throw new Error(`Component \"${obj.constructor.name}\" already exists on entity!`);\n        }\n        this.components.set(obj.constructor, obj);\n        return this;\n    }\n    addTag(tag) {\n        this.tags.add(tag);\n        return this;\n    }\n    asObject(component, ...args) {\n        return typeof component === 'object'\n            ? component\n            : new (component.prototype.constructor.bind(component, ...Array.from(arguments).slice(1)))();\n    }\n    clone(serde, uuid) {\n        // serialize\n        const serialFormat = serde.serialize({\n            entities: [this].values(),\n            resources: {},\n        });\n        // de-serialize\n        const entity = serde.deserialize(serialFormat).entities.next().value;\n        // assign new ID\n        entity.uuid = uuid ?? Entity.uuidFn();\n        // DONE!\n        return entity;\n    }\n    getComponent(component) {\n        return this.components.get(component);\n    }\n    getComponentCount() {\n        return this.components.size;\n    }\n    getComponents() {\n        return this.components.values();\n    }\n    getConstructor(component) {\n        return typeof component === 'object'\n            ? component.constructor\n            : component;\n    }\n    getTagCount() {\n        return this.tags.size;\n    }\n    getTags() {\n        return this.tags.values();\n    }\n    hasComponent(component) {\n        return this.components.has(this.getConstructor(component));\n    }\n    hasTag(tag) {\n        return this.tags.has(tag);\n    }\n    removeComponent(component) {\n        this.components.delete(this.getConstructor(component));\n        return this;\n    }\n    removeTag(tag) {\n        this.tags.delete(tag);\n        return this;\n    }\n}\nEntity.uuidFn = () => `${Date.now()}_${(idCounter++).toString()}`;\nexports.Entity = Entity;\n//# sourceMappingURL=entity.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/entity/entity.js?");

/***/ }),

/***/ "../sim-ecs/dist/entity/entity.spec.js":
/*!*********************************************!*\
  !*** ../sim-ecs/dist/entity/entity.spec.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n//# sourceMappingURL=entity.spec.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/entity/entity.spec.js?");

/***/ }),

/***/ "../sim-ecs/dist/events/_.js":
/*!***********************************!*\
  !*** ../sim-ecs/dist/events/_.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n//# sourceMappingURL=_.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/events/_.js?");

/***/ }),

/***/ "../sim-ecs/dist/events/event-bus.js":
/*!*******************************************!*\
  !*** ../sim-ecs/dist/events/event-bus.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.EventBus = void 0;\nconst tslib_1 = __webpack_require__(/*! tslib */ \"../sim-ecs/node_modules/tslib/tslib.es6.js\");\nconst event_reader_1 = __webpack_require__(/*! ./event-reader */ \"../sim-ecs/dist/events/event-reader.js\");\nconst event_writer_1 = __webpack_require__(/*! ./event-writer */ \"../sim-ecs/dist/events/event-writer.js\");\ntslib_1.__exportStar(__webpack_require__(/*! ./event-bus.spec */ \"../sim-ecs/dist/events/event-bus.spec.js\"), exports);\nclass EventBus {\n    constructor() {\n        this.subscribers = new Map();\n    }\n    createReader(Event) {\n        return new event_reader_1.EventReader(this, Event);\n    }\n    createWriter() {\n        return new event_writer_1.EventWriter(this);\n    }\n    async publish(event) {\n        const subscribers = this.subscribers.get(event.constructor) ?? [];\n        let handler;\n        for (handler of subscribers.values()) {\n            await handler(event);\n        }\n    }\n    subscribe(Event, handler) {\n        let subscriberList = this.subscribers.get(Event);\n        if (!subscriberList) {\n            subscriberList = new Set();\n            this.subscribers.set(Event, subscriberList);\n        }\n        subscriberList.add(handler);\n    }\n    subscribeReader(reader) {\n        this.subscribe(reader.eventType, reader.eventHandler);\n    }\n    unsubscribe(Event, handler) {\n        let subscriberList = this.subscribers.get(Event);\n        if (!subscriberList) {\n            subscriberList = new Set();\n            this.subscribers.set(Event, subscriberList);\n        }\n        subscriberList.delete(handler);\n    }\n    unsubscribeReader(reader) {\n        this.unsubscribe(reader.eventType, reader.eventHandler);\n    }\n}\nexports.EventBus = EventBus;\n//# sourceMappingURL=event-bus.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/events/event-bus.js?");

/***/ }),

/***/ "../sim-ecs/dist/events/event-bus.spec.js":
/*!************************************************!*\
  !*** ../sim-ecs/dist/events/event-bus.spec.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst tslib_1 = __webpack_require__(/*! tslib */ \"../sim-ecs/node_modules/tslib/tslib.es6.js\");\ntslib_1.__exportStar(__webpack_require__(/*! ./_ */ \"../sim-ecs/dist/events/_.js\"), exports);\n//# sourceMappingURL=event-bus.spec.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/events/event-bus.spec.js?");

/***/ }),

/***/ "../sim-ecs/dist/events/event-reader.js":
/*!**********************************************!*\
  !*** ../sim-ecs/dist/events/event-reader.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.EventReader = void 0;\nconst tslib_1 = __webpack_require__(/*! tslib */ \"../sim-ecs/node_modules/tslib/tslib.es6.js\");\ntslib_1.__exportStar(__webpack_require__(/*! ./event-reader.spec */ \"../sim-ecs/dist/events/event-reader.spec.js\"), exports);\nclass EventReader {\n    constructor(bus, _eventType) {\n        this.bus = bus;\n        this._eventType = _eventType;\n        this._eventHandler = event => { this.eventCache.push(event); };\n        this.eventCache = [];\n        bus.subscribe(_eventType, this._eventHandler);\n    }\n    get eventHandler() {\n        return this._eventHandler;\n    }\n    get eventType() {\n        return this._eventType;\n    }\n    async execute(handler) {\n        let event;\n        for (event of this.iter()) {\n            await handler(event);\n        }\n    }\n    getOne() {\n        return this.eventCache.shift();\n    }\n    iter() {\n        const events = Array.from(this.eventCache);\n        this.eventCache.length = 0;\n        return events.values();\n    }\n}\nexports.EventReader = EventReader;\n//# sourceMappingURL=event-reader.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/events/event-reader.js?");

/***/ }),

/***/ "../sim-ecs/dist/events/event-reader.spec.js":
/*!***************************************************!*\
  !*** ../sim-ecs/dist/events/event-reader.spec.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n//# sourceMappingURL=event-reader.spec.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/events/event-reader.spec.js?");

/***/ }),

/***/ "../sim-ecs/dist/events/event-writer.js":
/*!**********************************************!*\
  !*** ../sim-ecs/dist/events/event-writer.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.EventWriter = void 0;\nconst tslib_1 = __webpack_require__(/*! tslib */ \"../sim-ecs/node_modules/tslib/tslib.es6.js\");\ntslib_1.__exportStar(__webpack_require__(/*! ./event-writer.spec */ \"../sim-ecs/dist/events/event-writer.spec.js\"), exports);\nclass EventWriter {\n    constructor(bus) {\n        this.bus = bus;\n    }\n    publish(event) {\n        return this.bus.publish(event);\n    }\n}\nexports.EventWriter = EventWriter;\n//# sourceMappingURL=event-writer.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/events/event-writer.js?");

/***/ }),

/***/ "../sim-ecs/dist/events/event-writer.spec.js":
/*!***************************************************!*\
  !*** ../sim-ecs/dist/events/event-writer.spec.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n//# sourceMappingURL=event-writer.spec.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/events/event-writer.spec.js?");

/***/ }),

/***/ "../sim-ecs/dist/events/internal-events.js":
/*!*************************************************!*\
  !*** ../sim-ecs/dist/events/internal-events.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.SimECSSystemReplaceResource = exports.SimECSSystemAddResource = exports.SimECSReplaceResourceEvent = exports.SimECSAddResourceEvent = exports.SimECSPDAPushStateEvent = void 0;\nclass SimECSPDAEvent {\n    constructor(state) {\n        this.state = state;\n    }\n}\nclass SimECSPDAPushStateEvent extends SimECSPDAEvent {\n}\nexports.SimECSPDAPushStateEvent = SimECSPDAPushStateEvent;\nclass SimECSResourceEvent {\n    constructor(resourceType, resourceObject) {\n        this.resourceType = resourceType;\n        this.resourceObject = resourceObject;\n    }\n}\nclass SimECSAddResourceEvent extends SimECSResourceEvent {\n}\nexports.SimECSAddResourceEvent = SimECSAddResourceEvent;\nclass SimECSReplaceResourceEvent extends SimECSResourceEvent {\n}\nexports.SimECSReplaceResourceEvent = SimECSReplaceResourceEvent;\nclass SimECSSystemResourceEvent {\n    constructor(system, paramName, resource) {\n        this.system = system;\n        this.paramName = paramName;\n        this.resource = resource;\n    }\n}\nclass SimECSSystemAddResource extends SimECSSystemResourceEvent {\n}\nexports.SimECSSystemAddResource = SimECSSystemAddResource;\nclass SimECSSystemReplaceResource extends SimECSSystemResourceEvent {\n}\nexports.SimECSSystemReplaceResource = SimECSSystemReplaceResource;\n//# sourceMappingURL=internal-events.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/events/internal-events.js?");

/***/ }),

/***/ "../sim-ecs/dist/index.js":
/*!********************************!*\
  !*** ../sim-ecs/dist/index.js ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst tslib_1 = __webpack_require__(/*! tslib */ \"../sim-ecs/node_modules/tslib/tslib.es6.js\");\ntslib_1.__exportStar(__webpack_require__(/*! ./ecs/ecs-entity */ \"../sim-ecs/dist/ecs/ecs-entity.js\"), exports);\ntslib_1.__exportStar(__webpack_require__(/*! ./ecs/ecs-query */ \"../sim-ecs/dist/ecs/ecs-query.js\"), exports);\ntslib_1.__exportStar(__webpack_require__(/*! ./ecs/ecs-sync-point */ \"../sim-ecs/dist/ecs/ecs-sync-point.js\"), exports);\ntslib_1.__exportStar(__webpack_require__(/*! ./ecs/ecs-world */ \"../sim-ecs/dist/ecs/ecs-world.js\"), exports);\ntslib_1.__exportStar(__webpack_require__(/*! ./entity/entity */ \"../sim-ecs/dist/entity/entity.js\"), exports);\ntslib_1.__exportStar(__webpack_require__(/*! ./entity/entity-builder */ \"../sim-ecs/dist/entity/entity-builder.js\"), exports);\ntslib_1.__exportStar(__webpack_require__(/*! ./query/query */ \"../sim-ecs/dist/query/query.js\"), exports);\ntslib_1.__exportStar(__webpack_require__(/*! ./events/event-bus */ \"../sim-ecs/dist/events/event-bus.js\"), exports);\ntslib_1.__exportStar(__webpack_require__(/*! ./pda/sim-ecs-pda */ \"../sim-ecs/dist/pda/sim-ecs-pda.js\"), exports);\n// Scheduler exports\ntslib_1.__exportStar(__webpack_require__(/*! ./scheduler/scheduler */ \"../sim-ecs/dist/scheduler/scheduler.js\"), exports);\ntslib_1.__exportStar(__webpack_require__(/*! ./scheduler/pipeline/pipeline */ \"../sim-ecs/dist/scheduler/pipeline/pipeline.js\"), exports);\ntslib_1.__exportStar(__webpack_require__(/*! ./scheduler/pipeline/stage */ \"../sim-ecs/dist/scheduler/pipeline/stage.js\"), exports);\ntslib_1.__exportStar(__webpack_require__(/*! ./scheduler/pipeline/sync-point */ \"../sim-ecs/dist/scheduler/pipeline/sync-point.js\"), exports);\ntslib_1.__exportStar(__webpack_require__(/*! ./serde/serde */ \"../sim-ecs/dist/serde/serde.js\"), exports);\ntslib_1.__exportStar(__webpack_require__(/*! ./serde/serial-format */ \"../sim-ecs/dist/serde/serial-format.js\"), exports);\ntslib_1.__exportStar(__webpack_require__(/*! ./state/state */ \"../sim-ecs/dist/state/state.js\"), exports);\ntslib_1.__exportStar(__webpack_require__(/*! ./system/system */ \"../sim-ecs/dist/system/system.js\"), exports);\ntslib_1.__exportStar(__webpack_require__(/*! ./system/system-builder */ \"../sim-ecs/dist/system/system-builder.js\"), exports);\ntslib_1.__exportStar(__webpack_require__(/*! ./world/error */ \"../sim-ecs/dist/world/error.js\"), exports);\ntslib_1.__exportStar(__webpack_require__(/*! ./world/error.spec */ \"../sim-ecs/dist/world/error.spec.js\"), exports);\ntslib_1.__exportStar(__webpack_require__(/*! ./world/events */ \"../sim-ecs/dist/world/events.js\"), exports);\ntslib_1.__exportStar(__webpack_require__(/*! ./world/actions.spec */ \"../sim-ecs/dist/world/actions.spec.js\"), exports);\ntslib_1.__exportStar(__webpack_require__(/*! ./world/world.spec */ \"../sim-ecs/dist/world/world.spec.js\"), exports);\ntslib_1.__exportStar(__webpack_require__(/*! ./world/preptime/preptime-world */ \"../sim-ecs/dist/world/preptime/preptime-world.js\"), exports);\ntslib_1.__exportStar(__webpack_require__(/*! ./world/runtime/runtime-world */ \"../sim-ecs/dist/world/runtime/runtime-world.js\"), exports);\ntslib_1.__exportStar(__webpack_require__(/*! ./world/world-builder */ \"../sim-ecs/dist/world/world-builder.js\"), exports);\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/index.js?");

/***/ }),

/***/ "../sim-ecs/dist/pda/pda.js":
/*!**********************************!*\
  !*** ../sim-ecs/dist/pda/pda.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.PushDownAutomaton = void 0;\nconst tslib_1 = __webpack_require__(/*! tslib */ \"../sim-ecs/node_modules/tslib/tslib.es6.js\");\ntslib_1.__exportStar(__webpack_require__(/*! ./pda.spec */ \"../sim-ecs/dist/pda/pda.spec.js\"), exports);\nclass PushDownAutomaton {\n    get state() {\n        return this.currentState;\n    }\n    clear() {\n        this.currentState = undefined;\n        this.statesTail = undefined;\n    }\n    pop() {\n        if (!this.statesTail)\n            return;\n        const oldTail = this.statesTail;\n        this.statesTail = this.statesTail.prevNode;\n        this.currentState = this.statesTail?.state;\n        return oldTail.state;\n    }\n    push(State) {\n        this.currentState = new State();\n        this.statesTail = {\n            prevNode: this.statesTail,\n            state: this.currentState,\n        };\n    }\n}\nexports.PushDownAutomaton = PushDownAutomaton;\n//# sourceMappingURL=pda.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/pda/pda.js?");

/***/ }),

/***/ "../sim-ecs/dist/pda/pda.spec.js":
/*!***************************************!*\
  !*** ../sim-ecs/dist/pda/pda.spec.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n//# sourceMappingURL=pda.spec.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/pda/pda.spec.js?");

/***/ }),

/***/ "../sim-ecs/dist/pda/sim-ecs-pda.js":
/*!******************************************!*\
  !*** ../sim-ecs/dist/pda/sim-ecs-pda.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.SimECSPushDownAutomaton = void 0;\nconst tslib_1 = __webpack_require__(/*! tslib */ \"../sim-ecs/node_modules/tslib/tslib.es6.js\");\nconst pda_1 = __webpack_require__(/*! ./pda */ \"../sim-ecs/dist/pda/pda.js\");\nconst internal_events_1 = __webpack_require__(/*! ../events/internal-events */ \"../sim-ecs/dist/events/internal-events.js\");\ntslib_1.__exportStar(__webpack_require__(/*! ./pda */ \"../sim-ecs/dist/pda/pda.js\"), exports);\nclass SimECSPushDownAutomaton extends pda_1.PushDownAutomaton {\n    constructor(world) {\n        super();\n        this.world = world;\n    }\n    push(State) {\n        super.push(State);\n        return this.world.eventBus.publish(new internal_events_1.SimECSPDAPushStateEvent(State));\n    }\n}\nexports.SimECSPushDownAutomaton = SimECSPushDownAutomaton;\n//# sourceMappingURL=sim-ecs-pda.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/pda/sim-ecs-pda.js?");

/***/ }),

/***/ "../sim-ecs/dist/query/_.js":
/*!**********************************!*\
  !*** ../sim-ecs/dist/query/_.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.existenceDescSym = exports.accessDescSym = exports.setEntitiesSym = exports.removeEntitySym = exports.clearEntitiesSym = exports.addEntitySym = void 0;\nexports.addEntitySym = Symbol();\nexports.clearEntitiesSym = Symbol();\nexports.removeEntitySym = Symbol();\nexports.setEntitiesSym = Symbol();\nexports.accessDescSym = Symbol();\nexports.existenceDescSym = Symbol();\n//# sourceMappingURL=_.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/query/_.js?");

/***/ }),

/***/ "../sim-ecs/dist/query/components-query.js":
/*!*************************************************!*\
  !*** ../sim-ecs/dist/query/components-query.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ComponentsQuery = void 0;\nconst query_spec_1 = __webpack_require__(/*! ./query.spec */ \"../sim-ecs/dist/query/query.spec.js\");\nconst query_1 = __webpack_require__(/*! ./query */ \"../sim-ecs/dist/query/query.js\");\nconst _1 = __webpack_require__(/*! ./_ */ \"../sim-ecs/dist/query/_.js\");\nclass ComponentsQuery extends query_1.Query {\n    constructor(queryDescriptor) {\n        super(query_spec_1.EQueryType.Components, queryDescriptor);\n        this.queryDescriptor = queryDescriptor;\n    }\n    [_1.addEntitySym](entity) {\n        if (this.matchesEntity(entity)) {\n            this.queryResult.set(entity, this.getComponentDataFromEntity(entity, this.queryDescriptor));\n        }\n    }\n    getComponentDataFromEntity(entity, descriptor) {\n        const components = {};\n        let accessDesc;\n        let componentDesc;\n        let componentName;\n        for ([componentName, componentDesc] of Object.entries(descriptor)) {\n            accessDesc = componentDesc[_1.accessDescSym];\n            components[componentName] = accessDesc.targetType == query_spec_1.ETargetType.component\n                ? (entity.getComponent(accessDesc.target) ?? entity)\n                : entity;\n        }\n        return components;\n    }\n    matchesEntity(entity) {\n        let componentDesc;\n        // @ts-ignore todo: figure out typing. Something is still wrong somewhere\n        for (componentDesc of Object.values(this.queryDescriptor)) {\n            if (componentDesc[_1.accessDescSym].targetType == query_spec_1.ETargetType.tag\n                && !entity.hasTag(componentDesc[_1.accessDescSym].target)) {\n                return false;\n            }\n            if (componentDesc[_1.accessDescSym].targetType == query_spec_1.ETargetType.component\n                && !entity.hasComponent(componentDesc[_1.accessDescSym].target)) {\n                if (componentDesc[_1.accessDescSym].optional) {\n                    continue;\n                }\n                return false;\n            }\n            if (componentDesc[_1.accessDescSym].targetType == query_spec_1.ETargetType.entity\n                && componentDesc[_1.accessDescSym].data !== undefined\n                && componentDesc[_1.accessDescSym].data != entity.id) {\n                return false;\n            }\n        }\n        return true;\n    }\n}\nexports.ComponentsQuery = ComponentsQuery;\n//# sourceMappingURL=components-query.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/query/components-query.js?");

/***/ }),

/***/ "../sim-ecs/dist/query/entities-query.js":
/*!***********************************************!*\
  !*** ../sim-ecs/dist/query/entities-query.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.EntitiesQuery = void 0;\nconst query_spec_1 = __webpack_require__(/*! ./query.spec */ \"../sim-ecs/dist/query/query.spec.js\");\nconst query_1 = __webpack_require__(/*! ./query */ \"../sim-ecs/dist/query/query.js\");\nconst _1 = __webpack_require__(/*! ./_ */ \"../sim-ecs/dist/query/_.js\");\nclass EntitiesQuery extends query_1.Query {\n    constructor(queryDesc) {\n        super(query_spec_1.EQueryType.Entities, queryDesc);\n        this.queryDesc = queryDesc;\n    }\n    [_1.addEntitySym](entity) {\n        if (this.matchesEntity(entity)) {\n            this.queryResult.set(entity, entity);\n        }\n    }\n    matchesEntity(entity) {\n        let componentDesc;\n        for (componentDesc of this.queryDescriptor) {\n            if (componentDesc[_1.existenceDescSym].targetType == query_spec_1.ETargetType.tag\n                && entity.hasTag(componentDesc[_1.existenceDescSym].target) != (componentDesc[_1.existenceDescSym].type == query_spec_1.EExistence.set)) {\n                return false;\n            }\n            if (componentDesc[_1.existenceDescSym].targetType == query_spec_1.ETargetType.component\n                && entity.hasComponent(componentDesc[_1.existenceDescSym].target) != (componentDesc[_1.existenceDescSym].type == query_spec_1.EExistence.set)) {\n                return false;\n            }\n        }\n        return true;\n    }\n}\nexports.EntitiesQuery = EntitiesQuery;\n//# sourceMappingURL=entities-query.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/query/entities-query.js?");

/***/ }),

/***/ "../sim-ecs/dist/query/query.js":
/*!**************************************!*\
  !*** ../sim-ecs/dist/query/query.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Query = exports.WriteOptional = exports.WithoutTag = exports.Write = exports.Without = exports.WithTag = exports.With = exports.ReadOptional = exports.ReadEntity = exports.Read = void 0;\nconst tslib_1 = __webpack_require__(/*! tslib */ \"../sim-ecs/node_modules/tslib/tslib.es6.js\");\nconst _1 = __webpack_require__(/*! ./_ */ \"../sim-ecs/dist/query/_.js\");\ntslib_1.__exportStar(__webpack_require__(/*! ./query.spec */ \"../sim-ecs/dist/query/query.spec.js\"), exports);\nvar query_util_1 = __webpack_require__(/*! ./query.util */ \"../sim-ecs/dist/query/query.util.js\");\nObject.defineProperty(exports, \"Read\", ({ enumerable: true, get: function () { return query_util_1.Read; } }));\nObject.defineProperty(exports, \"ReadEntity\", ({ enumerable: true, get: function () { return query_util_1.ReadEntity; } }));\nObject.defineProperty(exports, \"ReadOptional\", ({ enumerable: true, get: function () { return query_util_1.ReadOptional; } }));\nObject.defineProperty(exports, \"With\", ({ enumerable: true, get: function () { return query_util_1.With; } }));\nObject.defineProperty(exports, \"WithTag\", ({ enumerable: true, get: function () { return query_util_1.WithTag; } }));\nObject.defineProperty(exports, \"Without\", ({ enumerable: true, get: function () { return query_util_1.Without; } }));\nObject.defineProperty(exports, \"Write\", ({ enumerable: true, get: function () { return query_util_1.Write; } }));\nObject.defineProperty(exports, \"WithoutTag\", ({ enumerable: true, get: function () { return query_util_1.WithoutTag; } }));\nObject.defineProperty(exports, \"WriteOptional\", ({ enumerable: true, get: function () { return query_util_1.WriteOptional; } }));\nclass Query {\n    constructor(_queryType, queryDescriptor) {\n        this._queryType = _queryType;\n        this.queryDescriptor = queryDescriptor;\n        this.queryResult = new Map();\n    }\n    get descriptor() {\n        return this.queryDescriptor;\n    }\n    get queryType() {\n        return this._queryType;\n    }\n    get resultLength() {\n        return this.queryResult.size;\n    }\n    /** @internal */\n    [_1.clearEntitiesSym]() {\n        this.queryResult.clear();\n    }\n    /** @internal */\n    [_1.removeEntitySym](entity) {\n        this.queryResult.delete(entity);\n    }\n    /** @internal */\n    [_1.setEntitiesSym](entities) {\n        let entity;\n        this.queryResult.clear();\n        for (entity of entities) {\n            this[_1.addEntitySym](entity);\n        }\n    }\n    async execute(handler) {\n        let data;\n        for (data of this.queryResult.values()) {\n            await handler(data);\n        }\n    }\n    getFirst() {\n        return this.queryResult.values().next().value;\n    }\n    iter() {\n        return this.queryResult.values();\n    }\n    toArray() {\n        return Array.from(this.queryResult.values());\n    }\n}\nexports.Query = Query;\n//# sourceMappingURL=query.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/query/query.js?");

/***/ }),

/***/ "../sim-ecs/dist/query/query.spec.js":
/*!*******************************************!*\
  !*** ../sim-ecs/dist/query/query.spec.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.EQueryType = exports.ETargetType = exports.EExistence = exports.EAccess = void 0;\nvar EAccess;\n(function (EAccess) {\n    EAccess[EAccess[\"meta\"] = 0] = \"meta\";\n    EAccess[EAccess[\"read\"] = 1] = \"read\";\n    EAccess[EAccess[\"write\"] = 2] = \"write\";\n})(EAccess = exports.EAccess || (exports.EAccess = {}));\nvar EExistence;\n(function (EExistence) {\n    EExistence[EExistence[\"set\"] = 0] = \"set\";\n    EExistence[EExistence[\"unset\"] = 1] = \"unset\";\n})(EExistence = exports.EExistence || (exports.EExistence = {}));\nvar ETargetType;\n(function (ETargetType) {\n    ETargetType[ETargetType[\"component\"] = 0] = \"component\";\n    ETargetType[ETargetType[\"entity\"] = 1] = \"entity\";\n    ETargetType[ETargetType[\"tag\"] = 2] = \"tag\";\n})(ETargetType = exports.ETargetType || (exports.ETargetType = {}));\nvar EQueryType;\n(function (EQueryType) {\n    EQueryType[EQueryType[\"Components\"] = 0] = \"Components\";\n    EQueryType[EQueryType[\"Entities\"] = 1] = \"Entities\";\n})(EQueryType = exports.EQueryType || (exports.EQueryType = {}));\n//# sourceMappingURL=query.spec.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/query/query.spec.js?");

/***/ }),

/***/ "../sim-ecs/dist/query/query.util.js":
/*!*******************************************!*\
  !*** ../sim-ecs/dist/query/query.util.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.WithoutTag = exports.Without = exports.WithTag = exports.With = exports.WriteOptional = exports.Write = exports.ReadOptional = exports.Read = exports.ReadEntity = void 0;\nconst query_spec_1 = __webpack_require__(/*! ./query.spec */ \"../sim-ecs/dist/query/query.spec.js\");\nconst entity_1 = __webpack_require__(/*! ../entity/entity */ \"../sim-ecs/dist/entity/entity.js\");\nconst _1 = __webpack_require__(/*! ./_ */ \"../sim-ecs/dist/query/_.js\");\nfunction ReadEntity(uuid) {\n    return Object.assign({}, entity_1.Entity, {\n        [_1.accessDescSym]: {\n            optional: false,\n            data: uuid,\n            target: entity_1.Entity,\n            targetType: query_spec_1.ETargetType.entity,\n            type: query_spec_1.EAccess.meta,\n        },\n    });\n}\nexports.ReadEntity = ReadEntity;\nfunction Read(componentPrototype) {\n    return Object.assign({}, componentPrototype.prototype, {\n        [_1.accessDescSym]: {\n            optional: false,\n            target: componentPrototype,\n            targetType: query_spec_1.ETargetType.component,\n            type: query_spec_1.EAccess.read,\n        },\n    });\n}\nexports.Read = Read;\nfunction ReadOptional(componentPrototype) {\n    return Object.assign({}, componentPrototype.prototype, {\n        [_1.accessDescSym]: {\n            optional: true,\n            target: componentPrototype,\n            targetType: query_spec_1.ETargetType.component,\n            type: query_spec_1.EAccess.read,\n        },\n    });\n}\nexports.ReadOptional = ReadOptional;\nfunction Write(componentPrototype) {\n    return Object.assign({}, componentPrototype.prototype, {\n        [_1.accessDescSym]: {\n            optional: false,\n            target: componentPrototype,\n            targetType: query_spec_1.ETargetType.component,\n            type: query_spec_1.EAccess.write,\n        },\n    });\n}\nexports.Write = Write;\nfunction WriteOptional(componentPrototype) {\n    return Object.assign({}, componentPrototype.prototype, {\n        [_1.accessDescSym]: {\n            optional: true,\n            target: componentPrototype,\n            targetType: query_spec_1.ETargetType.component,\n            type: query_spec_1.EAccess.write,\n        },\n    });\n}\nexports.WriteOptional = WriteOptional;\nfunction With(componentPrototype) {\n    return {\n        [_1.existenceDescSym]: {\n            target: componentPrototype,\n            targetType: query_spec_1.ETargetType.component,\n            type: query_spec_1.EExistence.set,\n        }\n    };\n}\nexports.With = With;\nfunction WithTag(tag) {\n    return {\n        [_1.accessDescSym]: {\n            optional: false,\n            target: tag,\n            targetType: query_spec_1.ETargetType.tag,\n            type: query_spec_1.EAccess.meta,\n        },\n        [_1.existenceDescSym]: {\n            target: tag,\n            targetType: query_spec_1.ETargetType.tag,\n            type: query_spec_1.EExistence.set,\n        }\n    };\n}\nexports.WithTag = WithTag;\nfunction Without(componentPrototype) {\n    return {\n        [_1.existenceDescSym]: {\n            target: componentPrototype,\n            targetType: query_spec_1.ETargetType.component,\n            type: query_spec_1.EExistence.unset,\n        }\n    };\n}\nexports.Without = Without;\nfunction WithoutTag(tag) {\n    return {\n        [_1.existenceDescSym]: {\n            target: tag,\n            targetType: query_spec_1.ETargetType.tag,\n            type: query_spec_1.EExistence.unset,\n        }\n    };\n}\nexports.WithoutTag = WithoutTag;\n//# sourceMappingURL=query.util.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/query/query.util.js?");

/***/ }),

/***/ "../sim-ecs/dist/scheduler/pipeline/pipeline.js":
/*!******************************************************!*\
  !*** ../sim-ecs/dist/scheduler/pipeline/pipeline.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Pipeline = void 0;\nconst tslib_1 = __webpack_require__(/*! tslib */ \"../sim-ecs/node_modules/tslib/tslib.es6.js\");\nconst sync_point_1 = __webpack_require__(/*! ./sync-point */ \"../sim-ecs/dist/scheduler/pipeline/sync-point.js\");\ntslib_1.__exportStar(__webpack_require__(/*! ./pipeline.spec */ \"../sim-ecs/dist/scheduler/pipeline/pipeline.spec.js\"), exports);\nclass Pipeline {\n    constructor() {\n        this._root = new sync_point_1.SyncPoint();\n    }\n    get root() {\n        return this._root;\n    }\n    getGroups() {\n        const orderedPoints = [];\n        const traversePoint = (point) => {\n            point.before && traversePoint(point.before);\n            orderedPoints.push(point);\n            point.after && traversePoint(point.after);\n        };\n        traversePoint(this._root);\n        return orderedPoints;\n    }\n}\nexports.Pipeline = Pipeline;\n//# sourceMappingURL=pipeline.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/scheduler/pipeline/pipeline.js?");

/***/ }),

/***/ "../sim-ecs/dist/scheduler/pipeline/pipeline.spec.js":
/*!***********************************************************!*\
  !*** ../sim-ecs/dist/scheduler/pipeline/pipeline.spec.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n//# sourceMappingURL=pipeline.spec.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/scheduler/pipeline/pipeline.spec.js?");

/***/ }),

/***/ "../sim-ecs/dist/scheduler/pipeline/stage.js":
/*!***************************************************!*\
  !*** ../sim-ecs/dist/scheduler/pipeline/stage.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Stage = exports.defaultStageSchedulingAlgorithm = void 0;\nconst tslib_1 = __webpack_require__(/*! tslib */ \"../sim-ecs/node_modules/tslib/tslib.es6.js\");\nconst _1 = __webpack_require__(/*! ../../system/_ */ \"../sim-ecs/dist/system/_.js\");\nconst error_1 = __webpack_require__(/*! ../../world/error */ \"../sim-ecs/dist/world/error.js\");\ntslib_1.__exportStar(__webpack_require__(/*! ./stage.spec */ \"../sim-ecs/dist/scheduler/pipeline/stage.spec.js\"), exports);\nasync function defaultStageSchedulingAlgorithm(systems, eventBus) {\n    let system;\n    try {\n        for (system of systems) {\n            // todo: check WRITE constraints to speed it up...\n            await system.runFunction.call(system, system[_1.systemRunParamSym]);\n        }\n    }\n    catch (error) {\n        if (error instanceof Error && !!system) {\n            await eventBus.publish(new error_1.SystemError(error, system.constructor));\n        }\n        else {\n            throw error;\n        }\n    }\n}\nexports.defaultStageSchedulingAlgorithm = defaultStageSchedulingAlgorithm;\nclass Stage {\n    constructor() {\n        this.schedulingAlgorithm = defaultStageSchedulingAlgorithm;\n        this.systems = [];\n    }\n    addSystem(System) {\n        this.systems.push(System);\n        return this;\n    }\n    getExecutor(eventBus) {\n        return this.schedulingAlgorithm.bind(this, this.systems, eventBus);\n    }\n}\nexports.Stage = Stage;\n//# sourceMappingURL=stage.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/scheduler/pipeline/stage.js?");

/***/ }),

/***/ "../sim-ecs/dist/scheduler/pipeline/stage.spec.js":
/*!********************************************************!*\
  !*** ../sim-ecs/dist/scheduler/pipeline/stage.spec.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n//# sourceMappingURL=stage.spec.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/scheduler/pipeline/stage.spec.js?");

/***/ }),

/***/ "../sim-ecs/dist/scheduler/pipeline/sync-point.js":
/*!********************************************************!*\
  !*** ../sim-ecs/dist/scheduler/pipeline/sync-point.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.SyncPoint = void 0;\nconst tslib_1 = __webpack_require__(/*! tslib */ \"../sim-ecs/node_modules/tslib/tslib.es6.js\");\nconst stage_1 = __webpack_require__(/*! ./stage */ \"../sim-ecs/dist/scheduler/pipeline/stage.js\");\ntslib_1.__exportStar(__webpack_require__(/*! ./sync-point.spec */ \"../sim-ecs/dist/scheduler/pipeline/sync-point.spec.js\"), exports);\nclass SyncPoint {\n    constructor() {\n        this.stages = [];\n        this.syncPointHandlers = new Set();\n    }\n    addNewStage(handler) {\n        const stage = new stage_1.Stage();\n        this.stages.push(stage);\n        handler(stage);\n        return this;\n    }\n    addOnSyncHandler(handler) {\n        this.syncPointHandlers.add(handler);\n        return this;\n    }\n    clearOnSyncHandlers() {\n        this.syncPointHandlers.clear();\n        return this;\n    }\n    async executeOnSyncHandlers() {\n        let handler;\n        for (handler of this.syncPointHandlers) {\n            await handler();\n        }\n        return this;\n    }\n    fromPrefab({ after, before, stages = [] }) {\n        this.after = after\n            ? new SyncPoint().fromPrefab(after)\n            : undefined;\n        this.before = before\n            ? new SyncPoint().fromPrefab(before)\n            : undefined;\n        this.stages.length = 0;\n        {\n            let stage;\n            let system;\n            for (stage of stages) {\n                this.addNewStage(newStage => {\n                    for (system of stage) {\n                        newStage.addSystem(system);\n                    }\n                });\n            }\n        }\n        return this;\n    }\n    removeOnSyncHandler(handler) {\n        this.syncPointHandlers.delete(handler);\n        return this;\n    }\n}\nexports.SyncPoint = SyncPoint;\n//# sourceMappingURL=sync-point.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/scheduler/pipeline/sync-point.js?");

/***/ }),

/***/ "../sim-ecs/dist/scheduler/pipeline/sync-point.spec.js":
/*!*************************************************************!*\
  !*** ../sim-ecs/dist/scheduler/pipeline/sync-point.spec.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n//# sourceMappingURL=sync-point.spec.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/scheduler/pipeline/sync-point.spec.js?");

/***/ }),

/***/ "../sim-ecs/dist/scheduler/scheduler.js":
/*!**********************************************!*\
  !*** ../sim-ecs/dist/scheduler/scheduler.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nvar _Scheduler_isPrepared, _Scheduler_pipeline;\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Scheduler = exports.defaultSchedulingAlgorithm = void 0;\nconst tslib_1 = __webpack_require__(/*! tslib */ \"../sim-ecs/node_modules/tslib/tslib.es6.js\");\nconst pipeline_1 = __webpack_require__(/*! ./pipeline/pipeline */ \"../sim-ecs/dist/scheduler/pipeline/pipeline.js\");\nconst _1 = __webpack_require__(/*! ../system/_ */ \"../sim-ecs/dist/system/_.js\");\nconst system_1 = __webpack_require__(/*! ../system/system */ \"../sim-ecs/dist/system/system.js\");\ntslib_1.__exportStar(__webpack_require__(/*! ./scheduler.spec */ \"../sim-ecs/dist/scheduler/scheduler.spec.js\"), exports);\nasync function defaultSchedulingAlgorithm(stageExecutors) {\n    let stageExecutor;\n    for (stageExecutor of stageExecutors) {\n        await stageExecutor();\n    }\n}\nexports.defaultSchedulingAlgorithm = defaultSchedulingAlgorithm;\nclass Scheduler {\n    constructor() {\n        _Scheduler_isPrepared.set(this, false);\n        _Scheduler_pipeline.set(this, new pipeline_1.Pipeline());\n        this.schedulingAlgorithm = defaultSchedulingAlgorithm;\n    }\n    get isPrepared() {\n        return tslib_1.__classPrivateFieldGet(this, _Scheduler_isPrepared, \"f\");\n    }\n    get pipeline() {\n        return tslib_1.__classPrivateFieldGet(this, _Scheduler_pipeline, \"f\");\n    }\n    set pipeline(newPipeline) {\n        if (tslib_1.__classPrivateFieldGet(this, _Scheduler_isPrepared, \"f\")) {\n            throw new Error('This scheduler was already prepared or is executing and cannot be changed right now!');\n        }\n        tslib_1.__classPrivateFieldSet(this, _Scheduler_pipeline, newPipeline, \"f\");\n    }\n    getExecutor(eventBus) {\n        const stageExecutors = [];\n        for (const group of tslib_1.__classPrivateFieldGet(this, _Scheduler_pipeline, \"f\").getGroups()) {\n            for (const stage of group.stages) {\n                stageExecutors.push(stage.getExecutor(eventBus));\n            }\n            stageExecutors.push(group.executeOnSyncHandlers.bind(group));\n        }\n        return this.schedulingAlgorithm.bind(this, stageExecutors);\n    }\n    getSystems() {\n        const systems = new Set();\n        let group, stage, system;\n        for (group of this.pipeline.getGroups()) {\n            for (stage of group.stages) {\n                for (system of stage.systems) {\n                    systems.add(system);\n                }\n            }\n        }\n        return systems;\n    }\n    async prepare(world) {\n        let stage;\n        let syncPoint;\n        let system;\n        tslib_1.__classPrivateFieldSet(this, _Scheduler_isPrepared, false, \"f\");\n        for (syncPoint of this.pipeline.getGroups().values()) {\n            for (stage of syncPoint.stages) {\n                for (system of stage.systems) {\n                    system[_1.systemRunParamSym] = (0, system_1.getSystemRunParameters)(system, world);\n                    await system.setupFunction.call(system, system[_1.systemRunParamSym]);\n                }\n            }\n        }\n        tslib_1.__classPrivateFieldSet(this, _Scheduler_isPrepared, true, \"f\");\n    }\n}\nexports.Scheduler = Scheduler;\n_Scheduler_isPrepared = new WeakMap(), _Scheduler_pipeline = new WeakMap();\n//# sourceMappingURL=scheduler.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/scheduler/scheduler.js?");

/***/ }),

/***/ "../sim-ecs/dist/scheduler/scheduler.spec.js":
/*!***************************************************!*\
  !*** ../sim-ecs/dist/scheduler/scheduler.spec.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n//# sourceMappingURL=scheduler.spec.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/scheduler/scheduler.spec.js?");

/***/ }),

/***/ "../sim-ecs/dist/serde/default-handlers.js":
/*!*************************************************!*\
  !*** ../sim-ecs/dist/serde/default-handlers.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getDefaultDeserializer = exports.getDefaultSerializer = void 0;\nconst entity_1 = __webpack_require__(/*! ../entity/entity */ \"../sim-ecs/dist/entity/entity.js\");\nconst referencing_1 = __webpack_require__(/*! ./referencing */ \"../sim-ecs/dist/serde/referencing.js\");\nconst referencing_spec_1 = __webpack_require__(/*! ./referencing.spec */ \"../sim-ecs/dist/serde/referencing.spec.js\");\nconst getDefaultSerializer = function (customSerializer) {\n    return (component) => {\n        let componentName = typeof component;\n        switch (typeof component) {\n            case 'object': {\n                if (component == null) {\n                    return 'null';\n                }\n                componentName = component.constructor.name;\n                switch (componentName) {\n                    case 'Date':\n                        return component.getTime();\n                    case 'Array':\n                    case 'Object':\n                        return JSON.stringify(component, serializeObjectReplacer);\n                    case 'Map':\n                    case 'Set':\n                        return JSON.stringify(Array.from(component), serializeObjectReplacer);\n                }\n                break;\n            }\n            case \"string\": {\n                return JSON.stringify(component);\n            }\n        }\n        if (!customSerializer) {\n            throw new Error(`Missing serializer for \"${componentName}\"!`);\n        }\n        return customSerializer(component);\n    };\n};\nexports.getDefaultSerializer = getDefaultSerializer;\nconst getDefaultDeserializer = function (customDeserializer) {\n    return (constructorName, data) => {\n        switch (constructorName.toLowerCase()) {\n            case 'array': {\n                const inOut = { containsRefs: false };\n                const parsedData = JSON.parse(data, serializeObjectReviver.bind(undefined, inOut));\n                if (!Array.isArray(parsedData)) {\n                    throw new Error(`Cannot deserialize Array with data of type ${typeof data}! Array expected!`);\n                }\n                return {\n                    containsRefs: inOut.containsRefs,\n                    data: parsedData,\n                    type: Array,\n                };\n            }\n            case 'date': {\n                if (typeof data != 'number') {\n                    throw new Error(`Cannot deserialize Date with data of type ${typeof data}! Number expected!`);\n                }\n                return {\n                    containsRefs: false,\n                    data: new Date(data),\n                    type: Date,\n                };\n            }\n            case 'map': {\n                if (!Array.isArray(data)) {\n                    throw new Error(`Cannot deserialize Map with data of type ${typeof data}! Array of arrays expected!`);\n                }\n                const inOut = { containsRefs: false };\n                {\n                    let row;\n                    for (row of data) {\n                        row[1] = serializeObjectReviver(inOut, row[0], row[1]);\n                    }\n                }\n                return {\n                    containsRefs: inOut.containsRefs,\n                    data: new Map(data),\n                    type: Map,\n                };\n            }\n            case 'object': {\n                const inOut = { containsRefs: false };\n                const parsedData = JSON.parse(data, serializeObjectReviver.bind(undefined, inOut));\n                if (typeof parsedData != 'object') {\n                    throw new Error(`Cannot deserialize Object with data of type ${typeof data}! Object expected!`);\n                }\n                return {\n                    containsRefs: inOut.containsRefs,\n                    data: parsedData,\n                    type: Object,\n                };\n            }\n            case 'set': {\n                if (!Array.isArray(data)) {\n                    throw new Error(`Cannot deserialize Set with data of type ${typeof data}! Array expected!`);\n                }\n                const inOut = { containsRefs: false };\n                {\n                    const NO_KEY = '';\n                    for (let i = 0; i < data.length; i++) {\n                        data[i] = serializeObjectReviver(inOut, NO_KEY, data[i]);\n                    }\n                }\n                return {\n                    containsRefs: inOut.containsRefs,\n                    data: new Set(data),\n                    type: Set,\n                };\n            }\n        }\n        if (!customDeserializer) {\n            throw new Error(`Missing deserializer for \"${constructorName}\"!`);\n        }\n        return customDeserializer(constructorName, data);\n    };\n};\nexports.getDefaultDeserializer = getDefaultDeserializer;\nconst serializeObjectReplacer = function (key, value) {\n    return value instanceof entity_1.Entity\n        ? new referencing_1.Reference(referencing_spec_1.EReferenceType.Entity, value.id).toString()\n        : value;\n};\nconst serializeObjectReviver = (inOut = { containsRefs: false }, key, value) => {\n    if (typeof value == 'string' && referencing_1.Reference.isReferenceString(value)) {\n        inOut.containsRefs = true;\n        return referencing_1.Reference.fromString(value);\n    }\n    return value;\n};\n//# sourceMappingURL=default-handlers.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/serde/default-handlers.js?");

/***/ }),

/***/ "../sim-ecs/dist/serde/referencing.js":
/*!********************************************!*\
  !*** ../sim-ecs/dist/serde/referencing.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Reference = void 0;\nconst referencing_spec_1 = __webpack_require__(/*! ./referencing.spec */ \"../sim-ecs/dist/serde/referencing.spec.js\");\nconst serde_spec_1 = __webpack_require__(/*! ./serde.spec */ \"../sim-ecs/dist/serde/serde.spec.js\");\nclass Reference {\n    constructor(type, id) {\n        this.type = type;\n        this.id = id;\n    }\n    static fromString(refString) {\n        const [marker, type, ...idTokens] = refString.split(serde_spec_1.CMarkerSeparator);\n        if (marker != serde_spec_1.CRefMarker) {\n            return undefined;\n        }\n        if (!Object.values(referencing_spec_1.EReferenceType).includes(type)) {\n            return undefined;\n        }\n        return new Reference(type, idTokens.join());\n    }\n    static isReferenceString(str) {\n        const [marker, type] = str.split(serde_spec_1.CMarkerSeparator);\n        return marker === serde_spec_1.CRefMarker && Object.values(referencing_spec_1.EReferenceType).includes(type);\n    }\n    toString() {\n        return `${serde_spec_1.CRefMarker}${serde_spec_1.CMarkerSeparator}${this.type}${serde_spec_1.CMarkerSeparator}${this.id}`;\n    }\n}\nexports.Reference = Reference;\n//# sourceMappingURL=referencing.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/serde/referencing.js?");

/***/ }),

/***/ "../sim-ecs/dist/serde/referencing.spec.js":
/*!*************************************************!*\
  !*** ../sim-ecs/dist/serde/referencing.spec.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.EReferenceType = void 0;\nvar EReferenceType;\n(function (EReferenceType) {\n    EReferenceType[\"Entity\"] = \"ENTITY\";\n})(EReferenceType = exports.EReferenceType || (exports.EReferenceType = {}));\n//# sourceMappingURL=referencing.spec.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/serde/referencing.spec.js?");

/***/ }),

/***/ "../sim-ecs/dist/serde/serde.js":
/*!**************************************!*\
  !*** ../sim-ecs/dist/serde/serde.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.SerDe = void 0;\nconst tslib_1 = __webpack_require__(/*! tslib */ \"../sim-ecs/node_modules/tslib/tslib.es6.js\");\nconst serde_spec_1 = __webpack_require__(/*! ./serde.spec */ \"../sim-ecs/dist/serde/serde.spec.js\");\nconst serial_format_1 = __webpack_require__(/*! ./serial-format */ \"../sim-ecs/dist/serde/serial-format.js\");\nconst default_handlers_1 = __webpack_require__(/*! ./default-handlers */ \"../sim-ecs/dist/serde/default-handlers.js\");\nconst entity_1 = __webpack_require__(/*! ../entity/entity */ \"../sim-ecs/dist/entity/entity.js\");\nconst referencing_1 = __webpack_require__(/*! ./referencing */ \"../sim-ecs/dist/serde/referencing.js\");\nconst referencing_spec_1 = __webpack_require__(/*! ./referencing.spec */ \"../sim-ecs/dist/serde/referencing.spec.js\");\nconst ecs_entity_1 = __webpack_require__(/*! ../ecs/ecs-entity */ \"../sim-ecs/dist/ecs/ecs-entity.js\");\ntslib_1.__exportStar(__webpack_require__(/*! ./serde.spec */ \"../sim-ecs/dist/serde/serde.spec.js\"), exports);\nclass SerDe {\n    constructor() {\n        this.typeHandlers = new Map();\n    }\n    deserialize(data, options) {\n        const finalOptions = {\n            useDefaultHandler: options?.useDefaultHandler ?? true,\n            useRegisteredHandlers: options?.useRegisteredHandlers ?? true,\n            fallbackHandler: options?.fallbackHandler,\n        };\n        const entities = [];\n        let resources = {};\n        {\n            const components = [];\n            const objectsWithRefs = [];\n            const tags = [];\n            let component;\n            let deserializerOut;\n            let id = undefined;\n            let serialComponentData;\n            let serialComponentName;\n            let serialEntity;\n            let tag;\n            { // Resources are stored in the first TEntity\n                const serialResources = data.shift();\n                if (serialResources) {\n                    if (serialResources[serde_spec_1.CResourceMarker] !== serde_spec_1.CResourceMarkerValue) {\n                        data.unshift(serialResources);\n                    }\n                    else {\n                        delete serialResources[serde_spec_1.CResourceMarker];\n                        resources = Object.fromEntries(Array.from(Object.entries(serialResources))\n                            .map(([type, data]) => {\n                            if (finalOptions.useRegisteredHandlers && this.typeHandlers.has(type)) {\n                                deserializerOut = this.typeHandlers.get(type).deserializer(data);\n                            }\n                            else if (finalOptions.useDefaultHandler) {\n                                deserializerOut = (0, default_handlers_1.getDefaultDeserializer)(finalOptions.fallbackHandler)(type, data);\n                            }\n                            else {\n                                throw new Error(`There is no deserializer for \"${type}\"!`);\n                            }\n                            if (deserializerOut.containsRefs) {\n                                objectsWithRefs.push(deserializerOut.data);\n                            }\n                            return [type, data ? deserializerOut.data : deserializerOut.type];\n                        }));\n                    }\n                }\n            }\n            for (serialEntity of data) {\n                for ([serialComponentName, serialComponentData] of Object.entries(serialEntity)) {\n                    if (finalOptions.useRegisteredHandlers && this.typeHandlers.has(serialComponentName)) {\n                        deserializerOut = this.typeHandlers.get(serialComponentName).deserializer(serialComponentData);\n                        components.push(deserializerOut.data);\n                        if (deserializerOut.containsRefs) {\n                            objectsWithRefs.push(deserializerOut.data);\n                        }\n                    }\n                    else if (serialComponentName == serde_spec_1.CIdMarker) {\n                        id = serialComponentData;\n                    }\n                    else if (serialComponentName == serde_spec_1.CTagMarker) {\n                        if (!Array.isArray(serialComponentData)) {\n                            throw new Error('Expected array of tags for the hash identifier!');\n                        }\n                        for (tag of serialComponentData) {\n                            if (!['string', 'number'].includes(typeof tag)) {\n                                throw new Error('Tags must be of type string or number!');\n                            }\n                            tags.push(tag);\n                        }\n                    }\n                    else if (finalOptions.useDefaultHandler) {\n                        deserializerOut = (0, default_handlers_1.getDefaultDeserializer)(finalOptions.fallbackHandler)(serialComponentName, serialComponentData);\n                        components.push(deserializerOut.data);\n                        if (deserializerOut.containsRefs) {\n                            objectsWithRefs.push(deserializerOut.data);\n                        }\n                    }\n                    else {\n                        throw new Error(`There is no deserializer for \"${serialComponentName}\"!`);\n                    }\n                }\n                {\n                    const entity = new entity_1.Entity(id);\n                    for (tag of tags) {\n                        entity.addTag(tag);\n                    }\n                    for (component of components) {\n                        entity.addComponent(component);\n                    }\n                    entities.push(entity);\n                }\n                tags.length = 0;\n                components.length = 0;\n            }\n            {\n                let component;\n                for (component of objectsWithRefs) {\n                    dereferenceComponentRefs(component);\n                }\n            }\n        }\n        return {\n            entities: entities.values(),\n            resources,\n        };\n    }\n    getRegisteredTypeHandlers() {\n        return this.typeHandlers.entries();\n    }\n    registerTypeHandler(Type, deserializer, serializer) {\n        if (this.typeHandlers.has(Type.name)) {\n            throw new Error(`The type \"${Type.name}\" was already registered!`);\n        }\n        this.typeHandlers.set(Type.name, {\n            deserializer,\n            serializer,\n        });\n    }\n    serialize(data, options) {\n        const finalOptions = {\n            useDefaultHandler: options?.useDefaultHandler ?? true,\n            useRegisteredHandlers: options?.useRegisteredHandlers ?? true,\n            fallbackHandler: options?.fallbackHandler,\n        };\n        const outData = new serial_format_1.SerialFormat();\n        const serialize = (chunk, collector) => {\n            let item;\n            let serialData;\n            for (item of chunk) {\n                if (finalOptions.useRegisteredHandlers && this.typeHandlers.has(item.constructor.name)) {\n                    serialData = this.typeHandlers.get(item.constructor.name).serializer(item);\n                }\n                else if (finalOptions.useDefaultHandler) {\n                    serialData = (0, default_handlers_1.getDefaultSerializer)(finalOptions.fallbackHandler)(item);\n                }\n                collector[item.constructor.name] = serialData;\n                serialData = undefined;\n            }\n        };\n        { // Resources are index 0!\n            const resources = {\n                [serde_spec_1.CResourceMarker]: serde_spec_1.CResourceMarkerValue,\n            };\n            if (data.resources !== undefined) {\n                serialize(Object.values(data.resources), resources);\n            }\n            outData.push(resources);\n        }\n        {\n            let entity;\n            let serialEntity;\n            for (entity of data.entities) {\n                serialEntity = {\n                    [serde_spec_1.CIdMarker]: entity.id,\n                };\n                serialize(entity.getComponents(), serialEntity);\n                {\n                    const tags = Array.from(entity.getTags());\n                    if (tags.length > 0) {\n                        serialEntity[serde_spec_1.CTagMarker] = tags;\n                    }\n                }\n                outData.push(serialEntity);\n            }\n        }\n        return outData;\n    }\n    unregisterTypeHandler(Type) {\n        this.typeHandlers.delete(Type.name);\n    }\n}\nexports.SerDe = SerDe;\nconst dereferenceComponentRefs = (component) => {\n    let key;\n    let value;\n    for ([key, value] of Object.entries(component)) {\n        if (value instanceof referencing_1.Reference) {\n            switch (value.type) {\n                case referencing_spec_1.EReferenceType.Entity: {\n                    component[key] = (0, ecs_entity_1.getEntity)(value.id);\n                    break;\n                }\n                default: {\n                    component[key] = value.id;\n                }\n            }\n        }\n        else if (typeof value == 'object' && value !== null) {\n            dereferenceComponentRefs(value);\n        }\n    }\n};\n//# sourceMappingURL=serde.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/serde/serde.js?");

/***/ }),

/***/ "../sim-ecs/dist/serde/serde.spec.js":
/*!*******************************************!*\
  !*** ../sim-ecs/dist/serde/serde.spec.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.CTagMarker = exports.CResourceMarkerValue = exports.CResourceMarker = exports.CRefMarker = exports.CMarkerSeparator = exports.CIdMarker = void 0;\nexports.CIdMarker = '#ID';\nexports.CMarkerSeparator = '|';\nexports.CRefMarker = '*****';\nexports.CResourceMarker = '#RES';\nexports.CResourceMarkerValue = 1;\nexports.CTagMarker = '#TAGS';\n//# sourceMappingURL=serde.spec.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/serde/serde.spec.js?");

/***/ }),

/***/ "../sim-ecs/dist/serde/serial-format.js":
/*!**********************************************!*\
  !*** ../sim-ecs/dist/serde/serial-format.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.SerialFormat = void 0;\nconst tslib_1 = __webpack_require__(/*! tslib */ \"../sim-ecs/node_modules/tslib/tslib.es6.js\");\ntslib_1.__exportStar(__webpack_require__(/*! ./serial-format.spec */ \"../sim-ecs/dist/serde/serial-format.spec.js\"), exports);\nclass SerialFormat extends Array {\n    static fromArray(arr) {\n        return new SerialFormat().fromArray(arr);\n    }\n    static fromJSON(json) {\n        return new SerialFormat().fromJSON(json);\n    }\n    fromArray(arr) {\n        Object.assign(this, arr);\n        return this;\n    }\n    fromJSON(json) {\n        this.length = 0;\n        const newVals = JSON.parse(json);\n        if (!Array.isArray(newVals)) {\n            throw new Error('Input JSON must be an array!');\n        }\n        for (const entity of newVals) {\n            this.push(entity);\n        }\n        return this;\n    }\n    toJSON(indentation) {\n        return JSON.stringify(Array.from(this), undefined, indentation);\n    }\n}\nexports.SerialFormat = SerialFormat;\n//# sourceMappingURL=serial-format.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/serde/serial-format.js?");

/***/ }),

/***/ "../sim-ecs/dist/serde/serial-format.spec.js":
/*!***************************************************!*\
  !*** ../sim-ecs/dist/serde/serial-format.spec.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n//# sourceMappingURL=serial-format.spec.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/serde/serial-format.spec.js?");

/***/ }),

/***/ "../sim-ecs/dist/state/state.js":
/*!**************************************!*\
  !*** ../sim-ecs/dist/state/state.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.State = void 0;\nconst tslib_1 = __webpack_require__(/*! tslib */ \"../sim-ecs/node_modules/tslib/tslib.es6.js\");\ntslib_1.__exportStar(__webpack_require__(/*! ./state.spec */ \"../sim-ecs/dist/state/state.spec.js\"), exports);\nclass State {\n    activate(actions) { }\n    create(actions) { }\n    deactivate(actions) { }\n    destroy(actions) { }\n}\nexports.State = State;\n//# sourceMappingURL=state.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/state/state.js?");

/***/ }),

/***/ "../sim-ecs/dist/state/state.spec.js":
/*!*******************************************!*\
  !*** ../sim-ecs/dist/state/state.spec.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n//# sourceMappingURL=state.spec.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/state/state.spec.js?");

/***/ }),

/***/ "../sim-ecs/dist/system/_.js":
/*!***********************************!*\
  !*** ../sim-ecs/dist/system/_.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.systemRunParamSym = exports.systemResourceTypeSym = exports.systemEventWriterSym = exports.systemEventReaderSym = void 0;\nexports.systemEventReaderSym = Symbol();\nexports.systemEventWriterSym = Symbol();\nexports.systemResourceTypeSym = Symbol();\nexports.systemRunParamSym = Symbol();\n//# sourceMappingURL=_.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/system/_.js?");

/***/ }),

/***/ "../sim-ecs/dist/system/system-builder.js":
/*!************************************************!*\
  !*** ../sim-ecs/dist/system/system-builder.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.SystemBuilder = void 0;\nconst tslib_1 = __webpack_require__(/*! tslib */ \"../sim-ecs/node_modules/tslib/tslib.es6.js\");\ntslib_1.__exportStar(__webpack_require__(/*! ./system-builder.spec */ \"../sim-ecs/dist/system/system-builder.spec.js\"), exports);\nclass SystemBuilder {\n    constructor(params) {\n        this.systemName = '';\n        this.setupFunction = () => { };\n        this.runFunction = () => { };\n        this.parameterDesc = params;\n    }\n    build() {\n        const self = this;\n        const System = class {\n            constructor() {\n                this.name = self.systemName;\n                this.parameterDesc = self.parameterDesc;\n                this.runFunction = self.runFunction;\n                this.setupFunction = self.setupFunction;\n            }\n        };\n        Object.defineProperty(System, 'name', {\n            configurable: true,\n            writable: false,\n            enumerable: false,\n            value: this.systemName,\n        });\n        return new System();\n    }\n    name(name) {\n        return this.withName(name);\n    }\n    run(fn) {\n        return this.withRunFunction(fn);\n    }\n    setup(fn) {\n        return this.withSetupFunction(fn);\n    }\n    withName(name) {\n        this.systemName = name;\n        return this;\n    }\n    withRunFunction(fn) {\n        this.runFunction = fn;\n        return this;\n    }\n    withSetupFunction(fn) {\n        this.setupFunction = fn;\n        return this;\n    }\n}\nexports.SystemBuilder = SystemBuilder;\n// Change alias refs for better performance\nSystemBuilder.prototype.name = SystemBuilder.prototype.withName;\nSystemBuilder.prototype.run = SystemBuilder.prototype.withRunFunction;\nSystemBuilder.prototype.setup = SystemBuilder.prototype.withSetupFunction;\n//# sourceMappingURL=system-builder.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/system/system-builder.js?");

/***/ }),

/***/ "../sim-ecs/dist/system/system-builder.spec.js":
/*!*****************************************************!*\
  !*** ../sim-ecs/dist/system/system-builder.spec.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n//# sourceMappingURL=system-builder.spec.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/system/system-builder.spec.js?");

/***/ }),

/***/ "../sim-ecs/dist/system/system.js":
/*!****************************************!*\
  !*** ../sim-ecs/dist/system/system.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getSystemRunParameters = exports.getQueriesFromSystem = exports.createSystem = void 0;\nconst tslib_1 = __webpack_require__(/*! tslib */ \"../sim-ecs/node_modules/tslib/tslib.es6.js\");\nconst system_spec_1 = __webpack_require__(/*! ./system.spec */ \"../sim-ecs/dist/system/system.spec.js\");\nconst system_builder_1 = __webpack_require__(/*! ./system-builder */ \"../sim-ecs/dist/system/system-builder.js\");\nconst query_1 = __webpack_require__(/*! ../query/query */ \"../sim-ecs/dist/query/query.js\");\nconst _1 = __webpack_require__(/*! ./_ */ \"../sim-ecs/dist/system/_.js\");\nconst internal_events_1 = __webpack_require__(/*! ../events/internal-events */ \"../sim-ecs/dist/events/internal-events.js\");\ntslib_1.__exportStar(__webpack_require__(/*! ./system.spec */ \"../sim-ecs/dist/system/system.spec.js\"), exports);\nfunction createSystem(parameterDesc) {\n    return new system_builder_1.SystemBuilder(parameterDesc);\n}\nexports.createSystem = createSystem;\nfunction getQueriesFromSystem(system) {\n    const queries = [];\n    let param;\n    for (param of Object.values(system.parameterDesc)) {\n        if (param instanceof query_1.Query) {\n            queries.push(param);\n        }\n    }\n    return queries;\n}\nexports.getQueriesFromSystem = getQueriesFromSystem;\nfunction getSystemRunParameters(system, world) {\n    let runParameters = {};\n    for (const [paramName, paramDesc] of Object.entries(system.parameterDesc)) {\n        if (paramDesc == system_spec_1.Actions) {\n            Object.defineProperty(runParameters, paramName, {\n                configurable: false,\n                enumerable: true,\n                writable: false,\n                value: world.systemActions,\n            });\n        }\n        else if (paramDesc == system_spec_1.Storage) {\n            Object.defineProperty(runParameters, paramName, {\n                configurable: false,\n                enumerable: true,\n                writable: false,\n                value: paramDesc,\n            });\n        }\n        else if (Object.getOwnPropertySymbols(paramDesc).includes(_1.systemResourceTypeSym)) {\n            const resourceType = paramDesc[_1.systemResourceTypeSym];\n            Object.defineProperty(runParameters, paramName, {\n                configurable: false,\n                enumerable: true,\n                writable: true,\n                value: world.getResource(resourceType),\n            });\n            world.eventBus.publish(new internal_events_1.SimECSSystemAddResource(system, paramName, resourceType));\n        }\n        else if (Object.getOwnPropertySymbols(paramDesc).includes(_1.systemEventReaderSym)) {\n            Object.defineProperty(runParameters, paramName, {\n                configurable: false,\n                enumerable: true,\n                writable: false,\n                value: world.eventBus.createReader(paramDesc[_1.systemEventReaderSym]),\n            });\n        }\n        else if (Object.getOwnPropertySymbols(paramDesc).includes(_1.systemEventWriterSym)) {\n            Object.defineProperty(runParameters, paramName, {\n                configurable: false,\n                enumerable: true,\n                writable: false,\n                value: world.eventBus.createWriter(),\n            });\n        }\n        else {\n            Object.defineProperty(runParameters, paramName, {\n                configurable: false,\n                enumerable: true,\n                writable: false,\n                value: paramDesc,\n            });\n        }\n    }\n    return runParameters;\n}\nexports.getSystemRunParameters = getSystemRunParameters;\n//# sourceMappingURL=system.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/system/system.js?");

/***/ }),

/***/ "../sim-ecs/dist/system/system.spec.js":
/*!*********************************************!*\
  !*** ../sim-ecs/dist/system/system.spec.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.WriteResource = exports.WriteEvents = exports.Storage = exports.ReadResource = exports.ReadEvents = exports.Actions = void 0;\nconst _1 = __webpack_require__(/*! ./_ */ \"../sim-ecs/dist/system/_.js\");\nexports.Actions = { [Symbol()]: undefined };\nfunction ReadEvents(type) {\n    return {\n        [_1.systemEventReaderSym]: type,\n    };\n}\nexports.ReadEvents = ReadEvents;\nfunction ReadResource(type) {\n    return {\n        [_1.systemResourceTypeSym]: type,\n    };\n}\nexports.ReadResource = ReadResource;\nfunction Storage(initializer) {\n    return initializer;\n}\nexports.Storage = Storage;\nfunction WriteEvents(type) {\n    return {\n        [_1.systemEventWriterSym]: type,\n    };\n}\nexports.WriteEvents = WriteEvents;\nfunction WriteResource(type) {\n    return {\n        [_1.systemResourceTypeSym]: type,\n    };\n}\nexports.WriteResource = WriteResource;\n//# sourceMappingURL=system.spec.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/system/system.spec.js?");

/***/ }),

/***/ "../sim-ecs/dist/world/actions.spec.js":
/*!*********************************************!*\
  !*** ../sim-ecs/dist/world/actions.spec.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n//# sourceMappingURL=actions.spec.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/world/actions.spec.js?");

/***/ }),

/***/ "../sim-ecs/dist/world/common/world_entities.js":
/*!******************************************************!*\
  !*** ../sim-ecs/dist/world/common/world_entities.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getEntities = exports.createEntity = exports.clearEntities = exports.buildEntity = void 0;\nconst entity_builder_1 = __webpack_require__(/*! ../../entity/entity-builder */ \"../sim-ecs/dist/entity/entity-builder.js\");\nconst entity_1 = __webpack_require__(/*! ../../entity/entity */ \"../sim-ecs/dist/entity/entity.js\");\nfunction buildEntity(uuid) {\n    const self = this;\n    return new entity_builder_1.EntityBuilder(uuid, entity => self.addEntity(entity));\n}\nexports.buildEntity = buildEntity;\nfunction clearEntities() {\n    let entity;\n    for (entity of this.data.entities) {\n        this.removeEntity(entity);\n    }\n    this.clearGroups();\n}\nexports.clearEntities = clearEntities;\nfunction createEntity() {\n    const entity = new entity_1.Entity();\n    this.addEntity(entity);\n    return entity;\n}\nexports.createEntity = createEntity;\nfunction getEntities(query) {\n    if (!query) {\n        return this.data.entities.values();\n    }\n    return Array.from(this.data.entities.values())\n        .filter(entity => query.matchesEntity(entity))\n        .values();\n}\nexports.getEntities = getEntities;\n//# sourceMappingURL=world_entities.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/world/common/world_entities.js?");

/***/ }),

/***/ "../sim-ecs/dist/world/common/world_groups.js":
/*!****************************************************!*\
  !*** ../sim-ecs/dist/world/common/world_groups.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.removeGroup = exports.getGroupEntities = exports.createGroup = exports.clearGroups = exports.assimilateGroup = exports.addEntitiesToGroup = exports.addEntityToGroup = void 0;\nfunction addEntityToGroup(groupHandle, entity) {\n    this.addEntitiesToGroup(groupHandle, [entity]);\n}\nexports.addEntityToGroup = addEntityToGroup;\nfunction addEntitiesToGroup(groupHandle, entities) {\n    const link = getLink(this, groupHandle);\n    let entity;\n    for (entity of entities) {\n        link.add(entity);\n    }\n}\nexports.addEntitiesToGroup = addEntitiesToGroup;\nfunction assimilateGroup(otherWorld, handle) {\n    const entities = otherWorld.getGroupEntities(handle);\n    const newGroup = this.createGroup();\n    otherWorld.removeGroup(handle);\n    this.addEntitiesToGroup(newGroup, entities);\n    return newGroup;\n}\nexports.assimilateGroup = assimilateGroup;\nfunction clearGroups() {\n    this.data.groups.entityLinks.clear();\n    this.data.groups.nextHandle = 0;\n}\nexports.clearGroups = clearGroups;\nfunction createGroup() {\n    const handle = this.data.groups.nextHandle++;\n    this.data.groups.entityLinks.set(handle, new Set());\n    return handle;\n}\nexports.createGroup = createGroup;\nfunction getGroupEntities(groupHandle) {\n    return getLink(this, groupHandle).keys();\n}\nexports.getGroupEntities = getGroupEntities;\nfunction getLink(world, groupHandle) {\n    const link = world.data.groups.entityLinks.get(groupHandle);\n    if (!link) {\n        throw new Error(`The group \"${groupHandle}\" does not exist in the world \"${world.name}\"`);\n    }\n    return link;\n}\nfunction removeGroup(groupHandle) {\n    const link = getLink(this, groupHandle);\n    let entity;\n    for (entity of link) {\n        this.removeEntity(entity);\n    }\n    this.data.groups.entityLinks.delete(groupHandle);\n}\nexports.removeGroup = removeGroup;\n//# sourceMappingURL=world_groups.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/world/common/world_groups.js?");

/***/ }),

/***/ "../sim-ecs/dist/world/common/world_misc.js":
/*!**************************************************!*\
  !*** ../sim-ecs/dist/world/common/world_misc.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.merge = void 0;\nfunction merge(elsewhere, intoGroup) {\n    const groupHandle = intoGroup ?? this.data.groups.nextHandle++;\n    const entities = [];\n    let entity;\n    for (entity of elsewhere.getEntities()) {\n        elsewhere.removeEntity(entity);\n        this.addEntity(entity);\n        entities.push(entity);\n    }\n    return [groupHandle, entities];\n}\nexports.merge = merge;\n//# sourceMappingURL=world_misc.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/world/common/world_misc.js?");

/***/ }),

/***/ "../sim-ecs/dist/world/common/world_resources.js":
/*!*******************************************************!*\
  !*** ../sim-ecs/dist/world/common/world_resources.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.removeResource = exports.hasResource = exports.getResources = exports.getResource = exports.clearResources = void 0;\nfunction clearResources() {\n    this.data.resources.clear();\n}\nexports.clearResources = clearResources;\nfunction getResource(type) {\n    if (!this.data.resources.has(type)) {\n        throw new Error(`Resource of type \"${type.name}\" does not exist!`);\n    }\n    return this.data.resources.get(type);\n}\nexports.getResource = getResource;\nfunction* getResources(types) {\n    if (!types) {\n        return this.data.resources.values();\n    }\n    const typesArray = Array.isArray(types)\n        ? types\n        : Array.from(types);\n    {\n        let resource;\n        let type;\n        for ([type, resource] of this.data.resources.entries()) {\n            if (typesArray.includes(type)) {\n                yield resource;\n            }\n        }\n    }\n}\nexports.getResources = getResources;\nfunction hasResource(obj) {\n    let type;\n    if (typeof obj === 'object') {\n        type = obj.constructor;\n    }\n    else {\n        type = obj;\n    }\n    return this.data.resources.has(type);\n}\nexports.hasResource = hasResource;\nfunction removeResource(type) {\n    if (!this.data.resources.has(type)) {\n        throw new Error(`Resource with name \"${type.name}\" does not exists!`);\n    }\n    this.data.resources.delete(type);\n}\nexports.removeResource = removeResource;\n//# sourceMappingURL=world_resources.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/world/common/world_resources.js?");

/***/ }),

/***/ "../sim-ecs/dist/world/error.js":
/*!**************************************!*\
  !*** ../sim-ecs/dist/world/error.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.SystemError = void 0;\nclass SystemError {\n    constructor(_cause, _System) {\n        this._cause = _cause;\n        this._System = _System;\n    }\n    get cause() {\n        return this._cause;\n    }\n    get System() {\n        return this._System;\n    }\n}\nexports.SystemError = SystemError;\n//# sourceMappingURL=error.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/world/error.js?");

/***/ }),

/***/ "../sim-ecs/dist/world/error.spec.js":
/*!*******************************************!*\
  !*** ../sim-ecs/dist/world/error.spec.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n//# sourceMappingURL=error.spec.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/world/error.spec.js?");

/***/ }),

/***/ "../sim-ecs/dist/world/events.js":
/*!***************************************!*\
  !*** ../sim-ecs/dist/world/events.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.EntityRemoved = exports.EntityAdded = void 0;\nclass EntityAdded {\n    constructor(entity) {\n        this.entity = entity;\n    }\n}\nexports.EntityAdded = EntityAdded;\nclass EntityRemoved {\n    constructor(entity) {\n        this.entity = entity;\n    }\n}\nexports.EntityRemoved = EntityRemoved;\n//# sourceMappingURL=events.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/world/events.js?");

/***/ }),

/***/ "../sim-ecs/dist/world/preptime/preptime-world.js":
/*!********************************************************!*\
  !*** ../sim-ecs/dist/world/preptime/preptime-world.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.PreptimeWorld = void 0;\nconst tslib_1 = __webpack_require__(/*! tslib */ \"../sim-ecs/node_modules/tslib/tslib.es6.js\");\nconst serde_1 = __webpack_require__(/*! ../../serde/serde */ \"../sim-ecs/dist/serde/serde.js\");\nconst scheduler_1 = __webpack_require__(/*! ../../scheduler/scheduler */ \"../sim-ecs/dist/scheduler/scheduler.js\");\nconst world_entities_1 = __webpack_require__(/*! ../common/world_entities */ \"../sim-ecs/dist/world/common/world_entities.js\");\nconst world_resources_1 = __webpack_require__(/*! ../common/world_resources */ \"../sim-ecs/dist/world/common/world_resources.js\");\nconst world_groups_1 = __webpack_require__(/*! ../common/world_groups */ \"../sim-ecs/dist/world/common/world_groups.js\");\nconst preptime_world_entities_1 = __webpack_require__(/*! ./preptime-world_entities */ \"../sim-ecs/dist/world/preptime/preptime-world_entities.js\");\nconst preptime_world_resources_1 = __webpack_require__(/*! ./preptime-world_resources */ \"../sim-ecs/dist/world/preptime/preptime-world_resources.js\");\nconst preptime_world_prefabs_1 = __webpack_require__(/*! ./preptime-world_prefabs */ \"../sim-ecs/dist/world/preptime/preptime-world_prefabs.js\");\nconst world_misc_1 = __webpack_require__(/*! ../common/world_misc */ \"../sim-ecs/dist/world/common/world_misc.js\");\nconst runtime_world_1 = __webpack_require__(/*! ../runtime/runtime-world */ \"../sim-ecs/dist/world/runtime/runtime-world.js\");\nconst state_1 = __webpack_require__(/*! ../../state/state */ \"../sim-ecs/dist/state/state.js\");\ntslib_1.__exportStar(__webpack_require__(/*! ./preptime-world.spec */ \"../sim-ecs/dist/world/preptime/preptime-world.spec.js\"), exports);\nclass PreptimeWorld {\n    constructor(name, $config, $data) {\n        this.name = name;\n        /// ****************************************************************************************************************\n        /// Entities\n        /// ****************************************************************************************************************\n        this.addEntity = preptime_world_entities_1.addEntity;\n        this.buildEntity = world_entities_1.buildEntity;\n        this.clearEntities = world_entities_1.clearEntities;\n        this.createEntity = world_entities_1.createEntity;\n        this.getEntities = world_entities_1.getEntities;\n        this.hasEntity = preptime_world_entities_1.hasEntity;\n        this.removeEntity = preptime_world_entities_1.removeEntity;\n        /// ****************************************************************************************************************\n        /// Groups\n        /// ****************************************************************************************************************\n        this.addEntityToGroup = world_groups_1.addEntityToGroup;\n        this.addEntitiesToGroup = world_groups_1.addEntitiesToGroup;\n        this.assimilateGroup = world_groups_1.assimilateGroup;\n        this.clearGroups = world_groups_1.clearGroups;\n        this.createGroup = world_groups_1.createGroup;\n        this.getGroupEntities = world_groups_1.getGroupEntities;\n        this.removeGroup = world_groups_1.removeGroup;\n        /// ****************************************************************************************************************\n        /// Misc\n        /// ****************************************************************************************************************\n        this.merge = world_misc_1.merge;\n        /// ****************************************************************************************************************\n        /// Prefabs\n        /// ****************************************************************************************************************\n        this.load = preptime_world_prefabs_1.load;\n        this.save = preptime_world_prefabs_1.save;\n        /// ****************************************************************************************************************\n        /// Resources\n        /// ****************************************************************************************************************\n        this.addResource = preptime_world_resources_1.addResource;\n        this.clearResources = world_resources_1.clearResources;\n        this.getResource = world_resources_1.getResource;\n        this.getResources = world_resources_1.getResources;\n        this.hasResource = world_resources_1.hasResource;\n        this.removeResource = world_resources_1.removeResource;\n        {\n            const config = $config\n                ? $config\n                : {};\n            this.config = {\n                defaultScheduler: config.defaultScheduler ?? new scheduler_1.Scheduler(),\n                serde: config.serde ?? new serde_1.SerDe(),\n                stateSchedulers: config.stateSchedulers ?? new Map(),\n            };\n        }\n        {\n            const data = $data\n                ? $data\n                : {};\n            this.data = {\n                entities: data.entities ?? new Set(),\n                groups: data.groups ?? {\n                    entityLinks: new Map(),\n                    nextHandle: 0,\n                },\n                resources: data.resources ?? new Map(),\n            };\n        }\n    }\n    async prepareRun(options) {\n        // todo: don't copy the refs, copy all objects\n        const name = this.name\n            ? this.name + '_run'\n            : 'NO_NAME';\n        const runWorld = new runtime_world_1.RuntimeWorld(name, Object.assign({\n            executionFunction: options?.executionFunction,\n            initialState: options?.initialState ?? state_1.State,\n        }, this.config), this.data);\n        await runWorld.prepare();\n        return runWorld;\n    }\n}\nexports.PreptimeWorld = PreptimeWorld;\n//# sourceMappingURL=preptime-world.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/world/preptime/preptime-world.js?");

/***/ }),

/***/ "../sim-ecs/dist/world/preptime/preptime-world.spec.js":
/*!*************************************************************!*\
  !*** ../sim-ecs/dist/world/preptime/preptime-world.spec.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n//# sourceMappingURL=preptime-world.spec.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/world/preptime/preptime-world.spec.js?");

/***/ }),

/***/ "../sim-ecs/dist/world/preptime/preptime-world_entities.js":
/*!*****************************************************************!*\
  !*** ../sim-ecs/dist/world/preptime/preptime-world_entities.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.removeEntity = exports.hasEntity = exports.addEntity = void 0;\nfunction addEntity(entity) {\n    this.data.entities.add(entity);\n}\nexports.addEntity = addEntity;\nfunction hasEntity(entity) {\n    return this.data.entities.has(entity);\n}\nexports.hasEntity = hasEntity;\nfunction removeEntity(entity) {\n    this.data.entities.delete(entity);\n}\nexports.removeEntity = removeEntity;\n//# sourceMappingURL=preptime-world_entities.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/world/preptime/preptime-world_entities.js?");

/***/ }),

/***/ "../sim-ecs/dist/world/preptime/preptime-world_prefabs.js":
/*!****************************************************************!*\
  !*** ../sim-ecs/dist/world/preptime/preptime-world_prefabs.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.save = exports.load = void 0;\nfunction load(prefab, options, intoGroup) {\n    let groupHandle = intoGroup;\n    if (groupHandle == undefined || !this.data.groups.entityLinks.has(groupHandle)) {\n        groupHandle = this.createGroup();\n    }\n    const serdeOut = this.config.serde.deserialize(prefab, options);\n    {\n        const entities = this.data.groups.entityLinks.get(groupHandle);\n        let entity;\n        for (entity of serdeOut.entities) {\n            this.addEntity(entity);\n            entities.add(entity);\n        }\n    }\n    {\n        let resource;\n        for (resource of Object.values(serdeOut.resources)) {\n            // @ts-ignore should work\n            this.addResource(resource);\n        }\n    }\n    return groupHandle;\n}\nexports.load = load;\nfunction save(options) {\n    const resources = Object.fromEntries(options?.resources?.map(type => [type.constructor.name]) ?? []);\n    return this.config.serde.serialize({\n        entities: this.getEntities(options?.entities),\n        resources,\n    }, options);\n}\nexports.save = save;\n//# sourceMappingURL=preptime-world_prefabs.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/world/preptime/preptime-world_prefabs.js?");

/***/ }),

/***/ "../sim-ecs/dist/world/preptime/preptime-world_resources.js":
/*!******************************************************************!*\
  !*** ../sim-ecs/dist/world/preptime/preptime-world_resources.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.addResource = void 0;\nfunction addResource(Type, ...args) {\n    this.data.resources.set(Type, args);\n    return Type;\n}\nexports.addResource = addResource;\n//# sourceMappingURL=preptime-world_resources.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/world/preptime/preptime-world_resources.js?");

/***/ }),

/***/ "../sim-ecs/dist/world/runtime/commands/command-entity-builder.js":
/*!************************************************************************!*\
  !*** ../sim-ecs/dist/world/runtime/commands/command-entity-builder.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.CommandEntityBuilder = void 0;\nconst tslib_1 = __webpack_require__(/*! tslib */ \"../sim-ecs/node_modules/tslib/tslib.es6.js\");\nconst entity_1 = __webpack_require__(/*! ../../../entity/entity */ \"../sim-ecs/dist/entity/entity.js\");\ntslib_1.__exportStar(__webpack_require__(/*! ./command-entity-builder.spec */ \"../sim-ecs/dist/world/runtime/commands/command-entity-builder.spec.js\"), exports);\nclass CommandEntityBuilder {\n    constructor(world, commands) {\n        this.world = world;\n        this.commands = commands;\n        this.entity = new entity_1.Entity();\n    }\n    build() {\n        this.commands.addEntity(this.entity);\n    }\n    with(component, ...args) {\n        this.entity.addComponent(component, ...args);\n        return this;\n    }\n    withAll(...components) {\n        let component;\n        for (component of components) {\n            this.with(component);\n        }\n        return this;\n    }\n}\nexports.CommandEntityBuilder = CommandEntityBuilder;\n//# sourceMappingURL=command-entity-builder.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/world/runtime/commands/command-entity-builder.js?");

/***/ }),

/***/ "../sim-ecs/dist/world/runtime/commands/command-entity-builder.spec.js":
/*!*****************************************************************************!*\
  !*** ../sim-ecs/dist/world/runtime/commands/command-entity-builder.spec.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n//# sourceMappingURL=command-entity-builder.spec.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/world/runtime/commands/command-entity-builder.spec.js?");

/***/ }),

/***/ "../sim-ecs/dist/world/runtime/commands/commands.js":
/*!**********************************************************!*\
  !*** ../sim-ecs/dist/world/runtime/commands/commands.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Commands = void 0;\nconst tslib_1 = __webpack_require__(/*! tslib */ \"../sim-ecs/node_modules/tslib/tslib.es6.js\");\nconst command_entity_builder_1 = __webpack_require__(/*! ./command-entity-builder */ \"../sim-ecs/dist/world/runtime/commands/command-entity-builder.js\");\nconst _1 = __webpack_require__(/*! ../../../query/_ */ \"../sim-ecs/dist/query/_.js\");\nconst entity_1 = __webpack_require__(/*! ../../../entity/entity */ \"../sim-ecs/dist/entity/entity.js\");\ntslib_1.__exportStar(__webpack_require__(/*! ./commands.spec */ \"../sim-ecs/dist/world/runtime/commands/commands.spec.js\"), exports);\nclass Commands {\n    constructor(world, queries) {\n        this.world = world;\n        this.queries = queries;\n        this.commands = [];\n    }\n    addEntity(entity) {\n        this.commands.push(() => {\n            this.world.addEntity(entity);\n            let query;\n            for (query of this.queries) {\n                query[_1.addEntitySym](entity);\n            }\n        });\n    }\n    addResource(obj, ...args) {\n        let type;\n        let instance;\n        if (typeof obj === 'object') {\n            type = obj.constructor;\n            instance = obj;\n        }\n        else {\n            type = obj;\n            instance = new (obj.prototype.constructor.bind(obj, ...Array.from(arguments).slice(1)))();\n        }\n        if (this.world.data.resources.has(type)) {\n            throw new Error(`Resource with name \"${type.name}\" already exists!`);\n        }\n        this.commands.push(() => {\n            if (this.world.data.resources.has(type)) {\n                throw new Error(`Resource with name \"${type.name}\" already exists!`);\n            }\n            this.world.data.resources.set(type, instance);\n        });\n        return instance;\n    }\n    buildEntity() {\n        return new command_entity_builder_1.CommandEntityBuilder(this.world, this);\n    }\n    clearEntities() {\n        this.commands.push(() => { this.world.data.entities.clear(); });\n    }\n    async executeAll() {\n        if (this.commands.length > 0) {\n            for (let command = this.commands.shift(); !!command; command = this.commands.shift()) {\n                await command();\n            }\n        }\n    }\n    load(prefab, options) {\n        const handle = this.world.createGroup();\n        this.commands.push(() => {\n            this.world.load(prefab, options, handle);\n            let entity, query;\n            for (entity of this.world.getGroupEntities(handle)) {\n                for (query of this.queries) {\n                    query[_1.addEntitySym](entity);\n                }\n            }\n        });\n        return handle;\n    }\n    merge(world) {\n        const handle = this.world.createGroup();\n        this.commands.push(() => { this.world.merge(world, handle); });\n        return handle;\n    }\n    mutateEntity(entity, mutator) {\n        if (!(entity instanceof entity_1.Entity)) {\n            throw new Error(`The entity \"${entity.id}\" cannot be mutated!`);\n        }\n        mutator(entity);\n        this.commands.push(() => {\n            this.world.removeEntity(entity);\n            this.world.addEntity(entity);\n        });\n    }\n    popState() {\n        this.commands.push(() => this.world.popState());\n    }\n    pushState(NewState) {\n        this.commands.push(() => this.world.pushState(NewState));\n    }\n    queueCommand(command) {\n        this.commands.push(command);\n    }\n    removeEntity(entity) {\n        this.commands.push(() => this.world.removeEntity(entity));\n    }\n    removeGroup(handle) {\n        this.commands.push(() => this.world.removeGroup(handle));\n    }\n    removeResource(type) {\n        if (!this.world.data.resources.has(type)) {\n            throw new Error(`Resource with name \"${type.name}\" does not exists!`);\n        }\n        this.commands.push(() => {\n            if (!this.world.data.resources.has(type)) {\n                throw new Error(`Resource with name \"${type.name}\" does not exists!`);\n            }\n            this.world.data.resources.delete(type);\n        });\n    }\n    replaceResource(obj, ...args) {\n        let type;\n        if (typeof obj === 'object') {\n            type = obj.constructor;\n        }\n        else {\n            type = obj;\n        }\n        if (!this.world.data.resources.has(type)) {\n            throw new Error(`Resource with name \"${type.name}\" does not exists!`);\n        }\n        this.commands.push(() => {\n            if (!this.world.data.resources.has(type)) {\n                throw new Error(`Resource with name \"${type.name}\" does not exists!`);\n            }\n            this.world.data.resources.delete(type);\n            this.world.addResource(obj, ...args);\n        });\n    }\n    stopRun() {\n        this.commands.push(() => this.world.stop());\n    }\n}\nexports.Commands = Commands;\n//# sourceMappingURL=commands.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/world/runtime/commands/commands.js?");

/***/ }),

/***/ "../sim-ecs/dist/world/runtime/commands/commands.spec.js":
/*!***************************************************************!*\
  !*** ../sim-ecs/dist/world/runtime/commands/commands.spec.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n//# sourceMappingURL=commands.spec.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/world/runtime/commands/commands.spec.js?");

/***/ }),

/***/ "../sim-ecs/dist/world/runtime/runtime-world.js":
/*!******************************************************!*\
  !*** ../sim-ecs/dist/world/runtime/runtime-world.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nvar _RuntimeWorld_awaiter;\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.RuntimeWorld = void 0;\nconst tslib_1 = __webpack_require__(/*! tslib */ \"../sim-ecs/node_modules/tslib/tslib.es6.js\");\nconst world_entities_1 = __webpack_require__(/*! ../common/world_entities */ \"../sim-ecs/dist/world/common/world_entities.js\");\nconst world_groups_1 = __webpack_require__(/*! ../common/world_groups */ \"../sim-ecs/dist/world/common/world_groups.js\");\nconst world_misc_1 = __webpack_require__(/*! ../common/world_misc */ \"../sim-ecs/dist/world/common/world_misc.js\");\nconst runtime_world_prefabs_1 = __webpack_require__(/*! ./runtime-world_prefabs */ \"../sim-ecs/dist/world/runtime/runtime-world_prefabs.js\");\nconst world_resources_1 = __webpack_require__(/*! ../common/world_resources */ \"../sim-ecs/dist/world/common/world_resources.js\");\nconst runtime_world_entities_1 = __webpack_require__(/*! ./runtime-world_entities */ \"../sim-ecs/dist/world/runtime/runtime-world_entities.js\");\nconst runtime_world_resources_1 = __webpack_require__(/*! ./runtime-world_resources */ \"../sim-ecs/dist/world/runtime/runtime-world_resources.js\");\nconst sim_ecs_pda_1 = __webpack_require__(/*! ../../pda/sim-ecs-pda */ \"../sim-ecs/dist/pda/sim-ecs-pda.js\");\nconst runtime_world_states_1 = __webpack_require__(/*! ./runtime-world_states */ \"../sim-ecs/dist/world/runtime/runtime-world_states.js\");\nconst event_bus_1 = __webpack_require__(/*! ../../events/event-bus */ \"../sim-ecs/dist/events/event-bus.js\");\nconst commands_1 = __webpack_require__(/*! ./commands/commands */ \"../sim-ecs/dist/world/runtime/commands/commands.js\");\nconst system_1 = __webpack_require__(/*! ../../system/system */ \"../sim-ecs/dist/system/system.js\");\nconst _1 = __webpack_require__(/*! ../../query/_ */ \"../sim-ecs/dist/query/_.js\");\nconst runtime_world_events_1 = __webpack_require__(/*! ./runtime-world_events */ \"../sim-ecs/dist/world/runtime/runtime-world_events.js\");\nconst internal_events_1 = __webpack_require__(/*! ../../events/internal-events */ \"../sim-ecs/dist/events/internal-events.js\");\ntslib_1.__exportStar(__webpack_require__(/*! ./runtime-world.spec */ \"../sim-ecs/dist/world/runtime/runtime-world.spec.js\"), exports);\ntslib_1.__exportStar(__webpack_require__(/*! ./commands/commands.spec */ \"../sim-ecs/dist/world/runtime/commands/commands.spec.js\"), exports);\nclass RuntimeWorld {\n    constructor(name, config, $data) {\n        this.name = name;\n        this.config = config;\n        _RuntimeWorld_awaiter.set(this, void 0);\n        this.eventBus = new event_bus_1.EventBus();\n        this.isPrepared = false;\n        this.pda = new sim_ecs_pda_1.SimECSPushDownAutomaton(this);\n        this.queries = new Set();\n        this.shouldRunSystems = false;\n        this.systemResourceMap = new Map();\n        /// ****************************************************************************************************************\n        /// Entities\n        /// ****************************************************************************************************************\n        this.addEntity = runtime_world_entities_1.addEntity;\n        this.buildEntity = world_entities_1.buildEntity;\n        this.clearEntities = world_entities_1.clearEntities;\n        this.createEntity = world_entities_1.createEntity;\n        this.getEntities = world_entities_1.getEntities;\n        this.hasEntity = runtime_world_entities_1.hasEntity;\n        this.removeEntity = runtime_world_entities_1.removeEntity;\n        /// ****************************************************************************************************************\n        /// Events\n        /// ****************************************************************************************************************\n        this.registerSystemAddResourceEvent = runtime_world_events_1.registerSystemAddResourceEvent;\n        /// ****************************************************************************************************************\n        /// Groups\n        /// ****************************************************************************************************************\n        this.addEntityToGroup = world_groups_1.addEntityToGroup;\n        this.addEntitiesToGroup = world_groups_1.addEntitiesToGroup;\n        this.assimilateGroup = world_groups_1.assimilateGroup;\n        this.clearGroups = world_groups_1.clearGroups;\n        this.createGroup = world_groups_1.createGroup;\n        this.getGroupEntities = world_groups_1.getGroupEntities;\n        this.removeGroup = world_groups_1.removeGroup;\n        /// ****************************************************************************************************************\n        /// Misc\n        /// ****************************************************************************************************************\n        this.merge = world_misc_1.merge;\n        /// ****************************************************************************************************************\n        /// Prefabs\n        /// ****************************************************************************************************************\n        this.load = runtime_world_prefabs_1.load;\n        this.save = runtime_world_prefabs_1.save;\n        /// ****************************************************************************************************************\n        /// Resources\n        /// ****************************************************************************************************************\n        this.addResource = runtime_world_resources_1.addResource;\n        this.clearResources = world_resources_1.clearResources;\n        this.getResource = world_resources_1.getResource;\n        this.getResources = world_resources_1.getResources;\n        this.hasResource = world_resources_1.hasResource;\n        this.removeResource = world_resources_1.removeResource;\n        this.replaceResource = runtime_world_resources_1.replaceResource;\n        /// ****************************************************************************************************************\n        /// States\n        /// ****************************************************************************************************************\n        /**\n         * Remove the current state and switch to the last one\n         * @protected\n         */\n        this.popState = runtime_world_states_1.popState;\n        /**\n         * Switch to a new state\n         * @protected\n         */\n        this.pushState = runtime_world_states_1.pushState;\n        this.commands = new commands_1.Commands(this, this.queries);\n        this.currentScheduler = this.config.defaultScheduler;\n        this.executionFunction = this.config.executionFunction ?? (typeof requestAnimationFrame == 'function'\n            ? requestAnimationFrame\n            : setTimeout);\n        this.data = {\n            entities: new Set($data?.entities ? $data?.entities : new Set()),\n            groups: $data?.groups ?? {\n                entityLinks: new Map(),\n                nextHandle: 0,\n            },\n            resources: new Map(),\n        };\n        if ($data?.resources) {\n            for (const [Type, args] of $data.resources) {\n                this.addResource(Type, ...args);\n            }\n        }\n        {\n            const self = this;\n            this.systemWorld = {\n                get commands() { return self.commands; },\n                get currentState() { return self.currentState; },\n                getEntities: this.getEntities.bind(this),\n                // @ts-ignore TS bug?\n                getResource: this.getResource.bind(this),\n                hasResource: this.hasResource.bind(this),\n            };\n            this.transitionWorld = Object.assign({\n                eventBus: this.eventBus,\n                popState: this.popState.bind(this),\n                pushState: this.pushState.bind(this),\n                flushCommands: this.flushCommands.bind(this),\n                save: this.save.bind(this),\n            }, this.systemWorld);\n        }\n        this.registerSystemAddResourceEvent();\n        //this.registerSystemReplaceResourceEvent();\n    }\n    get awaiter() {\n        return tslib_1.__classPrivateFieldGet(this, _RuntimeWorld_awaiter, \"f\");\n    }\n    get currentState() {\n        return this.pda.state;\n    }\n    get isRunning() {\n        return Boolean(tslib_1.__classPrivateFieldGet(this, _RuntimeWorld_awaiter, \"f\"));\n    }\n    get systemActions() {\n        return this.systemWorld;\n    }\n    get transitionActions() {\n        return this.transitionWorld;\n    }\n    flushCommands() {\n        return this.commands.executeAll();\n    }\n    async prepare() {\n        await this.config.defaultScheduler.prepare(this);\n        this.pda.clear();\n        {\n            let scheduler;\n            let query, system;\n            for (system of this.config.defaultScheduler.getSystems()) {\n                for (query of (0, system_1.getQueriesFromSystem)(system)) {\n                    this.queries.add(query);\n                }\n            }\n            for (scheduler of this.config.stateSchedulers.values()) {\n                await scheduler.prepare(this);\n                for (system of scheduler.getSystems()) {\n                    for (query of (0, system_1.getQueriesFromSystem)(system)) {\n                        this.queries.add(query);\n                    }\n                }\n            }\n            for (query of this.queries) {\n                query[_1.setEntitiesSym](this.data.entities.values());\n            }\n        }\n        this.isPrepared = true;\n    }\n    start() {\n        if (!this.isPrepared) {\n            throw new Error(`The runtime world \"${this.name}\" wasn't prepared, yet!`);\n        }\n        if (tslib_1.__classPrivateFieldGet(this, _RuntimeWorld_awaiter, \"f\")) {\n            throw new Error(`The runtime world \"${this.name}\" is already running!`);\n        }\n        tslib_1.__classPrivateFieldSet(this, _RuntimeWorld_awaiter, new Promise((resolve, reject) => {\n            this.awaiterReject = reject;\n            this.awaiterResolve = resolve;\n        }), \"f\");\n        (async () => {\n            const syncPoints = new Set();\n            const syncHandler = async () => {\n                try {\n                    await this.commands.executeAll();\n                }\n                catch (error) {\n                    if (typeof error == 'object' && error != null) {\n                        await this.eventBus.publish(error);\n                    }\n                    else {\n                        throw error;\n                    }\n                }\n            };\n            this.eventBus.subscribe(internal_events_1.SimECSPDAPushStateEvent, event => {\n                const stateScheduler = this.config.stateSchedulers.get(event.state) ?? this.config.defaultScheduler;\n                let syncPoint;\n                for (syncPoint of stateScheduler.pipeline.getGroups()) {\n                    syncPoints.add(syncPoint);\n                    syncPoint.addOnSyncHandler(syncHandler);\n                }\n            });\n            await this.pushState(this.config.initialState);\n            {\n                const execFn = this.executionFunction;\n                const cleanUp = () => {\n                    this.pda.clear();\n                    {\n                        let syncPoint;\n                        for (syncPoint of syncPoints) {\n                            syncPoint.clearOnSyncHandlers();\n                        }\n                    }\n                    tslib_1.__classPrivateFieldSet(this, _RuntimeWorld_awaiter, undefined, \"f\");\n                    this.awaiterResolve();\n                };\n                const mainLoop = async () => {\n                    if (!this.shouldRunSystems) {\n                        cleanUp();\n                        return;\n                    }\n                    try {\n                        await this.currentSchedulerExecutor();\n                    }\n                    catch (error) {\n                        if (typeof error == 'object' && error != null) {\n                            await this.eventBus.publish(error);\n                        }\n                        else {\n                            throw error;\n                        }\n                    }\n                    execFn(mainLoop);\n                };\n                this.shouldRunSystems = true;\n                execFn(mainLoop);\n            }\n        })().catch(err => {\n            this.awaiterReject(err);\n            tslib_1.__classPrivateFieldSet(this, _RuntimeWorld_awaiter, undefined, \"f\");\n        });\n        return tslib_1.__classPrivateFieldGet(this, _RuntimeWorld_awaiter, \"f\");\n    }\n    async step() {\n        const originalExecutionFn = this.executionFunction;\n        this.executionFunction = (mainLoop) => {\n            originalExecutionFn(() => {\n                mainLoop();\n                this.stop();\n            });\n        };\n        await this.start();\n        this.executionFunction = originalExecutionFn;\n    }\n    stop() {\n        this.shouldRunSystems = false;\n    }\n}\nexports.RuntimeWorld = RuntimeWorld;\n_RuntimeWorld_awaiter = new WeakMap();\n//# sourceMappingURL=runtime-world.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/world/runtime/runtime-world.js?");

/***/ }),

/***/ "../sim-ecs/dist/world/runtime/runtime-world.spec.js":
/*!***********************************************************!*\
  !*** ../sim-ecs/dist/world/runtime/runtime-world.spec.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst tslib_1 = __webpack_require__(/*! tslib */ \"../sim-ecs/node_modules/tslib/tslib.es6.js\");\ntslib_1.__exportStar(__webpack_require__(/*! ./commands/commands.spec */ \"../sim-ecs/dist/world/runtime/commands/commands.spec.js\"), exports);\n//# sourceMappingURL=runtime-world.spec.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/world/runtime/runtime-world.spec.js?");

/***/ }),

/***/ "../sim-ecs/dist/world/runtime/runtime-world_entities.js":
/*!***************************************************************!*\
  !*** ../sim-ecs/dist/world/runtime/runtime-world_entities.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.removeEntity = exports.hasEntity = exports.addEntity = void 0;\nconst _1 = __webpack_require__(/*! ../../query/_ */ \"../sim-ecs/dist/query/_.js\");\nfunction addEntity(entity) {\n    this.data.entities.add(entity);\n    {\n        let query;\n        for (query of this.queries) {\n            query[_1.addEntitySym](entity);\n        }\n    }\n}\nexports.addEntity = addEntity;\nfunction hasEntity(entity) {\n    return this.data.entities.has(entity);\n}\nexports.hasEntity = hasEntity;\nfunction removeEntity(entity) {\n    this.data.entities.delete(entity);\n    {\n        let query;\n        for (query of this.queries) {\n            query[_1.removeEntitySym](entity);\n        }\n    }\n}\nexports.removeEntity = removeEntity;\n//# sourceMappingURL=runtime-world_entities.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/world/runtime/runtime-world_entities.js?");

/***/ }),

/***/ "../sim-ecs/dist/world/runtime/runtime-world_events.js":
/*!*************************************************************!*\
  !*** ../sim-ecs/dist/world/runtime/runtime-world_events.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.registerSystemAddResourceEvent = void 0;\nconst internal_events_1 = __webpack_require__(/*! ../../events/internal-events */ \"../sim-ecs/dist/events/internal-events.js\");\nfunction registerSystemAddResourceEvent() {\n    this.eventBus.subscribe(internal_events_1.SimECSSystemAddResource, event => {\n        this.systemResourceMap.set(event.system, {\n            paramName: event.paramName,\n            resourceType: event.resource,\n        });\n    });\n}\nexports.registerSystemAddResourceEvent = registerSystemAddResourceEvent;\n//# sourceMappingURL=runtime-world_events.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/world/runtime/runtime-world_events.js?");

/***/ }),

/***/ "../sim-ecs/dist/world/runtime/runtime-world_prefabs.js":
/*!**************************************************************!*\
  !*** ../sim-ecs/dist/world/runtime/runtime-world_prefabs.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.save = exports.load = void 0;\nfunction load(prefab, options, intoGroup) {\n    let groupHandle = intoGroup;\n    if (groupHandle == undefined || !this.data.groups.entityLinks.has(groupHandle)) {\n        groupHandle = this.createGroup();\n    }\n    const serdeOut = this.config.serde.deserialize(prefab, options);\n    {\n        const entities = this.data.groups.entityLinks.get(groupHandle);\n        let entity;\n        for (entity of serdeOut.entities) {\n            this.addEntity(entity);\n            entities.add(entity);\n        }\n    }\n    {\n        let resource;\n        for (resource of Object.values(serdeOut.resources)) {\n            if (this.hasResource(resource)) {\n                this.replaceResource(resource);\n            }\n            else {\n                // @ts-ignore should work\n                this.addResource(resource);\n            }\n        }\n    }\n    return groupHandle;\n}\nexports.load = load;\nfunction save(options) {\n    const resources = Object.fromEntries(options?.resources\n        ?.map(type => [type.constructor.name, this.getResource(type)]) ?? []);\n    return this.config.serde.serialize({\n        entities: this.getEntities(options?.entities),\n        resources,\n    }, options);\n}\nexports.save = save;\n//# sourceMappingURL=runtime-world_prefabs.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/world/runtime/runtime-world_prefabs.js?");

/***/ }),

/***/ "../sim-ecs/dist/world/runtime/runtime-world_resources.js":
/*!****************************************************************!*\
  !*** ../sim-ecs/dist/world/runtime/runtime-world_resources.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.replaceResource = exports.addResource = void 0;\nconst _1 = __webpack_require__(/*! ../../system/_ */ \"../sim-ecs/dist/system/_.js\");\nconst internal_events_1 = __webpack_require__(/*! ../../events/internal-events */ \"../sim-ecs/dist/events/internal-events.js\");\nfunction addResource(obj, ...args) {\n    let type;\n    let instance;\n    if (typeof obj === 'object') {\n        type = obj.constructor;\n        instance = obj;\n    }\n    else {\n        type = obj;\n        try {\n            instance = new (obj.prototype.constructor.bind(obj, ...Array.from(arguments).slice(1)))();\n        }\n        catch (err) {\n            if (err instanceof TypeError && err.message.startsWith('Illegal constructor')) {\n                // @ts-ignore This may happen for some built-in constructors. They must be replaced later!\n                instance = null;\n            }\n            else {\n                throw err;\n            }\n        }\n    }\n    if (this.data.resources.has(type)) {\n        throw new Error(`Resource with name \"${type.name}\" already exists!`);\n    }\n    this.data.resources.set(type, instance);\n    return instance;\n}\nexports.addResource = addResource;\nasync function replaceResource(obj, ...args) {\n    let type;\n    if (typeof obj === 'object') {\n        type = obj.constructor;\n    }\n    else {\n        type = obj;\n    }\n    if (!this.data.resources.has(type)) {\n        throw new Error(`Resource with name \"${type.name}\" does not exists!`);\n    }\n    this.data.resources.delete(type);\n    const resourceObj = this.addResource(obj, ...args);\n    await this.eventBus.publish(new internal_events_1.SimECSReplaceResourceEvent(type, resourceObj));\n    { // Also replace the resources for all systems\n        let system, resourceDesc;\n        for ([system, resourceDesc] of this.systemResourceMap) {\n            if (resourceDesc.resourceType.name == type.name) {\n                system[_1.systemRunParamSym][resourceDesc.paramName] = resourceObj;\n                await this.eventBus.publish(new internal_events_1.SimECSSystemReplaceResource(system, resourceDesc.paramName, resourceDesc.resourceType));\n            }\n        }\n    }\n}\nexports.replaceResource = replaceResource;\n//# sourceMappingURL=runtime-world_resources.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/world/runtime/runtime-world_resources.js?");

/***/ }),

/***/ "../sim-ecs/dist/world/runtime/runtime-world_states.js":
/*!*************************************************************!*\
  !*** ../sim-ecs/dist/world/runtime/runtime-world_states.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.unsubscribeEventsOfSchedulerSystems = exports.subscribeEventsOfSchedulerSystems = exports.pushState = exports.popState = void 0;\nconst event_reader_1 = __webpack_require__(/*! ../../events/event-reader */ \"../sim-ecs/dist/events/event-reader.js\");\nasync function popState() {\n    unsubscribeEventsOfSchedulerSystems(this.eventBus, this.currentScheduler);\n    await this.pda.pop()?.deactivate(this.transitionWorld);\n    const newState = this.pda.state;\n    if (!newState) {\n        return;\n    }\n    await newState.activate(this.transitionWorld);\n    this.currentScheduler = this.config.stateSchedulers.get(newState.constructor) ?? this.config.defaultScheduler;\n    this.currentSchedulerExecutor = this.currentScheduler.getExecutor(this.eventBus);\n    subscribeEventsOfSchedulerSystems(this.eventBus, this.currentScheduler);\n}\nexports.popState = popState;\nasync function pushState(NewState) {\n    if (this.currentScheduler) {\n        unsubscribeEventsOfSchedulerSystems(this.eventBus, this.currentScheduler);\n    }\n    await this.pda.state?.deactivate(this.transitionWorld);\n    await this.pda.push(NewState);\n    const newState = this.pda.state;\n    await newState.create(this.transitionWorld);\n    await newState.activate(this.transitionWorld);\n    await this.commands.executeAll();\n    this.currentScheduler = this.config.stateSchedulers.get(NewState) ?? this.config.defaultScheduler;\n    if (!this.currentScheduler) {\n        throw new Error(`There is no DefaultScheduler or Scheduler for ${NewState.name}!`);\n    }\n    this.currentSchedulerExecutor = this.currentScheduler.getExecutor(this.eventBus);\n    subscribeEventsOfSchedulerSystems(this.eventBus, this.currentScheduler);\n}\nexports.pushState = pushState;\nfunction subscribeEventsOfSchedulerSystems(eventBus, scheduler) {\n    const systems = scheduler.pipeline.getGroups().map(g => g.stages).flat().map(s => s.systems).flat();\n    let system;\n    let systemParam;\n    for (system of systems) {\n        for (systemParam of Object.values(system.parameterDesc)) {\n            if (systemParam instanceof event_reader_1.EventReader) {\n                eventBus.subscribeReader(systemParam);\n            }\n        }\n    }\n}\nexports.subscribeEventsOfSchedulerSystems = subscribeEventsOfSchedulerSystems;\nfunction unsubscribeEventsOfSchedulerSystems(eventBus, scheduler) {\n    const systems = scheduler.pipeline.getGroups().map(g => g.stages).flat().map(s => s.systems).flat();\n    let system;\n    let systemParam;\n    for (system of systems) {\n        for (systemParam of Object.values(system.parameterDesc)) {\n            if (systemParam instanceof event_reader_1.EventReader) {\n                eventBus.unsubscribeReader(systemParam);\n            }\n        }\n    }\n}\nexports.unsubscribeEventsOfSchedulerSystems = unsubscribeEventsOfSchedulerSystems;\n//# sourceMappingURL=runtime-world_states.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/world/runtime/runtime-world_states.js?");

/***/ }),

/***/ "../sim-ecs/dist/world/world-builder.js":
/*!**********************************************!*\
  !*** ../sim-ecs/dist/world/world-builder.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.WorldBuilder = void 0;\nconst tslib_1 = __webpack_require__(/*! tslib */ \"../sim-ecs/node_modules/tslib/tslib.es6.js\");\nconst world_builder_util_1 = __webpack_require__(/*! ./world-builder.util */ \"../sim-ecs/dist/world/world-builder.util.js\");\nconst scheduler_1 = __webpack_require__(/*! ../scheduler/scheduler */ \"../sim-ecs/dist/scheduler/scheduler.js\");\nconst ecs_sync_point_1 = __webpack_require__(/*! ../ecs/ecs-sync-point */ \"../sim-ecs/dist/ecs/ecs-sync-point.js\");\nconst preptime_world_1 = __webpack_require__(/*! ./preptime/preptime-world */ \"../sim-ecs/dist/world/preptime/preptime-world.js\");\ntslib_1.__exportStar(__webpack_require__(/*! ./world-builder.spec */ \"../sim-ecs/dist/world/world-builder.spec.js\"), exports);\nclass WorldBuilder {\n    constructor(serde) {\n        this.serde = serde;\n        this.callbacks = new Set();\n        this.defaultScheduler = new scheduler_1.Scheduler();\n        this.resources = new Map();\n        this.stateSchedulers = new Map();\n    }\n    addCallback(cb) {\n        this.callbacks.add(cb);\n        return this;\n    }\n    build() {\n        const world = new preptime_world_1.PreptimeWorld(this.worldName, {\n            defaultScheduler: this.defaultScheduler,\n            serde: this.serde,\n            stateSchedulers: this.stateSchedulers,\n        }, {\n            resources: this.resources,\n        });\n        for (const cb of this.callbacks) {\n            cb(world);\n        }\n        return world;\n    }\n    c(Component, options) {\n        return this.withComponent(Component, options);\n    }\n    checkSyncPointLoop(root) {\n        if (this.hasSyncPointLoop(root)) {\n            throw new Error('The sync-points provided form a loop!');\n        }\n    }\n    component(Component, options) {\n        return this.withComponent(Component, options);\n    }\n    components(...Components) {\n        return this.withComponents(...Components);\n    }\n    hasSyncPointLoop(root) {\n        const check = (root, direction) => {\n            const syncPoints = new Set();\n            let currentSyncPoint = root;\n            let lookAheadSyncPoint = currentSyncPoint[direction];\n            while (lookAheadSyncPoint) {\n                if (syncPoints.has(lookAheadSyncPoint)) {\n                    return true;\n                }\n                currentSyncPoint = lookAheadSyncPoint;\n                lookAheadSyncPoint = currentSyncPoint[direction];\n                syncPoints.add(currentSyncPoint);\n            }\n            return false;\n        };\n        if (check(root, 'after')) {\n            return true;\n        }\n        return check(root, 'before');\n    }\n    name(name) {\n        return this.withName(name);\n    }\n    r(Resource, options) {\n        return this.withResource(Resource, options);\n    }\n    resource(Resource, options) {\n        return this.withResource(Resource, options);\n    }\n    registerAllNamedSyncPoints(root) {\n        let currentSyncPoint = root;\n        // register root\n        if (root.name) {\n            (0, ecs_sync_point_1.addSyncPoint)(root);\n        }\n        // register all sync-points before root\n        while (currentSyncPoint.before) {\n            currentSyncPoint = currentSyncPoint.before;\n            if (currentSyncPoint.name) {\n                (0, ecs_sync_point_1.addSyncPoint)(currentSyncPoint);\n            }\n        }\n        // reset to root\n        currentSyncPoint = root;\n        // register all sync-points after root\n        while (currentSyncPoint.after) {\n            currentSyncPoint = currentSyncPoint.after;\n            if (currentSyncPoint.name) {\n                (0, ecs_sync_point_1.addSyncPoint)(currentSyncPoint);\n            }\n        }\n    }\n    updateRootSyncPoint(updater) {\n        updater(this.defaultScheduler.pipeline.root);\n        return this;\n    }\n    withComponent(Component, options) {\n        this.serde.registerTypeHandler(Component, options?.serDe?.deserializer ?? world_builder_util_1.dataStructDeserializer.bind(undefined, Component), options?.serDe?.serializer ?? world_builder_util_1.dataStructSerializer);\n        return this;\n    }\n    withComponents(...Components) {\n        for (const Component of Components) {\n            this.withComponent(Component);\n        }\n        return this;\n    }\n    withDefaultScheduler(scheduler) {\n        const root = scheduler.pipeline.root;\n        this.checkSyncPointLoop(root);\n        this.defaultScheduler = scheduler;\n        this.registerAllNamedSyncPoints(root);\n        return this;\n    }\n    withDefaultScheduling(planner) {\n        const root = this.defaultScheduler.pipeline.root;\n        this.checkSyncPointLoop(root);\n        planner(root);\n        this.registerAllNamedSyncPoints(root);\n        return this;\n    }\n    withName(name) {\n        this.worldName = name;\n        return this;\n    }\n    withResource(Resource, options) {\n        this.resources.set(Resource, options?.constructorArgs ?? []);\n        this.serde.registerTypeHandler(Resource, options?.serDe?.deserializer ?? world_builder_util_1.dataStructDeserializer.bind(undefined, Resource), options?.serDe?.serializer ?? world_builder_util_1.dataStructSerializer);\n        return this;\n    }\n    withResources(Resources) {\n        for (const Resource of Resources) {\n            this.withResource(Resource);\n        }\n        return this;\n    }\n    withStateScheduler(state, scheduler) {\n        if (this.stateSchedulers.has(state)) {\n            throw new Error(`A scheduler was already assigned to ${state.name}!`);\n        }\n        {\n            const root = scheduler.pipeline.root;\n            this.checkSyncPointLoop(root);\n            this.stateSchedulers.set(state, scheduler);\n            this.registerAllNamedSyncPoints(root);\n        }\n        return this;\n    }\n    withStateScheduling(state, planner) {\n        if (this.stateSchedulers.has(state)) {\n            throw new Error(`A scheduler was already assigned to ${state.name}!`);\n        }\n        {\n            const scheduler = new scheduler_1.Scheduler();\n            const root = scheduler.pipeline.root;\n            this.stateSchedulers.set(state, scheduler);\n            planner(root);\n            this.checkSyncPointLoop(root);\n            this.registerAllNamedSyncPoints(root);\n        }\n        return this;\n    }\n}\nexports.WorldBuilder = WorldBuilder;\n// Change alias refs for better performance\nWorldBuilder.prototype.c = WorldBuilder.prototype.withComponent;\nWorldBuilder.prototype.component = WorldBuilder.prototype.withComponent;\nWorldBuilder.prototype.components = WorldBuilder.prototype.withComponents;\nWorldBuilder.prototype.name = WorldBuilder.prototype.withName;\nWorldBuilder.prototype.r = WorldBuilder.prototype.withResource;\nWorldBuilder.prototype.resource = WorldBuilder.prototype.withResource;\n//# sourceMappingURL=world-builder.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/world/world-builder.js?");

/***/ }),

/***/ "../sim-ecs/dist/world/world-builder.spec.js":
/*!***************************************************!*\
  !*** ../sim-ecs/dist/world/world-builder.spec.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n//# sourceMappingURL=world-builder.spec.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/world/world-builder.spec.js?");

/***/ }),

/***/ "../sim-ecs/dist/world/world-builder.util.js":
/*!***************************************************!*\
  !*** ../sim-ecs/dist/world/world-builder.util.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.dataStructSerializer = exports.dataStructDeserializer = void 0;\n// todo: read the Constructor parameters in order to throw early if a field is missing\nfunction dataStructDeserializer(Constructor, data) {\n    if (typeof data != 'object') {\n        throw new Error(`Cannot default-deserialize ${Constructor.name}, because the data is of type ${typeof data}!`);\n    }\n    const obj = new Constructor();\n    for (const kv of Object.entries(data)) {\n        obj[kv[0]] = kv[1];\n    }\n    return {\n        containsRefs: false,\n        data: obj,\n        type: Constructor,\n    };\n}\nexports.dataStructDeserializer = dataStructDeserializer;\nfunction dataStructSerializer(component) {\n    return component;\n}\nexports.dataStructSerializer = dataStructSerializer;\n//# sourceMappingURL=world-builder.util.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/world/world-builder.util.js?");

/***/ }),

/***/ "../sim-ecs/dist/world/world.spec.js":
/*!*******************************************!*\
  !*** ../sim-ecs/dist/world/world.spec.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n//# sourceMappingURL=world.spec.js.map\n\n//# sourceURL=webpack://web/../sim-ecs/dist/world/world.spec.js?");

/***/ }),

/***/ "../sim-ecs/node_modules/tslib/tslib.es6.js":
/*!**************************************************!*\
  !*** ../sim-ecs/node_modules/tslib/tslib.es6.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"__assign\": () => (/* binding */ __assign),\n/* harmony export */   \"__asyncDelegator\": () => (/* binding */ __asyncDelegator),\n/* harmony export */   \"__asyncGenerator\": () => (/* binding */ __asyncGenerator),\n/* harmony export */   \"__asyncValues\": () => (/* binding */ __asyncValues),\n/* harmony export */   \"__await\": () => (/* binding */ __await),\n/* harmony export */   \"__awaiter\": () => (/* binding */ __awaiter),\n/* harmony export */   \"__classPrivateFieldGet\": () => (/* binding */ __classPrivateFieldGet),\n/* harmony export */   \"__classPrivateFieldIn\": () => (/* binding */ __classPrivateFieldIn),\n/* harmony export */   \"__classPrivateFieldSet\": () => (/* binding */ __classPrivateFieldSet),\n/* harmony export */   \"__createBinding\": () => (/* binding */ __createBinding),\n/* harmony export */   \"__decorate\": () => (/* binding */ __decorate),\n/* harmony export */   \"__esDecorate\": () => (/* binding */ __esDecorate),\n/* harmony export */   \"__exportStar\": () => (/* binding */ __exportStar),\n/* harmony export */   \"__extends\": () => (/* binding */ __extends),\n/* harmony export */   \"__generator\": () => (/* binding */ __generator),\n/* harmony export */   \"__importDefault\": () => (/* binding */ __importDefault),\n/* harmony export */   \"__importStar\": () => (/* binding */ __importStar),\n/* harmony export */   \"__makeTemplateObject\": () => (/* binding */ __makeTemplateObject),\n/* harmony export */   \"__metadata\": () => (/* binding */ __metadata),\n/* harmony export */   \"__param\": () => (/* binding */ __param),\n/* harmony export */   \"__propKey\": () => (/* binding */ __propKey),\n/* harmony export */   \"__read\": () => (/* binding */ __read),\n/* harmony export */   \"__rest\": () => (/* binding */ __rest),\n/* harmony export */   \"__runInitializers\": () => (/* binding */ __runInitializers),\n/* harmony export */   \"__setFunctionName\": () => (/* binding */ __setFunctionName),\n/* harmony export */   \"__spread\": () => (/* binding */ __spread),\n/* harmony export */   \"__spreadArray\": () => (/* binding */ __spreadArray),\n/* harmony export */   \"__spreadArrays\": () => (/* binding */ __spreadArrays),\n/* harmony export */   \"__values\": () => (/* binding */ __values)\n/* harmony export */ });\n/******************************************************************************\r\nCopyright (c) Microsoft Corporation.\r\n\r\nPermission to use, copy, modify, and/or distribute this software for any\r\npurpose with or without fee is hereby granted.\r\n\r\nTHE SOFTWARE IS PROVIDED \"AS IS\" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH\r\nREGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY\r\nAND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,\r\nINDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM\r\nLOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR\r\nOTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR\r\nPERFORMANCE OF THIS SOFTWARE.\r\n***************************************************************************** */\r\n/* global Reflect, Promise */\r\n\r\nvar extendStatics = function(d, b) {\r\n    extendStatics = Object.setPrototypeOf ||\r\n        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n    return extendStatics(d, b);\r\n};\r\n\r\nfunction __extends(d, b) {\r\n    if (typeof b !== \"function\" && b !== null)\r\n        throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n    extendStatics(d, b);\r\n    function __() { this.constructor = d; }\r\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n}\r\n\r\nvar __assign = function() {\r\n    __assign = Object.assign || function __assign(t) {\r\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n            s = arguments[i];\r\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];\r\n        }\r\n        return t;\r\n    }\r\n    return __assign.apply(this, arguments);\r\n}\r\n\r\nfunction __rest(s, e) {\r\n    var t = {};\r\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\r\n        t[p] = s[p];\r\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\r\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\r\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\r\n                t[p[i]] = s[p[i]];\r\n        }\r\n    return t;\r\n}\r\n\r\nfunction __decorate(decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n}\r\n\r\nfunction __param(paramIndex, decorator) {\r\n    return function (target, key) { decorator(target, key, paramIndex); }\r\n}\r\n\r\nfunction __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {\r\n    function accept(f) { if (f !== void 0 && typeof f !== \"function\") throw new TypeError(\"Function expected\"); return f; }\r\n    var kind = contextIn.kind, key = kind === \"getter\" ? \"get\" : kind === \"setter\" ? \"set\" : \"value\";\r\n    var target = !descriptorIn && ctor ? contextIn[\"static\"] ? ctor : ctor.prototype : null;\r\n    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});\r\n    var _, done = false;\r\n    for (var i = decorators.length - 1; i >= 0; i--) {\r\n        var context = {};\r\n        for (var p in contextIn) context[p] = p === \"access\" ? {} : contextIn[p];\r\n        for (var p in contextIn.access) context.access[p] = contextIn.access[p];\r\n        context.addInitializer = function (f) { if (done) throw new TypeError(\"Cannot add initializers after decoration has completed\"); extraInitializers.push(accept(f || null)); };\r\n        var result = (0, decorators[i])(kind === \"accessor\" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);\r\n        if (kind === \"accessor\") {\r\n            if (result === void 0) continue;\r\n            if (result === null || typeof result !== \"object\") throw new TypeError(\"Object expected\");\r\n            if (_ = accept(result.get)) descriptor.get = _;\r\n            if (_ = accept(result.set)) descriptor.set = _;\r\n            if (_ = accept(result.init)) initializers.push(_);\r\n        }\r\n        else if (_ = accept(result)) {\r\n            if (kind === \"field\") initializers.push(_);\r\n            else descriptor[key] = _;\r\n        }\r\n    }\r\n    if (target) Object.defineProperty(target, contextIn.name, descriptor);\r\n    done = true;\r\n};\r\n\r\nfunction __runInitializers(thisArg, initializers, value) {\r\n    var useValue = arguments.length > 2;\r\n    for (var i = 0; i < initializers.length; i++) {\r\n        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);\r\n    }\r\n    return useValue ? value : void 0;\r\n};\r\n\r\nfunction __propKey(x) {\r\n    return typeof x === \"symbol\" ? x : \"\".concat(x);\r\n};\r\n\r\nfunction __setFunctionName(f, name, prefix) {\r\n    if (typeof name === \"symbol\") name = name.description ? \"[\".concat(name.description, \"]\") : \"\";\r\n    return Object.defineProperty(f, \"name\", { configurable: true, value: prefix ? \"\".concat(prefix, \" \", name) : name });\r\n};\r\n\r\nfunction __metadata(metadataKey, metadataValue) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(metadataKey, metadataValue);\r\n}\r\n\r\nfunction __awaiter(thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n}\r\n\r\nfunction __generator(thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (g && (g = 0, op[0] && (_ = 0)), _) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n}\r\n\r\nvar __createBinding = Object.create ? (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    var desc = Object.getOwnPropertyDescriptor(m, k);\r\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\r\n        desc = { enumerable: true, get: function() { return m[k]; } };\r\n    }\r\n    Object.defineProperty(o, k2, desc);\r\n}) : (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    o[k2] = m[k];\r\n});\r\n\r\nfunction __exportStar(m, o) {\r\n    for (var p in m) if (p !== \"default\" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);\r\n}\r\n\r\nfunction __values(o) {\r\n    var s = typeof Symbol === \"function\" && Symbol.iterator, m = s && o[s], i = 0;\r\n    if (m) return m.call(o);\r\n    if (o && typeof o.length === \"number\") return {\r\n        next: function () {\r\n            if (o && i >= o.length) o = void 0;\r\n            return { value: o && o[i++], done: !o };\r\n        }\r\n    };\r\n    throw new TypeError(s ? \"Object is not iterable.\" : \"Symbol.iterator is not defined.\");\r\n}\r\n\r\nfunction __read(o, n) {\r\n    var m = typeof Symbol === \"function\" && o[Symbol.iterator];\r\n    if (!m) return o;\r\n    var i = m.call(o), r, ar = [], e;\r\n    try {\r\n        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);\r\n    }\r\n    catch (error) { e = { error: error }; }\r\n    finally {\r\n        try {\r\n            if (r && !r.done && (m = i[\"return\"])) m.call(i);\r\n        }\r\n        finally { if (e) throw e.error; }\r\n    }\r\n    return ar;\r\n}\r\n\r\n/** @deprecated */\r\nfunction __spread() {\r\n    for (var ar = [], i = 0; i < arguments.length; i++)\r\n        ar = ar.concat(__read(arguments[i]));\r\n    return ar;\r\n}\r\n\r\n/** @deprecated */\r\nfunction __spreadArrays() {\r\n    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;\r\n    for (var r = Array(s), k = 0, i = 0; i < il; i++)\r\n        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)\r\n            r[k] = a[j];\r\n    return r;\r\n}\r\n\r\nfunction __spreadArray(to, from, pack) {\r\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\r\n        if (ar || !(i in from)) {\r\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\r\n            ar[i] = from[i];\r\n        }\r\n    }\r\n    return to.concat(ar || Array.prototype.slice.call(from));\r\n}\r\n\r\nfunction __await(v) {\r\n    return this instanceof __await ? (this.v = v, this) : new __await(v);\r\n}\r\n\r\nfunction __asyncGenerator(thisArg, _arguments, generator) {\r\n    if (!Symbol.asyncIterator) throw new TypeError(\"Symbol.asyncIterator is not defined.\");\r\n    var g = generator.apply(thisArg, _arguments || []), i, q = [];\r\n    return i = {}, verb(\"next\"), verb(\"throw\"), verb(\"return\"), i[Symbol.asyncIterator] = function () { return this; }, i;\r\n    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }\r\n    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }\r\n    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }\r\n    function fulfill(value) { resume(\"next\", value); }\r\n    function reject(value) { resume(\"throw\", value); }\r\n    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }\r\n}\r\n\r\nfunction __asyncDelegator(o) {\r\n    var i, p;\r\n    return i = {}, verb(\"next\"), verb(\"throw\", function (e) { throw e; }), verb(\"return\"), i[Symbol.iterator] = function () { return this; }, i;\r\n    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }\r\n}\r\n\r\nfunction __asyncValues(o) {\r\n    if (!Symbol.asyncIterator) throw new TypeError(\"Symbol.asyncIterator is not defined.\");\r\n    var m = o[Symbol.asyncIterator], i;\r\n    return m ? m.call(o) : (o = typeof __values === \"function\" ? __values(o) : o[Symbol.iterator](), i = {}, verb(\"next\"), verb(\"throw\"), verb(\"return\"), i[Symbol.asyncIterator] = function () { return this; }, i);\r\n    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }\r\n    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }\r\n}\r\n\r\nfunction __makeTemplateObject(cooked, raw) {\r\n    if (Object.defineProperty) { Object.defineProperty(cooked, \"raw\", { value: raw }); } else { cooked.raw = raw; }\r\n    return cooked;\r\n};\r\n\r\nvar __setModuleDefault = Object.create ? (function(o, v) {\r\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\r\n}) : function(o, v) {\r\n    o[\"default\"] = v;\r\n};\r\n\r\nfunction __importStar(mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\r\n    __setModuleDefault(result, mod);\r\n    return result;\r\n}\r\n\r\nfunction __importDefault(mod) {\r\n    return (mod && mod.__esModule) ? mod : { default: mod };\r\n}\r\n\r\nfunction __classPrivateFieldGet(receiver, state, kind, f) {\r\n    if (kind === \"a\" && !f) throw new TypeError(\"Private accessor was defined without a getter\");\r\n    if (typeof state === \"function\" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError(\"Cannot read private member from an object whose class did not declare it\");\r\n    return kind === \"m\" ? f : kind === \"a\" ? f.call(receiver) : f ? f.value : state.get(receiver);\r\n}\r\n\r\nfunction __classPrivateFieldSet(receiver, state, value, kind, f) {\r\n    if (kind === \"m\") throw new TypeError(\"Private method is not writable\");\r\n    if (kind === \"a\" && !f) throw new TypeError(\"Private accessor was defined without a setter\");\r\n    if (typeof state === \"function\" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError(\"Cannot write private member to an object whose class did not declare it\");\r\n    return (kind === \"a\" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;\r\n}\r\n\r\nfunction __classPrivateFieldIn(state, receiver) {\r\n    if (receiver === null || (typeof receiver !== \"object\" && typeof receiver !== \"function\")) throw new TypeError(\"Cannot use 'in' operator on non-object\");\r\n    return typeof state === \"function\" ? receiver === state : state.has(receiver);\r\n}\r\n\n\n//# sourceURL=webpack://web/../sim-ecs/node_modules/tslib/tslib.es6.js?");

/***/ }),

/***/ "./node_modules/ansi-html-community/index.js":
/*!***************************************************!*\
  !*** ./node_modules/ansi-html-community/index.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = ansiHTML\n\n// Reference to https://github.com/sindresorhus/ansi-regex\nvar _regANSI = /(?:(?:\\u001b\\[)|\\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\\u001b[A-M]/\n\nvar _defColors = {\n  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]\n  black: '000',\n  red: 'ff0000',\n  green: '209805',\n  yellow: 'e8bf03',\n  blue: '0000ff',\n  magenta: 'ff00ff',\n  cyan: '00ffee',\n  lightgrey: 'f0f0f0',\n  darkgrey: '888'\n}\nvar _styles = {\n  30: 'black',\n  31: 'red',\n  32: 'green',\n  33: 'yellow',\n  34: 'blue',\n  35: 'magenta',\n  36: 'cyan',\n  37: 'lightgrey'\n}\nvar _openTags = {\n  '1': 'font-weight:bold', // bold\n  '2': 'opacity:0.5', // dim\n  '3': '<i>', // italic\n  '4': '<u>', // underscore\n  '8': 'display:none', // hidden\n  '9': '<del>' // delete\n}\nvar _closeTags = {\n  '23': '</i>', // reset italic\n  '24': '</u>', // reset underscore\n  '29': '</del>' // reset delete\n}\n\n;[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {\n  _closeTags[n] = '</span>'\n})\n\n/**\n * Converts text with ANSI color codes to HTML markup.\n * @param {String} text\n * @returns {*}\n */\nfunction ansiHTML (text) {\n  // Returns the text if the string has no ANSI escape code.\n  if (!_regANSI.test(text)) {\n    return text\n  }\n\n  // Cache opened sequence.\n  var ansiCodes = []\n  // Replace with markup.\n  var ret = text.replace(/\\033\\[(\\d+)m/g, function (match, seq) {\n    var ot = _openTags[seq]\n    if (ot) {\n      // If current sequence has been opened, close it.\n      if (!!~ansiCodes.indexOf(seq)) { // eslint-disable-line no-extra-boolean-cast\n        ansiCodes.pop()\n        return '</span>'\n      }\n      // Open tag.\n      ansiCodes.push(seq)\n      return ot[0] === '<' ? ot : '<span style=\"' + ot + ';\">'\n    }\n\n    var ct = _closeTags[seq]\n    if (ct) {\n      // Pop sequence\n      ansiCodes.pop()\n      return ct\n    }\n    return ''\n  })\n\n  // Make sure tags are closed.\n  var l = ansiCodes.length\n  ;(l > 0) && (ret += Array(l + 1).join('</span>'))\n\n  return ret\n}\n\n/**\n * Customize colors.\n * @param {Object} colors reference to _defColors\n */\nansiHTML.setColors = function (colors) {\n  if (typeof colors !== 'object') {\n    throw new Error('`colors` parameter must be an Object.')\n  }\n\n  var _finalColors = {}\n  for (var key in _defColors) {\n    var hex = colors.hasOwnProperty(key) ? colors[key] : null\n    if (!hex) {\n      _finalColors[key] = _defColors[key]\n      continue\n    }\n    if ('reset' === key) {\n      if (typeof hex === 'string') {\n        hex = [hex]\n      }\n      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {\n        return typeof h !== 'string'\n      })) {\n        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000')\n      }\n      var defHexColor = _defColors[key]\n      if (!hex[0]) {\n        hex[0] = defHexColor[0]\n      }\n      if (hex.length === 1 || !hex[1]) {\n        hex = [hex[0]]\n        hex.push(defHexColor[1])\n      }\n\n      hex = hex.slice(0, 2)\n    } else if (typeof hex !== 'string') {\n      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000')\n    }\n    _finalColors[key] = hex\n  }\n  _setTags(_finalColors)\n}\n\n/**\n * Reset colors.\n */\nansiHTML.reset = function () {\n  _setTags(_defColors)\n}\n\n/**\n * Expose tags, including open and close.\n * @type {Object}\n */\nansiHTML.tags = {}\n\nif (Object.defineProperty) {\n  Object.defineProperty(ansiHTML.tags, 'open', {\n    get: function () { return _openTags }\n  })\n  Object.defineProperty(ansiHTML.tags, 'close', {\n    get: function () { return _closeTags }\n  })\n} else {\n  ansiHTML.tags.open = _openTags\n  ansiHTML.tags.close = _closeTags\n}\n\nfunction _setTags (colors) {\n  // reset all\n  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]\n  // inverse\n  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]\n  // dark grey\n  _openTags['90'] = 'color:#' + colors.darkgrey\n\n  for (var code in _styles) {\n    var color = _styles[code]\n    var oriColor = colors[color] || '000'\n    _openTags[code] = 'color:#' + oriColor\n    code = parseInt(code)\n    _openTags[(code + 10).toString()] = 'background:#' + oriColor\n  }\n}\n\nansiHTML.reset()\n\n\n//# sourceURL=webpack://web/./node_modules/ansi-html-community/index.js?");

/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";
eval("// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n\n\nvar R = typeof Reflect === 'object' ? Reflect : null\nvar ReflectApply = R && typeof R.apply === 'function'\n  ? R.apply\n  : function ReflectApply(target, receiver, args) {\n    return Function.prototype.apply.call(target, receiver, args);\n  }\n\nvar ReflectOwnKeys\nif (R && typeof R.ownKeys === 'function') {\n  ReflectOwnKeys = R.ownKeys\n} else if (Object.getOwnPropertySymbols) {\n  ReflectOwnKeys = function ReflectOwnKeys(target) {\n    return Object.getOwnPropertyNames(target)\n      .concat(Object.getOwnPropertySymbols(target));\n  };\n} else {\n  ReflectOwnKeys = function ReflectOwnKeys(target) {\n    return Object.getOwnPropertyNames(target);\n  };\n}\n\nfunction ProcessEmitWarning(warning) {\n  if (console && console.warn) console.warn(warning);\n}\n\nvar NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {\n  return value !== value;\n}\n\nfunction EventEmitter() {\n  EventEmitter.init.call(this);\n}\nmodule.exports = EventEmitter;\nmodule.exports.once = once;\n\n// Backwards-compat with node 0.10.x\nEventEmitter.EventEmitter = EventEmitter;\n\nEventEmitter.prototype._events = undefined;\nEventEmitter.prototype._eventsCount = 0;\nEventEmitter.prototype._maxListeners = undefined;\n\n// By default EventEmitters will print a warning if more than 10 listeners are\n// added to it. This is a useful default which helps finding memory leaks.\nvar defaultMaxListeners = 10;\n\nfunction checkListener(listener) {\n  if (typeof listener !== 'function') {\n    throw new TypeError('The \"listener\" argument must be of type Function. Received type ' + typeof listener);\n  }\n}\n\nObject.defineProperty(EventEmitter, 'defaultMaxListeners', {\n  enumerable: true,\n  get: function() {\n    return defaultMaxListeners;\n  },\n  set: function(arg) {\n    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {\n      throw new RangeError('The value of \"defaultMaxListeners\" is out of range. It must be a non-negative number. Received ' + arg + '.');\n    }\n    defaultMaxListeners = arg;\n  }\n});\n\nEventEmitter.init = function() {\n\n  if (this._events === undefined ||\n      this._events === Object.getPrototypeOf(this)._events) {\n    this._events = Object.create(null);\n    this._eventsCount = 0;\n  }\n\n  this._maxListeners = this._maxListeners || undefined;\n};\n\n// Obviously not all Emitters should be limited to 10. This function allows\n// that to be increased. Set to zero for unlimited.\nEventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {\n  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {\n    throw new RangeError('The value of \"n\" is out of range. It must be a non-negative number. Received ' + n + '.');\n  }\n  this._maxListeners = n;\n  return this;\n};\n\nfunction _getMaxListeners(that) {\n  if (that._maxListeners === undefined)\n    return EventEmitter.defaultMaxListeners;\n  return that._maxListeners;\n}\n\nEventEmitter.prototype.getMaxListeners = function getMaxListeners() {\n  return _getMaxListeners(this);\n};\n\nEventEmitter.prototype.emit = function emit(type) {\n  var args = [];\n  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);\n  var doError = (type === 'error');\n\n  var events = this._events;\n  if (events !== undefined)\n    doError = (doError && events.error === undefined);\n  else if (!doError)\n    return false;\n\n  // If there is no 'error' event listener then throw.\n  if (doError) {\n    var er;\n    if (args.length > 0)\n      er = args[0];\n    if (er instanceof Error) {\n      // Note: The comments on the `throw` lines are intentional, they show\n      // up in Node's output if this results in an unhandled exception.\n      throw er; // Unhandled 'error' event\n    }\n    // At least give some kind of context to the user\n    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));\n    err.context = er;\n    throw err; // Unhandled 'error' event\n  }\n\n  var handler = events[type];\n\n  if (handler === undefined)\n    return false;\n\n  if (typeof handler === 'function') {\n    ReflectApply(handler, this, args);\n  } else {\n    var len = handler.length;\n    var listeners = arrayClone(handler, len);\n    for (var i = 0; i < len; ++i)\n      ReflectApply(listeners[i], this, args);\n  }\n\n  return true;\n};\n\nfunction _addListener(target, type, listener, prepend) {\n  var m;\n  var events;\n  var existing;\n\n  checkListener(listener);\n\n  events = target._events;\n  if (events === undefined) {\n    events = target._events = Object.create(null);\n    target._eventsCount = 0;\n  } else {\n    // To avoid recursion in the case that type === \"newListener\"! Before\n    // adding it to the listeners, first emit \"newListener\".\n    if (events.newListener !== undefined) {\n      target.emit('newListener', type,\n                  listener.listener ? listener.listener : listener);\n\n      // Re-assign `events` because a newListener handler could have caused the\n      // this._events to be assigned to a new object\n      events = target._events;\n    }\n    existing = events[type];\n  }\n\n  if (existing === undefined) {\n    // Optimize the case of one listener. Don't need the extra array object.\n    existing = events[type] = listener;\n    ++target._eventsCount;\n  } else {\n    if (typeof existing === 'function') {\n      // Adding the second element, need to change to array.\n      existing = events[type] =\n        prepend ? [listener, existing] : [existing, listener];\n      // If we've already got an array, just append.\n    } else if (prepend) {\n      existing.unshift(listener);\n    } else {\n      existing.push(listener);\n    }\n\n    // Check for listener leak\n    m = _getMaxListeners(target);\n    if (m > 0 && existing.length > m && !existing.warned) {\n      existing.warned = true;\n      // No error code for this since it is a Warning\n      // eslint-disable-next-line no-restricted-syntax\n      var w = new Error('Possible EventEmitter memory leak detected. ' +\n                          existing.length + ' ' + String(type) + ' listeners ' +\n                          'added. Use emitter.setMaxListeners() to ' +\n                          'increase limit');\n      w.name = 'MaxListenersExceededWarning';\n      w.emitter = target;\n      w.type = type;\n      w.count = existing.length;\n      ProcessEmitWarning(w);\n    }\n  }\n\n  return target;\n}\n\nEventEmitter.prototype.addListener = function addListener(type, listener) {\n  return _addListener(this, type, listener, false);\n};\n\nEventEmitter.prototype.on = EventEmitter.prototype.addListener;\n\nEventEmitter.prototype.prependListener =\n    function prependListener(type, listener) {\n      return _addListener(this, type, listener, true);\n    };\n\nfunction onceWrapper() {\n  if (!this.fired) {\n    this.target.removeListener(this.type, this.wrapFn);\n    this.fired = true;\n    if (arguments.length === 0)\n      return this.listener.call(this.target);\n    return this.listener.apply(this.target, arguments);\n  }\n}\n\nfunction _onceWrap(target, type, listener) {\n  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };\n  var wrapped = onceWrapper.bind(state);\n  wrapped.listener = listener;\n  state.wrapFn = wrapped;\n  return wrapped;\n}\n\nEventEmitter.prototype.once = function once(type, listener) {\n  checkListener(listener);\n  this.on(type, _onceWrap(this, type, listener));\n  return this;\n};\n\nEventEmitter.prototype.prependOnceListener =\n    function prependOnceListener(type, listener) {\n      checkListener(listener);\n      this.prependListener(type, _onceWrap(this, type, listener));\n      return this;\n    };\n\n// Emits a 'removeListener' event if and only if the listener was removed.\nEventEmitter.prototype.removeListener =\n    function removeListener(type, listener) {\n      var list, events, position, i, originalListener;\n\n      checkListener(listener);\n\n      events = this._events;\n      if (events === undefined)\n        return this;\n\n      list = events[type];\n      if (list === undefined)\n        return this;\n\n      if (list === listener || list.listener === listener) {\n        if (--this._eventsCount === 0)\n          this._events = Object.create(null);\n        else {\n          delete events[type];\n          if (events.removeListener)\n            this.emit('removeListener', type, list.listener || listener);\n        }\n      } else if (typeof list !== 'function') {\n        position = -1;\n\n        for (i = list.length - 1; i >= 0; i--) {\n          if (list[i] === listener || list[i].listener === listener) {\n            originalListener = list[i].listener;\n            position = i;\n            break;\n          }\n        }\n\n        if (position < 0)\n          return this;\n\n        if (position === 0)\n          list.shift();\n        else {\n          spliceOne(list, position);\n        }\n\n        if (list.length === 1)\n          events[type] = list[0];\n\n        if (events.removeListener !== undefined)\n          this.emit('removeListener', type, originalListener || listener);\n      }\n\n      return this;\n    };\n\nEventEmitter.prototype.off = EventEmitter.prototype.removeListener;\n\nEventEmitter.prototype.removeAllListeners =\n    function removeAllListeners(type) {\n      var listeners, events, i;\n\n      events = this._events;\n      if (events === undefined)\n        return this;\n\n      // not listening for removeListener, no need to emit\n      if (events.removeListener === undefined) {\n        if (arguments.length === 0) {\n          this._events = Object.create(null);\n          this._eventsCount = 0;\n        } else if (events[type] !== undefined) {\n          if (--this._eventsCount === 0)\n            this._events = Object.create(null);\n          else\n            delete events[type];\n        }\n        return this;\n      }\n\n      // emit removeListener for all listeners on all events\n      if (arguments.length === 0) {\n        var keys = Object.keys(events);\n        var key;\n        for (i = 0; i < keys.length; ++i) {\n          key = keys[i];\n          if (key === 'removeListener') continue;\n          this.removeAllListeners(key);\n        }\n        this.removeAllListeners('removeListener');\n        this._events = Object.create(null);\n        this._eventsCount = 0;\n        return this;\n      }\n\n      listeners = events[type];\n\n      if (typeof listeners === 'function') {\n        this.removeListener(type, listeners);\n      } else if (listeners !== undefined) {\n        // LIFO order\n        for (i = listeners.length - 1; i >= 0; i--) {\n          this.removeListener(type, listeners[i]);\n        }\n      }\n\n      return this;\n    };\n\nfunction _listeners(target, type, unwrap) {\n  var events = target._events;\n\n  if (events === undefined)\n    return [];\n\n  var evlistener = events[type];\n  if (evlistener === undefined)\n    return [];\n\n  if (typeof evlistener === 'function')\n    return unwrap ? [evlistener.listener || evlistener] : [evlistener];\n\n  return unwrap ?\n    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);\n}\n\nEventEmitter.prototype.listeners = function listeners(type) {\n  return _listeners(this, type, true);\n};\n\nEventEmitter.prototype.rawListeners = function rawListeners(type) {\n  return _listeners(this, type, false);\n};\n\nEventEmitter.listenerCount = function(emitter, type) {\n  if (typeof emitter.listenerCount === 'function') {\n    return emitter.listenerCount(type);\n  } else {\n    return listenerCount.call(emitter, type);\n  }\n};\n\nEventEmitter.prototype.listenerCount = listenerCount;\nfunction listenerCount(type) {\n  var events = this._events;\n\n  if (events !== undefined) {\n    var evlistener = events[type];\n\n    if (typeof evlistener === 'function') {\n      return 1;\n    } else if (evlistener !== undefined) {\n      return evlistener.length;\n    }\n  }\n\n  return 0;\n}\n\nEventEmitter.prototype.eventNames = function eventNames() {\n  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];\n};\n\nfunction arrayClone(arr, n) {\n  var copy = new Array(n);\n  for (var i = 0; i < n; ++i)\n    copy[i] = arr[i];\n  return copy;\n}\n\nfunction spliceOne(list, index) {\n  for (; index + 1 < list.length; index++)\n    list[index] = list[index + 1];\n  list.pop();\n}\n\nfunction unwrapListeners(arr) {\n  var ret = new Array(arr.length);\n  for (var i = 0; i < ret.length; ++i) {\n    ret[i] = arr[i].listener || arr[i];\n  }\n  return ret;\n}\n\nfunction once(emitter, name) {\n  return new Promise(function (resolve, reject) {\n    function errorListener(err) {\n      emitter.removeListener(name, resolver);\n      reject(err);\n    }\n\n    function resolver() {\n      if (typeof emitter.removeListener === 'function') {\n        emitter.removeListener('error', errorListener);\n      }\n      resolve([].slice.call(arguments));\n    };\n\n    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });\n    if (name !== 'error') {\n      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });\n    }\n  });\n}\n\nfunction addErrorHandlerIfEventEmitter(emitter, handler, flags) {\n  if (typeof emitter.on === 'function') {\n    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);\n  }\n}\n\nfunction eventTargetAgnosticAddListener(emitter, name, listener, flags) {\n  if (typeof emitter.on === 'function') {\n    if (flags.once) {\n      emitter.once(name, listener);\n    } else {\n      emitter.on(name, listener);\n    }\n  } else if (typeof emitter.addEventListener === 'function') {\n    // EventTarget does not have `error` event semantics like Node\n    // EventEmitters, we do not listen for `error` events here.\n    emitter.addEventListener(name, function wrapListener(arg) {\n      // IE does not have builtin `{ once: true }` support so we\n      // have to do it manually.\n      if (flags.once) {\n        emitter.removeEventListener(name, wrapListener);\n      }\n      listener(arg);\n    });\n  } else {\n    throw new TypeError('The \"emitter\" argument must be of type EventEmitter. Received type ' + typeof emitter);\n  }\n}\n\n\n//# sourceURL=webpack://web/./node_modules/events/events.js?");

/***/ }),

/***/ "./node_modules/html-entities/lib/index.js":
/*!*************************************************!*\
  !*** ./node_modules/html-entities/lib/index.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar named_references_1 = __webpack_require__(/*! ./named-references */ \"./node_modules/html-entities/lib/named-references.js\");\nvar numeric_unicode_map_1 = __webpack_require__(/*! ./numeric-unicode-map */ \"./node_modules/html-entities/lib/numeric-unicode-map.js\");\nvar surrogate_pairs_1 = __webpack_require__(/*! ./surrogate-pairs */ \"./node_modules/html-entities/lib/surrogate-pairs.js\");\nvar allNamedReferences = __assign(__assign({}, named_references_1.namedReferences), { all: named_references_1.namedReferences.html5 });\nvar encodeRegExps = {\n    specialChars: /[<>'\"&]/g,\n    nonAscii: /(?:[<>'\"&\\u0080-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])/g,\n    nonAsciiPrintable: /(?:[<>'\"&\\x01-\\x08\\x11-\\x15\\x17-\\x1F\\x7f-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])/g,\n    extensive: /(?:[\\x01-\\x0c\\x0e-\\x1f\\x21-\\x2c\\x2e-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\x7d\\x7f-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])/g\n};\nvar defaultEncodeOptions = {\n    mode: 'specialChars',\n    level: 'all',\n    numeric: 'decimal'\n};\n/** Encodes all the necessary (specified by `level`) characters in the text */\nfunction encode(text, _a) {\n    var _b = _a === void 0 ? defaultEncodeOptions : _a, _c = _b.mode, mode = _c === void 0 ? 'specialChars' : _c, _d = _b.numeric, numeric = _d === void 0 ? 'decimal' : _d, _e = _b.level, level = _e === void 0 ? 'all' : _e;\n    if (!text) {\n        return '';\n    }\n    var encodeRegExp = encodeRegExps[mode];\n    var references = allNamedReferences[level].characters;\n    var isHex = numeric === 'hexadecimal';\n    encodeRegExp.lastIndex = 0;\n    var _b = encodeRegExp.exec(text);\n    var _c;\n    if (_b) {\n        _c = '';\n        var _d = 0;\n        do {\n            if (_d !== _b.index) {\n                _c += text.substring(_d, _b.index);\n            }\n            var _e = _b[0];\n            var result_1 = references[_e];\n            if (!result_1) {\n                var code_1 = _e.length > 1 ? surrogate_pairs_1.getCodePoint(_e, 0) : _e.charCodeAt(0);\n                result_1 = (isHex ? '&#x' + code_1.toString(16) : '&#' + code_1) + ';';\n            }\n            _c += result_1;\n            _d = _b.index + _e.length;\n        } while ((_b = encodeRegExp.exec(text)));\n        if (_d !== text.length) {\n            _c += text.substring(_d);\n        }\n    }\n    else {\n        _c =\n            text;\n    }\n    return _c;\n}\nexports.encode = encode;\nvar defaultDecodeOptions = {\n    scope: 'body',\n    level: 'all'\n};\nvar strict = /&(?:#\\d+|#[xX][\\da-fA-F]+|[0-9a-zA-Z]+);/g;\nvar attribute = /&(?:#\\d+|#[xX][\\da-fA-F]+|[0-9a-zA-Z]+)[;=]?/g;\nvar baseDecodeRegExps = {\n    xml: {\n        strict: strict,\n        attribute: attribute,\n        body: named_references_1.bodyRegExps.xml\n    },\n    html4: {\n        strict: strict,\n        attribute: attribute,\n        body: named_references_1.bodyRegExps.html4\n    },\n    html5: {\n        strict: strict,\n        attribute: attribute,\n        body: named_references_1.bodyRegExps.html5\n    }\n};\nvar decodeRegExps = __assign(__assign({}, baseDecodeRegExps), { all: baseDecodeRegExps.html5 });\nvar fromCharCode = String.fromCharCode;\nvar outOfBoundsChar = fromCharCode(65533);\nvar defaultDecodeEntityOptions = {\n    level: 'all'\n};\n/** Decodes a single entity */\nfunction decodeEntity(entity, _a) {\n    var _b = (_a === void 0 ? defaultDecodeEntityOptions : _a).level, level = _b === void 0 ? 'all' : _b;\n    if (!entity) {\n        return '';\n    }\n    var _b = entity;\n    var decodeEntityLastChar_1 = entity[entity.length - 1];\n    if (false) {}\n    else if (false) {}\n    else {\n        var decodeResultByReference_1 = allNamedReferences[level].entities[entity];\n        if (decodeResultByReference_1) {\n            _b = decodeResultByReference_1;\n        }\n        else if (entity[0] === '&' && entity[1] === '#') {\n            var decodeSecondChar_1 = entity[2];\n            var decodeCode_1 = decodeSecondChar_1 == 'x' || decodeSecondChar_1 == 'X'\n                ? parseInt(entity.substr(3), 16)\n                : parseInt(entity.substr(2));\n            _b =\n                decodeCode_1 >= 0x10ffff\n                    ? outOfBoundsChar\n                    : decodeCode_1 > 65535\n                        ? surrogate_pairs_1.fromCodePoint(decodeCode_1)\n                        : fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode_1] || decodeCode_1);\n        }\n    }\n    return _b;\n}\nexports.decodeEntity = decodeEntity;\n/** Decodes all entities in the text */\nfunction decode(text, _a) {\n    var decodeSecondChar_1 = _a === void 0 ? defaultDecodeOptions : _a, decodeCode_1 = decodeSecondChar_1.level, level = decodeCode_1 === void 0 ? 'all' : decodeCode_1, _b = decodeSecondChar_1.scope, scope = _b === void 0 ? level === 'xml' ? 'strict' : 'body' : _b;\n    if (!text) {\n        return '';\n    }\n    var decodeRegExp = decodeRegExps[level][scope];\n    var references = allNamedReferences[level].entities;\n    var isAttribute = scope === 'attribute';\n    var isStrict = scope === 'strict';\n    decodeRegExp.lastIndex = 0;\n    var replaceMatch_1 = decodeRegExp.exec(text);\n    var replaceResult_1;\n    if (replaceMatch_1) {\n        replaceResult_1 = '';\n        var replaceLastIndex_1 = 0;\n        do {\n            if (replaceLastIndex_1 !== replaceMatch_1.index) {\n                replaceResult_1 += text.substring(replaceLastIndex_1, replaceMatch_1.index);\n            }\n            var replaceInput_1 = replaceMatch_1[0];\n            var decodeResult_1 = replaceInput_1;\n            var decodeEntityLastChar_2 = replaceInput_1[replaceInput_1.length - 1];\n            if (isAttribute\n                && decodeEntityLastChar_2 === '=') {\n                decodeResult_1 = replaceInput_1;\n            }\n            else if (isStrict\n                && decodeEntityLastChar_2 !== ';') {\n                decodeResult_1 = replaceInput_1;\n            }\n            else {\n                var decodeResultByReference_2 = references[replaceInput_1];\n                if (decodeResultByReference_2) {\n                    decodeResult_1 = decodeResultByReference_2;\n                }\n                else if (replaceInput_1[0] === '&' && replaceInput_1[1] === '#') {\n                    var decodeSecondChar_2 = replaceInput_1[2];\n                    var decodeCode_2 = decodeSecondChar_2 == 'x' || decodeSecondChar_2 == 'X'\n                        ? parseInt(replaceInput_1.substr(3), 16)\n                        : parseInt(replaceInput_1.substr(2));\n                    decodeResult_1 =\n                        decodeCode_2 >= 0x10ffff\n                            ? outOfBoundsChar\n                            : decodeCode_2 > 65535\n                                ? surrogate_pairs_1.fromCodePoint(decodeCode_2)\n                                : fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode_2] || decodeCode_2);\n                }\n            }\n            replaceResult_1 += decodeResult_1;\n            replaceLastIndex_1 = replaceMatch_1.index + replaceInput_1.length;\n        } while ((replaceMatch_1 = decodeRegExp.exec(text)));\n        if (replaceLastIndex_1 !== text.length) {\n            replaceResult_1 += text.substring(replaceLastIndex_1);\n        }\n    }\n    else {\n        replaceResult_1 =\n            text;\n    }\n    return replaceResult_1;\n}\nexports.decode = decode;\n\n\n//# sourceURL=webpack://web/./node_modules/html-entities/lib/index.js?");

/***/ }),

/***/ "./node_modules/html-entities/lib/named-references.js":
/*!************************************************************!*\
  !*** ./node_modules/html-entities/lib/named-references.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", ({value:true}));exports.bodyRegExps={xml:/&(?:#\\d+|#[xX][\\da-fA-F]+|[0-9a-zA-Z]+);?/g,html4:/&(?:nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|ucirc|uuml|yacute|thorn|yuml|quot|amp|lt|gt|#\\d+|#[xX][\\da-fA-F]+|[0-9a-zA-Z]+);?/g,html5:/&(?:AElig|AMP|Aacute|Acirc|Agrave|Aring|Atilde|Auml|COPY|Ccedil|ETH|Eacute|Ecirc|Egrave|Euml|GT|Iacute|Icirc|Igrave|Iuml|LT|Ntilde|Oacute|Ocirc|Ograve|Oslash|Otilde|Ouml|QUOT|REG|THORN|Uacute|Ucirc|Ugrave|Uuml|Yacute|aacute|acirc|acute|aelig|agrave|amp|aring|atilde|auml|brvbar|ccedil|cedil|cent|copy|curren|deg|divide|eacute|ecirc|egrave|eth|euml|frac12|frac14|frac34|gt|iacute|icirc|iexcl|igrave|iquest|iuml|laquo|lt|macr|micro|middot|nbsp|not|ntilde|oacute|ocirc|ograve|ordf|ordm|oslash|otilde|ouml|para|plusmn|pound|quot|raquo|reg|sect|shy|sup1|sup2|sup3|szlig|thorn|times|uacute|ucirc|ugrave|uml|uuml|yacute|yen|yuml|#\\d+|#[xX][\\da-fA-F]+|[0-9a-zA-Z]+);?/g};exports.namedReferences={xml:{entities:{\"&lt;\":\"<\",\"&gt;\":\">\",\"&quot;\":'\"',\"&apos;\":\"'\",\"&amp;\":\"&\"},characters:{\"<\":\"&lt;\",\">\":\"&gt;\",'\"':\"&quot;\",\"'\":\"&apos;\",\"&\":\"&amp;\"}},html4:{entities:{\"&apos;\":\"'\",\"&nbsp\":\" \",\"&nbsp;\":\" \",\"&iexcl\":\"¡\",\"&iexcl;\":\"¡\",\"&cent\":\"¢\",\"&cent;\":\"¢\",\"&pound\":\"£\",\"&pound;\":\"£\",\"&curren\":\"¤\",\"&curren;\":\"¤\",\"&yen\":\"¥\",\"&yen;\":\"¥\",\"&brvbar\":\"¦\",\"&brvbar;\":\"¦\",\"&sect\":\"§\",\"&sect;\":\"§\",\"&uml\":\"¨\",\"&uml;\":\"¨\",\"&copy\":\"©\",\"&copy;\":\"©\",\"&ordf\":\"ª\",\"&ordf;\":\"ª\",\"&laquo\":\"«\",\"&laquo;\":\"«\",\"&not\":\"¬\",\"&not;\":\"¬\",\"&shy\":\"­\",\"&shy;\":\"­\",\"&reg\":\"®\",\"&reg;\":\"®\",\"&macr\":\"¯\",\"&macr;\":\"¯\",\"&deg\":\"°\",\"&deg;\":\"°\",\"&plusmn\":\"±\",\"&plusmn;\":\"±\",\"&sup2\":\"²\",\"&sup2;\":\"²\",\"&sup3\":\"³\",\"&sup3;\":\"³\",\"&acute\":\"´\",\"&acute;\":\"´\",\"&micro\":\"µ\",\"&micro;\":\"µ\",\"&para\":\"¶\",\"&para;\":\"¶\",\"&middot\":\"·\",\"&middot;\":\"·\",\"&cedil\":\"¸\",\"&cedil;\":\"¸\",\"&sup1\":\"¹\",\"&sup1;\":\"¹\",\"&ordm\":\"º\",\"&ordm;\":\"º\",\"&raquo\":\"»\",\"&raquo;\":\"»\",\"&frac14\":\"¼\",\"&frac14;\":\"¼\",\"&frac12\":\"½\",\"&frac12;\":\"½\",\"&frac34\":\"¾\",\"&frac34;\":\"¾\",\"&iquest\":\"¿\",\"&iquest;\":\"¿\",\"&Agrave\":\"À\",\"&Agrave;\":\"À\",\"&Aacute\":\"Á\",\"&Aacute;\":\"Á\",\"&Acirc\":\"Â\",\"&Acirc;\":\"Â\",\"&Atilde\":\"Ã\",\"&Atilde;\":\"Ã\",\"&Auml\":\"Ä\",\"&Auml;\":\"Ä\",\"&Aring\":\"Å\",\"&Aring;\":\"Å\",\"&AElig\":\"Æ\",\"&AElig;\":\"Æ\",\"&Ccedil\":\"Ç\",\"&Ccedil;\":\"Ç\",\"&Egrave\":\"È\",\"&Egrave;\":\"È\",\"&Eacute\":\"É\",\"&Eacute;\":\"É\",\"&Ecirc\":\"Ê\",\"&Ecirc;\":\"Ê\",\"&Euml\":\"Ë\",\"&Euml;\":\"Ë\",\"&Igrave\":\"Ì\",\"&Igrave;\":\"Ì\",\"&Iacute\":\"Í\",\"&Iacute;\":\"Í\",\"&Icirc\":\"Î\",\"&Icirc;\":\"Î\",\"&Iuml\":\"Ï\",\"&Iuml;\":\"Ï\",\"&ETH\":\"Ð\",\"&ETH;\":\"Ð\",\"&Ntilde\":\"Ñ\",\"&Ntilde;\":\"Ñ\",\"&Ograve\":\"Ò\",\"&Ograve;\":\"Ò\",\"&Oacute\":\"Ó\",\"&Oacute;\":\"Ó\",\"&Ocirc\":\"Ô\",\"&Ocirc;\":\"Ô\",\"&Otilde\":\"Õ\",\"&Otilde;\":\"Õ\",\"&Ouml\":\"Ö\",\"&Ouml;\":\"Ö\",\"&times\":\"×\",\"&times;\":\"×\",\"&Oslash\":\"Ø\",\"&Oslash;\":\"Ø\",\"&Ugrave\":\"Ù\",\"&Ugrave;\":\"Ù\",\"&Uacute\":\"Ú\",\"&Uacute;\":\"Ú\",\"&Ucirc\":\"Û\",\"&Ucirc;\":\"Û\",\"&Uuml\":\"Ü\",\"&Uuml;\":\"Ü\",\"&Yacute\":\"Ý\",\"&Yacute;\":\"Ý\",\"&THORN\":\"Þ\",\"&THORN;\":\"Þ\",\"&szlig\":\"ß\",\"&szlig;\":\"ß\",\"&agrave\":\"à\",\"&agrave;\":\"à\",\"&aacute\":\"á\",\"&aacute;\":\"á\",\"&acirc\":\"â\",\"&acirc;\":\"â\",\"&atilde\":\"ã\",\"&atilde;\":\"ã\",\"&auml\":\"ä\",\"&auml;\":\"ä\",\"&aring\":\"å\",\"&aring;\":\"å\",\"&aelig\":\"æ\",\"&aelig;\":\"æ\",\"&ccedil\":\"ç\",\"&ccedil;\":\"ç\",\"&egrave\":\"è\",\"&egrave;\":\"è\",\"&eacute\":\"é\",\"&eacute;\":\"é\",\"&ecirc\":\"ê\",\"&ecirc;\":\"ê\",\"&euml\":\"ë\",\"&euml;\":\"ë\",\"&igrave\":\"ì\",\"&igrave;\":\"ì\",\"&iacute\":\"í\",\"&iacute;\":\"í\",\"&icirc\":\"î\",\"&icirc;\":\"î\",\"&iuml\":\"ï\",\"&iuml;\":\"ï\",\"&eth\":\"ð\",\"&eth;\":\"ð\",\"&ntilde\":\"ñ\",\"&ntilde;\":\"ñ\",\"&ograve\":\"ò\",\"&ograve;\":\"ò\",\"&oacute\":\"ó\",\"&oacute;\":\"ó\",\"&ocirc\":\"ô\",\"&ocirc;\":\"ô\",\"&otilde\":\"õ\",\"&otilde;\":\"õ\",\"&ouml\":\"ö\",\"&ouml;\":\"ö\",\"&divide\":\"÷\",\"&divide;\":\"÷\",\"&oslash\":\"ø\",\"&oslash;\":\"ø\",\"&ugrave\":\"ù\",\"&ugrave;\":\"ù\",\"&uacute\":\"ú\",\"&uacute;\":\"ú\",\"&ucirc\":\"û\",\"&ucirc;\":\"û\",\"&uuml\":\"ü\",\"&uuml;\":\"ü\",\"&yacute\":\"ý\",\"&yacute;\":\"ý\",\"&thorn\":\"þ\",\"&thorn;\":\"þ\",\"&yuml\":\"ÿ\",\"&yuml;\":\"ÿ\",\"&quot\":'\"',\"&quot;\":'\"',\"&amp\":\"&\",\"&amp;\":\"&\",\"&lt\":\"<\",\"&lt;\":\"<\",\"&gt\":\">\",\"&gt;\":\">\",\"&OElig;\":\"Œ\",\"&oelig;\":\"œ\",\"&Scaron;\":\"Š\",\"&scaron;\":\"š\",\"&Yuml;\":\"Ÿ\",\"&circ;\":\"ˆ\",\"&tilde;\":\"˜\",\"&ensp;\":\" \",\"&emsp;\":\" \",\"&thinsp;\":\" \",\"&zwnj;\":\"‌\",\"&zwj;\":\"‍\",\"&lrm;\":\"‎\",\"&rlm;\":\"‏\",\"&ndash;\":\"–\",\"&mdash;\":\"—\",\"&lsquo;\":\"‘\",\"&rsquo;\":\"’\",\"&sbquo;\":\"‚\",\"&ldquo;\":\"“\",\"&rdquo;\":\"”\",\"&bdquo;\":\"„\",\"&dagger;\":\"†\",\"&Dagger;\":\"‡\",\"&permil;\":\"‰\",\"&lsaquo;\":\"‹\",\"&rsaquo;\":\"›\",\"&euro;\":\"€\",\"&fnof;\":\"ƒ\",\"&Alpha;\":\"Α\",\"&Beta;\":\"Β\",\"&Gamma;\":\"Γ\",\"&Delta;\":\"Δ\",\"&Epsilon;\":\"Ε\",\"&Zeta;\":\"Ζ\",\"&Eta;\":\"Η\",\"&Theta;\":\"Θ\",\"&Iota;\":\"Ι\",\"&Kappa;\":\"Κ\",\"&Lambda;\":\"Λ\",\"&Mu;\":\"Μ\",\"&Nu;\":\"Ν\",\"&Xi;\":\"Ξ\",\"&Omicron;\":\"Ο\",\"&Pi;\":\"Π\",\"&Rho;\":\"Ρ\",\"&Sigma;\":\"Σ\",\"&Tau;\":\"Τ\",\"&Upsilon;\":\"Υ\",\"&Phi;\":\"Φ\",\"&Chi;\":\"Χ\",\"&Psi;\":\"Ψ\",\"&Omega;\":\"Ω\",\"&alpha;\":\"α\",\"&beta;\":\"β\",\"&gamma;\":\"γ\",\"&delta;\":\"δ\",\"&epsilon;\":\"ε\",\"&zeta;\":\"ζ\",\"&eta;\":\"η\",\"&theta;\":\"θ\",\"&iota;\":\"ι\",\"&kappa;\":\"κ\",\"&lambda;\":\"λ\",\"&mu;\":\"μ\",\"&nu;\":\"ν\",\"&xi;\":\"ξ\",\"&omicron;\":\"ο\",\"&pi;\":\"π\",\"&rho;\":\"ρ\",\"&sigmaf;\":\"ς\",\"&sigma;\":\"σ\",\"&tau;\":\"τ\",\"&upsilon;\":\"υ\",\"&phi;\":\"φ\",\"&chi;\":\"χ\",\"&psi;\":\"ψ\",\"&omega;\":\"ω\",\"&thetasym;\":\"ϑ\",\"&upsih;\":\"ϒ\",\"&piv;\":\"ϖ\",\"&bull;\":\"•\",\"&hellip;\":\"…\",\"&prime;\":\"′\",\"&Prime;\":\"″\",\"&oline;\":\"‾\",\"&frasl;\":\"⁄\",\"&weierp;\":\"℘\",\"&image;\":\"ℑ\",\"&real;\":\"ℜ\",\"&trade;\":\"™\",\"&alefsym;\":\"ℵ\",\"&larr;\":\"←\",\"&uarr;\":\"↑\",\"&rarr;\":\"→\",\"&darr;\":\"↓\",\"&harr;\":\"↔\",\"&crarr;\":\"↵\",\"&lArr;\":\"⇐\",\"&uArr;\":\"⇑\",\"&rArr;\":\"⇒\",\"&dArr;\":\"⇓\",\"&hArr;\":\"⇔\",\"&forall;\":\"∀\",\"&part;\":\"∂\",\"&exist;\":\"∃\",\"&empty;\":\"∅\",\"&nabla;\":\"∇\",\"&isin;\":\"∈\",\"&notin;\":\"∉\",\"&ni;\":\"∋\",\"&prod;\":\"∏\",\"&sum;\":\"∑\",\"&minus;\":\"−\",\"&lowast;\":\"∗\",\"&radic;\":\"√\",\"&prop;\":\"∝\",\"&infin;\":\"∞\",\"&ang;\":\"∠\",\"&and;\":\"∧\",\"&or;\":\"∨\",\"&cap;\":\"∩\",\"&cup;\":\"∪\",\"&int;\":\"∫\",\"&there4;\":\"∴\",\"&sim;\":\"∼\",\"&cong;\":\"≅\",\"&asymp;\":\"≈\",\"&ne;\":\"≠\",\"&equiv;\":\"≡\",\"&le;\":\"≤\",\"&ge;\":\"≥\",\"&sub;\":\"⊂\",\"&sup;\":\"⊃\",\"&nsub;\":\"⊄\",\"&sube;\":\"⊆\",\"&supe;\":\"⊇\",\"&oplus;\":\"⊕\",\"&otimes;\":\"⊗\",\"&perp;\":\"⊥\",\"&sdot;\":\"⋅\",\"&lceil;\":\"⌈\",\"&rceil;\":\"⌉\",\"&lfloor;\":\"⌊\",\"&rfloor;\":\"⌋\",\"&lang;\":\"〈\",\"&rang;\":\"〉\",\"&loz;\":\"◊\",\"&spades;\":\"♠\",\"&clubs;\":\"♣\",\"&hearts;\":\"♥\",\"&diams;\":\"♦\"},characters:{\"'\":\"&apos;\",\" \":\"&nbsp;\",\"¡\":\"&iexcl;\",\"¢\":\"&cent;\",\"£\":\"&pound;\",\"¤\":\"&curren;\",\"¥\":\"&yen;\",\"¦\":\"&brvbar;\",\"§\":\"&sect;\",\"¨\":\"&uml;\",\"©\":\"&copy;\",\"ª\":\"&ordf;\",\"«\":\"&laquo;\",\"¬\":\"&not;\",\"­\":\"&shy;\",\"®\":\"&reg;\",\"¯\":\"&macr;\",\"°\":\"&deg;\",\"±\":\"&plusmn;\",\"²\":\"&sup2;\",\"³\":\"&sup3;\",\"´\":\"&acute;\",\"µ\":\"&micro;\",\"¶\":\"&para;\",\"·\":\"&middot;\",\"¸\":\"&cedil;\",\"¹\":\"&sup1;\",\"º\":\"&ordm;\",\"»\":\"&raquo;\",\"¼\":\"&frac14;\",\"½\":\"&frac12;\",\"¾\":\"&frac34;\",\"¿\":\"&iquest;\",\"À\":\"&Agrave;\",\"Á\":\"&Aacute;\",\"Â\":\"&Acirc;\",\"Ã\":\"&Atilde;\",\"Ä\":\"&Auml;\",\"Å\":\"&Aring;\",\"Æ\":\"&AElig;\",\"Ç\":\"&Ccedil;\",\"È\":\"&Egrave;\",\"É\":\"&Eacute;\",\"Ê\":\"&Ecirc;\",\"Ë\":\"&Euml;\",\"Ì\":\"&Igrave;\",\"Í\":\"&Iacute;\",\"Î\":\"&Icirc;\",\"Ï\":\"&Iuml;\",\"Ð\":\"&ETH;\",\"Ñ\":\"&Ntilde;\",\"Ò\":\"&Ograve;\",\"Ó\":\"&Oacute;\",\"Ô\":\"&Ocirc;\",\"Õ\":\"&Otilde;\",\"Ö\":\"&Ouml;\",\"×\":\"&times;\",\"Ø\":\"&Oslash;\",\"Ù\":\"&Ugrave;\",\"Ú\":\"&Uacute;\",\"Û\":\"&Ucirc;\",\"Ü\":\"&Uuml;\",\"Ý\":\"&Yacute;\",\"Þ\":\"&THORN;\",\"ß\":\"&szlig;\",\"à\":\"&agrave;\",\"á\":\"&aacute;\",\"â\":\"&acirc;\",\"ã\":\"&atilde;\",\"ä\":\"&auml;\",\"å\":\"&aring;\",\"æ\":\"&aelig;\",\"ç\":\"&ccedil;\",\"è\":\"&egrave;\",\"é\":\"&eacute;\",\"ê\":\"&ecirc;\",\"ë\":\"&euml;\",\"ì\":\"&igrave;\",\"í\":\"&iacute;\",\"î\":\"&icirc;\",\"ï\":\"&iuml;\",\"ð\":\"&eth;\",\"ñ\":\"&ntilde;\",\"ò\":\"&ograve;\",\"ó\":\"&oacute;\",\"ô\":\"&ocirc;\",\"õ\":\"&otilde;\",\"ö\":\"&ouml;\",\"÷\":\"&divide;\",\"ø\":\"&oslash;\",\"ù\":\"&ugrave;\",\"ú\":\"&uacute;\",\"û\":\"&ucirc;\",\"ü\":\"&uuml;\",\"ý\":\"&yacute;\",\"þ\":\"&thorn;\",\"ÿ\":\"&yuml;\",'\"':\"&quot;\",\"&\":\"&amp;\",\"<\":\"&lt;\",\">\":\"&gt;\",\"Œ\":\"&OElig;\",\"œ\":\"&oelig;\",\"Š\":\"&Scaron;\",\"š\":\"&scaron;\",\"Ÿ\":\"&Yuml;\",\"ˆ\":\"&circ;\",\"˜\":\"&tilde;\",\" \":\"&ensp;\",\" \":\"&emsp;\",\" \":\"&thinsp;\",\"‌\":\"&zwnj;\",\"‍\":\"&zwj;\",\"‎\":\"&lrm;\",\"‏\":\"&rlm;\",\"–\":\"&ndash;\",\"—\":\"&mdash;\",\"‘\":\"&lsquo;\",\"’\":\"&rsquo;\",\"‚\":\"&sbquo;\",\"“\":\"&ldquo;\",\"”\":\"&rdquo;\",\"„\":\"&bdquo;\",\"†\":\"&dagger;\",\"‡\":\"&Dagger;\",\"‰\":\"&permil;\",\"‹\":\"&lsaquo;\",\"›\":\"&rsaquo;\",\"€\":\"&euro;\",\"ƒ\":\"&fnof;\",\"Α\":\"&Alpha;\",\"Β\":\"&Beta;\",\"Γ\":\"&Gamma;\",\"Δ\":\"&Delta;\",\"Ε\":\"&Epsilon;\",\"Ζ\":\"&Zeta;\",\"Η\":\"&Eta;\",\"Θ\":\"&Theta;\",\"Ι\":\"&Iota;\",\"Κ\":\"&Kappa;\",\"Λ\":\"&Lambda;\",\"Μ\":\"&Mu;\",\"Ν\":\"&Nu;\",\"Ξ\":\"&Xi;\",\"Ο\":\"&Omicron;\",\"Π\":\"&Pi;\",\"Ρ\":\"&Rho;\",\"Σ\":\"&Sigma;\",\"Τ\":\"&Tau;\",\"Υ\":\"&Upsilon;\",\"Φ\":\"&Phi;\",\"Χ\":\"&Chi;\",\"Ψ\":\"&Psi;\",\"Ω\":\"&Omega;\",\"α\":\"&alpha;\",\"β\":\"&beta;\",\"γ\":\"&gamma;\",\"δ\":\"&delta;\",\"ε\":\"&epsilon;\",\"ζ\":\"&zeta;\",\"η\":\"&eta;\",\"θ\":\"&theta;\",\"ι\":\"&iota;\",\"κ\":\"&kappa;\",\"λ\":\"&lambda;\",\"μ\":\"&mu;\",\"ν\":\"&nu;\",\"ξ\":\"&xi;\",\"ο\":\"&omicron;\",\"π\":\"&pi;\",\"ρ\":\"&rho;\",\"ς\":\"&sigmaf;\",\"σ\":\"&sigma;\",\"τ\":\"&tau;\",\"υ\":\"&upsilon;\",\"φ\":\"&phi;\",\"χ\":\"&chi;\",\"ψ\":\"&psi;\",\"ω\":\"&omega;\",\"ϑ\":\"&thetasym;\",\"ϒ\":\"&upsih;\",\"ϖ\":\"&piv;\",\"•\":\"&bull;\",\"…\":\"&hellip;\",\"′\":\"&prime;\",\"″\":\"&Prime;\",\"‾\":\"&oline;\",\"⁄\":\"&frasl;\",\"℘\":\"&weierp;\",\"ℑ\":\"&image;\",\"ℜ\":\"&real;\",\"™\":\"&trade;\",\"ℵ\":\"&alefsym;\",\"←\":\"&larr;\",\"↑\":\"&uarr;\",\"→\":\"&rarr;\",\"↓\":\"&darr;\",\"↔\":\"&harr;\",\"↵\":\"&crarr;\",\"⇐\":\"&lArr;\",\"⇑\":\"&uArr;\",\"⇒\":\"&rArr;\",\"⇓\":\"&dArr;\",\"⇔\":\"&hArr;\",\"∀\":\"&forall;\",\"∂\":\"&part;\",\"∃\":\"&exist;\",\"∅\":\"&empty;\",\"∇\":\"&nabla;\",\"∈\":\"&isin;\",\"∉\":\"&notin;\",\"∋\":\"&ni;\",\"∏\":\"&prod;\",\"∑\":\"&sum;\",\"−\":\"&minus;\",\"∗\":\"&lowast;\",\"√\":\"&radic;\",\"∝\":\"&prop;\",\"∞\":\"&infin;\",\"∠\":\"&ang;\",\"∧\":\"&and;\",\"∨\":\"&or;\",\"∩\":\"&cap;\",\"∪\":\"&cup;\",\"∫\":\"&int;\",\"∴\":\"&there4;\",\"∼\":\"&sim;\",\"≅\":\"&cong;\",\"≈\":\"&asymp;\",\"≠\":\"&ne;\",\"≡\":\"&equiv;\",\"≤\":\"&le;\",\"≥\":\"&ge;\",\"⊂\":\"&sub;\",\"⊃\":\"&sup;\",\"⊄\":\"&nsub;\",\"⊆\":\"&sube;\",\"⊇\":\"&supe;\",\"⊕\":\"&oplus;\",\"⊗\":\"&otimes;\",\"⊥\":\"&perp;\",\"⋅\":\"&sdot;\",\"⌈\":\"&lceil;\",\"⌉\":\"&rceil;\",\"⌊\":\"&lfloor;\",\"⌋\":\"&rfloor;\",\"〈\":\"&lang;\",\"〉\":\"&rang;\",\"◊\":\"&loz;\",\"♠\":\"&spades;\",\"♣\":\"&clubs;\",\"♥\":\"&hearts;\",\"♦\":\"&diams;\"}},html5:{entities:{\"&AElig\":\"Æ\",\"&AElig;\":\"Æ\",\"&AMP\":\"&\",\"&AMP;\":\"&\",\"&Aacute\":\"Á\",\"&Aacute;\":\"Á\",\"&Abreve;\":\"Ă\",\"&Acirc\":\"Â\",\"&Acirc;\":\"Â\",\"&Acy;\":\"А\",\"&Afr;\":\"𝔄\",\"&Agrave\":\"À\",\"&Agrave;\":\"À\",\"&Alpha;\":\"Α\",\"&Amacr;\":\"Ā\",\"&And;\":\"⩓\",\"&Aogon;\":\"Ą\",\"&Aopf;\":\"𝔸\",\"&ApplyFunction;\":\"⁡\",\"&Aring\":\"Å\",\"&Aring;\":\"Å\",\"&Ascr;\":\"𝒜\",\"&Assign;\":\"≔\",\"&Atilde\":\"Ã\",\"&Atilde;\":\"Ã\",\"&Auml\":\"Ä\",\"&Auml;\":\"Ä\",\"&Backslash;\":\"∖\",\"&Barv;\":\"⫧\",\"&Barwed;\":\"⌆\",\"&Bcy;\":\"Б\",\"&Because;\":\"∵\",\"&Bernoullis;\":\"ℬ\",\"&Beta;\":\"Β\",\"&Bfr;\":\"𝔅\",\"&Bopf;\":\"𝔹\",\"&Breve;\":\"˘\",\"&Bscr;\":\"ℬ\",\"&Bumpeq;\":\"≎\",\"&CHcy;\":\"Ч\",\"&COPY\":\"©\",\"&COPY;\":\"©\",\"&Cacute;\":\"Ć\",\"&Cap;\":\"⋒\",\"&CapitalDifferentialD;\":\"ⅅ\",\"&Cayleys;\":\"ℭ\",\"&Ccaron;\":\"Č\",\"&Ccedil\":\"Ç\",\"&Ccedil;\":\"Ç\",\"&Ccirc;\":\"Ĉ\",\"&Cconint;\":\"∰\",\"&Cdot;\":\"Ċ\",\"&Cedilla;\":\"¸\",\"&CenterDot;\":\"·\",\"&Cfr;\":\"ℭ\",\"&Chi;\":\"Χ\",\"&CircleDot;\":\"⊙\",\"&CircleMinus;\":\"⊖\",\"&CirclePlus;\":\"⊕\",\"&CircleTimes;\":\"⊗\",\"&ClockwiseContourIntegral;\":\"∲\",\"&CloseCurlyDoubleQuote;\":\"”\",\"&CloseCurlyQuote;\":\"’\",\"&Colon;\":\"∷\",\"&Colone;\":\"⩴\",\"&Congruent;\":\"≡\",\"&Conint;\":\"∯\",\"&ContourIntegral;\":\"∮\",\"&Copf;\":\"ℂ\",\"&Coproduct;\":\"∐\",\"&CounterClockwiseContourIntegral;\":\"∳\",\"&Cross;\":\"⨯\",\"&Cscr;\":\"𝒞\",\"&Cup;\":\"⋓\",\"&CupCap;\":\"≍\",\"&DD;\":\"ⅅ\",\"&DDotrahd;\":\"⤑\",\"&DJcy;\":\"Ђ\",\"&DScy;\":\"Ѕ\",\"&DZcy;\":\"Џ\",\"&Dagger;\":\"‡\",\"&Darr;\":\"↡\",\"&Dashv;\":\"⫤\",\"&Dcaron;\":\"Ď\",\"&Dcy;\":\"Д\",\"&Del;\":\"∇\",\"&Delta;\":\"Δ\",\"&Dfr;\":\"𝔇\",\"&DiacriticalAcute;\":\"´\",\"&DiacriticalDot;\":\"˙\",\"&DiacriticalDoubleAcute;\":\"˝\",\"&DiacriticalGrave;\":\"`\",\"&DiacriticalTilde;\":\"˜\",\"&Diamond;\":\"⋄\",\"&DifferentialD;\":\"ⅆ\",\"&Dopf;\":\"𝔻\",\"&Dot;\":\"¨\",\"&DotDot;\":\"⃜\",\"&DotEqual;\":\"≐\",\"&DoubleContourIntegral;\":\"∯\",\"&DoubleDot;\":\"¨\",\"&DoubleDownArrow;\":\"⇓\",\"&DoubleLeftArrow;\":\"⇐\",\"&DoubleLeftRightArrow;\":\"⇔\",\"&DoubleLeftTee;\":\"⫤\",\"&DoubleLongLeftArrow;\":\"⟸\",\"&DoubleLongLeftRightArrow;\":\"⟺\",\"&DoubleLongRightArrow;\":\"⟹\",\"&DoubleRightArrow;\":\"⇒\",\"&DoubleRightTee;\":\"⊨\",\"&DoubleUpArrow;\":\"⇑\",\"&DoubleUpDownArrow;\":\"⇕\",\"&DoubleVerticalBar;\":\"∥\",\"&DownArrow;\":\"↓\",\"&DownArrowBar;\":\"⤓\",\"&DownArrowUpArrow;\":\"⇵\",\"&DownBreve;\":\"̑\",\"&DownLeftRightVector;\":\"⥐\",\"&DownLeftTeeVector;\":\"⥞\",\"&DownLeftVector;\":\"↽\",\"&DownLeftVectorBar;\":\"⥖\",\"&DownRightTeeVector;\":\"⥟\",\"&DownRightVector;\":\"⇁\",\"&DownRightVectorBar;\":\"⥗\",\"&DownTee;\":\"⊤\",\"&DownTeeArrow;\":\"↧\",\"&Downarrow;\":\"⇓\",\"&Dscr;\":\"𝒟\",\"&Dstrok;\":\"Đ\",\"&ENG;\":\"Ŋ\",\"&ETH\":\"Ð\",\"&ETH;\":\"Ð\",\"&Eacute\":\"É\",\"&Eacute;\":\"É\",\"&Ecaron;\":\"Ě\",\"&Ecirc\":\"Ê\",\"&Ecirc;\":\"Ê\",\"&Ecy;\":\"Э\",\"&Edot;\":\"Ė\",\"&Efr;\":\"𝔈\",\"&Egrave\":\"È\",\"&Egrave;\":\"È\",\"&Element;\":\"∈\",\"&Emacr;\":\"Ē\",\"&EmptySmallSquare;\":\"◻\",\"&EmptyVerySmallSquare;\":\"▫\",\"&Eogon;\":\"Ę\",\"&Eopf;\":\"𝔼\",\"&Epsilon;\":\"Ε\",\"&Equal;\":\"⩵\",\"&EqualTilde;\":\"≂\",\"&Equilibrium;\":\"⇌\",\"&Escr;\":\"ℰ\",\"&Esim;\":\"⩳\",\"&Eta;\":\"Η\",\"&Euml\":\"Ë\",\"&Euml;\":\"Ë\",\"&Exists;\":\"∃\",\"&ExponentialE;\":\"ⅇ\",\"&Fcy;\":\"Ф\",\"&Ffr;\":\"𝔉\",\"&FilledSmallSquare;\":\"◼\",\"&FilledVerySmallSquare;\":\"▪\",\"&Fopf;\":\"𝔽\",\"&ForAll;\":\"∀\",\"&Fouriertrf;\":\"ℱ\",\"&Fscr;\":\"ℱ\",\"&GJcy;\":\"Ѓ\",\"&GT\":\">\",\"&GT;\":\">\",\"&Gamma;\":\"Γ\",\"&Gammad;\":\"Ϝ\",\"&Gbreve;\":\"Ğ\",\"&Gcedil;\":\"Ģ\",\"&Gcirc;\":\"Ĝ\",\"&Gcy;\":\"Г\",\"&Gdot;\":\"Ġ\",\"&Gfr;\":\"𝔊\",\"&Gg;\":\"⋙\",\"&Gopf;\":\"𝔾\",\"&GreaterEqual;\":\"≥\",\"&GreaterEqualLess;\":\"⋛\",\"&GreaterFullEqual;\":\"≧\",\"&GreaterGreater;\":\"⪢\",\"&GreaterLess;\":\"≷\",\"&GreaterSlantEqual;\":\"⩾\",\"&GreaterTilde;\":\"≳\",\"&Gscr;\":\"𝒢\",\"&Gt;\":\"≫\",\"&HARDcy;\":\"Ъ\",\"&Hacek;\":\"ˇ\",\"&Hat;\":\"^\",\"&Hcirc;\":\"Ĥ\",\"&Hfr;\":\"ℌ\",\"&HilbertSpace;\":\"ℋ\",\"&Hopf;\":\"ℍ\",\"&HorizontalLine;\":\"─\",\"&Hscr;\":\"ℋ\",\"&Hstrok;\":\"Ħ\",\"&HumpDownHump;\":\"≎\",\"&HumpEqual;\":\"≏\",\"&IEcy;\":\"Е\",\"&IJlig;\":\"Ĳ\",\"&IOcy;\":\"Ё\",\"&Iacute\":\"Í\",\"&Iacute;\":\"Í\",\"&Icirc\":\"Î\",\"&Icirc;\":\"Î\",\"&Icy;\":\"И\",\"&Idot;\":\"İ\",\"&Ifr;\":\"ℑ\",\"&Igrave\":\"Ì\",\"&Igrave;\":\"Ì\",\"&Im;\":\"ℑ\",\"&Imacr;\":\"Ī\",\"&ImaginaryI;\":\"ⅈ\",\"&Implies;\":\"⇒\",\"&Int;\":\"∬\",\"&Integral;\":\"∫\",\"&Intersection;\":\"⋂\",\"&InvisibleComma;\":\"⁣\",\"&InvisibleTimes;\":\"⁢\",\"&Iogon;\":\"Į\",\"&Iopf;\":\"𝕀\",\"&Iota;\":\"Ι\",\"&Iscr;\":\"ℐ\",\"&Itilde;\":\"Ĩ\",\"&Iukcy;\":\"І\",\"&Iuml\":\"Ï\",\"&Iuml;\":\"Ï\",\"&Jcirc;\":\"Ĵ\",\"&Jcy;\":\"Й\",\"&Jfr;\":\"𝔍\",\"&Jopf;\":\"𝕁\",\"&Jscr;\":\"𝒥\",\"&Jsercy;\":\"Ј\",\"&Jukcy;\":\"Є\",\"&KHcy;\":\"Х\",\"&KJcy;\":\"Ќ\",\"&Kappa;\":\"Κ\",\"&Kcedil;\":\"Ķ\",\"&Kcy;\":\"К\",\"&Kfr;\":\"𝔎\",\"&Kopf;\":\"𝕂\",\"&Kscr;\":\"𝒦\",\"&LJcy;\":\"Љ\",\"&LT\":\"<\",\"&LT;\":\"<\",\"&Lacute;\":\"Ĺ\",\"&Lambda;\":\"Λ\",\"&Lang;\":\"⟪\",\"&Laplacetrf;\":\"ℒ\",\"&Larr;\":\"↞\",\"&Lcaron;\":\"Ľ\",\"&Lcedil;\":\"Ļ\",\"&Lcy;\":\"Л\",\"&LeftAngleBracket;\":\"⟨\",\"&LeftArrow;\":\"←\",\"&LeftArrowBar;\":\"⇤\",\"&LeftArrowRightArrow;\":\"⇆\",\"&LeftCeiling;\":\"⌈\",\"&LeftDoubleBracket;\":\"⟦\",\"&LeftDownTeeVector;\":\"⥡\",\"&LeftDownVector;\":\"⇃\",\"&LeftDownVectorBar;\":\"⥙\",\"&LeftFloor;\":\"⌊\",\"&LeftRightArrow;\":\"↔\",\"&LeftRightVector;\":\"⥎\",\"&LeftTee;\":\"⊣\",\"&LeftTeeArrow;\":\"↤\",\"&LeftTeeVector;\":\"⥚\",\"&LeftTriangle;\":\"⊲\",\"&LeftTriangleBar;\":\"⧏\",\"&LeftTriangleEqual;\":\"⊴\",\"&LeftUpDownVector;\":\"⥑\",\"&LeftUpTeeVector;\":\"⥠\",\"&LeftUpVector;\":\"↿\",\"&LeftUpVectorBar;\":\"⥘\",\"&LeftVector;\":\"↼\",\"&LeftVectorBar;\":\"⥒\",\"&Leftarrow;\":\"⇐\",\"&Leftrightarrow;\":\"⇔\",\"&LessEqualGreater;\":\"⋚\",\"&LessFullEqual;\":\"≦\",\"&LessGreater;\":\"≶\",\"&LessLess;\":\"⪡\",\"&LessSlantEqual;\":\"⩽\",\"&LessTilde;\":\"≲\",\"&Lfr;\":\"𝔏\",\"&Ll;\":\"⋘\",\"&Lleftarrow;\":\"⇚\",\"&Lmidot;\":\"Ŀ\",\"&LongLeftArrow;\":\"⟵\",\"&LongLeftRightArrow;\":\"⟷\",\"&LongRightArrow;\":\"⟶\",\"&Longleftarrow;\":\"⟸\",\"&Longleftrightarrow;\":\"⟺\",\"&Longrightarrow;\":\"⟹\",\"&Lopf;\":\"𝕃\",\"&LowerLeftArrow;\":\"↙\",\"&LowerRightArrow;\":\"↘\",\"&Lscr;\":\"ℒ\",\"&Lsh;\":\"↰\",\"&Lstrok;\":\"Ł\",\"&Lt;\":\"≪\",\"&Map;\":\"⤅\",\"&Mcy;\":\"М\",\"&MediumSpace;\":\" \",\"&Mellintrf;\":\"ℳ\",\"&Mfr;\":\"𝔐\",\"&MinusPlus;\":\"∓\",\"&Mopf;\":\"𝕄\",\"&Mscr;\":\"ℳ\",\"&Mu;\":\"Μ\",\"&NJcy;\":\"Њ\",\"&Nacute;\":\"Ń\",\"&Ncaron;\":\"Ň\",\"&Ncedil;\":\"Ņ\",\"&Ncy;\":\"Н\",\"&NegativeMediumSpace;\":\"​\",\"&NegativeThickSpace;\":\"​\",\"&NegativeThinSpace;\":\"​\",\"&NegativeVeryThinSpace;\":\"​\",\"&NestedGreaterGreater;\":\"≫\",\"&NestedLessLess;\":\"≪\",\"&NewLine;\":\"\\n\",\"&Nfr;\":\"𝔑\",\"&NoBreak;\":\"⁠\",\"&NonBreakingSpace;\":\" \",\"&Nopf;\":\"ℕ\",\"&Not;\":\"⫬\",\"&NotCongruent;\":\"≢\",\"&NotCupCap;\":\"≭\",\"&NotDoubleVerticalBar;\":\"∦\",\"&NotElement;\":\"∉\",\"&NotEqual;\":\"≠\",\"&NotEqualTilde;\":\"≂̸\",\"&NotExists;\":\"∄\",\"&NotGreater;\":\"≯\",\"&NotGreaterEqual;\":\"≱\",\"&NotGreaterFullEqual;\":\"≧̸\",\"&NotGreaterGreater;\":\"≫̸\",\"&NotGreaterLess;\":\"≹\",\"&NotGreaterSlantEqual;\":\"⩾̸\",\"&NotGreaterTilde;\":\"≵\",\"&NotHumpDownHump;\":\"≎̸\",\"&NotHumpEqual;\":\"≏̸\",\"&NotLeftTriangle;\":\"⋪\",\"&NotLeftTriangleBar;\":\"⧏̸\",\"&NotLeftTriangleEqual;\":\"⋬\",\"&NotLess;\":\"≮\",\"&NotLessEqual;\":\"≰\",\"&NotLessGreater;\":\"≸\",\"&NotLessLess;\":\"≪̸\",\"&NotLessSlantEqual;\":\"⩽̸\",\"&NotLessTilde;\":\"≴\",\"&NotNestedGreaterGreater;\":\"⪢̸\",\"&NotNestedLessLess;\":\"⪡̸\",\"&NotPrecedes;\":\"⊀\",\"&NotPrecedesEqual;\":\"⪯̸\",\"&NotPrecedesSlantEqual;\":\"⋠\",\"&NotReverseElement;\":\"∌\",\"&NotRightTriangle;\":\"⋫\",\"&NotRightTriangleBar;\":\"⧐̸\",\"&NotRightTriangleEqual;\":\"⋭\",\"&NotSquareSubset;\":\"⊏̸\",\"&NotSquareSubsetEqual;\":\"⋢\",\"&NotSquareSuperset;\":\"⊐̸\",\"&NotSquareSupersetEqual;\":\"⋣\",\"&NotSubset;\":\"⊂⃒\",\"&NotSubsetEqual;\":\"⊈\",\"&NotSucceeds;\":\"⊁\",\"&NotSucceedsEqual;\":\"⪰̸\",\"&NotSucceedsSlantEqual;\":\"⋡\",\"&NotSucceedsTilde;\":\"≿̸\",\"&NotSuperset;\":\"⊃⃒\",\"&NotSupersetEqual;\":\"⊉\",\"&NotTilde;\":\"≁\",\"&NotTildeEqual;\":\"≄\",\"&NotTildeFullEqual;\":\"≇\",\"&NotTildeTilde;\":\"≉\",\"&NotVerticalBar;\":\"∤\",\"&Nscr;\":\"𝒩\",\"&Ntilde\":\"Ñ\",\"&Ntilde;\":\"Ñ\",\"&Nu;\":\"Ν\",\"&OElig;\":\"Œ\",\"&Oacute\":\"Ó\",\"&Oacute;\":\"Ó\",\"&Ocirc\":\"Ô\",\"&Ocirc;\":\"Ô\",\"&Ocy;\":\"О\",\"&Odblac;\":\"Ő\",\"&Ofr;\":\"𝔒\",\"&Ograve\":\"Ò\",\"&Ograve;\":\"Ò\",\"&Omacr;\":\"Ō\",\"&Omega;\":\"Ω\",\"&Omicron;\":\"Ο\",\"&Oopf;\":\"𝕆\",\"&OpenCurlyDoubleQuote;\":\"“\",\"&OpenCurlyQuote;\":\"‘\",\"&Or;\":\"⩔\",\"&Oscr;\":\"𝒪\",\"&Oslash\":\"Ø\",\"&Oslash;\":\"Ø\",\"&Otilde\":\"Õ\",\"&Otilde;\":\"Õ\",\"&Otimes;\":\"⨷\",\"&Ouml\":\"Ö\",\"&Ouml;\":\"Ö\",\"&OverBar;\":\"‾\",\"&OverBrace;\":\"⏞\",\"&OverBracket;\":\"⎴\",\"&OverParenthesis;\":\"⏜\",\"&PartialD;\":\"∂\",\"&Pcy;\":\"П\",\"&Pfr;\":\"𝔓\",\"&Phi;\":\"Φ\",\"&Pi;\":\"Π\",\"&PlusMinus;\":\"±\",\"&Poincareplane;\":\"ℌ\",\"&Popf;\":\"ℙ\",\"&Pr;\":\"⪻\",\"&Precedes;\":\"≺\",\"&PrecedesEqual;\":\"⪯\",\"&PrecedesSlantEqual;\":\"≼\",\"&PrecedesTilde;\":\"≾\",\"&Prime;\":\"″\",\"&Product;\":\"∏\",\"&Proportion;\":\"∷\",\"&Proportional;\":\"∝\",\"&Pscr;\":\"𝒫\",\"&Psi;\":\"Ψ\",\"&QUOT\":'\"',\"&QUOT;\":'\"',\"&Qfr;\":\"𝔔\",\"&Qopf;\":\"ℚ\",\"&Qscr;\":\"𝒬\",\"&RBarr;\":\"⤐\",\"&REG\":\"®\",\"&REG;\":\"®\",\"&Racute;\":\"Ŕ\",\"&Rang;\":\"⟫\",\"&Rarr;\":\"↠\",\"&Rarrtl;\":\"⤖\",\"&Rcaron;\":\"Ř\",\"&Rcedil;\":\"Ŗ\",\"&Rcy;\":\"Р\",\"&Re;\":\"ℜ\",\"&ReverseElement;\":\"∋\",\"&ReverseEquilibrium;\":\"⇋\",\"&ReverseUpEquilibrium;\":\"⥯\",\"&Rfr;\":\"ℜ\",\"&Rho;\":\"Ρ\",\"&RightAngleBracket;\":\"⟩\",\"&RightArrow;\":\"→\",\"&RightArrowBar;\":\"⇥\",\"&RightArrowLeftArrow;\":\"⇄\",\"&RightCeiling;\":\"⌉\",\"&RightDoubleBracket;\":\"⟧\",\"&RightDownTeeVector;\":\"⥝\",\"&RightDownVector;\":\"⇂\",\"&RightDownVectorBar;\":\"⥕\",\"&RightFloor;\":\"⌋\",\"&RightTee;\":\"⊢\",\"&RightTeeArrow;\":\"↦\",\"&RightTeeVector;\":\"⥛\",\"&RightTriangle;\":\"⊳\",\"&RightTriangleBar;\":\"⧐\",\"&RightTriangleEqual;\":\"⊵\",\"&RightUpDownVector;\":\"⥏\",\"&RightUpTeeVector;\":\"⥜\",\"&RightUpVector;\":\"↾\",\"&RightUpVectorBar;\":\"⥔\",\"&RightVector;\":\"⇀\",\"&RightVectorBar;\":\"⥓\",\"&Rightarrow;\":\"⇒\",\"&Ropf;\":\"ℝ\",\"&RoundImplies;\":\"⥰\",\"&Rrightarrow;\":\"⇛\",\"&Rscr;\":\"ℛ\",\"&Rsh;\":\"↱\",\"&RuleDelayed;\":\"⧴\",\"&SHCHcy;\":\"Щ\",\"&SHcy;\":\"Ш\",\"&SOFTcy;\":\"Ь\",\"&Sacute;\":\"Ś\",\"&Sc;\":\"⪼\",\"&Scaron;\":\"Š\",\"&Scedil;\":\"Ş\",\"&Scirc;\":\"Ŝ\",\"&Scy;\":\"С\",\"&Sfr;\":\"𝔖\",\"&ShortDownArrow;\":\"↓\",\"&ShortLeftArrow;\":\"←\",\"&ShortRightArrow;\":\"→\",\"&ShortUpArrow;\":\"↑\",\"&Sigma;\":\"Σ\",\"&SmallCircle;\":\"∘\",\"&Sopf;\":\"𝕊\",\"&Sqrt;\":\"√\",\"&Square;\":\"□\",\"&SquareIntersection;\":\"⊓\",\"&SquareSubset;\":\"⊏\",\"&SquareSubsetEqual;\":\"⊑\",\"&SquareSuperset;\":\"⊐\",\"&SquareSupersetEqual;\":\"⊒\",\"&SquareUnion;\":\"⊔\",\"&Sscr;\":\"𝒮\",\"&Star;\":\"⋆\",\"&Sub;\":\"⋐\",\"&Subset;\":\"⋐\",\"&SubsetEqual;\":\"⊆\",\"&Succeeds;\":\"≻\",\"&SucceedsEqual;\":\"⪰\",\"&SucceedsSlantEqual;\":\"≽\",\"&SucceedsTilde;\":\"≿\",\"&SuchThat;\":\"∋\",\"&Sum;\":\"∑\",\"&Sup;\":\"⋑\",\"&Superset;\":\"⊃\",\"&SupersetEqual;\":\"⊇\",\"&Supset;\":\"⋑\",\"&THORN\":\"Þ\",\"&THORN;\":\"Þ\",\"&TRADE;\":\"™\",\"&TSHcy;\":\"Ћ\",\"&TScy;\":\"Ц\",\"&Tab;\":\"\\t\",\"&Tau;\":\"Τ\",\"&Tcaron;\":\"Ť\",\"&Tcedil;\":\"Ţ\",\"&Tcy;\":\"Т\",\"&Tfr;\":\"𝔗\",\"&Therefore;\":\"∴\",\"&Theta;\":\"Θ\",\"&ThickSpace;\":\"  \",\"&ThinSpace;\":\" \",\"&Tilde;\":\"∼\",\"&TildeEqual;\":\"≃\",\"&TildeFullEqual;\":\"≅\",\"&TildeTilde;\":\"≈\",\"&Topf;\":\"𝕋\",\"&TripleDot;\":\"⃛\",\"&Tscr;\":\"𝒯\",\"&Tstrok;\":\"Ŧ\",\"&Uacute\":\"Ú\",\"&Uacute;\":\"Ú\",\"&Uarr;\":\"↟\",\"&Uarrocir;\":\"⥉\",\"&Ubrcy;\":\"Ў\",\"&Ubreve;\":\"Ŭ\",\"&Ucirc\":\"Û\",\"&Ucirc;\":\"Û\",\"&Ucy;\":\"У\",\"&Udblac;\":\"Ű\",\"&Ufr;\":\"𝔘\",\"&Ugrave\":\"Ù\",\"&Ugrave;\":\"Ù\",\"&Umacr;\":\"Ū\",\"&UnderBar;\":\"_\",\"&UnderBrace;\":\"⏟\",\"&UnderBracket;\":\"⎵\",\"&UnderParenthesis;\":\"⏝\",\"&Union;\":\"⋃\",\"&UnionPlus;\":\"⊎\",\"&Uogon;\":\"Ų\",\"&Uopf;\":\"𝕌\",\"&UpArrow;\":\"↑\",\"&UpArrowBar;\":\"⤒\",\"&UpArrowDownArrow;\":\"⇅\",\"&UpDownArrow;\":\"↕\",\"&UpEquilibrium;\":\"⥮\",\"&UpTee;\":\"⊥\",\"&UpTeeArrow;\":\"↥\",\"&Uparrow;\":\"⇑\",\"&Updownarrow;\":\"⇕\",\"&UpperLeftArrow;\":\"↖\",\"&UpperRightArrow;\":\"↗\",\"&Upsi;\":\"ϒ\",\"&Upsilon;\":\"Υ\",\"&Uring;\":\"Ů\",\"&Uscr;\":\"𝒰\",\"&Utilde;\":\"Ũ\",\"&Uuml\":\"Ü\",\"&Uuml;\":\"Ü\",\"&VDash;\":\"⊫\",\"&Vbar;\":\"⫫\",\"&Vcy;\":\"В\",\"&Vdash;\":\"⊩\",\"&Vdashl;\":\"⫦\",\"&Vee;\":\"⋁\",\"&Verbar;\":\"‖\",\"&Vert;\":\"‖\",\"&VerticalBar;\":\"∣\",\"&VerticalLine;\":\"|\",\"&VerticalSeparator;\":\"❘\",\"&VerticalTilde;\":\"≀\",\"&VeryThinSpace;\":\" \",\"&Vfr;\":\"𝔙\",\"&Vopf;\":\"𝕍\",\"&Vscr;\":\"𝒱\",\"&Vvdash;\":\"⊪\",\"&Wcirc;\":\"Ŵ\",\"&Wedge;\":\"⋀\",\"&Wfr;\":\"𝔚\",\"&Wopf;\":\"𝕎\",\"&Wscr;\":\"𝒲\",\"&Xfr;\":\"𝔛\",\"&Xi;\":\"Ξ\",\"&Xopf;\":\"𝕏\",\"&Xscr;\":\"𝒳\",\"&YAcy;\":\"Я\",\"&YIcy;\":\"Ї\",\"&YUcy;\":\"Ю\",\"&Yacute\":\"Ý\",\"&Yacute;\":\"Ý\",\"&Ycirc;\":\"Ŷ\",\"&Ycy;\":\"Ы\",\"&Yfr;\":\"𝔜\",\"&Yopf;\":\"𝕐\",\"&Yscr;\":\"𝒴\",\"&Yuml;\":\"Ÿ\",\"&ZHcy;\":\"Ж\",\"&Zacute;\":\"Ź\",\"&Zcaron;\":\"Ž\",\"&Zcy;\":\"З\",\"&Zdot;\":\"Ż\",\"&ZeroWidthSpace;\":\"​\",\"&Zeta;\":\"Ζ\",\"&Zfr;\":\"ℨ\",\"&Zopf;\":\"ℤ\",\"&Zscr;\":\"𝒵\",\"&aacute\":\"á\",\"&aacute;\":\"á\",\"&abreve;\":\"ă\",\"&ac;\":\"∾\",\"&acE;\":\"∾̳\",\"&acd;\":\"∿\",\"&acirc\":\"â\",\"&acirc;\":\"â\",\"&acute\":\"´\",\"&acute;\":\"´\",\"&acy;\":\"а\",\"&aelig\":\"æ\",\"&aelig;\":\"æ\",\"&af;\":\"⁡\",\"&afr;\":\"𝔞\",\"&agrave\":\"à\",\"&agrave;\":\"à\",\"&alefsym;\":\"ℵ\",\"&aleph;\":\"ℵ\",\"&alpha;\":\"α\",\"&amacr;\":\"ā\",\"&amalg;\":\"⨿\",\"&amp\":\"&\",\"&amp;\":\"&\",\"&and;\":\"∧\",\"&andand;\":\"⩕\",\"&andd;\":\"⩜\",\"&andslope;\":\"⩘\",\"&andv;\":\"⩚\",\"&ang;\":\"∠\",\"&ange;\":\"⦤\",\"&angle;\":\"∠\",\"&angmsd;\":\"∡\",\"&angmsdaa;\":\"⦨\",\"&angmsdab;\":\"⦩\",\"&angmsdac;\":\"⦪\",\"&angmsdad;\":\"⦫\",\"&angmsdae;\":\"⦬\",\"&angmsdaf;\":\"⦭\",\"&angmsdag;\":\"⦮\",\"&angmsdah;\":\"⦯\",\"&angrt;\":\"∟\",\"&angrtvb;\":\"⊾\",\"&angrtvbd;\":\"⦝\",\"&angsph;\":\"∢\",\"&angst;\":\"Å\",\"&angzarr;\":\"⍼\",\"&aogon;\":\"ą\",\"&aopf;\":\"𝕒\",\"&ap;\":\"≈\",\"&apE;\":\"⩰\",\"&apacir;\":\"⩯\",\"&ape;\":\"≊\",\"&apid;\":\"≋\",\"&apos;\":\"'\",\"&approx;\":\"≈\",\"&approxeq;\":\"≊\",\"&aring\":\"å\",\"&aring;\":\"å\",\"&ascr;\":\"𝒶\",\"&ast;\":\"*\",\"&asymp;\":\"≈\",\"&asympeq;\":\"≍\",\"&atilde\":\"ã\",\"&atilde;\":\"ã\",\"&auml\":\"ä\",\"&auml;\":\"ä\",\"&awconint;\":\"∳\",\"&awint;\":\"⨑\",\"&bNot;\":\"⫭\",\"&backcong;\":\"≌\",\"&backepsilon;\":\"϶\",\"&backprime;\":\"‵\",\"&backsim;\":\"∽\",\"&backsimeq;\":\"⋍\",\"&barvee;\":\"⊽\",\"&barwed;\":\"⌅\",\"&barwedge;\":\"⌅\",\"&bbrk;\":\"⎵\",\"&bbrktbrk;\":\"⎶\",\"&bcong;\":\"≌\",\"&bcy;\":\"б\",\"&bdquo;\":\"„\",\"&becaus;\":\"∵\",\"&because;\":\"∵\",\"&bemptyv;\":\"⦰\",\"&bepsi;\":\"϶\",\"&bernou;\":\"ℬ\",\"&beta;\":\"β\",\"&beth;\":\"ℶ\",\"&between;\":\"≬\",\"&bfr;\":\"𝔟\",\"&bigcap;\":\"⋂\",\"&bigcirc;\":\"◯\",\"&bigcup;\":\"⋃\",\"&bigodot;\":\"⨀\",\"&bigoplus;\":\"⨁\",\"&bigotimes;\":\"⨂\",\"&bigsqcup;\":\"⨆\",\"&bigstar;\":\"★\",\"&bigtriangledown;\":\"▽\",\"&bigtriangleup;\":\"△\",\"&biguplus;\":\"⨄\",\"&bigvee;\":\"⋁\",\"&bigwedge;\":\"⋀\",\"&bkarow;\":\"⤍\",\"&blacklozenge;\":\"⧫\",\"&blacksquare;\":\"▪\",\"&blacktriangle;\":\"▴\",\"&blacktriangledown;\":\"▾\",\"&blacktriangleleft;\":\"◂\",\"&blacktriangleright;\":\"▸\",\"&blank;\":\"␣\",\"&blk12;\":\"▒\",\"&blk14;\":\"░\",\"&blk34;\":\"▓\",\"&block;\":\"█\",\"&bne;\":\"=⃥\",\"&bnequiv;\":\"≡⃥\",\"&bnot;\":\"⌐\",\"&bopf;\":\"𝕓\",\"&bot;\":\"⊥\",\"&bottom;\":\"⊥\",\"&bowtie;\":\"⋈\",\"&boxDL;\":\"╗\",\"&boxDR;\":\"╔\",\"&boxDl;\":\"╖\",\"&boxDr;\":\"╓\",\"&boxH;\":\"═\",\"&boxHD;\":\"╦\",\"&boxHU;\":\"╩\",\"&boxHd;\":\"╤\",\"&boxHu;\":\"╧\",\"&boxUL;\":\"╝\",\"&boxUR;\":\"╚\",\"&boxUl;\":\"╜\",\"&boxUr;\":\"╙\",\"&boxV;\":\"║\",\"&boxVH;\":\"╬\",\"&boxVL;\":\"╣\",\"&boxVR;\":\"╠\",\"&boxVh;\":\"╫\",\"&boxVl;\":\"╢\",\"&boxVr;\":\"╟\",\"&boxbox;\":\"⧉\",\"&boxdL;\":\"╕\",\"&boxdR;\":\"╒\",\"&boxdl;\":\"┐\",\"&boxdr;\":\"┌\",\"&boxh;\":\"─\",\"&boxhD;\":\"╥\",\"&boxhU;\":\"╨\",\"&boxhd;\":\"┬\",\"&boxhu;\":\"┴\",\"&boxminus;\":\"⊟\",\"&boxplus;\":\"⊞\",\"&boxtimes;\":\"⊠\",\"&boxuL;\":\"╛\",\"&boxuR;\":\"╘\",\"&boxul;\":\"┘\",\"&boxur;\":\"└\",\"&boxv;\":\"│\",\"&boxvH;\":\"╪\",\"&boxvL;\":\"╡\",\"&boxvR;\":\"╞\",\"&boxvh;\":\"┼\",\"&boxvl;\":\"┤\",\"&boxvr;\":\"├\",\"&bprime;\":\"‵\",\"&breve;\":\"˘\",\"&brvbar\":\"¦\",\"&brvbar;\":\"¦\",\"&bscr;\":\"𝒷\",\"&bsemi;\":\"⁏\",\"&bsim;\":\"∽\",\"&bsime;\":\"⋍\",\"&bsol;\":\"\\\\\",\"&bsolb;\":\"⧅\",\"&bsolhsub;\":\"⟈\",\"&bull;\":\"•\",\"&bullet;\":\"•\",\"&bump;\":\"≎\",\"&bumpE;\":\"⪮\",\"&bumpe;\":\"≏\",\"&bumpeq;\":\"≏\",\"&cacute;\":\"ć\",\"&cap;\":\"∩\",\"&capand;\":\"⩄\",\"&capbrcup;\":\"⩉\",\"&capcap;\":\"⩋\",\"&capcup;\":\"⩇\",\"&capdot;\":\"⩀\",\"&caps;\":\"∩︀\",\"&caret;\":\"⁁\",\"&caron;\":\"ˇ\",\"&ccaps;\":\"⩍\",\"&ccaron;\":\"č\",\"&ccedil\":\"ç\",\"&ccedil;\":\"ç\",\"&ccirc;\":\"ĉ\",\"&ccups;\":\"⩌\",\"&ccupssm;\":\"⩐\",\"&cdot;\":\"ċ\",\"&cedil\":\"¸\",\"&cedil;\":\"¸\",\"&cemptyv;\":\"⦲\",\"&cent\":\"¢\",\"&cent;\":\"¢\",\"&centerdot;\":\"·\",\"&cfr;\":\"𝔠\",\"&chcy;\":\"ч\",\"&check;\":\"✓\",\"&checkmark;\":\"✓\",\"&chi;\":\"χ\",\"&cir;\":\"○\",\"&cirE;\":\"⧃\",\"&circ;\":\"ˆ\",\"&circeq;\":\"≗\",\"&circlearrowleft;\":\"↺\",\"&circlearrowright;\":\"↻\",\"&circledR;\":\"®\",\"&circledS;\":\"Ⓢ\",\"&circledast;\":\"⊛\",\"&circledcirc;\":\"⊚\",\"&circleddash;\":\"⊝\",\"&cire;\":\"≗\",\"&cirfnint;\":\"⨐\",\"&cirmid;\":\"⫯\",\"&cirscir;\":\"⧂\",\"&clubs;\":\"♣\",\"&clubsuit;\":\"♣\",\"&colon;\":\":\",\"&colone;\":\"≔\",\"&coloneq;\":\"≔\",\"&comma;\":\",\",\"&commat;\":\"@\",\"&comp;\":\"∁\",\"&compfn;\":\"∘\",\"&complement;\":\"∁\",\"&complexes;\":\"ℂ\",\"&cong;\":\"≅\",\"&congdot;\":\"⩭\",\"&conint;\":\"∮\",\"&copf;\":\"𝕔\",\"&coprod;\":\"∐\",\"&copy\":\"©\",\"&copy;\":\"©\",\"&copysr;\":\"℗\",\"&crarr;\":\"↵\",\"&cross;\":\"✗\",\"&cscr;\":\"𝒸\",\"&csub;\":\"⫏\",\"&csube;\":\"⫑\",\"&csup;\":\"⫐\",\"&csupe;\":\"⫒\",\"&ctdot;\":\"⋯\",\"&cudarrl;\":\"⤸\",\"&cudarrr;\":\"⤵\",\"&cuepr;\":\"⋞\",\"&cuesc;\":\"⋟\",\"&cularr;\":\"↶\",\"&cularrp;\":\"⤽\",\"&cup;\":\"∪\",\"&cupbrcap;\":\"⩈\",\"&cupcap;\":\"⩆\",\"&cupcup;\":\"⩊\",\"&cupdot;\":\"⊍\",\"&cupor;\":\"⩅\",\"&cups;\":\"∪︀\",\"&curarr;\":\"↷\",\"&curarrm;\":\"⤼\",\"&curlyeqprec;\":\"⋞\",\"&curlyeqsucc;\":\"⋟\",\"&curlyvee;\":\"⋎\",\"&curlywedge;\":\"⋏\",\"&curren\":\"¤\",\"&curren;\":\"¤\",\"&curvearrowleft;\":\"↶\",\"&curvearrowright;\":\"↷\",\"&cuvee;\":\"⋎\",\"&cuwed;\":\"⋏\",\"&cwconint;\":\"∲\",\"&cwint;\":\"∱\",\"&cylcty;\":\"⌭\",\"&dArr;\":\"⇓\",\"&dHar;\":\"⥥\",\"&dagger;\":\"†\",\"&daleth;\":\"ℸ\",\"&darr;\":\"↓\",\"&dash;\":\"‐\",\"&dashv;\":\"⊣\",\"&dbkarow;\":\"⤏\",\"&dblac;\":\"˝\",\"&dcaron;\":\"ď\",\"&dcy;\":\"д\",\"&dd;\":\"ⅆ\",\"&ddagger;\":\"‡\",\"&ddarr;\":\"⇊\",\"&ddotseq;\":\"⩷\",\"&deg\":\"°\",\"&deg;\":\"°\",\"&delta;\":\"δ\",\"&demptyv;\":\"⦱\",\"&dfisht;\":\"⥿\",\"&dfr;\":\"𝔡\",\"&dharl;\":\"⇃\",\"&dharr;\":\"⇂\",\"&diam;\":\"⋄\",\"&diamond;\":\"⋄\",\"&diamondsuit;\":\"♦\",\"&diams;\":\"♦\",\"&die;\":\"¨\",\"&digamma;\":\"ϝ\",\"&disin;\":\"⋲\",\"&div;\":\"÷\",\"&divide\":\"÷\",\"&divide;\":\"÷\",\"&divideontimes;\":\"⋇\",\"&divonx;\":\"⋇\",\"&djcy;\":\"ђ\",\"&dlcorn;\":\"⌞\",\"&dlcrop;\":\"⌍\",\"&dollar;\":\"$\",\"&dopf;\":\"𝕕\",\"&dot;\":\"˙\",\"&doteq;\":\"≐\",\"&doteqdot;\":\"≑\",\"&dotminus;\":\"∸\",\"&dotplus;\":\"∔\",\"&dotsquare;\":\"⊡\",\"&doublebarwedge;\":\"⌆\",\"&downarrow;\":\"↓\",\"&downdownarrows;\":\"⇊\",\"&downharpoonleft;\":\"⇃\",\"&downharpoonright;\":\"⇂\",\"&drbkarow;\":\"⤐\",\"&drcorn;\":\"⌟\",\"&drcrop;\":\"⌌\",\"&dscr;\":\"𝒹\",\"&dscy;\":\"ѕ\",\"&dsol;\":\"⧶\",\"&dstrok;\":\"đ\",\"&dtdot;\":\"⋱\",\"&dtri;\":\"▿\",\"&dtrif;\":\"▾\",\"&duarr;\":\"⇵\",\"&duhar;\":\"⥯\",\"&dwangle;\":\"⦦\",\"&dzcy;\":\"џ\",\"&dzigrarr;\":\"⟿\",\"&eDDot;\":\"⩷\",\"&eDot;\":\"≑\",\"&eacute\":\"é\",\"&eacute;\":\"é\",\"&easter;\":\"⩮\",\"&ecaron;\":\"ě\",\"&ecir;\":\"≖\",\"&ecirc\":\"ê\",\"&ecirc;\":\"ê\",\"&ecolon;\":\"≕\",\"&ecy;\":\"э\",\"&edot;\":\"ė\",\"&ee;\":\"ⅇ\",\"&efDot;\":\"≒\",\"&efr;\":\"𝔢\",\"&eg;\":\"⪚\",\"&egrave\":\"è\",\"&egrave;\":\"è\",\"&egs;\":\"⪖\",\"&egsdot;\":\"⪘\",\"&el;\":\"⪙\",\"&elinters;\":\"⏧\",\"&ell;\":\"ℓ\",\"&els;\":\"⪕\",\"&elsdot;\":\"⪗\",\"&emacr;\":\"ē\",\"&empty;\":\"∅\",\"&emptyset;\":\"∅\",\"&emptyv;\":\"∅\",\"&emsp13;\":\" \",\"&emsp14;\":\" \",\"&emsp;\":\" \",\"&eng;\":\"ŋ\",\"&ensp;\":\" \",\"&eogon;\":\"ę\",\"&eopf;\":\"𝕖\",\"&epar;\":\"⋕\",\"&eparsl;\":\"⧣\",\"&eplus;\":\"⩱\",\"&epsi;\":\"ε\",\"&epsilon;\":\"ε\",\"&epsiv;\":\"ϵ\",\"&eqcirc;\":\"≖\",\"&eqcolon;\":\"≕\",\"&eqsim;\":\"≂\",\"&eqslantgtr;\":\"⪖\",\"&eqslantless;\":\"⪕\",\"&equals;\":\"=\",\"&equest;\":\"≟\",\"&equiv;\":\"≡\",\"&equivDD;\":\"⩸\",\"&eqvparsl;\":\"⧥\",\"&erDot;\":\"≓\",\"&erarr;\":\"⥱\",\"&escr;\":\"ℯ\",\"&esdot;\":\"≐\",\"&esim;\":\"≂\",\"&eta;\":\"η\",\"&eth\":\"ð\",\"&eth;\":\"ð\",\"&euml\":\"ë\",\"&euml;\":\"ë\",\"&euro;\":\"€\",\"&excl;\":\"!\",\"&exist;\":\"∃\",\"&expectation;\":\"ℰ\",\"&exponentiale;\":\"ⅇ\",\"&fallingdotseq;\":\"≒\",\"&fcy;\":\"ф\",\"&female;\":\"♀\",\"&ffilig;\":\"ﬃ\",\"&fflig;\":\"ﬀ\",\"&ffllig;\":\"ﬄ\",\"&ffr;\":\"𝔣\",\"&filig;\":\"ﬁ\",\"&fjlig;\":\"fj\",\"&flat;\":\"♭\",\"&fllig;\":\"ﬂ\",\"&fltns;\":\"▱\",\"&fnof;\":\"ƒ\",\"&fopf;\":\"𝕗\",\"&forall;\":\"∀\",\"&fork;\":\"⋔\",\"&forkv;\":\"⫙\",\"&fpartint;\":\"⨍\",\"&frac12\":\"½\",\"&frac12;\":\"½\",\"&frac13;\":\"⅓\",\"&frac14\":\"¼\",\"&frac14;\":\"¼\",\"&frac15;\":\"⅕\",\"&frac16;\":\"⅙\",\"&frac18;\":\"⅛\",\"&frac23;\":\"⅔\",\"&frac25;\":\"⅖\",\"&frac34\":\"¾\",\"&frac34;\":\"¾\",\"&frac35;\":\"⅗\",\"&frac38;\":\"⅜\",\"&frac45;\":\"⅘\",\"&frac56;\":\"⅚\",\"&frac58;\":\"⅝\",\"&frac78;\":\"⅞\",\"&frasl;\":\"⁄\",\"&frown;\":\"⌢\",\"&fscr;\":\"𝒻\",\"&gE;\":\"≧\",\"&gEl;\":\"⪌\",\"&gacute;\":\"ǵ\",\"&gamma;\":\"γ\",\"&gammad;\":\"ϝ\",\"&gap;\":\"⪆\",\"&gbreve;\":\"ğ\",\"&gcirc;\":\"ĝ\",\"&gcy;\":\"г\",\"&gdot;\":\"ġ\",\"&ge;\":\"≥\",\"&gel;\":\"⋛\",\"&geq;\":\"≥\",\"&geqq;\":\"≧\",\"&geqslant;\":\"⩾\",\"&ges;\":\"⩾\",\"&gescc;\":\"⪩\",\"&gesdot;\":\"⪀\",\"&gesdoto;\":\"⪂\",\"&gesdotol;\":\"⪄\",\"&gesl;\":\"⋛︀\",\"&gesles;\":\"⪔\",\"&gfr;\":\"𝔤\",\"&gg;\":\"≫\",\"&ggg;\":\"⋙\",\"&gimel;\":\"ℷ\",\"&gjcy;\":\"ѓ\",\"&gl;\":\"≷\",\"&glE;\":\"⪒\",\"&gla;\":\"⪥\",\"&glj;\":\"⪤\",\"&gnE;\":\"≩\",\"&gnap;\":\"⪊\",\"&gnapprox;\":\"⪊\",\"&gne;\":\"⪈\",\"&gneq;\":\"⪈\",\"&gneqq;\":\"≩\",\"&gnsim;\":\"⋧\",\"&gopf;\":\"𝕘\",\"&grave;\":\"`\",\"&gscr;\":\"ℊ\",\"&gsim;\":\"≳\",\"&gsime;\":\"⪎\",\"&gsiml;\":\"⪐\",\"&gt\":\">\",\"&gt;\":\">\",\"&gtcc;\":\"⪧\",\"&gtcir;\":\"⩺\",\"&gtdot;\":\"⋗\",\"&gtlPar;\":\"⦕\",\"&gtquest;\":\"⩼\",\"&gtrapprox;\":\"⪆\",\"&gtrarr;\":\"⥸\",\"&gtrdot;\":\"⋗\",\"&gtreqless;\":\"⋛\",\"&gtreqqless;\":\"⪌\",\"&gtrless;\":\"≷\",\"&gtrsim;\":\"≳\",\"&gvertneqq;\":\"≩︀\",\"&gvnE;\":\"≩︀\",\"&hArr;\":\"⇔\",\"&hairsp;\":\" \",\"&half;\":\"½\",\"&hamilt;\":\"ℋ\",\"&hardcy;\":\"ъ\",\"&harr;\":\"↔\",\"&harrcir;\":\"⥈\",\"&harrw;\":\"↭\",\"&hbar;\":\"ℏ\",\"&hcirc;\":\"ĥ\",\"&hearts;\":\"♥\",\"&heartsuit;\":\"♥\",\"&hellip;\":\"…\",\"&hercon;\":\"⊹\",\"&hfr;\":\"𝔥\",\"&hksearow;\":\"⤥\",\"&hkswarow;\":\"⤦\",\"&hoarr;\":\"⇿\",\"&homtht;\":\"∻\",\"&hookleftarrow;\":\"↩\",\"&hookrightarrow;\":\"↪\",\"&hopf;\":\"𝕙\",\"&horbar;\":\"―\",\"&hscr;\":\"𝒽\",\"&hslash;\":\"ℏ\",\"&hstrok;\":\"ħ\",\"&hybull;\":\"⁃\",\"&hyphen;\":\"‐\",\"&iacute\":\"í\",\"&iacute;\":\"í\",\"&ic;\":\"⁣\",\"&icirc\":\"î\",\"&icirc;\":\"î\",\"&icy;\":\"и\",\"&iecy;\":\"е\",\"&iexcl\":\"¡\",\"&iexcl;\":\"¡\",\"&iff;\":\"⇔\",\"&ifr;\":\"𝔦\",\"&igrave\":\"ì\",\"&igrave;\":\"ì\",\"&ii;\":\"ⅈ\",\"&iiiint;\":\"⨌\",\"&iiint;\":\"∭\",\"&iinfin;\":\"⧜\",\"&iiota;\":\"℩\",\"&ijlig;\":\"ĳ\",\"&imacr;\":\"ī\",\"&image;\":\"ℑ\",\"&imagline;\":\"ℐ\",\"&imagpart;\":\"ℑ\",\"&imath;\":\"ı\",\"&imof;\":\"⊷\",\"&imped;\":\"Ƶ\",\"&in;\":\"∈\",\"&incare;\":\"℅\",\"&infin;\":\"∞\",\"&infintie;\":\"⧝\",\"&inodot;\":\"ı\",\"&int;\":\"∫\",\"&intcal;\":\"⊺\",\"&integers;\":\"ℤ\",\"&intercal;\":\"⊺\",\"&intlarhk;\":\"⨗\",\"&intprod;\":\"⨼\",\"&iocy;\":\"ё\",\"&iogon;\":\"į\",\"&iopf;\":\"𝕚\",\"&iota;\":\"ι\",\"&iprod;\":\"⨼\",\"&iquest\":\"¿\",\"&iquest;\":\"¿\",\"&iscr;\":\"𝒾\",\"&isin;\":\"∈\",\"&isinE;\":\"⋹\",\"&isindot;\":\"⋵\",\"&isins;\":\"⋴\",\"&isinsv;\":\"⋳\",\"&isinv;\":\"∈\",\"&it;\":\"⁢\",\"&itilde;\":\"ĩ\",\"&iukcy;\":\"і\",\"&iuml\":\"ï\",\"&iuml;\":\"ï\",\"&jcirc;\":\"ĵ\",\"&jcy;\":\"й\",\"&jfr;\":\"𝔧\",\"&jmath;\":\"ȷ\",\"&jopf;\":\"𝕛\",\"&jscr;\":\"𝒿\",\"&jsercy;\":\"ј\",\"&jukcy;\":\"є\",\"&kappa;\":\"κ\",\"&kappav;\":\"ϰ\",\"&kcedil;\":\"ķ\",\"&kcy;\":\"к\",\"&kfr;\":\"𝔨\",\"&kgreen;\":\"ĸ\",\"&khcy;\":\"х\",\"&kjcy;\":\"ќ\",\"&kopf;\":\"𝕜\",\"&kscr;\":\"𝓀\",\"&lAarr;\":\"⇚\",\"&lArr;\":\"⇐\",\"&lAtail;\":\"⤛\",\"&lBarr;\":\"⤎\",\"&lE;\":\"≦\",\"&lEg;\":\"⪋\",\"&lHar;\":\"⥢\",\"&lacute;\":\"ĺ\",\"&laemptyv;\":\"⦴\",\"&lagran;\":\"ℒ\",\"&lambda;\":\"λ\",\"&lang;\":\"⟨\",\"&langd;\":\"⦑\",\"&langle;\":\"⟨\",\"&lap;\":\"⪅\",\"&laquo\":\"«\",\"&laquo;\":\"«\",\"&larr;\":\"←\",\"&larrb;\":\"⇤\",\"&larrbfs;\":\"⤟\",\"&larrfs;\":\"⤝\",\"&larrhk;\":\"↩\",\"&larrlp;\":\"↫\",\"&larrpl;\":\"⤹\",\"&larrsim;\":\"⥳\",\"&larrtl;\":\"↢\",\"&lat;\":\"⪫\",\"&latail;\":\"⤙\",\"&late;\":\"⪭\",\"&lates;\":\"⪭︀\",\"&lbarr;\":\"⤌\",\"&lbbrk;\":\"❲\",\"&lbrace;\":\"{\",\"&lbrack;\":\"[\",\"&lbrke;\":\"⦋\",\"&lbrksld;\":\"⦏\",\"&lbrkslu;\":\"⦍\",\"&lcaron;\":\"ľ\",\"&lcedil;\":\"ļ\",\"&lceil;\":\"⌈\",\"&lcub;\":\"{\",\"&lcy;\":\"л\",\"&ldca;\":\"⤶\",\"&ldquo;\":\"“\",\"&ldquor;\":\"„\",\"&ldrdhar;\":\"⥧\",\"&ldrushar;\":\"⥋\",\"&ldsh;\":\"↲\",\"&le;\":\"≤\",\"&leftarrow;\":\"←\",\"&leftarrowtail;\":\"↢\",\"&leftharpoondown;\":\"↽\",\"&leftharpoonup;\":\"↼\",\"&leftleftarrows;\":\"⇇\",\"&leftrightarrow;\":\"↔\",\"&leftrightarrows;\":\"⇆\",\"&leftrightharpoons;\":\"⇋\",\"&leftrightsquigarrow;\":\"↭\",\"&leftthreetimes;\":\"⋋\",\"&leg;\":\"⋚\",\"&leq;\":\"≤\",\"&leqq;\":\"≦\",\"&leqslant;\":\"⩽\",\"&les;\":\"⩽\",\"&lescc;\":\"⪨\",\"&lesdot;\":\"⩿\",\"&lesdoto;\":\"⪁\",\"&lesdotor;\":\"⪃\",\"&lesg;\":\"⋚︀\",\"&lesges;\":\"⪓\",\"&lessapprox;\":\"⪅\",\"&lessdot;\":\"⋖\",\"&lesseqgtr;\":\"⋚\",\"&lesseqqgtr;\":\"⪋\",\"&lessgtr;\":\"≶\",\"&lesssim;\":\"≲\",\"&lfisht;\":\"⥼\",\"&lfloor;\":\"⌊\",\"&lfr;\":\"𝔩\",\"&lg;\":\"≶\",\"&lgE;\":\"⪑\",\"&lhard;\":\"↽\",\"&lharu;\":\"↼\",\"&lharul;\":\"⥪\",\"&lhblk;\":\"▄\",\"&ljcy;\":\"љ\",\"&ll;\":\"≪\",\"&llarr;\":\"⇇\",\"&llcorner;\":\"⌞\",\"&llhard;\":\"⥫\",\"&lltri;\":\"◺\",\"&lmidot;\":\"ŀ\",\"&lmoust;\":\"⎰\",\"&lmoustache;\":\"⎰\",\"&lnE;\":\"≨\",\"&lnap;\":\"⪉\",\"&lnapprox;\":\"⪉\",\"&lne;\":\"⪇\",\"&lneq;\":\"⪇\",\"&lneqq;\":\"≨\",\"&lnsim;\":\"⋦\",\"&loang;\":\"⟬\",\"&loarr;\":\"⇽\",\"&lobrk;\":\"⟦\",\"&longleftarrow;\":\"⟵\",\"&longleftrightarrow;\":\"⟷\",\"&longmapsto;\":\"⟼\",\"&longrightarrow;\":\"⟶\",\"&looparrowleft;\":\"↫\",\"&looparrowright;\":\"↬\",\"&lopar;\":\"⦅\",\"&lopf;\":\"𝕝\",\"&loplus;\":\"⨭\",\"&lotimes;\":\"⨴\",\"&lowast;\":\"∗\",\"&lowbar;\":\"_\",\"&loz;\":\"◊\",\"&lozenge;\":\"◊\",\"&lozf;\":\"⧫\",\"&lpar;\":\"(\",\"&lparlt;\":\"⦓\",\"&lrarr;\":\"⇆\",\"&lrcorner;\":\"⌟\",\"&lrhar;\":\"⇋\",\"&lrhard;\":\"⥭\",\"&lrm;\":\"‎\",\"&lrtri;\":\"⊿\",\"&lsaquo;\":\"‹\",\"&lscr;\":\"𝓁\",\"&lsh;\":\"↰\",\"&lsim;\":\"≲\",\"&lsime;\":\"⪍\",\"&lsimg;\":\"⪏\",\"&lsqb;\":\"[\",\"&lsquo;\":\"‘\",\"&lsquor;\":\"‚\",\"&lstrok;\":\"ł\",\"&lt\":\"<\",\"&lt;\":\"<\",\"&ltcc;\":\"⪦\",\"&ltcir;\":\"⩹\",\"&ltdot;\":\"⋖\",\"&lthree;\":\"⋋\",\"&ltimes;\":\"⋉\",\"&ltlarr;\":\"⥶\",\"&ltquest;\":\"⩻\",\"&ltrPar;\":\"⦖\",\"&ltri;\":\"◃\",\"&ltrie;\":\"⊴\",\"&ltrif;\":\"◂\",\"&lurdshar;\":\"⥊\",\"&luruhar;\":\"⥦\",\"&lvertneqq;\":\"≨︀\",\"&lvnE;\":\"≨︀\",\"&mDDot;\":\"∺\",\"&macr\":\"¯\",\"&macr;\":\"¯\",\"&male;\":\"♂\",\"&malt;\":\"✠\",\"&maltese;\":\"✠\",\"&map;\":\"↦\",\"&mapsto;\":\"↦\",\"&mapstodown;\":\"↧\",\"&mapstoleft;\":\"↤\",\"&mapstoup;\":\"↥\",\"&marker;\":\"▮\",\"&mcomma;\":\"⨩\",\"&mcy;\":\"м\",\"&mdash;\":\"—\",\"&measuredangle;\":\"∡\",\"&mfr;\":\"𝔪\",\"&mho;\":\"℧\",\"&micro\":\"µ\",\"&micro;\":\"µ\",\"&mid;\":\"∣\",\"&midast;\":\"*\",\"&midcir;\":\"⫰\",\"&middot\":\"·\",\"&middot;\":\"·\",\"&minus;\":\"−\",\"&minusb;\":\"⊟\",\"&minusd;\":\"∸\",\"&minusdu;\":\"⨪\",\"&mlcp;\":\"⫛\",\"&mldr;\":\"…\",\"&mnplus;\":\"∓\",\"&models;\":\"⊧\",\"&mopf;\":\"𝕞\",\"&mp;\":\"∓\",\"&mscr;\":\"𝓂\",\"&mstpos;\":\"∾\",\"&mu;\":\"μ\",\"&multimap;\":\"⊸\",\"&mumap;\":\"⊸\",\"&nGg;\":\"⋙̸\",\"&nGt;\":\"≫⃒\",\"&nGtv;\":\"≫̸\",\"&nLeftarrow;\":\"⇍\",\"&nLeftrightarrow;\":\"⇎\",\"&nLl;\":\"⋘̸\",\"&nLt;\":\"≪⃒\",\"&nLtv;\":\"≪̸\",\"&nRightarrow;\":\"⇏\",\"&nVDash;\":\"⊯\",\"&nVdash;\":\"⊮\",\"&nabla;\":\"∇\",\"&nacute;\":\"ń\",\"&nang;\":\"∠⃒\",\"&nap;\":\"≉\",\"&napE;\":\"⩰̸\",\"&napid;\":\"≋̸\",\"&napos;\":\"ŉ\",\"&napprox;\":\"≉\",\"&natur;\":\"♮\",\"&natural;\":\"♮\",\"&naturals;\":\"ℕ\",\"&nbsp\":\" \",\"&nbsp;\":\" \",\"&nbump;\":\"≎̸\",\"&nbumpe;\":\"≏̸\",\"&ncap;\":\"⩃\",\"&ncaron;\":\"ň\",\"&ncedil;\":\"ņ\",\"&ncong;\":\"≇\",\"&ncongdot;\":\"⩭̸\",\"&ncup;\":\"⩂\",\"&ncy;\":\"н\",\"&ndash;\":\"–\",\"&ne;\":\"≠\",\"&neArr;\":\"⇗\",\"&nearhk;\":\"⤤\",\"&nearr;\":\"↗\",\"&nearrow;\":\"↗\",\"&nedot;\":\"≐̸\",\"&nequiv;\":\"≢\",\"&nesear;\":\"⤨\",\"&nesim;\":\"≂̸\",\"&nexist;\":\"∄\",\"&nexists;\":\"∄\",\"&nfr;\":\"𝔫\",\"&ngE;\":\"≧̸\",\"&nge;\":\"≱\",\"&ngeq;\":\"≱\",\"&ngeqq;\":\"≧̸\",\"&ngeqslant;\":\"⩾̸\",\"&nges;\":\"⩾̸\",\"&ngsim;\":\"≵\",\"&ngt;\":\"≯\",\"&ngtr;\":\"≯\",\"&nhArr;\":\"⇎\",\"&nharr;\":\"↮\",\"&nhpar;\":\"⫲\",\"&ni;\":\"∋\",\"&nis;\":\"⋼\",\"&nisd;\":\"⋺\",\"&niv;\":\"∋\",\"&njcy;\":\"њ\",\"&nlArr;\":\"⇍\",\"&nlE;\":\"≦̸\",\"&nlarr;\":\"↚\",\"&nldr;\":\"‥\",\"&nle;\":\"≰\",\"&nleftarrow;\":\"↚\",\"&nleftrightarrow;\":\"↮\",\"&nleq;\":\"≰\",\"&nleqq;\":\"≦̸\",\"&nleqslant;\":\"⩽̸\",\"&nles;\":\"⩽̸\",\"&nless;\":\"≮\",\"&nlsim;\":\"≴\",\"&nlt;\":\"≮\",\"&nltri;\":\"⋪\",\"&nltrie;\":\"⋬\",\"&nmid;\":\"∤\",\"&nopf;\":\"𝕟\",\"&not\":\"¬\",\"&not;\":\"¬\",\"&notin;\":\"∉\",\"&notinE;\":\"⋹̸\",\"&notindot;\":\"⋵̸\",\"&notinva;\":\"∉\",\"&notinvb;\":\"⋷\",\"&notinvc;\":\"⋶\",\"&notni;\":\"∌\",\"&notniva;\":\"∌\",\"&notnivb;\":\"⋾\",\"&notnivc;\":\"⋽\",\"&npar;\":\"∦\",\"&nparallel;\":\"∦\",\"&nparsl;\":\"⫽⃥\",\"&npart;\":\"∂̸\",\"&npolint;\":\"⨔\",\"&npr;\":\"⊀\",\"&nprcue;\":\"⋠\",\"&npre;\":\"⪯̸\",\"&nprec;\":\"⊀\",\"&npreceq;\":\"⪯̸\",\"&nrArr;\":\"⇏\",\"&nrarr;\":\"↛\",\"&nrarrc;\":\"⤳̸\",\"&nrarrw;\":\"↝̸\",\"&nrightarrow;\":\"↛\",\"&nrtri;\":\"⋫\",\"&nrtrie;\":\"⋭\",\"&nsc;\":\"⊁\",\"&nsccue;\":\"⋡\",\"&nsce;\":\"⪰̸\",\"&nscr;\":\"𝓃\",\"&nshortmid;\":\"∤\",\"&nshortparallel;\":\"∦\",\"&nsim;\":\"≁\",\"&nsime;\":\"≄\",\"&nsimeq;\":\"≄\",\"&nsmid;\":\"∤\",\"&nspar;\":\"∦\",\"&nsqsube;\":\"⋢\",\"&nsqsupe;\":\"⋣\",\"&nsub;\":\"⊄\",\"&nsubE;\":\"⫅̸\",\"&nsube;\":\"⊈\",\"&nsubset;\":\"⊂⃒\",\"&nsubseteq;\":\"⊈\",\"&nsubseteqq;\":\"⫅̸\",\"&nsucc;\":\"⊁\",\"&nsucceq;\":\"⪰̸\",\"&nsup;\":\"⊅\",\"&nsupE;\":\"⫆̸\",\"&nsupe;\":\"⊉\",\"&nsupset;\":\"⊃⃒\",\"&nsupseteq;\":\"⊉\",\"&nsupseteqq;\":\"⫆̸\",\"&ntgl;\":\"≹\",\"&ntilde\":\"ñ\",\"&ntilde;\":\"ñ\",\"&ntlg;\":\"≸\",\"&ntriangleleft;\":\"⋪\",\"&ntrianglelefteq;\":\"⋬\",\"&ntriangleright;\":\"⋫\",\"&ntrianglerighteq;\":\"⋭\",\"&nu;\":\"ν\",\"&num;\":\"#\",\"&numero;\":\"№\",\"&numsp;\":\" \",\"&nvDash;\":\"⊭\",\"&nvHarr;\":\"⤄\",\"&nvap;\":\"≍⃒\",\"&nvdash;\":\"⊬\",\"&nvge;\":\"≥⃒\",\"&nvgt;\":\">⃒\",\"&nvinfin;\":\"⧞\",\"&nvlArr;\":\"⤂\",\"&nvle;\":\"≤⃒\",\"&nvlt;\":\"<⃒\",\"&nvltrie;\":\"⊴⃒\",\"&nvrArr;\":\"⤃\",\"&nvrtrie;\":\"⊵⃒\",\"&nvsim;\":\"∼⃒\",\"&nwArr;\":\"⇖\",\"&nwarhk;\":\"⤣\",\"&nwarr;\":\"↖\",\"&nwarrow;\":\"↖\",\"&nwnear;\":\"⤧\",\"&oS;\":\"Ⓢ\",\"&oacute\":\"ó\",\"&oacute;\":\"ó\",\"&oast;\":\"⊛\",\"&ocir;\":\"⊚\",\"&ocirc\":\"ô\",\"&ocirc;\":\"ô\",\"&ocy;\":\"о\",\"&odash;\":\"⊝\",\"&odblac;\":\"ő\",\"&odiv;\":\"⨸\",\"&odot;\":\"⊙\",\"&odsold;\":\"⦼\",\"&oelig;\":\"œ\",\"&ofcir;\":\"⦿\",\"&ofr;\":\"𝔬\",\"&ogon;\":\"˛\",\"&ograve\":\"ò\",\"&ograve;\":\"ò\",\"&ogt;\":\"⧁\",\"&ohbar;\":\"⦵\",\"&ohm;\":\"Ω\",\"&oint;\":\"∮\",\"&olarr;\":\"↺\",\"&olcir;\":\"⦾\",\"&olcross;\":\"⦻\",\"&oline;\":\"‾\",\"&olt;\":\"⧀\",\"&omacr;\":\"ō\",\"&omega;\":\"ω\",\"&omicron;\":\"ο\",\"&omid;\":\"⦶\",\"&ominus;\":\"⊖\",\"&oopf;\":\"𝕠\",\"&opar;\":\"⦷\",\"&operp;\":\"⦹\",\"&oplus;\":\"⊕\",\"&or;\":\"∨\",\"&orarr;\":\"↻\",\"&ord;\":\"⩝\",\"&order;\":\"ℴ\",\"&orderof;\":\"ℴ\",\"&ordf\":\"ª\",\"&ordf;\":\"ª\",\"&ordm\":\"º\",\"&ordm;\":\"º\",\"&origof;\":\"⊶\",\"&oror;\":\"⩖\",\"&orslope;\":\"⩗\",\"&orv;\":\"⩛\",\"&oscr;\":\"ℴ\",\"&oslash\":\"ø\",\"&oslash;\":\"ø\",\"&osol;\":\"⊘\",\"&otilde\":\"õ\",\"&otilde;\":\"õ\",\"&otimes;\":\"⊗\",\"&otimesas;\":\"⨶\",\"&ouml\":\"ö\",\"&ouml;\":\"ö\",\"&ovbar;\":\"⌽\",\"&par;\":\"∥\",\"&para\":\"¶\",\"&para;\":\"¶\",\"&parallel;\":\"∥\",\"&parsim;\":\"⫳\",\"&parsl;\":\"⫽\",\"&part;\":\"∂\",\"&pcy;\":\"п\",\"&percnt;\":\"%\",\"&period;\":\".\",\"&permil;\":\"‰\",\"&perp;\":\"⊥\",\"&pertenk;\":\"‱\",\"&pfr;\":\"𝔭\",\"&phi;\":\"φ\",\"&phiv;\":\"ϕ\",\"&phmmat;\":\"ℳ\",\"&phone;\":\"☎\",\"&pi;\":\"π\",\"&pitchfork;\":\"⋔\",\"&piv;\":\"ϖ\",\"&planck;\":\"ℏ\",\"&planckh;\":\"ℎ\",\"&plankv;\":\"ℏ\",\"&plus;\":\"+\",\"&plusacir;\":\"⨣\",\"&plusb;\":\"⊞\",\"&pluscir;\":\"⨢\",\"&plusdo;\":\"∔\",\"&plusdu;\":\"⨥\",\"&pluse;\":\"⩲\",\"&plusmn\":\"±\",\"&plusmn;\":\"±\",\"&plussim;\":\"⨦\",\"&plustwo;\":\"⨧\",\"&pm;\":\"±\",\"&pointint;\":\"⨕\",\"&popf;\":\"𝕡\",\"&pound\":\"£\",\"&pound;\":\"£\",\"&pr;\":\"≺\",\"&prE;\":\"⪳\",\"&prap;\":\"⪷\",\"&prcue;\":\"≼\",\"&pre;\":\"⪯\",\"&prec;\":\"≺\",\"&precapprox;\":\"⪷\",\"&preccurlyeq;\":\"≼\",\"&preceq;\":\"⪯\",\"&precnapprox;\":\"⪹\",\"&precneqq;\":\"⪵\",\"&precnsim;\":\"⋨\",\"&precsim;\":\"≾\",\"&prime;\":\"′\",\"&primes;\":\"ℙ\",\"&prnE;\":\"⪵\",\"&prnap;\":\"⪹\",\"&prnsim;\":\"⋨\",\"&prod;\":\"∏\",\"&profalar;\":\"⌮\",\"&profline;\":\"⌒\",\"&profsurf;\":\"⌓\",\"&prop;\":\"∝\",\"&propto;\":\"∝\",\"&prsim;\":\"≾\",\"&prurel;\":\"⊰\",\"&pscr;\":\"𝓅\",\"&psi;\":\"ψ\",\"&puncsp;\":\" \",\"&qfr;\":\"𝔮\",\"&qint;\":\"⨌\",\"&qopf;\":\"𝕢\",\"&qprime;\":\"⁗\",\"&qscr;\":\"𝓆\",\"&quaternions;\":\"ℍ\",\"&quatint;\":\"⨖\",\"&quest;\":\"?\",\"&questeq;\":\"≟\",\"&quot\":'\"',\"&quot;\":'\"',\"&rAarr;\":\"⇛\",\"&rArr;\":\"⇒\",\"&rAtail;\":\"⤜\",\"&rBarr;\":\"⤏\",\"&rHar;\":\"⥤\",\"&race;\":\"∽̱\",\"&racute;\":\"ŕ\",\"&radic;\":\"√\",\"&raemptyv;\":\"⦳\",\"&rang;\":\"⟩\",\"&rangd;\":\"⦒\",\"&range;\":\"⦥\",\"&rangle;\":\"⟩\",\"&raquo\":\"»\",\"&raquo;\":\"»\",\"&rarr;\":\"→\",\"&rarrap;\":\"⥵\",\"&rarrb;\":\"⇥\",\"&rarrbfs;\":\"⤠\",\"&rarrc;\":\"⤳\",\"&rarrfs;\":\"⤞\",\"&rarrhk;\":\"↪\",\"&rarrlp;\":\"↬\",\"&rarrpl;\":\"⥅\",\"&rarrsim;\":\"⥴\",\"&rarrtl;\":\"↣\",\"&rarrw;\":\"↝\",\"&ratail;\":\"⤚\",\"&ratio;\":\"∶\",\"&rationals;\":\"ℚ\",\"&rbarr;\":\"⤍\",\"&rbbrk;\":\"❳\",\"&rbrace;\":\"}\",\"&rbrack;\":\"]\",\"&rbrke;\":\"⦌\",\"&rbrksld;\":\"⦎\",\"&rbrkslu;\":\"⦐\",\"&rcaron;\":\"ř\",\"&rcedil;\":\"ŗ\",\"&rceil;\":\"⌉\",\"&rcub;\":\"}\",\"&rcy;\":\"р\",\"&rdca;\":\"⤷\",\"&rdldhar;\":\"⥩\",\"&rdquo;\":\"”\",\"&rdquor;\":\"”\",\"&rdsh;\":\"↳\",\"&real;\":\"ℜ\",\"&realine;\":\"ℛ\",\"&realpart;\":\"ℜ\",\"&reals;\":\"ℝ\",\"&rect;\":\"▭\",\"&reg\":\"®\",\"&reg;\":\"®\",\"&rfisht;\":\"⥽\",\"&rfloor;\":\"⌋\",\"&rfr;\":\"𝔯\",\"&rhard;\":\"⇁\",\"&rharu;\":\"⇀\",\"&rharul;\":\"⥬\",\"&rho;\":\"ρ\",\"&rhov;\":\"ϱ\",\"&rightarrow;\":\"→\",\"&rightarrowtail;\":\"↣\",\"&rightharpoondown;\":\"⇁\",\"&rightharpoonup;\":\"⇀\",\"&rightleftarrows;\":\"⇄\",\"&rightleftharpoons;\":\"⇌\",\"&rightrightarrows;\":\"⇉\",\"&rightsquigarrow;\":\"↝\",\"&rightthreetimes;\":\"⋌\",\"&ring;\":\"˚\",\"&risingdotseq;\":\"≓\",\"&rlarr;\":\"⇄\",\"&rlhar;\":\"⇌\",\"&rlm;\":\"‏\",\"&rmoust;\":\"⎱\",\"&rmoustache;\":\"⎱\",\"&rnmid;\":\"⫮\",\"&roang;\":\"⟭\",\"&roarr;\":\"⇾\",\"&robrk;\":\"⟧\",\"&ropar;\":\"⦆\",\"&ropf;\":\"𝕣\",\"&roplus;\":\"⨮\",\"&rotimes;\":\"⨵\",\"&rpar;\":\")\",\"&rpargt;\":\"⦔\",\"&rppolint;\":\"⨒\",\"&rrarr;\":\"⇉\",\"&rsaquo;\":\"›\",\"&rscr;\":\"𝓇\",\"&rsh;\":\"↱\",\"&rsqb;\":\"]\",\"&rsquo;\":\"’\",\"&rsquor;\":\"’\",\"&rthree;\":\"⋌\",\"&rtimes;\":\"⋊\",\"&rtri;\":\"▹\",\"&rtrie;\":\"⊵\",\"&rtrif;\":\"▸\",\"&rtriltri;\":\"⧎\",\"&ruluhar;\":\"⥨\",\"&rx;\":\"℞\",\"&sacute;\":\"ś\",\"&sbquo;\":\"‚\",\"&sc;\":\"≻\",\"&scE;\":\"⪴\",\"&scap;\":\"⪸\",\"&scaron;\":\"š\",\"&sccue;\":\"≽\",\"&sce;\":\"⪰\",\"&scedil;\":\"ş\",\"&scirc;\":\"ŝ\",\"&scnE;\":\"⪶\",\"&scnap;\":\"⪺\",\"&scnsim;\":\"⋩\",\"&scpolint;\":\"⨓\",\"&scsim;\":\"≿\",\"&scy;\":\"с\",\"&sdot;\":\"⋅\",\"&sdotb;\":\"⊡\",\"&sdote;\":\"⩦\",\"&seArr;\":\"⇘\",\"&searhk;\":\"⤥\",\"&searr;\":\"↘\",\"&searrow;\":\"↘\",\"&sect\":\"§\",\"&sect;\":\"§\",\"&semi;\":\";\",\"&seswar;\":\"⤩\",\"&setminus;\":\"∖\",\"&setmn;\":\"∖\",\"&sext;\":\"✶\",\"&sfr;\":\"𝔰\",\"&sfrown;\":\"⌢\",\"&sharp;\":\"♯\",\"&shchcy;\":\"щ\",\"&shcy;\":\"ш\",\"&shortmid;\":\"∣\",\"&shortparallel;\":\"∥\",\"&shy\":\"­\",\"&shy;\":\"­\",\"&sigma;\":\"σ\",\"&sigmaf;\":\"ς\",\"&sigmav;\":\"ς\",\"&sim;\":\"∼\",\"&simdot;\":\"⩪\",\"&sime;\":\"≃\",\"&simeq;\":\"≃\",\"&simg;\":\"⪞\",\"&simgE;\":\"⪠\",\"&siml;\":\"⪝\",\"&simlE;\":\"⪟\",\"&simne;\":\"≆\",\"&simplus;\":\"⨤\",\"&simrarr;\":\"⥲\",\"&slarr;\":\"←\",\"&smallsetminus;\":\"∖\",\"&smashp;\":\"⨳\",\"&smeparsl;\":\"⧤\",\"&smid;\":\"∣\",\"&smile;\":\"⌣\",\"&smt;\":\"⪪\",\"&smte;\":\"⪬\",\"&smtes;\":\"⪬︀\",\"&softcy;\":\"ь\",\"&sol;\":\"/\",\"&solb;\":\"⧄\",\"&solbar;\":\"⌿\",\"&sopf;\":\"𝕤\",\"&spades;\":\"♠\",\"&spadesuit;\":\"♠\",\"&spar;\":\"∥\",\"&sqcap;\":\"⊓\",\"&sqcaps;\":\"⊓︀\",\"&sqcup;\":\"⊔\",\"&sqcups;\":\"⊔︀\",\"&sqsub;\":\"⊏\",\"&sqsube;\":\"⊑\",\"&sqsubset;\":\"⊏\",\"&sqsubseteq;\":\"⊑\",\"&sqsup;\":\"⊐\",\"&sqsupe;\":\"⊒\",\"&sqsupset;\":\"⊐\",\"&sqsupseteq;\":\"⊒\",\"&squ;\":\"□\",\"&square;\":\"□\",\"&squarf;\":\"▪\",\"&squf;\":\"▪\",\"&srarr;\":\"→\",\"&sscr;\":\"𝓈\",\"&ssetmn;\":\"∖\",\"&ssmile;\":\"⌣\",\"&sstarf;\":\"⋆\",\"&star;\":\"☆\",\"&starf;\":\"★\",\"&straightepsilon;\":\"ϵ\",\"&straightphi;\":\"ϕ\",\"&strns;\":\"¯\",\"&sub;\":\"⊂\",\"&subE;\":\"⫅\",\"&subdot;\":\"⪽\",\"&sube;\":\"⊆\",\"&subedot;\":\"⫃\",\"&submult;\":\"⫁\",\"&subnE;\":\"⫋\",\"&subne;\":\"⊊\",\"&subplus;\":\"⪿\",\"&subrarr;\":\"⥹\",\"&subset;\":\"⊂\",\"&subseteq;\":\"⊆\",\"&subseteqq;\":\"⫅\",\"&subsetneq;\":\"⊊\",\"&subsetneqq;\":\"⫋\",\"&subsim;\":\"⫇\",\"&subsub;\":\"⫕\",\"&subsup;\":\"⫓\",\"&succ;\":\"≻\",\"&succapprox;\":\"⪸\",\"&succcurlyeq;\":\"≽\",\"&succeq;\":\"⪰\",\"&succnapprox;\":\"⪺\",\"&succneqq;\":\"⪶\",\"&succnsim;\":\"⋩\",\"&succsim;\":\"≿\",\"&sum;\":\"∑\",\"&sung;\":\"♪\",\"&sup1\":\"¹\",\"&sup1;\":\"¹\",\"&sup2\":\"²\",\"&sup2;\":\"²\",\"&sup3\":\"³\",\"&sup3;\":\"³\",\"&sup;\":\"⊃\",\"&supE;\":\"⫆\",\"&supdot;\":\"⪾\",\"&supdsub;\":\"⫘\",\"&supe;\":\"⊇\",\"&supedot;\":\"⫄\",\"&suphsol;\":\"⟉\",\"&suphsub;\":\"⫗\",\"&suplarr;\":\"⥻\",\"&supmult;\":\"⫂\",\"&supnE;\":\"⫌\",\"&supne;\":\"⊋\",\"&supplus;\":\"⫀\",\"&supset;\":\"⊃\",\"&supseteq;\":\"⊇\",\"&supseteqq;\":\"⫆\",\"&supsetneq;\":\"⊋\",\"&supsetneqq;\":\"⫌\",\"&supsim;\":\"⫈\",\"&supsub;\":\"⫔\",\"&supsup;\":\"⫖\",\"&swArr;\":\"⇙\",\"&swarhk;\":\"⤦\",\"&swarr;\":\"↙\",\"&swarrow;\":\"↙\",\"&swnwar;\":\"⤪\",\"&szlig\":\"ß\",\"&szlig;\":\"ß\",\"&target;\":\"⌖\",\"&tau;\":\"τ\",\"&tbrk;\":\"⎴\",\"&tcaron;\":\"ť\",\"&tcedil;\":\"ţ\",\"&tcy;\":\"т\",\"&tdot;\":\"⃛\",\"&telrec;\":\"⌕\",\"&tfr;\":\"𝔱\",\"&there4;\":\"∴\",\"&therefore;\":\"∴\",\"&theta;\":\"θ\",\"&thetasym;\":\"ϑ\",\"&thetav;\":\"ϑ\",\"&thickapprox;\":\"≈\",\"&thicksim;\":\"∼\",\"&thinsp;\":\" \",\"&thkap;\":\"≈\",\"&thksim;\":\"∼\",\"&thorn\":\"þ\",\"&thorn;\":\"þ\",\"&tilde;\":\"˜\",\"&times\":\"×\",\"&times;\":\"×\",\"&timesb;\":\"⊠\",\"&timesbar;\":\"⨱\",\"&timesd;\":\"⨰\",\"&tint;\":\"∭\",\"&toea;\":\"⤨\",\"&top;\":\"⊤\",\"&topbot;\":\"⌶\",\"&topcir;\":\"⫱\",\"&topf;\":\"𝕥\",\"&topfork;\":\"⫚\",\"&tosa;\":\"⤩\",\"&tprime;\":\"‴\",\"&trade;\":\"™\",\"&triangle;\":\"▵\",\"&triangledown;\":\"▿\",\"&triangleleft;\":\"◃\",\"&trianglelefteq;\":\"⊴\",\"&triangleq;\":\"≜\",\"&triangleright;\":\"▹\",\"&trianglerighteq;\":\"⊵\",\"&tridot;\":\"◬\",\"&trie;\":\"≜\",\"&triminus;\":\"⨺\",\"&triplus;\":\"⨹\",\"&trisb;\":\"⧍\",\"&tritime;\":\"⨻\",\"&trpezium;\":\"⏢\",\"&tscr;\":\"𝓉\",\"&tscy;\":\"ц\",\"&tshcy;\":\"ћ\",\"&tstrok;\":\"ŧ\",\"&twixt;\":\"≬\",\"&twoheadleftarrow;\":\"↞\",\"&twoheadrightarrow;\":\"↠\",\"&uArr;\":\"⇑\",\"&uHar;\":\"⥣\",\"&uacute\":\"ú\",\"&uacute;\":\"ú\",\"&uarr;\":\"↑\",\"&ubrcy;\":\"ў\",\"&ubreve;\":\"ŭ\",\"&ucirc\":\"û\",\"&ucirc;\":\"û\",\"&ucy;\":\"у\",\"&udarr;\":\"⇅\",\"&udblac;\":\"ű\",\"&udhar;\":\"⥮\",\"&ufisht;\":\"⥾\",\"&ufr;\":\"𝔲\",\"&ugrave\":\"ù\",\"&ugrave;\":\"ù\",\"&uharl;\":\"↿\",\"&uharr;\":\"↾\",\"&uhblk;\":\"▀\",\"&ulcorn;\":\"⌜\",\"&ulcorner;\":\"⌜\",\"&ulcrop;\":\"⌏\",\"&ultri;\":\"◸\",\"&umacr;\":\"ū\",\"&uml\":\"¨\",\"&uml;\":\"¨\",\"&uogon;\":\"ų\",\"&uopf;\":\"𝕦\",\"&uparrow;\":\"↑\",\"&updownarrow;\":\"↕\",\"&upharpoonleft;\":\"↿\",\"&upharpoonright;\":\"↾\",\"&uplus;\":\"⊎\",\"&upsi;\":\"υ\",\"&upsih;\":\"ϒ\",\"&upsilon;\":\"υ\",\"&upuparrows;\":\"⇈\",\"&urcorn;\":\"⌝\",\"&urcorner;\":\"⌝\",\"&urcrop;\":\"⌎\",\"&uring;\":\"ů\",\"&urtri;\":\"◹\",\"&uscr;\":\"𝓊\",\"&utdot;\":\"⋰\",\"&utilde;\":\"ũ\",\"&utri;\":\"▵\",\"&utrif;\":\"▴\",\"&uuarr;\":\"⇈\",\"&uuml\":\"ü\",\"&uuml;\":\"ü\",\"&uwangle;\":\"⦧\",\"&vArr;\":\"⇕\",\"&vBar;\":\"⫨\",\"&vBarv;\":\"⫩\",\"&vDash;\":\"⊨\",\"&vangrt;\":\"⦜\",\"&varepsilon;\":\"ϵ\",\"&varkappa;\":\"ϰ\",\"&varnothing;\":\"∅\",\"&varphi;\":\"ϕ\",\"&varpi;\":\"ϖ\",\"&varpropto;\":\"∝\",\"&varr;\":\"↕\",\"&varrho;\":\"ϱ\",\"&varsigma;\":\"ς\",\"&varsubsetneq;\":\"⊊︀\",\"&varsubsetneqq;\":\"⫋︀\",\"&varsupsetneq;\":\"⊋︀\",\"&varsupsetneqq;\":\"⫌︀\",\"&vartheta;\":\"ϑ\",\"&vartriangleleft;\":\"⊲\",\"&vartriangleright;\":\"⊳\",\"&vcy;\":\"в\",\"&vdash;\":\"⊢\",\"&vee;\":\"∨\",\"&veebar;\":\"⊻\",\"&veeeq;\":\"≚\",\"&vellip;\":\"⋮\",\"&verbar;\":\"|\",\"&vert;\":\"|\",\"&vfr;\":\"𝔳\",\"&vltri;\":\"⊲\",\"&vnsub;\":\"⊂⃒\",\"&vnsup;\":\"⊃⃒\",\"&vopf;\":\"𝕧\",\"&vprop;\":\"∝\",\"&vrtri;\":\"⊳\",\"&vscr;\":\"𝓋\",\"&vsubnE;\":\"⫋︀\",\"&vsubne;\":\"⊊︀\",\"&vsupnE;\":\"⫌︀\",\"&vsupne;\":\"⊋︀\",\"&vzigzag;\":\"⦚\",\"&wcirc;\":\"ŵ\",\"&wedbar;\":\"⩟\",\"&wedge;\":\"∧\",\"&wedgeq;\":\"≙\",\"&weierp;\":\"℘\",\"&wfr;\":\"𝔴\",\"&wopf;\":\"𝕨\",\"&wp;\":\"℘\",\"&wr;\":\"≀\",\"&wreath;\":\"≀\",\"&wscr;\":\"𝓌\",\"&xcap;\":\"⋂\",\"&xcirc;\":\"◯\",\"&xcup;\":\"⋃\",\"&xdtri;\":\"▽\",\"&xfr;\":\"𝔵\",\"&xhArr;\":\"⟺\",\"&xharr;\":\"⟷\",\"&xi;\":\"ξ\",\"&xlArr;\":\"⟸\",\"&xlarr;\":\"⟵\",\"&xmap;\":\"⟼\",\"&xnis;\":\"⋻\",\"&xodot;\":\"⨀\",\"&xopf;\":\"𝕩\",\"&xoplus;\":\"⨁\",\"&xotime;\":\"⨂\",\"&xrArr;\":\"⟹\",\"&xrarr;\":\"⟶\",\"&xscr;\":\"𝓍\",\"&xsqcup;\":\"⨆\",\"&xuplus;\":\"⨄\",\"&xutri;\":\"△\",\"&xvee;\":\"⋁\",\"&xwedge;\":\"⋀\",\"&yacute\":\"ý\",\"&yacute;\":\"ý\",\"&yacy;\":\"я\",\"&ycirc;\":\"ŷ\",\"&ycy;\":\"ы\",\"&yen\":\"¥\",\"&yen;\":\"¥\",\"&yfr;\":\"𝔶\",\"&yicy;\":\"ї\",\"&yopf;\":\"𝕪\",\"&yscr;\":\"𝓎\",\"&yucy;\":\"ю\",\"&yuml\":\"ÿ\",\"&yuml;\":\"ÿ\",\"&zacute;\":\"ź\",\"&zcaron;\":\"ž\",\"&zcy;\":\"з\",\"&zdot;\":\"ż\",\"&zeetrf;\":\"ℨ\",\"&zeta;\":\"ζ\",\"&zfr;\":\"𝔷\",\"&zhcy;\":\"ж\",\"&zigrarr;\":\"⇝\",\"&zopf;\":\"𝕫\",\"&zscr;\":\"𝓏\",\"&zwj;\":\"‍\",\"&zwnj;\":\"‌\"},characters:{\"Æ\":\"&AElig;\",\"&\":\"&amp;\",\"Á\":\"&Aacute;\",\"Ă\":\"&Abreve;\",\"Â\":\"&Acirc;\",\"А\":\"&Acy;\",\"𝔄\":\"&Afr;\",\"À\":\"&Agrave;\",\"Α\":\"&Alpha;\",\"Ā\":\"&Amacr;\",\"⩓\":\"&And;\",\"Ą\":\"&Aogon;\",\"𝔸\":\"&Aopf;\",\"⁡\":\"&af;\",\"Å\":\"&angst;\",\"𝒜\":\"&Ascr;\",\"≔\":\"&coloneq;\",\"Ã\":\"&Atilde;\",\"Ä\":\"&Auml;\",\"∖\":\"&ssetmn;\",\"⫧\":\"&Barv;\",\"⌆\":\"&doublebarwedge;\",\"Б\":\"&Bcy;\",\"∵\":\"&because;\",\"ℬ\":\"&bernou;\",\"Β\":\"&Beta;\",\"𝔅\":\"&Bfr;\",\"𝔹\":\"&Bopf;\",\"˘\":\"&breve;\",\"≎\":\"&bump;\",\"Ч\":\"&CHcy;\",\"©\":\"&copy;\",\"Ć\":\"&Cacute;\",\"⋒\":\"&Cap;\",\"ⅅ\":\"&DD;\",\"ℭ\":\"&Cfr;\",\"Č\":\"&Ccaron;\",\"Ç\":\"&Ccedil;\",\"Ĉ\":\"&Ccirc;\",\"∰\":\"&Cconint;\",\"Ċ\":\"&Cdot;\",\"¸\":\"&cedil;\",\"·\":\"&middot;\",\"Χ\":\"&Chi;\",\"⊙\":\"&odot;\",\"⊖\":\"&ominus;\",\"⊕\":\"&oplus;\",\"⊗\":\"&otimes;\",\"∲\":\"&cwconint;\",\"”\":\"&rdquor;\",\"’\":\"&rsquor;\",\"∷\":\"&Proportion;\",\"⩴\":\"&Colone;\",\"≡\":\"&equiv;\",\"∯\":\"&DoubleContourIntegral;\",\"∮\":\"&oint;\",\"ℂ\":\"&complexes;\",\"∐\":\"&coprod;\",\"∳\":\"&awconint;\",\"⨯\":\"&Cross;\",\"𝒞\":\"&Cscr;\",\"⋓\":\"&Cup;\",\"≍\":\"&asympeq;\",\"⤑\":\"&DDotrahd;\",\"Ђ\":\"&DJcy;\",\"Ѕ\":\"&DScy;\",\"Џ\":\"&DZcy;\",\"‡\":\"&ddagger;\",\"↡\":\"&Darr;\",\"⫤\":\"&DoubleLeftTee;\",\"Ď\":\"&Dcaron;\",\"Д\":\"&Dcy;\",\"∇\":\"&nabla;\",\"Δ\":\"&Delta;\",\"𝔇\":\"&Dfr;\",\"´\":\"&acute;\",\"˙\":\"&dot;\",\"˝\":\"&dblac;\",\"`\":\"&grave;\",\"˜\":\"&tilde;\",\"⋄\":\"&diamond;\",\"ⅆ\":\"&dd;\",\"𝔻\":\"&Dopf;\",\"¨\":\"&uml;\",\"⃜\":\"&DotDot;\",\"≐\":\"&esdot;\",\"⇓\":\"&dArr;\",\"⇐\":\"&lArr;\",\"⇔\":\"&iff;\",\"⟸\":\"&xlArr;\",\"⟺\":\"&xhArr;\",\"⟹\":\"&xrArr;\",\"⇒\":\"&rArr;\",\"⊨\":\"&vDash;\",\"⇑\":\"&uArr;\",\"⇕\":\"&vArr;\",\"∥\":\"&spar;\",\"↓\":\"&downarrow;\",\"⤓\":\"&DownArrowBar;\",\"⇵\":\"&duarr;\",\"̑\":\"&DownBreve;\",\"⥐\":\"&DownLeftRightVector;\",\"⥞\":\"&DownLeftTeeVector;\",\"↽\":\"&lhard;\",\"⥖\":\"&DownLeftVectorBar;\",\"⥟\":\"&DownRightTeeVector;\",\"⇁\":\"&rightharpoondown;\",\"⥗\":\"&DownRightVectorBar;\",\"⊤\":\"&top;\",\"↧\":\"&mapstodown;\",\"𝒟\":\"&Dscr;\",\"Đ\":\"&Dstrok;\",\"Ŋ\":\"&ENG;\",\"Ð\":\"&ETH;\",\"É\":\"&Eacute;\",\"Ě\":\"&Ecaron;\",\"Ê\":\"&Ecirc;\",\"Э\":\"&Ecy;\",\"Ė\":\"&Edot;\",\"𝔈\":\"&Efr;\",\"È\":\"&Egrave;\",\"∈\":\"&isinv;\",\"Ē\":\"&Emacr;\",\"◻\":\"&EmptySmallSquare;\",\"▫\":\"&EmptyVerySmallSquare;\",\"Ę\":\"&Eogon;\",\"𝔼\":\"&Eopf;\",\"Ε\":\"&Epsilon;\",\"⩵\":\"&Equal;\",\"≂\":\"&esim;\",\"⇌\":\"&rlhar;\",\"ℰ\":\"&expectation;\",\"⩳\":\"&Esim;\",\"Η\":\"&Eta;\",\"Ë\":\"&Euml;\",\"∃\":\"&exist;\",\"ⅇ\":\"&exponentiale;\",\"Ф\":\"&Fcy;\",\"𝔉\":\"&Ffr;\",\"◼\":\"&FilledSmallSquare;\",\"▪\":\"&squf;\",\"𝔽\":\"&Fopf;\",\"∀\":\"&forall;\",\"ℱ\":\"&Fscr;\",\"Ѓ\":\"&GJcy;\",\">\":\"&gt;\",\"Γ\":\"&Gamma;\",\"Ϝ\":\"&Gammad;\",\"Ğ\":\"&Gbreve;\",\"Ģ\":\"&Gcedil;\",\"Ĝ\":\"&Gcirc;\",\"Г\":\"&Gcy;\",\"Ġ\":\"&Gdot;\",\"𝔊\":\"&Gfr;\",\"⋙\":\"&ggg;\",\"𝔾\":\"&Gopf;\",\"≥\":\"&geq;\",\"⋛\":\"&gtreqless;\",\"≧\":\"&geqq;\",\"⪢\":\"&GreaterGreater;\",\"≷\":\"&gtrless;\",\"⩾\":\"&ges;\",\"≳\":\"&gtrsim;\",\"𝒢\":\"&Gscr;\",\"≫\":\"&gg;\",\"Ъ\":\"&HARDcy;\",\"ˇ\":\"&caron;\",\"^\":\"&Hat;\",\"Ĥ\":\"&Hcirc;\",\"ℌ\":\"&Poincareplane;\",\"ℋ\":\"&hamilt;\",\"ℍ\":\"&quaternions;\",\"─\":\"&boxh;\",\"Ħ\":\"&Hstrok;\",\"≏\":\"&bumpeq;\",\"Е\":\"&IEcy;\",\"Ĳ\":\"&IJlig;\",\"Ё\":\"&IOcy;\",\"Í\":\"&Iacute;\",\"Î\":\"&Icirc;\",\"И\":\"&Icy;\",\"İ\":\"&Idot;\",\"ℑ\":\"&imagpart;\",\"Ì\":\"&Igrave;\",\"Ī\":\"&Imacr;\",\"ⅈ\":\"&ii;\",\"∬\":\"&Int;\",\"∫\":\"&int;\",\"⋂\":\"&xcap;\",\"⁣\":\"&ic;\",\"⁢\":\"&it;\",\"Į\":\"&Iogon;\",\"𝕀\":\"&Iopf;\",\"Ι\":\"&Iota;\",\"ℐ\":\"&imagline;\",\"Ĩ\":\"&Itilde;\",\"І\":\"&Iukcy;\",\"Ï\":\"&Iuml;\",\"Ĵ\":\"&Jcirc;\",\"Й\":\"&Jcy;\",\"𝔍\":\"&Jfr;\",\"𝕁\":\"&Jopf;\",\"𝒥\":\"&Jscr;\",\"Ј\":\"&Jsercy;\",\"Є\":\"&Jukcy;\",\"Х\":\"&KHcy;\",\"Ќ\":\"&KJcy;\",\"Κ\":\"&Kappa;\",\"Ķ\":\"&Kcedil;\",\"К\":\"&Kcy;\",\"𝔎\":\"&Kfr;\",\"𝕂\":\"&Kopf;\",\"𝒦\":\"&Kscr;\",\"Љ\":\"&LJcy;\",\"<\":\"&lt;\",\"Ĺ\":\"&Lacute;\",\"Λ\":\"&Lambda;\",\"⟪\":\"&Lang;\",\"ℒ\":\"&lagran;\",\"↞\":\"&twoheadleftarrow;\",\"Ľ\":\"&Lcaron;\",\"Ļ\":\"&Lcedil;\",\"Л\":\"&Lcy;\",\"⟨\":\"&langle;\",\"←\":\"&slarr;\",\"⇤\":\"&larrb;\",\"⇆\":\"&lrarr;\",\"⌈\":\"&lceil;\",\"⟦\":\"&lobrk;\",\"⥡\":\"&LeftDownTeeVector;\",\"⇃\":\"&downharpoonleft;\",\"⥙\":\"&LeftDownVectorBar;\",\"⌊\":\"&lfloor;\",\"↔\":\"&leftrightarrow;\",\"⥎\":\"&LeftRightVector;\",\"⊣\":\"&dashv;\",\"↤\":\"&mapstoleft;\",\"⥚\":\"&LeftTeeVector;\",\"⊲\":\"&vltri;\",\"⧏\":\"&LeftTriangleBar;\",\"⊴\":\"&trianglelefteq;\",\"⥑\":\"&LeftUpDownVector;\",\"⥠\":\"&LeftUpTeeVector;\",\"↿\":\"&upharpoonleft;\",\"⥘\":\"&LeftUpVectorBar;\",\"↼\":\"&lharu;\",\"⥒\":\"&LeftVectorBar;\",\"⋚\":\"&lesseqgtr;\",\"≦\":\"&leqq;\",\"≶\":\"&lg;\",\"⪡\":\"&LessLess;\",\"⩽\":\"&les;\",\"≲\":\"&lsim;\",\"𝔏\":\"&Lfr;\",\"⋘\":\"&Ll;\",\"⇚\":\"&lAarr;\",\"Ŀ\":\"&Lmidot;\",\"⟵\":\"&xlarr;\",\"⟷\":\"&xharr;\",\"⟶\":\"&xrarr;\",\"𝕃\":\"&Lopf;\",\"↙\":\"&swarrow;\",\"↘\":\"&searrow;\",\"↰\":\"&lsh;\",\"Ł\":\"&Lstrok;\",\"≪\":\"&ll;\",\"⤅\":\"&Map;\",\"М\":\"&Mcy;\",\" \":\"&MediumSpace;\",\"ℳ\":\"&phmmat;\",\"𝔐\":\"&Mfr;\",\"∓\":\"&mp;\",\"𝕄\":\"&Mopf;\",\"Μ\":\"&Mu;\",\"Њ\":\"&NJcy;\",\"Ń\":\"&Nacute;\",\"Ň\":\"&Ncaron;\",\"Ņ\":\"&Ncedil;\",\"Н\":\"&Ncy;\",\"​\":\"&ZeroWidthSpace;\",\"\\n\":\"&NewLine;\",\"𝔑\":\"&Nfr;\",\"⁠\":\"&NoBreak;\",\" \":\"&nbsp;\",\"ℕ\":\"&naturals;\",\"⫬\":\"&Not;\",\"≢\":\"&nequiv;\",\"≭\":\"&NotCupCap;\",\"∦\":\"&nspar;\",\"∉\":\"&notinva;\",\"≠\":\"&ne;\",\"≂̸\":\"&nesim;\",\"∄\":\"&nexists;\",\"≯\":\"&ngtr;\",\"≱\":\"&ngeq;\",\"≧̸\":\"&ngeqq;\",\"≫̸\":\"&nGtv;\",\"≹\":\"&ntgl;\",\"⩾̸\":\"&nges;\",\"≵\":\"&ngsim;\",\"≎̸\":\"&nbump;\",\"≏̸\":\"&nbumpe;\",\"⋪\":\"&ntriangleleft;\",\"⧏̸\":\"&NotLeftTriangleBar;\",\"⋬\":\"&ntrianglelefteq;\",\"≮\":\"&nlt;\",\"≰\":\"&nleq;\",\"≸\":\"&ntlg;\",\"≪̸\":\"&nLtv;\",\"⩽̸\":\"&nles;\",\"≴\":\"&nlsim;\",\"⪢̸\":\"&NotNestedGreaterGreater;\",\"⪡̸\":\"&NotNestedLessLess;\",\"⊀\":\"&nprec;\",\"⪯̸\":\"&npreceq;\",\"⋠\":\"&nprcue;\",\"∌\":\"&notniva;\",\"⋫\":\"&ntriangleright;\",\"⧐̸\":\"&NotRightTriangleBar;\",\"⋭\":\"&ntrianglerighteq;\",\"⊏̸\":\"&NotSquareSubset;\",\"⋢\":\"&nsqsube;\",\"⊐̸\":\"&NotSquareSuperset;\",\"⋣\":\"&nsqsupe;\",\"⊂⃒\":\"&vnsub;\",\"⊈\":\"&nsubseteq;\",\"⊁\":\"&nsucc;\",\"⪰̸\":\"&nsucceq;\",\"⋡\":\"&nsccue;\",\"≿̸\":\"&NotSucceedsTilde;\",\"⊃⃒\":\"&vnsup;\",\"⊉\":\"&nsupseteq;\",\"≁\":\"&nsim;\",\"≄\":\"&nsimeq;\",\"≇\":\"&ncong;\",\"≉\":\"&napprox;\",\"∤\":\"&nsmid;\",\"𝒩\":\"&Nscr;\",\"Ñ\":\"&Ntilde;\",\"Ν\":\"&Nu;\",\"Œ\":\"&OElig;\",\"Ó\":\"&Oacute;\",\"Ô\":\"&Ocirc;\",\"О\":\"&Ocy;\",\"Ő\":\"&Odblac;\",\"𝔒\":\"&Ofr;\",\"Ò\":\"&Ograve;\",\"Ō\":\"&Omacr;\",\"Ω\":\"&ohm;\",\"Ο\":\"&Omicron;\",\"𝕆\":\"&Oopf;\",\"“\":\"&ldquo;\",\"‘\":\"&lsquo;\",\"⩔\":\"&Or;\",\"𝒪\":\"&Oscr;\",\"Ø\":\"&Oslash;\",\"Õ\":\"&Otilde;\",\"⨷\":\"&Otimes;\",\"Ö\":\"&Ouml;\",\"‾\":\"&oline;\",\"⏞\":\"&OverBrace;\",\"⎴\":\"&tbrk;\",\"⏜\":\"&OverParenthesis;\",\"∂\":\"&part;\",\"П\":\"&Pcy;\",\"𝔓\":\"&Pfr;\",\"Φ\":\"&Phi;\",\"Π\":\"&Pi;\",\"±\":\"&pm;\",\"ℙ\":\"&primes;\",\"⪻\":\"&Pr;\",\"≺\":\"&prec;\",\"⪯\":\"&preceq;\",\"≼\":\"&preccurlyeq;\",\"≾\":\"&prsim;\",\"″\":\"&Prime;\",\"∏\":\"&prod;\",\"∝\":\"&vprop;\",\"𝒫\":\"&Pscr;\",\"Ψ\":\"&Psi;\",'\"':\"&quot;\",\"𝔔\":\"&Qfr;\",\"ℚ\":\"&rationals;\",\"𝒬\":\"&Qscr;\",\"⤐\":\"&drbkarow;\",\"®\":\"&reg;\",\"Ŕ\":\"&Racute;\",\"⟫\":\"&Rang;\",\"↠\":\"&twoheadrightarrow;\",\"⤖\":\"&Rarrtl;\",\"Ř\":\"&Rcaron;\",\"Ŗ\":\"&Rcedil;\",\"Р\":\"&Rcy;\",\"ℜ\":\"&realpart;\",\"∋\":\"&niv;\",\"⇋\":\"&lrhar;\",\"⥯\":\"&duhar;\",\"Ρ\":\"&Rho;\",\"⟩\":\"&rangle;\",\"→\":\"&srarr;\",\"⇥\":\"&rarrb;\",\"⇄\":\"&rlarr;\",\"⌉\":\"&rceil;\",\"⟧\":\"&robrk;\",\"⥝\":\"&RightDownTeeVector;\",\"⇂\":\"&downharpoonright;\",\"⥕\":\"&RightDownVectorBar;\",\"⌋\":\"&rfloor;\",\"⊢\":\"&vdash;\",\"↦\":\"&mapsto;\",\"⥛\":\"&RightTeeVector;\",\"⊳\":\"&vrtri;\",\"⧐\":\"&RightTriangleBar;\",\"⊵\":\"&trianglerighteq;\",\"⥏\":\"&RightUpDownVector;\",\"⥜\":\"&RightUpTeeVector;\",\"↾\":\"&upharpoonright;\",\"⥔\":\"&RightUpVectorBar;\",\"⇀\":\"&rightharpoonup;\",\"⥓\":\"&RightVectorBar;\",\"ℝ\":\"&reals;\",\"⥰\":\"&RoundImplies;\",\"⇛\":\"&rAarr;\",\"ℛ\":\"&realine;\",\"↱\":\"&rsh;\",\"⧴\":\"&RuleDelayed;\",\"Щ\":\"&SHCHcy;\",\"Ш\":\"&SHcy;\",\"Ь\":\"&SOFTcy;\",\"Ś\":\"&Sacute;\",\"⪼\":\"&Sc;\",\"Š\":\"&Scaron;\",\"Ş\":\"&Scedil;\",\"Ŝ\":\"&Scirc;\",\"С\":\"&Scy;\",\"𝔖\":\"&Sfr;\",\"↑\":\"&uparrow;\",\"Σ\":\"&Sigma;\",\"∘\":\"&compfn;\",\"𝕊\":\"&Sopf;\",\"√\":\"&radic;\",\"□\":\"&square;\",\"⊓\":\"&sqcap;\",\"⊏\":\"&sqsubset;\",\"⊑\":\"&sqsubseteq;\",\"⊐\":\"&sqsupset;\",\"⊒\":\"&sqsupseteq;\",\"⊔\":\"&sqcup;\",\"𝒮\":\"&Sscr;\",\"⋆\":\"&sstarf;\",\"⋐\":\"&Subset;\",\"⊆\":\"&subseteq;\",\"≻\":\"&succ;\",\"⪰\":\"&succeq;\",\"≽\":\"&succcurlyeq;\",\"≿\":\"&succsim;\",\"∑\":\"&sum;\",\"⋑\":\"&Supset;\",\"⊃\":\"&supset;\",\"⊇\":\"&supseteq;\",\"Þ\":\"&THORN;\",\"™\":\"&trade;\",\"Ћ\":\"&TSHcy;\",\"Ц\":\"&TScy;\",\"\\t\":\"&Tab;\",\"Τ\":\"&Tau;\",\"Ť\":\"&Tcaron;\",\"Ţ\":\"&Tcedil;\",\"Т\":\"&Tcy;\",\"𝔗\":\"&Tfr;\",\"∴\":\"&therefore;\",\"Θ\":\"&Theta;\",\"  \":\"&ThickSpace;\",\" \":\"&thinsp;\",\"∼\":\"&thksim;\",\"≃\":\"&simeq;\",\"≅\":\"&cong;\",\"≈\":\"&thkap;\",\"𝕋\":\"&Topf;\",\"⃛\":\"&tdot;\",\"𝒯\":\"&Tscr;\",\"Ŧ\":\"&Tstrok;\",\"Ú\":\"&Uacute;\",\"↟\":\"&Uarr;\",\"⥉\":\"&Uarrocir;\",\"Ў\":\"&Ubrcy;\",\"Ŭ\":\"&Ubreve;\",\"Û\":\"&Ucirc;\",\"У\":\"&Ucy;\",\"Ű\":\"&Udblac;\",\"𝔘\":\"&Ufr;\",\"Ù\":\"&Ugrave;\",\"Ū\":\"&Umacr;\",_:\"&lowbar;\",\"⏟\":\"&UnderBrace;\",\"⎵\":\"&bbrk;\",\"⏝\":\"&UnderParenthesis;\",\"⋃\":\"&xcup;\",\"⊎\":\"&uplus;\",\"Ų\":\"&Uogon;\",\"𝕌\":\"&Uopf;\",\"⤒\":\"&UpArrowBar;\",\"⇅\":\"&udarr;\",\"↕\":\"&varr;\",\"⥮\":\"&udhar;\",\"⊥\":\"&perp;\",\"↥\":\"&mapstoup;\",\"↖\":\"&nwarrow;\",\"↗\":\"&nearrow;\",\"ϒ\":\"&upsih;\",\"Υ\":\"&Upsilon;\",\"Ů\":\"&Uring;\",\"𝒰\":\"&Uscr;\",\"Ũ\":\"&Utilde;\",\"Ü\":\"&Uuml;\",\"⊫\":\"&VDash;\",\"⫫\":\"&Vbar;\",\"В\":\"&Vcy;\",\"⊩\":\"&Vdash;\",\"⫦\":\"&Vdashl;\",\"⋁\":\"&xvee;\",\"‖\":\"&Vert;\",\"∣\":\"&smid;\",\"|\":\"&vert;\",\"❘\":\"&VerticalSeparator;\",\"≀\":\"&wreath;\",\" \":\"&hairsp;\",\"𝔙\":\"&Vfr;\",\"𝕍\":\"&Vopf;\",\"𝒱\":\"&Vscr;\",\"⊪\":\"&Vvdash;\",\"Ŵ\":\"&Wcirc;\",\"⋀\":\"&xwedge;\",\"𝔚\":\"&Wfr;\",\"𝕎\":\"&Wopf;\",\"𝒲\":\"&Wscr;\",\"𝔛\":\"&Xfr;\",\"Ξ\":\"&Xi;\",\"𝕏\":\"&Xopf;\",\"𝒳\":\"&Xscr;\",\"Я\":\"&YAcy;\",\"Ї\":\"&YIcy;\",\"Ю\":\"&YUcy;\",\"Ý\":\"&Yacute;\",\"Ŷ\":\"&Ycirc;\",\"Ы\":\"&Ycy;\",\"𝔜\":\"&Yfr;\",\"𝕐\":\"&Yopf;\",\"𝒴\":\"&Yscr;\",\"Ÿ\":\"&Yuml;\",\"Ж\":\"&ZHcy;\",\"Ź\":\"&Zacute;\",\"Ž\":\"&Zcaron;\",\"З\":\"&Zcy;\",\"Ż\":\"&Zdot;\",\"Ζ\":\"&Zeta;\",\"ℨ\":\"&zeetrf;\",\"ℤ\":\"&integers;\",\"𝒵\":\"&Zscr;\",\"á\":\"&aacute;\",\"ă\":\"&abreve;\",\"∾\":\"&mstpos;\",\"∾̳\":\"&acE;\",\"∿\":\"&acd;\",\"â\":\"&acirc;\",\"а\":\"&acy;\",\"æ\":\"&aelig;\",\"𝔞\":\"&afr;\",\"à\":\"&agrave;\",\"ℵ\":\"&aleph;\",\"α\":\"&alpha;\",\"ā\":\"&amacr;\",\"⨿\":\"&amalg;\",\"∧\":\"&wedge;\",\"⩕\":\"&andand;\",\"⩜\":\"&andd;\",\"⩘\":\"&andslope;\",\"⩚\":\"&andv;\",\"∠\":\"&angle;\",\"⦤\":\"&ange;\",\"∡\":\"&measuredangle;\",\"⦨\":\"&angmsdaa;\",\"⦩\":\"&angmsdab;\",\"⦪\":\"&angmsdac;\",\"⦫\":\"&angmsdad;\",\"⦬\":\"&angmsdae;\",\"⦭\":\"&angmsdaf;\",\"⦮\":\"&angmsdag;\",\"⦯\":\"&angmsdah;\",\"∟\":\"&angrt;\",\"⊾\":\"&angrtvb;\",\"⦝\":\"&angrtvbd;\",\"∢\":\"&angsph;\",\"⍼\":\"&angzarr;\",\"ą\":\"&aogon;\",\"𝕒\":\"&aopf;\",\"⩰\":\"&apE;\",\"⩯\":\"&apacir;\",\"≊\":\"&approxeq;\",\"≋\":\"&apid;\",\"'\":\"&apos;\",\"å\":\"&aring;\",\"𝒶\":\"&ascr;\",\"*\":\"&midast;\",\"ã\":\"&atilde;\",\"ä\":\"&auml;\",\"⨑\":\"&awint;\",\"⫭\":\"&bNot;\",\"≌\":\"&bcong;\",\"϶\":\"&bepsi;\",\"‵\":\"&bprime;\",\"∽\":\"&bsim;\",\"⋍\":\"&bsime;\",\"⊽\":\"&barvee;\",\"⌅\":\"&barwedge;\",\"⎶\":\"&bbrktbrk;\",\"б\":\"&bcy;\",\"„\":\"&ldquor;\",\"⦰\":\"&bemptyv;\",\"β\":\"&beta;\",\"ℶ\":\"&beth;\",\"≬\":\"&twixt;\",\"𝔟\":\"&bfr;\",\"◯\":\"&xcirc;\",\"⨀\":\"&xodot;\",\"⨁\":\"&xoplus;\",\"⨂\":\"&xotime;\",\"⨆\":\"&xsqcup;\",\"★\":\"&starf;\",\"▽\":\"&xdtri;\",\"△\":\"&xutri;\",\"⨄\":\"&xuplus;\",\"⤍\":\"&rbarr;\",\"⧫\":\"&lozf;\",\"▴\":\"&utrif;\",\"▾\":\"&dtrif;\",\"◂\":\"&ltrif;\",\"▸\":\"&rtrif;\",\"␣\":\"&blank;\",\"▒\":\"&blk12;\",\"░\":\"&blk14;\",\"▓\":\"&blk34;\",\"█\":\"&block;\",\"=⃥\":\"&bne;\",\"≡⃥\":\"&bnequiv;\",\"⌐\":\"&bnot;\",\"𝕓\":\"&bopf;\",\"⋈\":\"&bowtie;\",\"╗\":\"&boxDL;\",\"╔\":\"&boxDR;\",\"╖\":\"&boxDl;\",\"╓\":\"&boxDr;\",\"═\":\"&boxH;\",\"╦\":\"&boxHD;\",\"╩\":\"&boxHU;\",\"╤\":\"&boxHd;\",\"╧\":\"&boxHu;\",\"╝\":\"&boxUL;\",\"╚\":\"&boxUR;\",\"╜\":\"&boxUl;\",\"╙\":\"&boxUr;\",\"║\":\"&boxV;\",\"╬\":\"&boxVH;\",\"╣\":\"&boxVL;\",\"╠\":\"&boxVR;\",\"╫\":\"&boxVh;\",\"╢\":\"&boxVl;\",\"╟\":\"&boxVr;\",\"⧉\":\"&boxbox;\",\"╕\":\"&boxdL;\",\"╒\":\"&boxdR;\",\"┐\":\"&boxdl;\",\"┌\":\"&boxdr;\",\"╥\":\"&boxhD;\",\"╨\":\"&boxhU;\",\"┬\":\"&boxhd;\",\"┴\":\"&boxhu;\",\"⊟\":\"&minusb;\",\"⊞\":\"&plusb;\",\"⊠\":\"&timesb;\",\"╛\":\"&boxuL;\",\"╘\":\"&boxuR;\",\"┘\":\"&boxul;\",\"└\":\"&boxur;\",\"│\":\"&boxv;\",\"╪\":\"&boxvH;\",\"╡\":\"&boxvL;\",\"╞\":\"&boxvR;\",\"┼\":\"&boxvh;\",\"┤\":\"&boxvl;\",\"├\":\"&boxvr;\",\"¦\":\"&brvbar;\",\"𝒷\":\"&bscr;\",\"⁏\":\"&bsemi;\",\"\\\\\":\"&bsol;\",\"⧅\":\"&bsolb;\",\"⟈\":\"&bsolhsub;\",\"•\":\"&bullet;\",\"⪮\":\"&bumpE;\",\"ć\":\"&cacute;\",\"∩\":\"&cap;\",\"⩄\":\"&capand;\",\"⩉\":\"&capbrcup;\",\"⩋\":\"&capcap;\",\"⩇\":\"&capcup;\",\"⩀\":\"&capdot;\",\"∩︀\":\"&caps;\",\"⁁\":\"&caret;\",\"⩍\":\"&ccaps;\",\"č\":\"&ccaron;\",\"ç\":\"&ccedil;\",\"ĉ\":\"&ccirc;\",\"⩌\":\"&ccups;\",\"⩐\":\"&ccupssm;\",\"ċ\":\"&cdot;\",\"⦲\":\"&cemptyv;\",\"¢\":\"&cent;\",\"𝔠\":\"&cfr;\",\"ч\":\"&chcy;\",\"✓\":\"&checkmark;\",\"χ\":\"&chi;\",\"○\":\"&cir;\",\"⧃\":\"&cirE;\",\"ˆ\":\"&circ;\",\"≗\":\"&cire;\",\"↺\":\"&olarr;\",\"↻\":\"&orarr;\",\"Ⓢ\":\"&oS;\",\"⊛\":\"&oast;\",\"⊚\":\"&ocir;\",\"⊝\":\"&odash;\",\"⨐\":\"&cirfnint;\",\"⫯\":\"&cirmid;\",\"⧂\":\"&cirscir;\",\"♣\":\"&clubsuit;\",\":\":\"&colon;\",\",\":\"&comma;\",\"@\":\"&commat;\",\"∁\":\"&complement;\",\"⩭\":\"&congdot;\",\"𝕔\":\"&copf;\",\"℗\":\"&copysr;\",\"↵\":\"&crarr;\",\"✗\":\"&cross;\",\"𝒸\":\"&cscr;\",\"⫏\":\"&csub;\",\"⫑\":\"&csube;\",\"⫐\":\"&csup;\",\"⫒\":\"&csupe;\",\"⋯\":\"&ctdot;\",\"⤸\":\"&cudarrl;\",\"⤵\":\"&cudarrr;\",\"⋞\":\"&curlyeqprec;\",\"⋟\":\"&curlyeqsucc;\",\"↶\":\"&curvearrowleft;\",\"⤽\":\"&cularrp;\",\"∪\":\"&cup;\",\"⩈\":\"&cupbrcap;\",\"⩆\":\"&cupcap;\",\"⩊\":\"&cupcup;\",\"⊍\":\"&cupdot;\",\"⩅\":\"&cupor;\",\"∪︀\":\"&cups;\",\"↷\":\"&curvearrowright;\",\"⤼\":\"&curarrm;\",\"⋎\":\"&cuvee;\",\"⋏\":\"&cuwed;\",\"¤\":\"&curren;\",\"∱\":\"&cwint;\",\"⌭\":\"&cylcty;\",\"⥥\":\"&dHar;\",\"†\":\"&dagger;\",\"ℸ\":\"&daleth;\",\"‐\":\"&hyphen;\",\"⤏\":\"&rBarr;\",\"ď\":\"&dcaron;\",\"д\":\"&dcy;\",\"⇊\":\"&downdownarrows;\",\"⩷\":\"&eDDot;\",\"°\":\"&deg;\",\"δ\":\"&delta;\",\"⦱\":\"&demptyv;\",\"⥿\":\"&dfisht;\",\"𝔡\":\"&dfr;\",\"♦\":\"&diams;\",\"ϝ\":\"&gammad;\",\"⋲\":\"&disin;\",\"÷\":\"&divide;\",\"⋇\":\"&divonx;\",\"ђ\":\"&djcy;\",\"⌞\":\"&llcorner;\",\"⌍\":\"&dlcrop;\",$:\"&dollar;\",\"𝕕\":\"&dopf;\",\"≑\":\"&eDot;\",\"∸\":\"&minusd;\",\"∔\":\"&plusdo;\",\"⊡\":\"&sdotb;\",\"⌟\":\"&lrcorner;\",\"⌌\":\"&drcrop;\",\"𝒹\":\"&dscr;\",\"ѕ\":\"&dscy;\",\"⧶\":\"&dsol;\",\"đ\":\"&dstrok;\",\"⋱\":\"&dtdot;\",\"▿\":\"&triangledown;\",\"⦦\":\"&dwangle;\",\"џ\":\"&dzcy;\",\"⟿\":\"&dzigrarr;\",\"é\":\"&eacute;\",\"⩮\":\"&easter;\",\"ě\":\"&ecaron;\",\"≖\":\"&eqcirc;\",\"ê\":\"&ecirc;\",\"≕\":\"&eqcolon;\",\"э\":\"&ecy;\",\"ė\":\"&edot;\",\"≒\":\"&fallingdotseq;\",\"𝔢\":\"&efr;\",\"⪚\":\"&eg;\",\"è\":\"&egrave;\",\"⪖\":\"&eqslantgtr;\",\"⪘\":\"&egsdot;\",\"⪙\":\"&el;\",\"⏧\":\"&elinters;\",\"ℓ\":\"&ell;\",\"⪕\":\"&eqslantless;\",\"⪗\":\"&elsdot;\",\"ē\":\"&emacr;\",\"∅\":\"&varnothing;\",\" \":\"&emsp13;\",\" \":\"&emsp14;\",\" \":\"&emsp;\",\"ŋ\":\"&eng;\",\" \":\"&ensp;\",\"ę\":\"&eogon;\",\"𝕖\":\"&eopf;\",\"⋕\":\"&epar;\",\"⧣\":\"&eparsl;\",\"⩱\":\"&eplus;\",\"ε\":\"&epsilon;\",\"ϵ\":\"&varepsilon;\",\"=\":\"&equals;\",\"≟\":\"&questeq;\",\"⩸\":\"&equivDD;\",\"⧥\":\"&eqvparsl;\",\"≓\":\"&risingdotseq;\",\"⥱\":\"&erarr;\",\"ℯ\":\"&escr;\",\"η\":\"&eta;\",\"ð\":\"&eth;\",\"ë\":\"&euml;\",\"€\":\"&euro;\",\"!\":\"&excl;\",\"ф\":\"&fcy;\",\"♀\":\"&female;\",\"ﬃ\":\"&ffilig;\",\"ﬀ\":\"&fflig;\",\"ﬄ\":\"&ffllig;\",\"𝔣\":\"&ffr;\",\"ﬁ\":\"&filig;\",fj:\"&fjlig;\",\"♭\":\"&flat;\",\"ﬂ\":\"&fllig;\",\"▱\":\"&fltns;\",\"ƒ\":\"&fnof;\",\"𝕗\":\"&fopf;\",\"⋔\":\"&pitchfork;\",\"⫙\":\"&forkv;\",\"⨍\":\"&fpartint;\",\"½\":\"&half;\",\"⅓\":\"&frac13;\",\"¼\":\"&frac14;\",\"⅕\":\"&frac15;\",\"⅙\":\"&frac16;\",\"⅛\":\"&frac18;\",\"⅔\":\"&frac23;\",\"⅖\":\"&frac25;\",\"¾\":\"&frac34;\",\"⅗\":\"&frac35;\",\"⅜\":\"&frac38;\",\"⅘\":\"&frac45;\",\"⅚\":\"&frac56;\",\"⅝\":\"&frac58;\",\"⅞\":\"&frac78;\",\"⁄\":\"&frasl;\",\"⌢\":\"&sfrown;\",\"𝒻\":\"&fscr;\",\"⪌\":\"&gtreqqless;\",\"ǵ\":\"&gacute;\",\"γ\":\"&gamma;\",\"⪆\":\"&gtrapprox;\",\"ğ\":\"&gbreve;\",\"ĝ\":\"&gcirc;\",\"г\":\"&gcy;\",\"ġ\":\"&gdot;\",\"⪩\":\"&gescc;\",\"⪀\":\"&gesdot;\",\"⪂\":\"&gesdoto;\",\"⪄\":\"&gesdotol;\",\"⋛︀\":\"&gesl;\",\"⪔\":\"&gesles;\",\"𝔤\":\"&gfr;\",\"ℷ\":\"&gimel;\",\"ѓ\":\"&gjcy;\",\"⪒\":\"&glE;\",\"⪥\":\"&gla;\",\"⪤\":\"&glj;\",\"≩\":\"&gneqq;\",\"⪊\":\"&gnapprox;\",\"⪈\":\"&gneq;\",\"⋧\":\"&gnsim;\",\"𝕘\":\"&gopf;\",\"ℊ\":\"&gscr;\",\"⪎\":\"&gsime;\",\"⪐\":\"&gsiml;\",\"⪧\":\"&gtcc;\",\"⩺\":\"&gtcir;\",\"⋗\":\"&gtrdot;\",\"⦕\":\"&gtlPar;\",\"⩼\":\"&gtquest;\",\"⥸\":\"&gtrarr;\",\"≩︀\":\"&gvnE;\",\"ъ\":\"&hardcy;\",\"⥈\":\"&harrcir;\",\"↭\":\"&leftrightsquigarrow;\",\"ℏ\":\"&plankv;\",\"ĥ\":\"&hcirc;\",\"♥\":\"&heartsuit;\",\"…\":\"&mldr;\",\"⊹\":\"&hercon;\",\"𝔥\":\"&hfr;\",\"⤥\":\"&searhk;\",\"⤦\":\"&swarhk;\",\"⇿\":\"&hoarr;\",\"∻\":\"&homtht;\",\"↩\":\"&larrhk;\",\"↪\":\"&rarrhk;\",\"𝕙\":\"&hopf;\",\"―\":\"&horbar;\",\"𝒽\":\"&hscr;\",\"ħ\":\"&hstrok;\",\"⁃\":\"&hybull;\",\"í\":\"&iacute;\",\"î\":\"&icirc;\",\"и\":\"&icy;\",\"е\":\"&iecy;\",\"¡\":\"&iexcl;\",\"𝔦\":\"&ifr;\",\"ì\":\"&igrave;\",\"⨌\":\"&qint;\",\"∭\":\"&tint;\",\"⧜\":\"&iinfin;\",\"℩\":\"&iiota;\",\"ĳ\":\"&ijlig;\",\"ī\":\"&imacr;\",\"ı\":\"&inodot;\",\"⊷\":\"&imof;\",\"Ƶ\":\"&imped;\",\"℅\":\"&incare;\",\"∞\":\"&infin;\",\"⧝\":\"&infintie;\",\"⊺\":\"&intercal;\",\"⨗\":\"&intlarhk;\",\"⨼\":\"&iprod;\",\"ё\":\"&iocy;\",\"į\":\"&iogon;\",\"𝕚\":\"&iopf;\",\"ι\":\"&iota;\",\"¿\":\"&iquest;\",\"𝒾\":\"&iscr;\",\"⋹\":\"&isinE;\",\"⋵\":\"&isindot;\",\"⋴\":\"&isins;\",\"⋳\":\"&isinsv;\",\"ĩ\":\"&itilde;\",\"і\":\"&iukcy;\",\"ï\":\"&iuml;\",\"ĵ\":\"&jcirc;\",\"й\":\"&jcy;\",\"𝔧\":\"&jfr;\",\"ȷ\":\"&jmath;\",\"𝕛\":\"&jopf;\",\"𝒿\":\"&jscr;\",\"ј\":\"&jsercy;\",\"є\":\"&jukcy;\",\"κ\":\"&kappa;\",\"ϰ\":\"&varkappa;\",\"ķ\":\"&kcedil;\",\"к\":\"&kcy;\",\"𝔨\":\"&kfr;\",\"ĸ\":\"&kgreen;\",\"х\":\"&khcy;\",\"ќ\":\"&kjcy;\",\"𝕜\":\"&kopf;\",\"𝓀\":\"&kscr;\",\"⤛\":\"&lAtail;\",\"⤎\":\"&lBarr;\",\"⪋\":\"&lesseqqgtr;\",\"⥢\":\"&lHar;\",\"ĺ\":\"&lacute;\",\"⦴\":\"&laemptyv;\",\"λ\":\"&lambda;\",\"⦑\":\"&langd;\",\"⪅\":\"&lessapprox;\",\"«\":\"&laquo;\",\"⤟\":\"&larrbfs;\",\"⤝\":\"&larrfs;\",\"↫\":\"&looparrowleft;\",\"⤹\":\"&larrpl;\",\"⥳\":\"&larrsim;\",\"↢\":\"&leftarrowtail;\",\"⪫\":\"&lat;\",\"⤙\":\"&latail;\",\"⪭\":\"&late;\",\"⪭︀\":\"&lates;\",\"⤌\":\"&lbarr;\",\"❲\":\"&lbbrk;\",\"{\":\"&lcub;\",\"[\":\"&lsqb;\",\"⦋\":\"&lbrke;\",\"⦏\":\"&lbrksld;\",\"⦍\":\"&lbrkslu;\",\"ľ\":\"&lcaron;\",\"ļ\":\"&lcedil;\",\"л\":\"&lcy;\",\"⤶\":\"&ldca;\",\"⥧\":\"&ldrdhar;\",\"⥋\":\"&ldrushar;\",\"↲\":\"&ldsh;\",\"≤\":\"&leq;\",\"⇇\":\"&llarr;\",\"⋋\":\"&lthree;\",\"⪨\":\"&lescc;\",\"⩿\":\"&lesdot;\",\"⪁\":\"&lesdoto;\",\"⪃\":\"&lesdotor;\",\"⋚︀\":\"&lesg;\",\"⪓\":\"&lesges;\",\"⋖\":\"&ltdot;\",\"⥼\":\"&lfisht;\",\"𝔩\":\"&lfr;\",\"⪑\":\"&lgE;\",\"⥪\":\"&lharul;\",\"▄\":\"&lhblk;\",\"љ\":\"&ljcy;\",\"⥫\":\"&llhard;\",\"◺\":\"&lltri;\",\"ŀ\":\"&lmidot;\",\"⎰\":\"&lmoustache;\",\"≨\":\"&lneqq;\",\"⪉\":\"&lnapprox;\",\"⪇\":\"&lneq;\",\"⋦\":\"&lnsim;\",\"⟬\":\"&loang;\",\"⇽\":\"&loarr;\",\"⟼\":\"&xmap;\",\"↬\":\"&rarrlp;\",\"⦅\":\"&lopar;\",\"𝕝\":\"&lopf;\",\"⨭\":\"&loplus;\",\"⨴\":\"&lotimes;\",\"∗\":\"&lowast;\",\"◊\":\"&lozenge;\",\"(\":\"&lpar;\",\"⦓\":\"&lparlt;\",\"⥭\":\"&lrhard;\",\"‎\":\"&lrm;\",\"⊿\":\"&lrtri;\",\"‹\":\"&lsaquo;\",\"𝓁\":\"&lscr;\",\"⪍\":\"&lsime;\",\"⪏\":\"&lsimg;\",\"‚\":\"&sbquo;\",\"ł\":\"&lstrok;\",\"⪦\":\"&ltcc;\",\"⩹\":\"&ltcir;\",\"⋉\":\"&ltimes;\",\"⥶\":\"&ltlarr;\",\"⩻\":\"&ltquest;\",\"⦖\":\"&ltrPar;\",\"◃\":\"&triangleleft;\",\"⥊\":\"&lurdshar;\",\"⥦\":\"&luruhar;\",\"≨︀\":\"&lvnE;\",\"∺\":\"&mDDot;\",\"¯\":\"&strns;\",\"♂\":\"&male;\",\"✠\":\"&maltese;\",\"▮\":\"&marker;\",\"⨩\":\"&mcomma;\",\"м\":\"&mcy;\",\"—\":\"&mdash;\",\"𝔪\":\"&mfr;\",\"℧\":\"&mho;\",\"µ\":\"&micro;\",\"⫰\":\"&midcir;\",\"−\":\"&minus;\",\"⨪\":\"&minusdu;\",\"⫛\":\"&mlcp;\",\"⊧\":\"&models;\",\"𝕞\":\"&mopf;\",\"𝓂\":\"&mscr;\",\"μ\":\"&mu;\",\"⊸\":\"&mumap;\",\"⋙̸\":\"&nGg;\",\"≫⃒\":\"&nGt;\",\"⇍\":\"&nlArr;\",\"⇎\":\"&nhArr;\",\"⋘̸\":\"&nLl;\",\"≪⃒\":\"&nLt;\",\"⇏\":\"&nrArr;\",\"⊯\":\"&nVDash;\",\"⊮\":\"&nVdash;\",\"ń\":\"&nacute;\",\"∠⃒\":\"&nang;\",\"⩰̸\":\"&napE;\",\"≋̸\":\"&napid;\",\"ŉ\":\"&napos;\",\"♮\":\"&natural;\",\"⩃\":\"&ncap;\",\"ň\":\"&ncaron;\",\"ņ\":\"&ncedil;\",\"⩭̸\":\"&ncongdot;\",\"⩂\":\"&ncup;\",\"н\":\"&ncy;\",\"–\":\"&ndash;\",\"⇗\":\"&neArr;\",\"⤤\":\"&nearhk;\",\"≐̸\":\"&nedot;\",\"⤨\":\"&toea;\",\"𝔫\":\"&nfr;\",\"↮\":\"&nleftrightarrow;\",\"⫲\":\"&nhpar;\",\"⋼\":\"&nis;\",\"⋺\":\"&nisd;\",\"њ\":\"&njcy;\",\"≦̸\":\"&nleqq;\",\"↚\":\"&nleftarrow;\",\"‥\":\"&nldr;\",\"𝕟\":\"&nopf;\",\"¬\":\"&not;\",\"⋹̸\":\"&notinE;\",\"⋵̸\":\"&notindot;\",\"⋷\":\"&notinvb;\",\"⋶\":\"&notinvc;\",\"⋾\":\"&notnivb;\",\"⋽\":\"&notnivc;\",\"⫽⃥\":\"&nparsl;\",\"∂̸\":\"&npart;\",\"⨔\":\"&npolint;\",\"↛\":\"&nrightarrow;\",\"⤳̸\":\"&nrarrc;\",\"↝̸\":\"&nrarrw;\",\"𝓃\":\"&nscr;\",\"⊄\":\"&nsub;\",\"⫅̸\":\"&nsubseteqq;\",\"⊅\":\"&nsup;\",\"⫆̸\":\"&nsupseteqq;\",\"ñ\":\"&ntilde;\",\"ν\":\"&nu;\",\"#\":\"&num;\",\"№\":\"&numero;\",\" \":\"&numsp;\",\"⊭\":\"&nvDash;\",\"⤄\":\"&nvHarr;\",\"≍⃒\":\"&nvap;\",\"⊬\":\"&nvdash;\",\"≥⃒\":\"&nvge;\",\">⃒\":\"&nvgt;\",\"⧞\":\"&nvinfin;\",\"⤂\":\"&nvlArr;\",\"≤⃒\":\"&nvle;\",\"<⃒\":\"&nvlt;\",\"⊴⃒\":\"&nvltrie;\",\"⤃\":\"&nvrArr;\",\"⊵⃒\":\"&nvrtrie;\",\"∼⃒\":\"&nvsim;\",\"⇖\":\"&nwArr;\",\"⤣\":\"&nwarhk;\",\"⤧\":\"&nwnear;\",\"ó\":\"&oacute;\",\"ô\":\"&ocirc;\",\"о\":\"&ocy;\",\"ő\":\"&odblac;\",\"⨸\":\"&odiv;\",\"⦼\":\"&odsold;\",\"œ\":\"&oelig;\",\"⦿\":\"&ofcir;\",\"𝔬\":\"&ofr;\",\"˛\":\"&ogon;\",\"ò\":\"&ograve;\",\"⧁\":\"&ogt;\",\"⦵\":\"&ohbar;\",\"⦾\":\"&olcir;\",\"⦻\":\"&olcross;\",\"⧀\":\"&olt;\",\"ō\":\"&omacr;\",\"ω\":\"&omega;\",\"ο\":\"&omicron;\",\"⦶\":\"&omid;\",\"𝕠\":\"&oopf;\",\"⦷\":\"&opar;\",\"⦹\":\"&operp;\",\"∨\":\"&vee;\",\"⩝\":\"&ord;\",\"ℴ\":\"&oscr;\",\"ª\":\"&ordf;\",\"º\":\"&ordm;\",\"⊶\":\"&origof;\",\"⩖\":\"&oror;\",\"⩗\":\"&orslope;\",\"⩛\":\"&orv;\",\"ø\":\"&oslash;\",\"⊘\":\"&osol;\",\"õ\":\"&otilde;\",\"⨶\":\"&otimesas;\",\"ö\":\"&ouml;\",\"⌽\":\"&ovbar;\",\"¶\":\"&para;\",\"⫳\":\"&parsim;\",\"⫽\":\"&parsl;\",\"п\":\"&pcy;\",\"%\":\"&percnt;\",\".\":\"&period;\",\"‰\":\"&permil;\",\"‱\":\"&pertenk;\",\"𝔭\":\"&pfr;\",\"φ\":\"&phi;\",\"ϕ\":\"&varphi;\",\"☎\":\"&phone;\",\"π\":\"&pi;\",\"ϖ\":\"&varpi;\",\"ℎ\":\"&planckh;\",\"+\":\"&plus;\",\"⨣\":\"&plusacir;\",\"⨢\":\"&pluscir;\",\"⨥\":\"&plusdu;\",\"⩲\":\"&pluse;\",\"⨦\":\"&plussim;\",\"⨧\":\"&plustwo;\",\"⨕\":\"&pointint;\",\"𝕡\":\"&popf;\",\"£\":\"&pound;\",\"⪳\":\"&prE;\",\"⪷\":\"&precapprox;\",\"⪹\":\"&prnap;\",\"⪵\":\"&prnE;\",\"⋨\":\"&prnsim;\",\"′\":\"&prime;\",\"⌮\":\"&profalar;\",\"⌒\":\"&profline;\",\"⌓\":\"&profsurf;\",\"⊰\":\"&prurel;\",\"𝓅\":\"&pscr;\",\"ψ\":\"&psi;\",\" \":\"&puncsp;\",\"𝔮\":\"&qfr;\",\"𝕢\":\"&qopf;\",\"⁗\":\"&qprime;\",\"𝓆\":\"&qscr;\",\"⨖\":\"&quatint;\",\"?\":\"&quest;\",\"⤜\":\"&rAtail;\",\"⥤\":\"&rHar;\",\"∽̱\":\"&race;\",\"ŕ\":\"&racute;\",\"⦳\":\"&raemptyv;\",\"⦒\":\"&rangd;\",\"⦥\":\"&range;\",\"»\":\"&raquo;\",\"⥵\":\"&rarrap;\",\"⤠\":\"&rarrbfs;\",\"⤳\":\"&rarrc;\",\"⤞\":\"&rarrfs;\",\"⥅\":\"&rarrpl;\",\"⥴\":\"&rarrsim;\",\"↣\":\"&rightarrowtail;\",\"↝\":\"&rightsquigarrow;\",\"⤚\":\"&ratail;\",\"∶\":\"&ratio;\",\"❳\":\"&rbbrk;\",\"}\":\"&rcub;\",\"]\":\"&rsqb;\",\"⦌\":\"&rbrke;\",\"⦎\":\"&rbrksld;\",\"⦐\":\"&rbrkslu;\",\"ř\":\"&rcaron;\",\"ŗ\":\"&rcedil;\",\"р\":\"&rcy;\",\"⤷\":\"&rdca;\",\"⥩\":\"&rdldhar;\",\"↳\":\"&rdsh;\",\"▭\":\"&rect;\",\"⥽\":\"&rfisht;\",\"𝔯\":\"&rfr;\",\"⥬\":\"&rharul;\",\"ρ\":\"&rho;\",\"ϱ\":\"&varrho;\",\"⇉\":\"&rrarr;\",\"⋌\":\"&rthree;\",\"˚\":\"&ring;\",\"‏\":\"&rlm;\",\"⎱\":\"&rmoustache;\",\"⫮\":\"&rnmid;\",\"⟭\":\"&roang;\",\"⇾\":\"&roarr;\",\"⦆\":\"&ropar;\",\"𝕣\":\"&ropf;\",\"⨮\":\"&roplus;\",\"⨵\":\"&rotimes;\",\")\":\"&rpar;\",\"⦔\":\"&rpargt;\",\"⨒\":\"&rppolint;\",\"›\":\"&rsaquo;\",\"𝓇\":\"&rscr;\",\"⋊\":\"&rtimes;\",\"▹\":\"&triangleright;\",\"⧎\":\"&rtriltri;\",\"⥨\":\"&ruluhar;\",\"℞\":\"&rx;\",\"ś\":\"&sacute;\",\"⪴\":\"&scE;\",\"⪸\":\"&succapprox;\",\"š\":\"&scaron;\",\"ş\":\"&scedil;\",\"ŝ\":\"&scirc;\",\"⪶\":\"&succneqq;\",\"⪺\":\"&succnapprox;\",\"⋩\":\"&succnsim;\",\"⨓\":\"&scpolint;\",\"с\":\"&scy;\",\"⋅\":\"&sdot;\",\"⩦\":\"&sdote;\",\"⇘\":\"&seArr;\",\"§\":\"&sect;\",\";\":\"&semi;\",\"⤩\":\"&tosa;\",\"✶\":\"&sext;\",\"𝔰\":\"&sfr;\",\"♯\":\"&sharp;\",\"щ\":\"&shchcy;\",\"ш\":\"&shcy;\",\"­\":\"&shy;\",\"σ\":\"&sigma;\",\"ς\":\"&varsigma;\",\"⩪\":\"&simdot;\",\"⪞\":\"&simg;\",\"⪠\":\"&simgE;\",\"⪝\":\"&siml;\",\"⪟\":\"&simlE;\",\"≆\":\"&simne;\",\"⨤\":\"&simplus;\",\"⥲\":\"&simrarr;\",\"⨳\":\"&smashp;\",\"⧤\":\"&smeparsl;\",\"⌣\":\"&ssmile;\",\"⪪\":\"&smt;\",\"⪬\":\"&smte;\",\"⪬︀\":\"&smtes;\",\"ь\":\"&softcy;\",\"/\":\"&sol;\",\"⧄\":\"&solb;\",\"⌿\":\"&solbar;\",\"𝕤\":\"&sopf;\",\"♠\":\"&spadesuit;\",\"⊓︀\":\"&sqcaps;\",\"⊔︀\":\"&sqcups;\",\"𝓈\":\"&sscr;\",\"☆\":\"&star;\",\"⊂\":\"&subset;\",\"⫅\":\"&subseteqq;\",\"⪽\":\"&subdot;\",\"⫃\":\"&subedot;\",\"⫁\":\"&submult;\",\"⫋\":\"&subsetneqq;\",\"⊊\":\"&subsetneq;\",\"⪿\":\"&subplus;\",\"⥹\":\"&subrarr;\",\"⫇\":\"&subsim;\",\"⫕\":\"&subsub;\",\"⫓\":\"&subsup;\",\"♪\":\"&sung;\",\"¹\":\"&sup1;\",\"²\":\"&sup2;\",\"³\":\"&sup3;\",\"⫆\":\"&supseteqq;\",\"⪾\":\"&supdot;\",\"⫘\":\"&supdsub;\",\"⫄\":\"&supedot;\",\"⟉\":\"&suphsol;\",\"⫗\":\"&suphsub;\",\"⥻\":\"&suplarr;\",\"⫂\":\"&supmult;\",\"⫌\":\"&supsetneqq;\",\"⊋\":\"&supsetneq;\",\"⫀\":\"&supplus;\",\"⫈\":\"&supsim;\",\"⫔\":\"&supsub;\",\"⫖\":\"&supsup;\",\"⇙\":\"&swArr;\",\"⤪\":\"&swnwar;\",\"ß\":\"&szlig;\",\"⌖\":\"&target;\",\"τ\":\"&tau;\",\"ť\":\"&tcaron;\",\"ţ\":\"&tcedil;\",\"т\":\"&tcy;\",\"⌕\":\"&telrec;\",\"𝔱\":\"&tfr;\",\"θ\":\"&theta;\",\"ϑ\":\"&vartheta;\",\"þ\":\"&thorn;\",\"×\":\"&times;\",\"⨱\":\"&timesbar;\",\"⨰\":\"&timesd;\",\"⌶\":\"&topbot;\",\"⫱\":\"&topcir;\",\"𝕥\":\"&topf;\",\"⫚\":\"&topfork;\",\"‴\":\"&tprime;\",\"▵\":\"&utri;\",\"≜\":\"&trie;\",\"◬\":\"&tridot;\",\"⨺\":\"&triminus;\",\"⨹\":\"&triplus;\",\"⧍\":\"&trisb;\",\"⨻\":\"&tritime;\",\"⏢\":\"&trpezium;\",\"𝓉\":\"&tscr;\",\"ц\":\"&tscy;\",\"ћ\":\"&tshcy;\",\"ŧ\":\"&tstrok;\",\"⥣\":\"&uHar;\",\"ú\":\"&uacute;\",\"ў\":\"&ubrcy;\",\"ŭ\":\"&ubreve;\",\"û\":\"&ucirc;\",\"у\":\"&ucy;\",\"ű\":\"&udblac;\",\"⥾\":\"&ufisht;\",\"𝔲\":\"&ufr;\",\"ù\":\"&ugrave;\",\"▀\":\"&uhblk;\",\"⌜\":\"&ulcorner;\",\"⌏\":\"&ulcrop;\",\"◸\":\"&ultri;\",\"ū\":\"&umacr;\",\"ų\":\"&uogon;\",\"𝕦\":\"&uopf;\",\"υ\":\"&upsilon;\",\"⇈\":\"&uuarr;\",\"⌝\":\"&urcorner;\",\"⌎\":\"&urcrop;\",\"ů\":\"&uring;\",\"◹\":\"&urtri;\",\"𝓊\":\"&uscr;\",\"⋰\":\"&utdot;\",\"ũ\":\"&utilde;\",\"ü\":\"&uuml;\",\"⦧\":\"&uwangle;\",\"⫨\":\"&vBar;\",\"⫩\":\"&vBarv;\",\"⦜\":\"&vangrt;\",\"⊊︀\":\"&vsubne;\",\"⫋︀\":\"&vsubnE;\",\"⊋︀\":\"&vsupne;\",\"⫌︀\":\"&vsupnE;\",\"в\":\"&vcy;\",\"⊻\":\"&veebar;\",\"≚\":\"&veeeq;\",\"⋮\":\"&vellip;\",\"𝔳\":\"&vfr;\",\"𝕧\":\"&vopf;\",\"𝓋\":\"&vscr;\",\"⦚\":\"&vzigzag;\",\"ŵ\":\"&wcirc;\",\"⩟\":\"&wedbar;\",\"≙\":\"&wedgeq;\",\"℘\":\"&wp;\",\"𝔴\":\"&wfr;\",\"𝕨\":\"&wopf;\",\"𝓌\":\"&wscr;\",\"𝔵\":\"&xfr;\",\"ξ\":\"&xi;\",\"⋻\":\"&xnis;\",\"𝕩\":\"&xopf;\",\"𝓍\":\"&xscr;\",\"ý\":\"&yacute;\",\"я\":\"&yacy;\",\"ŷ\":\"&ycirc;\",\"ы\":\"&ycy;\",\"¥\":\"&yen;\",\"𝔶\":\"&yfr;\",\"ї\":\"&yicy;\",\"𝕪\":\"&yopf;\",\"𝓎\":\"&yscr;\",\"ю\":\"&yucy;\",\"ÿ\":\"&yuml;\",\"ź\":\"&zacute;\",\"ž\":\"&zcaron;\",\"з\":\"&zcy;\",\"ż\":\"&zdot;\",\"ζ\":\"&zeta;\",\"𝔷\":\"&zfr;\",\"ж\":\"&zhcy;\",\"⇝\":\"&zigrarr;\",\"𝕫\":\"&zopf;\",\"𝓏\":\"&zscr;\",\"‍\":\"&zwj;\",\"‌\":\"&zwnj;\"}}};\n\n//# sourceURL=webpack://web/./node_modules/html-entities/lib/named-references.js?");

/***/ }),

/***/ "./node_modules/html-entities/lib/numeric-unicode-map.js":
/*!***************************************************************!*\
  !*** ./node_modules/html-entities/lib/numeric-unicode-map.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", ({value:true}));exports.numericUnicodeMap={0:65533,128:8364,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,136:710,137:8240,138:352,139:8249,140:338,142:381,145:8216,146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,153:8482,154:353,155:8250,156:339,158:382,159:376};\n\n//# sourceURL=webpack://web/./node_modules/html-entities/lib/numeric-unicode-map.js?");

/***/ }),

/***/ "./node_modules/html-entities/lib/surrogate-pairs.js":
/*!***********************************************************!*\
  !*** ./node_modules/html-entities/lib/surrogate-pairs.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", ({value:true}));exports.fromCodePoint=String.fromCodePoint||function(astralCodePoint){return String.fromCharCode(Math.floor((astralCodePoint-65536)/1024)+55296,(astralCodePoint-65536)%1024+56320)};exports.getCodePoint=String.prototype.codePointAt?function(input,position){return input.codePointAt(position)}:function(input,position){return(input.charCodeAt(position)-55296)*1024+input.charCodeAt(position+1)-56320+65536};exports.highSurrogateFrom=55296;exports.highSurrogateTo=56319;\n\n//# sourceURL=webpack://web/./node_modules/html-entities/lib/surrogate-pairs.js?");

/***/ }),

/***/ "./Time.ts":
/*!*****************!*\
  !*** ./Time.ts ***!
  \*****************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.TimeSystem = exports.TimeInfo = void 0;\nconst sim_ecs_1 = __webpack_require__(/*! sim-ecs */ \"../sim-ecs/dist/index.js\");\nconst animation_1 = __webpack_require__(/*! ./animation */ \"./animation.ts\");\nclass TimeInfo {\n    constructor(lastTime = 0, requiredElapsed = 1000 / 60 // desired interval)\n    ) {\n        this.lastTime = lastTime;\n        this.requiredElapsed = requiredElapsed;\n    }\n}\nexports.TimeInfo = TimeInfo;\nexports.TimeSystem = (0, sim_ecs_1.createSystem)({\n    // The Actions interface allows access to world-operations, like adding entities or changing the state\n    actions: sim_ecs_1.Actions,\n    animationInfo: (0, sim_ecs_1.WriteResource)(animation_1.AnimationSystemInfo),\n    timeInfo: (0, sim_ecs_1.WriteResource)(TimeInfo),\n    query: (0, sim_ecs_1.queryComponents)({\n        anim: (0, sim_ecs_1.Write)(animation_1.AnimateComponent),\n        entity: (0, sim_ecs_1.ReadEntity)(),\n    }),\n})\n    .withName(\"TimeSystem\")\n    .withSetupFunction(({ actions, query, animationInfo, timeInfo }) => {\n    function loop(now) {\n        requestAnimationFrame(loop);\n        if (!timeInfo.lastTime) {\n            timeInfo.lastTime = now;\n        }\n        var elapsed = now - timeInfo.lastTime;\n        if (elapsed > timeInfo.requiredElapsed) {\n            timeInfo.lastTime = now;\n            animationInfo.dt = elapsed;\n        }\n    }\n    requestAnimationFrame(loop);\n})\n    .build();\n\n\n//# sourceURL=webpack://web/./Time.ts?");

/***/ }),

/***/ "./animation.ts":
/*!**********************!*\
  !*** ./animation.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.setWorld = exports.AnimationSystem = exports.AnimationControllerSystem = exports.AnimationSystemInfo = exports.Delay = exports.Seq = exports.Tween = exports.TweenTarget = exports.AnimateComponent = exports.EasingFunction = void 0;\nconst sim_ecs_1 = __webpack_require__(/*! sim-ecs */ \"../sim-ecs/dist/index.js\");\nvar EasingFunction;\n(function (EasingFunction) {\n    EasingFunction[EasingFunction[\"QuadraticIn\"] = 0] = \"QuadraticIn\";\n    EasingFunction[EasingFunction[\"BounceOut\"] = 1] = \"BounceOut\";\n})(EasingFunction = exports.EasingFunction || (exports.EasingFunction = {}));\nclass AnimateComponent {\n    constructor() {\n        this.sequences = [];\n    }\n    add(seq) {\n        this.sequences.push(seq);\n        return this;\n    }\n    addTween(t) {\n        this.sequences.push(new Seq().then(t));\n        return this;\n    }\n}\nexports.AnimateComponent = AnimateComponent;\nclass TweenTarget {\n    //TODO : see if you can get className from T instead of constrctor\n    constructor(start, end, className) {\n        this.start = start;\n        this.end = end;\n        this.ty = className;\n    }\n    lerp(target, r) {\n        //@ts-ignore\n        return this.start + (this.end - this.start) * r;\n        // target = v;\n    }\n}\nexports.TweenTarget = TweenTarget;\n// animation sys\nclass Tween {\n    constructor(ease, duration, target) {\n        this.ease = ease;\n        this.duration = duration;\n        this.target = target;\n        this.startAbs = 0;\n    }\n    then(tween) {\n        const seq = new Seq();\n        seq.then(this);\n        seq.then(tween);\n        return seq;\n    }\n    then_delay(duration) {\n        const seq = new Seq();\n        seq.then(this);\n        seq.then_delay(duration);\n        return seq;\n    }\n}\nexports.Tween = Tween;\nclass Seq {\n    constructor() {\n        this.tweens = [];\n    }\n    then(tween) {\n        const startTime = this.tweens[this.tweens.length - 1]\n            ? this.tweens[this.tweens.length - 1].startAbs +\n                this.tweens[this.tweens.length - 1].duration\n            : 0;\n        tween.startAbs = startTime;\n        this.tweens.push(tween);\n        return this;\n    }\n    then_delay(duration) {\n        const startTime = this.tweens[this.tweens.length - 1]\n            ? this.tweens[this.tweens.length - 1].startAbs +\n                this.tweens[this.tweens.length - 1].duration\n            : 0;\n        const delay = new Delay(duration);\n        delay.startAbs = startTime;\n        this.tweens.push(delay);\n        return this;\n    }\n}\nexports.Seq = Seq;\nclass Delay extends Tween {\n    constructor(duration) {\n        super(EasingFunction.QuadraticIn, duration, undefined);\n        this.duration = duration;\n    }\n}\nexports.Delay = Delay;\nvar AnimationSystemState;\n(function (AnimationSystemState) {\n    AnimationSystemState[AnimationSystemState[\"Play\"] = 0] = \"Play\";\n    AnimationSystemState[AnimationSystemState[\"Pause\"] = 1] = \"Pause\";\n    AnimationSystemState[AnimationSystemState[\"Reset\"] = 2] = \"Reset\";\n    AnimationSystemState[AnimationSystemState[\"GoToTimeWithUpdate\"] = 3] = \"GoToTimeWithUpdate\";\n    AnimationSystemState[AnimationSystemState[\"GoToTimeWithoutUpdate\"] = 4] = \"GoToTimeWithoutUpdate\";\n})(AnimationSystemState || (AnimationSystemState = {}));\nclass AnimationSystemInfo {\n    constructor(lastTime = 0, currentTime = 0, state = AnimationSystemState.Play, dt = 0, totalTime = 0, needsUpdate = true) {\n        this.lastTime = lastTime;\n        this.currentTime = currentTime;\n        this.state = state;\n        this.dt = dt;\n        this.totalTime = totalTime;\n        this.needsUpdate = needsUpdate;\n    }\n}\nexports.AnimationSystemInfo = AnimationSystemInfo;\nexports.AnimationControllerSystem = (0, sim_ecs_1.createSystem)({\n    // The Actions interface allows access to world-operations, like adding entities or changing the state\n    actions: sim_ecs_1.Actions,\n    animationInfo: (0, sim_ecs_1.WriteResource)(AnimationSystemInfo),\n    query: (0, sim_ecs_1.queryComponents)({\n        anim: (0, sim_ecs_1.Write)(AnimateComponent),\n        entity: (0, sim_ecs_1.ReadEntity)(),\n    }),\n})\n    .withName(\"AnimationControllerSystem\")\n    .withSetupFunction(({ actions, query, animationInfo }) => {\n    const button = document.getElementById(\"button\");\n    button.addEventListener(\"click\", () => {\n        switch (animationInfo.state) {\n            case AnimationSystemState.Play: {\n                animationInfo.state = AnimationSystemState.Pause;\n                button.innerHTML = \"PAUSE\";\n                break;\n            }\n            case AnimationSystemState.Pause: {\n                animationInfo.state = AnimationSystemState.Play;\n                button.innerHTML = \"Play\";\n                break;\n            }\n        }\n    });\n    const button_reset = document.getElementById(\"reset\");\n    button_reset.addEventListener(\"click\", () => {\n        animationInfo.state = AnimationSystemState.Reset;\n        animationInfo.currentTime = 0;\n        button.innerHTML = \"Play\";\n    });\n    const time_input_value = document.getElementById(\"time\");\n    const button_go_to_time = document.getElementById(\"gototime\");\n    button_go_to_time.addEventListener(\"click\", () => {\n        animationInfo.state = AnimationSystemState.GoToTimeWithoutUpdate;\n        animationInfo.currentTime = parseInt(time_input_value.value);\n        button.innerHTML = \"Pause\";\n    });\n    const button_go_to_time_update = document.getElementById(\"gototimeupdate\");\n    button_go_to_time_update.addEventListener(\"click\", () => {\n        animationInfo.state = AnimationSystemState.GoToTimeWithUpdate;\n        animationInfo.lastTime = animationInfo.currentTime + 0;\n        animationInfo.currentTime = parseInt(time_input_value.value);\n        button.innerHTML = \"Play\";\n    });\n})\n    .withRunFunction(({ actions, query, animationInfo }) => {\n    if (animationInfo.needsUpdate) {\n        animationInfo.needsUpdate = false;\n        updateTotalTime(query, animationInfo);\n    }\n    document.getElementById(\"currentTime\").innerHTML =\n        \"Time:\" + Math.round(animationInfo.currentTime);\n    console.log(\"animationInfo.currentTime\", animationInfo.currentTime);\n})\n    .build();\nexports.AnimationSystem = (0, sim_ecs_1.createSystem)({\n    actions: sim_ecs_1.Actions,\n    animationInfo: (0, sim_ecs_1.WriteResource)(AnimationSystemInfo),\n    query: (0, sim_ecs_1.queryComponents)({\n        anim: (0, sim_ecs_1.Write)(AnimateComponent),\n        entity: (0, sim_ecs_1.ReadEntity)(),\n    }),\n})\n    .withName(\"AnimationSystem\")\n    .withSetupFunction(({ actions, query, animationInfo }) => { })\n    .withRunFunction(({ actions, query, animationInfo }) => {\n    if (animationInfo.state === AnimationSystemState.GoToTimeWithUpdate) {\n        for (const ent of query.iter()) {\n            for (const seq of ent.anim.sequences) {\n                for (const tween of seq.tweens) {\n                    if (tween.startAbs <= animationInfo.currentTime &&\n                        tween.startAbs + tween.duration <= animationInfo.currentTime) {\n                        // it's a delay\n                        if (!tween.target) {\n                            continue;\n                        }\n                        const animatableComp = ent.entity.getComponent(tween.target.ty);\n                        if (!animatableComp) {\n                            console.error(\"component not found!\");\n                            continue;\n                        }\n                        tween.target.lerp(animatableComp, 1.0);\n                    }\n                }\n            }\n        }\n        animationInfo.state = AnimationSystemState.Pause;\n    }\n    if (animationInfo.state === AnimationSystemState.Reset) {\n        for (const ent of query.iter()) {\n            for (const seq of ent.anim.sequences) {\n                for (let i = seq.tweens.length - 1; i > -1; i--) {\n                    const tween = seq.tweens[i];\n                    // it's a delay\n                    if (!tween.target) {\n                        continue;\n                    }\n                    const animatableComp = ent.entity.getComponent(tween.target.ty);\n                    if (!animatableComp) {\n                        console.error(\"component not found!\");\n                        continue;\n                    }\n                    tween.target.lerp(animatableComp, 0);\n                }\n            }\n        }\n        animationInfo.state = AnimationSystemState.Pause;\n    }\n    if (animationInfo.state === AnimationSystemState.GoToTimeWithoutUpdate) {\n        for (const ent of query.iter()) {\n            for (const seq of ent.anim.sequences) {\n                for (const tween of seq.tweens) {\n                    if (tween.startAbs <= animationInfo.currentTime &&\n                        tween.startAbs + tween.duration >= animationInfo.currentTime) {\n                        // it's a delay\n                        if (!tween.target) {\n                            continue;\n                        }\n                        const animatableComp = ent.entity.getComponent(tween.target.ty);\n                        if (!animatableComp) {\n                            console.error(\"component not found!\");\n                            continue;\n                        }\n                        // calc ratio\n                        const end = tween.startAbs + tween.duration;\n                        const r = (animationInfo.currentTime - tween.startAbs) /\n                            (end - tween.startAbs);\n                        const ratio = easingFunctionToRatio(tween.ease, r);\n                        // console.log(\"ratio\", r, ratio);\n                        tween.target.lerp(animatableComp, ratio);\n                        break;\n                    }\n                }\n            }\n        }\n        animationInfo.state = AnimationSystemState.Pause;\n    }\n    if (animationInfo.state === AnimationSystemState.Pause) {\n        return;\n    }\n    if (animationInfo.currentTime < 0 ||\n        animationInfo.currentTime > animationInfo.totalTime) {\n        return;\n    }\n    //play\n    for (const ent of query.iter()) {\n        for (const seq of ent.anim.sequences) {\n            for (const tween of seq.tweens) {\n                if (tween.startAbs <= animationInfo.currentTime &&\n                    tween.startAbs + tween.duration >= animationInfo.currentTime) {\n                    // it's a delay\n                    if (!tween.target) {\n                        continue;\n                    }\n                    const animatableComp = ent.entity.getComponent(tween.target.ty);\n                    if (!animatableComp) {\n                        console.error(\"component not found!\");\n                        continue;\n                    }\n                    // calc ratio\n                    const end = tween.startAbs + tween.duration;\n                    const r = (animationInfo.currentTime - tween.startAbs) /\n                        (end - tween.startAbs);\n                    const ratio = easingFunctionToRatio(tween.ease, r);\n                    // console.log(\"ratio\", r, ratio);\n                    tween.target.lerp(animatableComp, ratio);\n                    break;\n                }\n            }\n        }\n    }\n    animationInfo.currentTime += animationInfo.dt;\n})\n    .build();\nconst updateTotalTime = (query, animationInfo) => {\n    let totalTime = 0;\n    for (const ent of query.iter()) {\n        for (const seq of ent.anim.sequences) {\n            for (const tween of seq.tweens) {\n                totalTime = Math.max(totalTime, tween.startAbs + tween.duration);\n            }\n        }\n    }\n    animationInfo.totalTime = totalTime;\n};\n////////////////\nconst clamp = (num, min, max) => Math.min(Math.max(num, min), max);\nconst easingFunctionToRatio = (func, val) => {\n    switch (func) {\n        case EasingFunction.QuadraticIn: {\n            const v1 = clamp(val, 0.0, 1.0);\n            return v1 * v1;\n        }\n        case EasingFunction.BounceOut: {\n            let p = clamp(val, 0.0, 1.0);\n            if (p < 4.0 / 11.0) {\n                return (121.0 * p * p) / 16.0;\n            }\n            else if (p < 8.0 / 11.0) {\n                return (363.0 / 40.0) * p * p - (99.0 / 10.0) * p + 17.0 / 5.0;\n            }\n            else if (p < 9.0 / 10.0) {\n                return ((4356.0 / 361.0) * p * p - (35442.0 / 1805.0) * p + 16061.0 / 1805.0);\n            }\n            else {\n                return (54.0 / 5.0) * p * p - (513.0 / 25.0) * p + 268.0 / 25.0;\n            }\n        }\n    }\n    console.error(\"errrrrrrrrrr\");\n};\nlet world;\nfunction setWorld(wo) {\n    world = wo;\n}\nexports.setWorld = setWorld;\n\n\n//# sourceURL=webpack://web/./animation.ts?");

/***/ }),

/***/ "./errorHandler.ts":
/*!*************************!*\
  !*** ./errorHandler.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ErrorHandlerSystem = void 0;\nconst sim_ecs_1 = __webpack_require__(/*! sim-ecs */ \"../sim-ecs/dist/index.js\");\nexports.ErrorHandlerSystem = (0, sim_ecs_1.createSystem)({\n    actions: sim_ecs_1.Actions,\n    errors: (0, sim_ecs_1.ReadEvents)(Error),\n    systemErrors: (0, sim_ecs_1.ReadEvents)(sim_ecs_1.SystemError),\n})\n    .withName(\"ErrorHandlerSystem\")\n    .withRunFunction(({ actions, errors, systemErrors }) => {\n    let error;\n    let foundError = false;\n    for (error of errors.iter()) {\n        console.error(\"HANDLED ERROR!\", error);\n        foundError = true;\n    }\n    for (error of systemErrors.iter()) {\n        console.error(\"HANDLED ERROR! System:\", error.System, \"; Cause:\", error.cause);\n        foundError = true;\n    }\n    if (foundError) {\n        actions.commands.stopRun();\n    }\n})\n    .build();\n\n\n//# sourceURL=webpack://web/./errorHandler.ts?");

/***/ }),

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst sim_ecs_1 = __webpack_require__(/*! sim-ecs */ \"../sim-ecs/dist/index.js\");\nconst THREE = __webpack_require__(/*! three */ \"./node_modules/three/build/three.cjs\");\nconst animation_1 = __webpack_require__(/*! ./animation */ \"./animation.ts\");\nconst renderer_1 = __webpack_require__(/*! ./renderer */ \"./renderer.ts\");\nconst errorHandler_1 = __webpack_require__(/*! ./errorHandler */ \"./errorHandler.ts\");\nconst Time_1 = __webpack_require__(/*! ./Time */ \"./Time.ts\");\nclass TransformComponent {\n    constructor(position) {\n        this.position = position;\n    }\n}\nclass TransformPositionXTween extends animation_1.TweenTarget {\n    constructor(start, end) {\n        super(start, end, TransformComponent);\n        this.start = start;\n        this.end = end;\n    }\n    lerp(target, r) {\n        const v = super.lerp(target, r);\n        target.position.x = v;\n    }\n}\nclass TransformPositionYTween extends animation_1.TweenTarget {\n    constructor(start, end) {\n        super(start, end, TransformComponent);\n        this.start = start;\n        this.end = end;\n    }\n    lerp(target, r) {\n        const v = super.lerp(target, r);\n        target.position.y = v;\n    }\n}\nconst executionSchedule = {\n    // each sync point contains stages, which are work units with a defined (custom or default) scheduler\n    stages: [\n        // each stage also contains several systems, which are orchestrated by the stage's scheduler\n        [errorHandler_1.ErrorHandlerSystem],\n        [Time_1.TimeSystem],\n        [animation_1.AnimationControllerSystem, animation_1.AnimationSystem],\n        [renderer_1.RenderSystem],\n    ],\n};\nconst startup = () => {\n    const scene = new THREE.Scene();\n    //   const camera = new THREE.OrthographicCamera(0, 1000, 0, 1000, 0.1, 1000);\n    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);\n    camera.position.z = 5;\n    const renderer = new THREE.WebGLRenderer();\n    renderer.setSize(window.innerWidth, window.innerHeight);\n    document.body.appendChild(renderer.domElement);\n    const prepWorld = (0, sim_ecs_1.buildWorld)()\n        // we can inform the world about our processing logic by adding the above defined prefab\n        .withDefaultScheduling((root) => root.fromPrefab(executionSchedule))\n        .withComponent(renderer_1.MeshComponent)\n        .withComponent(TransformComponent)\n        .withComponent(animation_1.AnimateComponent)\n        .build();\n    prepWorld.addResource(new renderer_1.RenderData(scene, renderer, camera));\n    prepWorld.addResource(new animation_1.AnimationSystemInfo());\n    prepWorld.addResource(new Time_1.TimeInfo());\n    // create entity\n    const geometry = new THREE.BoxGeometry(1, 1, 1);\n    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });\n    const cube = new THREE.Mesh(geometry, material);\n    scene.add(cube);\n    const cubeEnt = prepWorld\n        /// invoking the entity builder in this way automatically adds the entity to the world\n        .buildEntity()\n        .with(renderer_1.MeshComponent, cube)\n        .with(TransformComponent, cube.position);\n    //animate cube 1\n    const tween = new animation_1.Tween(animation_1.EasingFunction.QuadraticIn, 2000, new TransformPositionXTween(0, 5))\n        .then(new animation_1.Tween(animation_1.EasingFunction.QuadraticIn, 2000, new TransformPositionYTween(0, 2)))\n        .then_delay(2000)\n        .then(new animation_1.Tween(animation_1.EasingFunction.QuadraticIn, 2000, new TransformPositionYTween(2, 0)))\n        .then(new animation_1.Tween(animation_1.EasingFunction.QuadraticIn, 2000, new TransformPositionXTween(5, 0)));\n    cubeEnt.with(new animation_1.AnimateComponent().add(tween));\n    cubeEnt.build();\n    // create cube 2\n    if (true) {\n        const material2 = new THREE.MeshBasicMaterial({ color: 0xffff00 });\n        const cube2 = new THREE.Mesh(geometry, material2);\n        scene.add(cube2);\n        const cubeEnt2 = prepWorld\n            .buildEntity()\n            .with(renderer_1.MeshComponent, cube2)\n            .with(TransformComponent, cube2.position);\n        const tween2 = new animation_1.Tween(animation_1.EasingFunction.QuadraticIn, 1, new TransformPositionXTween(-5, -5))\n            .then(new animation_1.Tween(animation_1.EasingFunction.BounceOut, 2000, new TransformPositionYTween(0, 2)))\n            .then_delay(2000)\n            .then(new animation_1.Tween(animation_1.EasingFunction.BounceOut, 2000, new TransformPositionYTween(2, 0)));\n        cubeEnt2.with(new animation_1.AnimateComponent().add(tween2));\n        cubeEnt2.build();\n    }\n    (async () => {\n        // when everything is added, it's time to run the simulation\n        // to do so, a runtime environment must be prepared:\n        const runWorld = await prepWorld.prepareRun();\n        (0, animation_1.setWorld)(runWorld);\n        // sim-ecs provides an optimized main-loop, but can also do single steps\n        await runWorld.start();\n    })()\n        .catch(console.error)\n        .then(() => console.log(\"Finished.\"));\n};\nwindow.onload = () => {\n    startup();\n};\n\n\n//# sourceURL=webpack://web/./index.ts?");

/***/ }),

/***/ "./renderer.ts":
/*!*********************!*\
  !*** ./renderer.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.RenderSystem = exports.RenderData = exports.MeshComponent = void 0;\nconst sim_ecs_1 = __webpack_require__(/*! sim-ecs */ \"../sim-ecs/dist/index.js\");\nconst THREE = __webpack_require__(/*! three */ \"./node_modules/three/build/three.cjs\");\nclass MeshComponent {\n    constructor() {\n        this.mesh = THREE.Mesh;\n    }\n}\nexports.MeshComponent = MeshComponent;\nclass RenderData {\n    constructor(scene, renderer, camera) {\n        this.scene = scene;\n        this.renderer = renderer;\n        this.camera = camera;\n    }\n}\nexports.RenderData = RenderData;\nexports.RenderSystem = (0, sim_ecs_1.createSystem)({\n    actions: sim_ecs_1.Actions,\n    renderer: (0, sim_ecs_1.ReadResource)(RenderData),\n    query: (0, sim_ecs_1.queryComponents)({\n        mesh: (0, sim_ecs_1.Write)(MeshComponent),\n    }),\n})\n    .withName(\"RenderSystem\")\n    .withRunFunction(({ actions, query, renderer }) => {\n    renderer.renderer.render(renderer.scene, renderer.camera);\n})\n    .build();\n\n\n//# sourceURL=webpack://web/./renderer.ts?");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js":
/*!***************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ WebSocketClient)\n/* harmony export */ });\n/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/log.js */ \"./node_modules/webpack-dev-server/client/utils/log.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return typeof key === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (typeof input !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (typeof res !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\n\nvar WebSocketClient = /*#__PURE__*/function () {\n  /**\n   * @param {string} url\n   */\n  function WebSocketClient(url) {\n    _classCallCheck(this, WebSocketClient);\n    this.client = new WebSocket(url);\n    this.client.onerror = function (error) {\n      _utils_log_js__WEBPACK_IMPORTED_MODULE_0__.log.error(error);\n    };\n  }\n\n  /**\n   * @param {(...args: any[]) => void} f\n   */\n  _createClass(WebSocketClient, [{\n    key: \"onOpen\",\n    value: function onOpen(f) {\n      this.client.onopen = f;\n    }\n\n    /**\n     * @param {(...args: any[]) => void} f\n     */\n  }, {\n    key: \"onClose\",\n    value: function onClose(f) {\n      this.client.onclose = f;\n    }\n\n    // call f with the message string as the first argument\n    /**\n     * @param {(...args: any[]) => void} f\n     */\n  }, {\n    key: \"onMessage\",\n    value: function onMessage(f) {\n      this.client.onmessage = function (e) {\n        f(e.data);\n      };\n    }\n  }]);\n  return WebSocketClient;\n}();\n\n\n//# sourceURL=webpack://web/./node_modules/webpack-dev-server/client/clients/WebSocketClient.js?");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=9999&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=9999&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true ***!
  \***********************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("var __resourceQuery = \"?protocol=ws%3A&hostname=0.0.0.0&port=9999&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack/hot/log.js */ \"./node_modules/webpack/hot/log.js\");\n/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils_stripAnsi_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/stripAnsi.js */ \"./node_modules/webpack-dev-server/client/utils/stripAnsi.js\");\n/* harmony import */ var _utils_parseURL_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/parseURL.js */ \"./node_modules/webpack-dev-server/client/utils/parseURL.js\");\n/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./socket.js */ \"./node_modules/webpack-dev-server/client/socket.js\");\n/* harmony import */ var _overlay_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./overlay.js */ \"./node_modules/webpack-dev-server/client/overlay.js\");\n/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/log.js */ \"./node_modules/webpack-dev-server/client/utils/log.js\");\n/* harmony import */ var _utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/sendMessage.js */ \"./node_modules/webpack-dev-server/client/utils/sendMessage.js\");\n/* harmony import */ var _utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/reloadApp.js */ \"./node_modules/webpack-dev-server/client/utils/reloadApp.js\");\n/* harmony import */ var _utils_createSocketURL_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/createSocketURL.js */ \"./node_modules/webpack-dev-server/client/utils/createSocketURL.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }\nfunction _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return typeof key === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (typeof input !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (typeof res !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\n/* global __resourceQuery, __webpack_hash__ */\n/// <reference types=\"webpack/module\" />\n\n\n\n\n\n\n\n\n\n\n/**\n * @typedef {Object} OverlayOptions\n * @property {boolean | (error: Error) => boolean} [warnings]\n * @property {boolean | (error: Error) => boolean} [errors]\n * @property {boolean | (error: Error) => boolean} [runtimeErrors]\n * @property {string} [trustedTypesPolicyName]\n */\n\n/**\n * @typedef {Object} Options\n * @property {boolean} hot\n * @property {boolean} liveReload\n * @property {boolean} progress\n * @property {boolean | OverlayOptions} overlay\n * @property {string} [logging]\n * @property {number} [reconnect]\n */\n\n/**\n * @typedef {Object} Status\n * @property {boolean} isUnloading\n * @property {string} currentHash\n * @property {string} [previousHash]\n */\n\n/**\n * @param {boolean | { warnings?: boolean | string; errors?: boolean | string; runtimeErrors?: boolean | string; }} overlayOptions\n */\nvar decodeOverlayOptions = function decodeOverlayOptions(overlayOptions) {\n  if (typeof overlayOptions === \"object\") {\n    [\"warnings\", \"errors\", \"runtimeErrors\"].forEach(function (property) {\n      if (typeof overlayOptions[property] === \"string\") {\n        var overlayFilterFunctionString = decodeURIComponent(overlayOptions[property]);\n\n        // eslint-disable-next-line no-new-func\n        var overlayFilterFunction = new Function(\"message\", \"var callback = \".concat(overlayFilterFunctionString, \"\\n        return callback(message)\"));\n        overlayOptions[property] = overlayFilterFunction;\n      }\n    });\n  }\n};\n\n/**\n * @type {Status}\n */\nvar status = {\n  isUnloading: false,\n  // TODO Workaround for webpack v4, `__webpack_hash__` is not replaced without HotModuleReplacement\n  // eslint-disable-next-line camelcase\n  currentHash:  true ? __webpack_require__.h() : 0\n};\n\n/** @type {Options} */\nvar options = {\n  hot: false,\n  liveReload: false,\n  progress: false,\n  overlay: false\n};\nvar parsedResourceQuery = (0,_utils_parseURL_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(__resourceQuery);\nvar enabledFeatures = {\n  \"Hot Module Replacement\": false,\n  \"Live Reloading\": false,\n  Progress: false,\n  Overlay: false\n};\nif (parsedResourceQuery.hot === \"true\") {\n  options.hot = true;\n  enabledFeatures[\"Hot Module Replacement\"] = true;\n}\nif (parsedResourceQuery[\"live-reload\"] === \"true\") {\n  options.liveReload = true;\n  enabledFeatures[\"Live Reloading\"] = true;\n}\nif (parsedResourceQuery.progress === \"true\") {\n  options.progress = true;\n  enabledFeatures.Progress = true;\n}\nif (parsedResourceQuery.overlay) {\n  try {\n    options.overlay = JSON.parse(parsedResourceQuery.overlay);\n  } catch (e) {\n    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(\"Error parsing overlay options from resource query:\", e);\n  }\n\n  // Fill in default \"true\" params for partially-specified objects.\n  if (typeof options.overlay === \"object\") {\n    options.overlay = _objectSpread({\n      errors: true,\n      warnings: true,\n      runtimeErrors: true\n    }, options.overlay);\n    decodeOverlayOptions(options.overlay);\n  }\n  enabledFeatures.Overlay = true;\n}\nif (parsedResourceQuery.logging) {\n  options.logging = parsedResourceQuery.logging;\n}\nif (typeof parsedResourceQuery.reconnect !== \"undefined\") {\n  options.reconnect = Number(parsedResourceQuery.reconnect);\n}\n\n/**\n * @param {string} level\n */\nfunction setAllLogLevel(level) {\n  // This is needed because the HMR logger operate separately from dev server logger\n  webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default().setLogLevel(level === \"verbose\" || level === \"log\" ? \"info\" : level);\n  (0,_utils_log_js__WEBPACK_IMPORTED_MODULE_5__.setLogLevel)(level);\n}\nif (options.logging) {\n  setAllLogLevel(options.logging);\n}\n(0,_utils_log_js__WEBPACK_IMPORTED_MODULE_5__.logEnabledFeatures)(enabledFeatures);\nself.addEventListener(\"beforeunload\", function () {\n  status.isUnloading = true;\n});\nvar overlay = typeof window !== \"undefined\" ? (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.createOverlay)(typeof options.overlay === \"object\" ? {\n  trustedTypesPolicyName: options.overlay.trustedTypesPolicyName,\n  catchRuntimeError: options.overlay.runtimeErrors\n} : {\n  trustedTypesPolicyName: false,\n  catchRuntimeError: options.overlay\n}) : {\n  send: function send() {}\n};\nvar onSocketMessage = {\n  hot: function hot() {\n    if (parsedResourceQuery.hot === \"false\") {\n      return;\n    }\n    options.hot = true;\n  },\n  liveReload: function liveReload() {\n    if (parsedResourceQuery[\"live-reload\"] === \"false\") {\n      return;\n    }\n    options.liveReload = true;\n  },\n  invalid: function invalid() {\n    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info(\"App updated. Recompiling...\");\n\n    // Fixes #1042. overlay doesn't clear if errors are fixed but warnings remain.\n    if (options.overlay) {\n      overlay.send({\n        type: \"DISMISS\"\n      });\n    }\n    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(\"Invalid\");\n  },\n  /**\n   * @param {string} hash\n   */\n  hash: function hash(_hash) {\n    status.previousHash = status.currentHash;\n    status.currentHash = _hash;\n  },\n  logging: setAllLogLevel,\n  /**\n   * @param {boolean} value\n   */\n  overlay: function overlay(value) {\n    if (typeof document === \"undefined\") {\n      return;\n    }\n    options.overlay = value;\n    decodeOverlayOptions(options.overlay);\n  },\n  /**\n   * @param {number} value\n   */\n  reconnect: function reconnect(value) {\n    if (parsedResourceQuery.reconnect === \"false\") {\n      return;\n    }\n    options.reconnect = value;\n  },\n  /**\n   * @param {boolean} value\n   */\n  progress: function progress(value) {\n    options.progress = value;\n  },\n  /**\n   * @param {{ pluginName?: string, percent: number, msg: string }} data\n   */\n  \"progress-update\": function progressUpdate(data) {\n    if (options.progress) {\n      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info(\"\".concat(data.pluginName ? \"[\".concat(data.pluginName, \"] \") : \"\").concat(data.percent, \"% - \").concat(data.msg, \".\"));\n    }\n    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(\"Progress\", data);\n  },\n  \"still-ok\": function stillOk() {\n    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info(\"Nothing changed.\");\n    if (options.overlay) {\n      overlay.send({\n        type: \"DISMISS\"\n      });\n    }\n    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(\"StillOk\");\n  },\n  ok: function ok() {\n    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(\"Ok\");\n    if (options.overlay) {\n      overlay.send({\n        type: \"DISMISS\"\n      });\n    }\n    (0,_utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(options, status);\n  },\n  // TODO: remove in v5 in favor of 'static-changed'\n  /**\n   * @param {string} file\n   */\n  \"content-changed\": function contentChanged(file) {\n    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info(\"\".concat(file ? \"\\\"\".concat(file, \"\\\"\") : \"Content\", \" from static directory was changed. Reloading...\"));\n    self.location.reload();\n  },\n  /**\n   * @param {string} file\n   */\n  \"static-changed\": function staticChanged(file) {\n    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info(\"\".concat(file ? \"\\\"\".concat(file, \"\\\"\") : \"Content\", \" from static directory was changed. Reloading...\"));\n    self.location.reload();\n  },\n  /**\n   * @param {Error[]} warnings\n   * @param {any} params\n   */\n  warnings: function warnings(_warnings, params) {\n    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.warn(\"Warnings while compiling.\");\n    var printableWarnings = _warnings.map(function (error) {\n      var _formatProblem = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.formatProblem)(\"warning\", error),\n        header = _formatProblem.header,\n        body = _formatProblem.body;\n      return \"\".concat(header, \"\\n\").concat((0,_utils_stripAnsi_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(body));\n    });\n    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(\"Warnings\", printableWarnings);\n    for (var i = 0; i < printableWarnings.length; i++) {\n      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.warn(printableWarnings[i]);\n    }\n    var overlayWarningsSetting = typeof options.overlay === \"boolean\" ? options.overlay : options.overlay && options.overlay.warnings;\n    if (overlayWarningsSetting) {\n      var warningsToDisplay = typeof overlayWarningsSetting === \"function\" ? _warnings.filter(overlayWarningsSetting) : _warnings;\n      if (warningsToDisplay.length) {\n        overlay.send({\n          type: \"BUILD_ERROR\",\n          level: \"warning\",\n          messages: _warnings\n        });\n      }\n    }\n    if (params && params.preventReloading) {\n      return;\n    }\n    (0,_utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(options, status);\n  },\n  /**\n   * @param {Error[]} errors\n   */\n  errors: function errors(_errors) {\n    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(\"Errors while compiling. Reload prevented.\");\n    var printableErrors = _errors.map(function (error) {\n      var _formatProblem2 = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.formatProblem)(\"error\", error),\n        header = _formatProblem2.header,\n        body = _formatProblem2.body;\n      return \"\".concat(header, \"\\n\").concat((0,_utils_stripAnsi_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(body));\n    });\n    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(\"Errors\", printableErrors);\n    for (var i = 0; i < printableErrors.length; i++) {\n      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(printableErrors[i]);\n    }\n    var overlayErrorsSettings = typeof options.overlay === \"boolean\" ? options.overlay : options.overlay && options.overlay.errors;\n    if (overlayErrorsSettings) {\n      var errorsToDisplay = typeof overlayErrorsSettings === \"function\" ? _errors.filter(overlayErrorsSettings) : _errors;\n      if (errorsToDisplay.length) {\n        overlay.send({\n          type: \"BUILD_ERROR\",\n          level: \"error\",\n          messages: _errors\n        });\n      }\n    }\n  },\n  /**\n   * @param {Error} error\n   */\n  error: function error(_error) {\n    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(_error);\n  },\n  close: function close() {\n    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info(\"Disconnected!\");\n    if (options.overlay) {\n      overlay.send({\n        type: \"DISMISS\"\n      });\n    }\n    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(\"Close\");\n  }\n};\nvar socketURL = (0,_utils_createSocketURL_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"])(parsedResourceQuery);\n(0,_socket_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(socketURL, onSocketMessage, options.reconnect);\n\n//# sourceURL=webpack://web/./node_modules/webpack-dev-server/client/index.js?");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/modules/logger/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/modules/logger/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("/******/ (function() { // webpackBootstrap\n/******/ \t\"use strict\";\n/******/ \tvar __webpack_modules__ = ({\n\n/***/ \"./client-src/modules/logger/SyncBailHookFake.js\":\n/*!*******************************************************!*\\\n  !*** ./client-src/modules/logger/SyncBailHookFake.js ***!\n  \\*******************************************************/\n/***/ (function(module) {\n\n\n\n/**\n * Client stub for tapable SyncBailHook\n */\nmodule.exports = function clientTapableSyncBailHook() {\n  return {\n    call: function call() {}\n  };\n};\n\n/***/ }),\n\n/***/ \"./node_modules/webpack/lib/logging/Logger.js\":\n/*!****************************************************!*\\\n  !*** ./node_modules/webpack/lib/logging/Logger.js ***!\n  \\****************************************************/\n/***/ (function(__unused_webpack_module, exports) {\n\n/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n\n\n\nfunction _toConsumableArray(arr) {\n  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();\n}\nfunction _nonIterableSpread() {\n  throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\");\n}\nfunction _unsupportedIterableToArray(o, minLen) {\n  if (!o) return;\n  if (typeof o === \"string\") return _arrayLikeToArray(o, minLen);\n  var n = Object.prototype.toString.call(o).slice(8, -1);\n  if (n === \"Object\" && o.constructor) n = o.constructor.name;\n  if (n === \"Map\" || n === \"Set\") return Array.from(o);\n  if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);\n}\nfunction _iterableToArray(iter) {\n  if (typeof (typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; }) !== \"undefined\" && iter[(typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; }).iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter);\n}\nfunction _arrayWithoutHoles(arr) {\n  if (Array.isArray(arr)) return _arrayLikeToArray(arr);\n}\nfunction _arrayLikeToArray(arr, len) {\n  if (len == null || len > arr.length) len = arr.length;\n  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];\n  return arr2;\n}\nfunction _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n}\nfunction _defineProperties(target, props) {\n  for (var i = 0; i < props.length; i++) {\n    var descriptor = props[i];\n    descriptor.enumerable = descriptor.enumerable || false;\n    descriptor.configurable = true;\n    if (\"value\" in descriptor) descriptor.writable = true;\n    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);\n  }\n}\nfunction _createClass(Constructor, protoProps, staticProps) {\n  if (protoProps) _defineProperties(Constructor.prototype, protoProps);\n  if (staticProps) _defineProperties(Constructor, staticProps);\n  Object.defineProperty(Constructor, \"prototype\", {\n    writable: false\n  });\n  return Constructor;\n}\nfunction _toPropertyKey(arg) {\n  var key = _toPrimitive(arg, \"string\");\n  return typeof key === \"symbol\" ? key : String(key);\n}\nfunction _toPrimitive(input, hint) {\n  if (typeof input !== \"object\" || input === null) return input;\n  var prim = input[(typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; }).toPrimitive];\n  if (prim !== undefined) {\n    var res = prim.call(input, hint || \"default\");\n    if (typeof res !== \"object\") return res;\n    throw new TypeError(\"@@toPrimitive must return a primitive value.\");\n  }\n  return (hint === \"string\" ? String : Number)(input);\n}\nvar LogType = Object.freeze({\n  error: /** @type {\"error\"} */\"error\",\n  // message, c style arguments\n  warn: /** @type {\"warn\"} */\"warn\",\n  // message, c style arguments\n  info: /** @type {\"info\"} */\"info\",\n  // message, c style arguments\n  log: /** @type {\"log\"} */\"log\",\n  // message, c style arguments\n  debug: /** @type {\"debug\"} */\"debug\",\n  // message, c style arguments\n\n  trace: /** @type {\"trace\"} */\"trace\",\n  // no arguments\n\n  group: /** @type {\"group\"} */\"group\",\n  // [label]\n  groupCollapsed: /** @type {\"groupCollapsed\"} */\"groupCollapsed\",\n  // [label]\n  groupEnd: /** @type {\"groupEnd\"} */\"groupEnd\",\n  // [label]\n\n  profile: /** @type {\"profile\"} */\"profile\",\n  // [profileName]\n  profileEnd: /** @type {\"profileEnd\"} */\"profileEnd\",\n  // [profileName]\n\n  time: /** @type {\"time\"} */\"time\",\n  // name, time as [seconds, nanoseconds]\n\n  clear: /** @type {\"clear\"} */\"clear\",\n  // no arguments\n  status: /** @type {\"status\"} */\"status\" // message, arguments\n});\n\nexports.LogType = LogType;\n\n/** @typedef {typeof LogType[keyof typeof LogType]} LogTypeEnum */\n\nvar LOG_SYMBOL = (typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; })(\"webpack logger raw log method\");\nvar TIMERS_SYMBOL = (typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; })(\"webpack logger times\");\nvar TIMERS_AGGREGATES_SYMBOL = (typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; })(\"webpack logger aggregated times\");\nvar WebpackLogger = /*#__PURE__*/function () {\n  /**\n   * @param {function(LogTypeEnum, any[]=): void} log log function\n   * @param {function(string | function(): string): WebpackLogger} getChildLogger function to create child logger\n   */\n  function WebpackLogger(log, getChildLogger) {\n    _classCallCheck(this, WebpackLogger);\n    this[LOG_SYMBOL] = log;\n    this.getChildLogger = getChildLogger;\n  }\n  _createClass(WebpackLogger, [{\n    key: \"error\",\n    value: function error() {\n      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n        args[_key] = arguments[_key];\n      }\n      this[LOG_SYMBOL](LogType.error, args);\n    }\n  }, {\n    key: \"warn\",\n    value: function warn() {\n      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {\n        args[_key2] = arguments[_key2];\n      }\n      this[LOG_SYMBOL](LogType.warn, args);\n    }\n  }, {\n    key: \"info\",\n    value: function info() {\n      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {\n        args[_key3] = arguments[_key3];\n      }\n      this[LOG_SYMBOL](LogType.info, args);\n    }\n  }, {\n    key: \"log\",\n    value: function log() {\n      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {\n        args[_key4] = arguments[_key4];\n      }\n      this[LOG_SYMBOL](LogType.log, args);\n    }\n  }, {\n    key: \"debug\",\n    value: function debug() {\n      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {\n        args[_key5] = arguments[_key5];\n      }\n      this[LOG_SYMBOL](LogType.debug, args);\n    }\n  }, {\n    key: \"assert\",\n    value: function assert(assertion) {\n      if (!assertion) {\n        for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {\n          args[_key6 - 1] = arguments[_key6];\n        }\n        this[LOG_SYMBOL](LogType.error, args);\n      }\n    }\n  }, {\n    key: \"trace\",\n    value: function trace() {\n      this[LOG_SYMBOL](LogType.trace, [\"Trace\"]);\n    }\n  }, {\n    key: \"clear\",\n    value: function clear() {\n      this[LOG_SYMBOL](LogType.clear);\n    }\n  }, {\n    key: \"status\",\n    value: function status() {\n      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {\n        args[_key7] = arguments[_key7];\n      }\n      this[LOG_SYMBOL](LogType.status, args);\n    }\n  }, {\n    key: \"group\",\n    value: function group() {\n      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {\n        args[_key8] = arguments[_key8];\n      }\n      this[LOG_SYMBOL](LogType.group, args);\n    }\n  }, {\n    key: \"groupCollapsed\",\n    value: function groupCollapsed() {\n      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {\n        args[_key9] = arguments[_key9];\n      }\n      this[LOG_SYMBOL](LogType.groupCollapsed, args);\n    }\n  }, {\n    key: \"groupEnd\",\n    value: function groupEnd() {\n      for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {\n        args[_key10] = arguments[_key10];\n      }\n      this[LOG_SYMBOL](LogType.groupEnd, args);\n    }\n  }, {\n    key: \"profile\",\n    value: function profile(label) {\n      this[LOG_SYMBOL](LogType.profile, [label]);\n    }\n  }, {\n    key: \"profileEnd\",\n    value: function profileEnd(label) {\n      this[LOG_SYMBOL](LogType.profileEnd, [label]);\n    }\n  }, {\n    key: \"time\",\n    value: function time(label) {\n      this[TIMERS_SYMBOL] = this[TIMERS_SYMBOL] || new Map();\n      this[TIMERS_SYMBOL].set(label, process.hrtime());\n    }\n  }, {\n    key: \"timeLog\",\n    value: function timeLog(label) {\n      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);\n      if (!prev) {\n        throw new Error(\"No such label '\".concat(label, \"' for WebpackLogger.timeLog()\"));\n      }\n      var time = process.hrtime(prev);\n      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));\n    }\n  }, {\n    key: \"timeEnd\",\n    value: function timeEnd(label) {\n      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);\n      if (!prev) {\n        throw new Error(\"No such label '\".concat(label, \"' for WebpackLogger.timeEnd()\"));\n      }\n      var time = process.hrtime(prev);\n      this[TIMERS_SYMBOL].delete(label);\n      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));\n    }\n  }, {\n    key: \"timeAggregate\",\n    value: function timeAggregate(label) {\n      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);\n      if (!prev) {\n        throw new Error(\"No such label '\".concat(label, \"' for WebpackLogger.timeAggregate()\"));\n      }\n      var time = process.hrtime(prev);\n      this[TIMERS_SYMBOL].delete(label);\n      this[TIMERS_AGGREGATES_SYMBOL] = this[TIMERS_AGGREGATES_SYMBOL] || new Map();\n      var current = this[TIMERS_AGGREGATES_SYMBOL].get(label);\n      if (current !== undefined) {\n        if (time[1] + current[1] > 1e9) {\n          time[0] += current[0] + 1;\n          time[1] = time[1] - 1e9 + current[1];\n        } else {\n          time[0] += current[0];\n          time[1] += current[1];\n        }\n      }\n      this[TIMERS_AGGREGATES_SYMBOL].set(label, time);\n    }\n  }, {\n    key: \"timeAggregateEnd\",\n    value: function timeAggregateEnd(label) {\n      if (this[TIMERS_AGGREGATES_SYMBOL] === undefined) return;\n      var time = this[TIMERS_AGGREGATES_SYMBOL].get(label);\n      if (time === undefined) return;\n      this[TIMERS_AGGREGATES_SYMBOL].delete(label);\n      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));\n    }\n  }]);\n  return WebpackLogger;\n}();\nexports.Logger = WebpackLogger;\n\n/***/ }),\n\n/***/ \"./node_modules/webpack/lib/logging/createConsoleLogger.js\":\n/*!*****************************************************************!*\\\n  !*** ./node_modules/webpack/lib/logging/createConsoleLogger.js ***!\n  \\*****************************************************************/\n/***/ (function(module, __unused_webpack_exports, __nested_webpack_require_11285__) {\n\n/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n\n\n\nfunction _toConsumableArray(arr) {\n  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();\n}\nfunction _nonIterableSpread() {\n  throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\");\n}\nfunction _unsupportedIterableToArray(o, minLen) {\n  if (!o) return;\n  if (typeof o === \"string\") return _arrayLikeToArray(o, minLen);\n  var n = Object.prototype.toString.call(o).slice(8, -1);\n  if (n === \"Object\" && o.constructor) n = o.constructor.name;\n  if (n === \"Map\" || n === \"Set\") return Array.from(o);\n  if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);\n}\nfunction _iterableToArray(iter) {\n  if (typeof (typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; }) !== \"undefined\" && iter[(typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; }).iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter);\n}\nfunction _arrayWithoutHoles(arr) {\n  if (Array.isArray(arr)) return _arrayLikeToArray(arr);\n}\nfunction _arrayLikeToArray(arr, len) {\n  if (len == null || len > arr.length) len = arr.length;\n  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];\n  return arr2;\n}\nvar _require = __nested_webpack_require_11285__(/*! ./Logger */ \"./node_modules/webpack/lib/logging/Logger.js\"),\n  LogType = _require.LogType;\n\n/** @typedef {import(\"../../declarations/WebpackOptions\").FilterItemTypes} FilterItemTypes */\n/** @typedef {import(\"../../declarations/WebpackOptions\").FilterTypes} FilterTypes */\n/** @typedef {import(\"./Logger\").LogTypeEnum} LogTypeEnum */\n\n/** @typedef {function(string): boolean} FilterFunction */\n\n/**\n * @typedef {Object} LoggerConsole\n * @property {function(): void} clear\n * @property {function(): void} trace\n * @property {(...args: any[]) => void} info\n * @property {(...args: any[]) => void} log\n * @property {(...args: any[]) => void} warn\n * @property {(...args: any[]) => void} error\n * @property {(...args: any[]) => void=} debug\n * @property {(...args: any[]) => void=} group\n * @property {(...args: any[]) => void=} groupCollapsed\n * @property {(...args: any[]) => void=} groupEnd\n * @property {(...args: any[]) => void=} status\n * @property {(...args: any[]) => void=} profile\n * @property {(...args: any[]) => void=} profileEnd\n * @property {(...args: any[]) => void=} logTime\n */\n\n/**\n * @typedef {Object} LoggerOptions\n * @property {false|true|\"none\"|\"error\"|\"warn\"|\"info\"|\"log\"|\"verbose\"} level loglevel\n * @property {FilterTypes|boolean} debug filter for debug logging\n * @property {LoggerConsole} console the console to log to\n */\n\n/**\n * @param {FilterItemTypes} item an input item\n * @returns {FilterFunction} filter function\n */\nvar filterToFunction = function filterToFunction(item) {\n  if (typeof item === \"string\") {\n    var regExp = new RegExp(\"[\\\\\\\\/]\".concat(item.replace(\n    // eslint-disable-next-line no-useless-escape\n    /[-[\\]{}()*+?.\\\\^$|]/g, \"\\\\$&\"), \"([\\\\\\\\/]|$|!|\\\\?)\"));\n    return function (ident) {\n      return regExp.test(ident);\n    };\n  }\n  if (item && typeof item === \"object\" && typeof item.test === \"function\") {\n    return function (ident) {\n      return item.test(ident);\n    };\n  }\n  if (typeof item === \"function\") {\n    return item;\n  }\n  if (typeof item === \"boolean\") {\n    return function () {\n      return item;\n    };\n  }\n};\n\n/**\n * @enum {number}\n */\nvar LogLevel = {\n  none: 6,\n  false: 6,\n  error: 5,\n  warn: 4,\n  info: 3,\n  log: 2,\n  true: 2,\n  verbose: 1\n};\n\n/**\n * @param {LoggerOptions} options options object\n * @returns {function(string, LogTypeEnum, any[]): void} logging function\n */\nmodule.exports = function (_ref) {\n  var _ref$level = _ref.level,\n    level = _ref$level === void 0 ? \"info\" : _ref$level,\n    _ref$debug = _ref.debug,\n    debug = _ref$debug === void 0 ? false : _ref$debug,\n    console = _ref.console;\n  var debugFilters = typeof debug === \"boolean\" ? [function () {\n    return debug;\n  }] : /** @type {FilterItemTypes[]} */[].concat(debug).map(filterToFunction);\n  /** @type {number} */\n  var loglevel = LogLevel[\"\".concat(level)] || 0;\n\n  /**\n   * @param {string} name name of the logger\n   * @param {LogTypeEnum} type type of the log entry\n   * @param {any[]} args arguments of the log entry\n   * @returns {void}\n   */\n  var logger = function logger(name, type, args) {\n    var labeledArgs = function labeledArgs() {\n      if (Array.isArray(args)) {\n        if (args.length > 0 && typeof args[0] === \"string\") {\n          return [\"[\".concat(name, \"] \").concat(args[0])].concat(_toConsumableArray(args.slice(1)));\n        } else {\n          return [\"[\".concat(name, \"]\")].concat(_toConsumableArray(args));\n        }\n      } else {\n        return [];\n      }\n    };\n    var debug = debugFilters.some(function (f) {\n      return f(name);\n    });\n    switch (type) {\n      case LogType.debug:\n        if (!debug) return;\n        // eslint-disable-next-line node/no-unsupported-features/node-builtins\n        if (typeof console.debug === \"function\") {\n          // eslint-disable-next-line node/no-unsupported-features/node-builtins\n          console.debug.apply(console, _toConsumableArray(labeledArgs()));\n        } else {\n          console.log.apply(console, _toConsumableArray(labeledArgs()));\n        }\n        break;\n      case LogType.log:\n        if (!debug && loglevel > LogLevel.log) return;\n        console.log.apply(console, _toConsumableArray(labeledArgs()));\n        break;\n      case LogType.info:\n        if (!debug && loglevel > LogLevel.info) return;\n        console.info.apply(console, _toConsumableArray(labeledArgs()));\n        break;\n      case LogType.warn:\n        if (!debug && loglevel > LogLevel.warn) return;\n        console.warn.apply(console, _toConsumableArray(labeledArgs()));\n        break;\n      case LogType.error:\n        if (!debug && loglevel > LogLevel.error) return;\n        console.error.apply(console, _toConsumableArray(labeledArgs()));\n        break;\n      case LogType.trace:\n        if (!debug) return;\n        console.trace();\n        break;\n      case LogType.groupCollapsed:\n        if (!debug && loglevel > LogLevel.log) return;\n        if (!debug && loglevel > LogLevel.verbose) {\n          // eslint-disable-next-line node/no-unsupported-features/node-builtins\n          if (typeof console.groupCollapsed === \"function\") {\n            // eslint-disable-next-line node/no-unsupported-features/node-builtins\n            console.groupCollapsed.apply(console, _toConsumableArray(labeledArgs()));\n          } else {\n            console.log.apply(console, _toConsumableArray(labeledArgs()));\n          }\n          break;\n        }\n      // falls through\n      case LogType.group:\n        if (!debug && loglevel > LogLevel.log) return;\n        // eslint-disable-next-line node/no-unsupported-features/node-builtins\n        if (typeof console.group === \"function\") {\n          // eslint-disable-next-line node/no-unsupported-features/node-builtins\n          console.group.apply(console, _toConsumableArray(labeledArgs()));\n        } else {\n          console.log.apply(console, _toConsumableArray(labeledArgs()));\n        }\n        break;\n      case LogType.groupEnd:\n        if (!debug && loglevel > LogLevel.log) return;\n        // eslint-disable-next-line node/no-unsupported-features/node-builtins\n        if (typeof console.groupEnd === \"function\") {\n          // eslint-disable-next-line node/no-unsupported-features/node-builtins\n          console.groupEnd();\n        }\n        break;\n      case LogType.time:\n        {\n          if (!debug && loglevel > LogLevel.log) return;\n          var ms = args[1] * 1000 + args[2] / 1000000;\n          var msg = \"[\".concat(name, \"] \").concat(args[0], \": \").concat(ms, \" ms\");\n          if (typeof console.logTime === \"function\") {\n            console.logTime(msg);\n          } else {\n            console.log(msg);\n          }\n          break;\n        }\n      case LogType.profile:\n        // eslint-disable-next-line node/no-unsupported-features/node-builtins\n        if (typeof console.profile === \"function\") {\n          // eslint-disable-next-line node/no-unsupported-features/node-builtins\n          console.profile.apply(console, _toConsumableArray(labeledArgs()));\n        }\n        break;\n      case LogType.profileEnd:\n        // eslint-disable-next-line node/no-unsupported-features/node-builtins\n        if (typeof console.profileEnd === \"function\") {\n          // eslint-disable-next-line node/no-unsupported-features/node-builtins\n          console.profileEnd.apply(console, _toConsumableArray(labeledArgs()));\n        }\n        break;\n      case LogType.clear:\n        if (!debug && loglevel > LogLevel.log) return;\n        // eslint-disable-next-line node/no-unsupported-features/node-builtins\n        if (typeof console.clear === \"function\") {\n          // eslint-disable-next-line node/no-unsupported-features/node-builtins\n          console.clear();\n        }\n        break;\n      case LogType.status:\n        if (!debug && loglevel > LogLevel.info) return;\n        if (typeof console.status === \"function\") {\n          if (args.length === 0) {\n            console.status();\n          } else {\n            console.status.apply(console, _toConsumableArray(labeledArgs()));\n          }\n        } else {\n          if (args.length !== 0) {\n            console.info.apply(console, _toConsumableArray(labeledArgs()));\n          }\n        }\n        break;\n      default:\n        throw new Error(\"Unexpected LogType \".concat(type));\n    }\n  };\n  return logger;\n};\n\n/***/ }),\n\n/***/ \"./node_modules/webpack/lib/logging/runtime.js\":\n/*!*****************************************************!*\\\n  !*** ./node_modules/webpack/lib/logging/runtime.js ***!\n  \\*****************************************************/\n/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_21334__) {\n\n/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n\n\n\nfunction _extends() {\n  _extends = Object.assign ? Object.assign.bind() : function (target) {\n    for (var i = 1; i < arguments.length; i++) {\n      var source = arguments[i];\n      for (var key in source) {\n        if (Object.prototype.hasOwnProperty.call(source, key)) {\n          target[key] = source[key];\n        }\n      }\n    }\n    return target;\n  };\n  return _extends.apply(this, arguments);\n}\nvar SyncBailHook = __nested_webpack_require_21334__(/*! tapable/lib/SyncBailHook */ \"./client-src/modules/logger/SyncBailHookFake.js\");\nvar _require = __nested_webpack_require_21334__(/*! ./Logger */ \"./node_modules/webpack/lib/logging/Logger.js\"),\n  Logger = _require.Logger;\nvar createConsoleLogger = __nested_webpack_require_21334__(/*! ./createConsoleLogger */ \"./node_modules/webpack/lib/logging/createConsoleLogger.js\");\n\n/** @type {createConsoleLogger.LoggerOptions} */\nvar currentDefaultLoggerOptions = {\n  level: \"info\",\n  debug: false,\n  console: console\n};\nvar currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);\n\n/**\n * @param {string} name name of the logger\n * @returns {Logger} a logger\n */\nexports.getLogger = function (name) {\n  return new Logger(function (type, args) {\n    if (exports.hooks.log.call(name, type, args) === undefined) {\n      currentDefaultLogger(name, type, args);\n    }\n  }, function (childName) {\n    return exports.getLogger(\"\".concat(name, \"/\").concat(childName));\n  });\n};\n\n/**\n * @param {createConsoleLogger.LoggerOptions} options new options, merge with old options\n * @returns {void}\n */\nexports.configureDefaultLogger = function (options) {\n  _extends(currentDefaultLoggerOptions, options);\n  currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);\n};\nexports.hooks = {\n  log: new SyncBailHook([\"origin\", \"type\", \"args\"])\n};\n\n/***/ })\n\n/******/ \t});\n/************************************************************************/\n/******/ \t// The module cache\n/******/ \tvar __webpack_module_cache__ = {};\n/******/ \t\n/******/ \t// The require function\n/******/ \tfunction __nested_webpack_require_23461__(moduleId) {\n/******/ \t\t// Check if module is in cache\n/******/ \t\tvar cachedModule = __webpack_module_cache__[moduleId];\n/******/ \t\tif (cachedModule !== undefined) {\n/******/ \t\t\treturn cachedModule.exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = __webpack_module_cache__[moduleId] = {\n/******/ \t\t\t// no module.id needed\n/******/ \t\t\t// no module.loaded needed\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/ \t\n/******/ \t\t// Execute the module function\n/******/ \t\t__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_23461__);\n/******/ \t\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/ \t\n/************************************************************************/\n/******/ \t/* webpack/runtime/define property getters */\n/******/ \t!function() {\n/******/ \t\t// define getter functions for harmony exports\n/******/ \t\t__nested_webpack_require_23461__.d = function(exports, definition) {\n/******/ \t\t\tfor(var key in definition) {\n/******/ \t\t\t\tif(__nested_webpack_require_23461__.o(definition, key) && !__nested_webpack_require_23461__.o(exports, key)) {\n/******/ \t\t\t\t\tObject.defineProperty(exports, key, { enumerable: true, get: definition[key] });\n/******/ \t\t\t\t}\n/******/ \t\t\t}\n/******/ \t\t};\n/******/ \t}();\n/******/ \t\n/******/ \t/* webpack/runtime/hasOwnProperty shorthand */\n/******/ \t!function() {\n/******/ \t\t__nested_webpack_require_23461__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }\n/******/ \t}();\n/******/ \t\n/******/ \t/* webpack/runtime/make namespace object */\n/******/ \t!function() {\n/******/ \t\t// define __esModule on exports\n/******/ \t\t__nested_webpack_require_23461__.r = function(exports) {\n/******/ \t\t\tif(typeof Symbol !== 'undefined' && Symbol.toStringTag) {\n/******/ \t\t\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\n/******/ \t\t\t}\n/******/ \t\t\tObject.defineProperty(exports, '__esModule', { value: true });\n/******/ \t\t};\n/******/ \t}();\n/******/ \t\n/************************************************************************/\nvar __nested_webpack_exports__ = {};\n// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.\n!function() {\n/*!********************************************!*\\\n  !*** ./client-src/modules/logger/index.js ***!\n  \\********************************************/\n__nested_webpack_require_23461__.r(__nested_webpack_exports__);\n/* harmony export */ __nested_webpack_require_23461__.d(__nested_webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* reexport default export from named module */ webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__; }\n/* harmony export */ });\n/* harmony import */ var webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_23461__(/*! webpack/lib/logging/runtime.js */ \"./node_modules/webpack/lib/logging/runtime.js\");\n\n}();\nvar __webpack_export_target__ = exports;\nfor(var i in __nested_webpack_exports__) __webpack_export_target__[i] = __nested_webpack_exports__[i];\nif(__nested_webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, \"__esModule\", { value: true });\n/******/ })()\n;\n\n//# sourceURL=webpack://web/./node_modules/webpack-dev-server/client/modules/logger/index.js?");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay.js":
/*!***********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createOverlay\": () => (/* binding */ createOverlay),\n/* harmony export */   \"formatProblem\": () => (/* binding */ formatProblem)\n/* harmony export */ });\n/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ansi-html-community */ \"./node_modules/ansi-html-community/index.js\");\n/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ansi_html_community__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var html_entities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! html-entities */ \"./node_modules/html-entities/lib/index.js\");\n/* harmony import */ var html_entities__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(html_entities__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _overlay_runtime_error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./overlay/runtime-error.js */ \"./node_modules/webpack-dev-server/client/overlay/runtime-error.js\");\n/* harmony import */ var _overlay_state_machine_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./overlay/state-machine.js */ \"./node_modules/webpack-dev-server/client/overlay/state-machine.js\");\n/* harmony import */ var _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./overlay/styles.js */ \"./node_modules/webpack-dev-server/client/overlay/styles.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }\nfunction _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return typeof key === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (typeof input !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (typeof res !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\n// The error overlay is inspired (and mostly copied) from Create React App (https://github.com/facebookincubator/create-react-app)\n// They, in turn, got inspired by webpack-hot-middleware (https://github.com/glenjamin/webpack-hot-middleware).\n\n\n\n\n\n\nvar colors = {\n  reset: [\"transparent\", \"transparent\"],\n  black: \"181818\",\n  red: \"E36049\",\n  green: \"B3CB74\",\n  yellow: \"FFD080\",\n  blue: \"7CAFC2\",\n  magenta: \"7FACCA\",\n  cyan: \"C3C2EF\",\n  lightgrey: \"EBE7E3\",\n  darkgrey: \"6D7891\"\n};\nansi_html_community__WEBPACK_IMPORTED_MODULE_0___default().setColors(colors);\n\n/**\n * @param {string} type\n * @param {string  | { file?: string, moduleName?: string, loc?: string, message?: string; stack?: string[] }} item\n * @returns {{ header: string, body: string }}\n */\nfunction formatProblem(type, item) {\n  var header = type === \"warning\" ? \"WARNING\" : \"ERROR\";\n  var body = \"\";\n  if (typeof item === \"string\") {\n    body += item;\n  } else {\n    var file = item.file || \"\";\n    // eslint-disable-next-line no-nested-ternary\n    var moduleName = item.moduleName ? item.moduleName.indexOf(\"!\") !== -1 ? \"\".concat(item.moduleName.replace(/^(\\s|\\S)*!/, \"\"), \" (\").concat(item.moduleName, \")\") : \"\".concat(item.moduleName) : \"\";\n    var loc = item.loc;\n    header += \"\".concat(moduleName || file ? \" in \".concat(moduleName ? \"\".concat(moduleName).concat(file ? \" (\".concat(file, \")\") : \"\") : file).concat(loc ? \" \".concat(loc) : \"\") : \"\");\n    body += item.message || \"\";\n  }\n  if (Array.isArray(item.stack)) {\n    item.stack.forEach(function (stack) {\n      if (typeof stack === \"string\") {\n        body += \"\\r\\n\".concat(stack);\n      }\n    });\n  }\n  return {\n    header: header,\n    body: body\n  };\n}\n\n/**\n * @typedef {Object} CreateOverlayOptions\n * @property {string | null} trustedTypesPolicyName\n * @property {boolean | (error: Error) => void} [catchRuntimeError]\n */\n\n/**\n *\n * @param {CreateOverlayOptions} options\n */\nvar createOverlay = function createOverlay(options) {\n  /** @type {HTMLIFrameElement | null | undefined} */\n  var iframeContainerElement;\n  /** @type {HTMLDivElement | null | undefined} */\n  var containerElement;\n  /** @type {HTMLDivElement | null | undefined} */\n  var headerElement;\n  /** @type {Array<(element: HTMLDivElement) => void>} */\n  var onLoadQueue = [];\n  /** @type {TrustedTypePolicy | undefined} */\n  var overlayTrustedTypesPolicy;\n\n  /**\n   *\n   * @param {HTMLElement} element\n   * @param {CSSStyleDeclaration} style\n   */\n  function applyStyle(element, style) {\n    Object.keys(style).forEach(function (prop) {\n      element.style[prop] = style[prop];\n    });\n  }\n\n  /**\n   * @param {string | null} trustedTypesPolicyName\n   */\n  function createContainer(trustedTypesPolicyName) {\n    // Enable Trusted Types if they are available in the current browser.\n    if (window.trustedTypes) {\n      overlayTrustedTypesPolicy = window.trustedTypes.createPolicy(trustedTypesPolicyName || \"webpack-dev-server#overlay\", {\n        createHTML: function createHTML(value) {\n          return value;\n        }\n      });\n    }\n    iframeContainerElement = document.createElement(\"iframe\");\n    iframeContainerElement.id = \"webpack-dev-server-client-overlay\";\n    iframeContainerElement.src = \"about:blank\";\n    applyStyle(iframeContainerElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.iframeStyle);\n    iframeContainerElement.onload = function () {\n      var contentElement = /** @type {Document} */\n      /** @type {HTMLIFrameElement} */\n      iframeContainerElement.contentDocument.createElement(\"div\");\n      containerElement = /** @type {Document} */\n      /** @type {HTMLIFrameElement} */\n      iframeContainerElement.contentDocument.createElement(\"div\");\n      contentElement.id = \"webpack-dev-server-client-overlay-div\";\n      applyStyle(contentElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.containerStyle);\n      headerElement = document.createElement(\"div\");\n      headerElement.innerText = \"Compiled with problems:\";\n      applyStyle(headerElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.headerStyle);\n      var closeButtonElement = document.createElement(\"button\");\n      applyStyle(closeButtonElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.dismissButtonStyle);\n      closeButtonElement.innerText = \"×\";\n      closeButtonElement.ariaLabel = \"Dismiss\";\n      closeButtonElement.addEventListener(\"click\", function () {\n        // eslint-disable-next-line no-use-before-define\n        overlayService.send({\n          type: \"DISMISS\"\n        });\n      });\n      contentElement.appendChild(headerElement);\n      contentElement.appendChild(closeButtonElement);\n      contentElement.appendChild(containerElement);\n\n      /** @type {Document} */\n      /** @type {HTMLIFrameElement} */\n      iframeContainerElement.contentDocument.body.appendChild(contentElement);\n      onLoadQueue.forEach(function (onLoad) {\n        onLoad( /** @type {HTMLDivElement} */contentElement);\n      });\n      onLoadQueue = [];\n\n      /** @type {HTMLIFrameElement} */\n      iframeContainerElement.onload = null;\n    };\n    document.body.appendChild(iframeContainerElement);\n  }\n\n  /**\n   * @param {(element: HTMLDivElement) => void} callback\n   * @param {string | null} trustedTypesPolicyName\n   */\n  function ensureOverlayExists(callback, trustedTypesPolicyName) {\n    if (containerElement) {\n      containerElement.innerHTML = \"\";\n      // Everything is ready, call the callback right away.\n      callback(containerElement);\n      return;\n    }\n    onLoadQueue.push(callback);\n    if (iframeContainerElement) {\n      return;\n    }\n    createContainer(trustedTypesPolicyName);\n  }\n\n  // Successful compilation.\n  function hide() {\n    if (!iframeContainerElement) {\n      return;\n    }\n\n    // Clean up and reset internal state.\n    document.body.removeChild(iframeContainerElement);\n    iframeContainerElement = null;\n    containerElement = null;\n  }\n\n  // Compilation with errors (e.g. syntax error or missing modules).\n  /**\n   * @param {string} type\n   * @param {Array<string  | { moduleIdentifier?: string, moduleName?: string, loc?: string, message?: string }>} messages\n   * @param {string | null} trustedTypesPolicyName\n   * @param {'build' | 'runtime'} messageSource\n   */\n  function show(type, messages, trustedTypesPolicyName, messageSource) {\n    ensureOverlayExists(function () {\n      headerElement.innerText = messageSource === \"runtime\" ? \"Uncaught runtime errors:\" : \"Compiled with problems:\";\n      messages.forEach(function (message) {\n        var entryElement = document.createElement(\"div\");\n        var msgStyle = type === \"warning\" ? _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.msgStyles.warning : _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.msgStyles.error;\n        applyStyle(entryElement, _objectSpread(_objectSpread({}, msgStyle), {}, {\n          padding: \"1rem 1rem 1.5rem 1rem\"\n        }));\n        var typeElement = document.createElement(\"div\");\n        var _formatProblem = formatProblem(type, message),\n          header = _formatProblem.header,\n          body = _formatProblem.body;\n        typeElement.innerText = header;\n        applyStyle(typeElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.msgTypeStyle);\n        if (message.moduleIdentifier) {\n          applyStyle(typeElement, {\n            cursor: \"pointer\"\n          });\n          // element.dataset not supported in IE\n          typeElement.setAttribute(\"data-can-open\", true);\n          typeElement.addEventListener(\"click\", function () {\n            fetch(\"/webpack-dev-server/open-editor?fileName=\".concat(message.moduleIdentifier));\n          });\n        }\n\n        // Make it look similar to our terminal.\n        var text = ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default()((0,html_entities__WEBPACK_IMPORTED_MODULE_4__.encode)(body));\n        var messageTextNode = document.createElement(\"div\");\n        applyStyle(messageTextNode, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.msgTextStyle);\n        messageTextNode.innerHTML = overlayTrustedTypesPolicy ? overlayTrustedTypesPolicy.createHTML(text) : text;\n        entryElement.appendChild(typeElement);\n        entryElement.appendChild(messageTextNode);\n\n        /** @type {HTMLDivElement} */\n        containerElement.appendChild(entryElement);\n      });\n    }, trustedTypesPolicyName);\n  }\n  var overlayService = (0,_overlay_state_machine_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])({\n    showOverlay: function showOverlay(_ref) {\n      var _ref$level = _ref.level,\n        level = _ref$level === void 0 ? \"error\" : _ref$level,\n        messages = _ref.messages,\n        messageSource = _ref.messageSource;\n      return show(level, messages, options.trustedTypesPolicyName, messageSource);\n    },\n    hideOverlay: hide\n  });\n  if (options.catchRuntimeError) {\n    /**\n     * @param {Error | undefined} error\n     * @param {string} fallbackMessage\n     */\n    var handleError = function handleError(error, fallbackMessage) {\n      var errorObject = error instanceof Error ? error : new Error(error || fallbackMessage);\n      var shouldDisplay = typeof options.catchRuntimeError === \"function\" ? options.catchRuntimeError(errorObject) : true;\n      if (shouldDisplay) {\n        overlayService.send({\n          type: \"RUNTIME_ERROR\",\n          messages: [{\n            message: errorObject.message,\n            stack: (0,_overlay_runtime_error_js__WEBPACK_IMPORTED_MODULE_1__.parseErrorToStacks)(errorObject)\n          }]\n        });\n      }\n    };\n    (0,_overlay_runtime_error_js__WEBPACK_IMPORTED_MODULE_1__.listenToRuntimeError)(function (errorEvent) {\n      // error property may be empty in older browser like IE\n      var error = errorEvent.error,\n        message = errorEvent.message;\n      if (!error && !message) {\n        return;\n      }\n      handleError(error, message);\n    });\n    (0,_overlay_runtime_error_js__WEBPACK_IMPORTED_MODULE_1__.listenToUnhandledRejection)(function (promiseRejectionEvent) {\n      var reason = promiseRejectionEvent.reason;\n      handleError(reason, \"Unknown promise rejection reason\");\n    });\n  }\n  return overlayService;\n};\n\n\n//# sourceURL=webpack://web/./node_modules/webpack-dev-server/client/overlay.js?");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay/fsm.js":
/*!***************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay/fsm.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }\nfunction _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return typeof key === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (typeof input !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (typeof res !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\n/**\n * @typedef {Object} StateDefinitions\n * @property {{[event: string]: { target: string; actions?: Array<string> }}} [on]\n */\n\n/**\n * @typedef {Object} Options\n * @property {{[state: string]: StateDefinitions}} states\n * @property {object} context;\n * @property {string} initial\n */\n\n/**\n * @typedef {Object} Implementation\n * @property {{[actionName: string]: (ctx: object, event: any) => object}} actions\n */\n\n/**\n * A simplified `createMachine` from `@xstate/fsm` with the following differences:\n *\n *  - the returned machine is technically a \"service\". No `interpret(machine).start()` is needed.\n *  - the state definition only support `on` and target must be declared with { target: 'nextState', actions: [] } explicitly.\n *  - event passed to `send` must be an object with `type` property.\n *  - actions implementation will be [assign action](https://xstate.js.org/docs/guides/context.html#assign-action) if you return any value.\n *  Do not return anything if you just want to invoke side effect.\n *\n * The goal of this custom function is to avoid installing the entire `'xstate/fsm'` package, while enabling modeling using\n * state machine. You can copy the first parameter into the editor at https://stately.ai/viz to visualize the state machine.\n *\n * @param {Options} options\n * @param {Implementation} implementation\n */\nfunction createMachine(_ref, _ref2) {\n  var states = _ref.states,\n    context = _ref.context,\n    initial = _ref.initial;\n  var actions = _ref2.actions;\n  var currentState = initial;\n  var currentContext = context;\n  return {\n    send: function send(event) {\n      var currentStateOn = states[currentState].on;\n      var transitionConfig = currentStateOn && currentStateOn[event.type];\n      if (transitionConfig) {\n        currentState = transitionConfig.target;\n        if (transitionConfig.actions) {\n          transitionConfig.actions.forEach(function (actName) {\n            var actionImpl = actions[actName];\n            var nextContextValue = actionImpl && actionImpl(currentContext, event);\n            if (nextContextValue) {\n              currentContext = _objectSpread(_objectSpread({}, currentContext), nextContextValue);\n            }\n          });\n        }\n      }\n    }\n  };\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createMachine);\n\n//# sourceURL=webpack://web/./node_modules/webpack-dev-server/client/overlay/fsm.js?");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay/runtime-error.js":
/*!*************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay/runtime-error.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"listenToRuntimeError\": () => (/* binding */ listenToRuntimeError),\n/* harmony export */   \"listenToUnhandledRejection\": () => (/* binding */ listenToUnhandledRejection),\n/* harmony export */   \"parseErrorToStacks\": () => (/* binding */ parseErrorToStacks)\n/* harmony export */ });\n/**\n *\n * @param {Error} error\n */\nfunction parseErrorToStacks(error) {\n  if (!error || !(error instanceof Error)) {\n    throw new Error(\"parseErrorToStacks expects Error object\");\n  }\n  if (typeof error.stack === \"string\") {\n    return error.stack.split(\"\\n\").filter(function (stack) {\n      return stack !== \"Error: \".concat(error.message);\n    });\n  }\n}\n\n/**\n * @callback ErrorCallback\n * @param {ErrorEvent} error\n * @returns {void}\n */\n\n/**\n * @param {ErrorCallback} callback\n */\nfunction listenToRuntimeError(callback) {\n  window.addEventListener(\"error\", callback);\n  return function cleanup() {\n    window.removeEventListener(\"error\", callback);\n  };\n}\n\n/**\n * @callback UnhandledRejectionCallback\n * @param {PromiseRejectionEvent} rejectionEvent\n * @returns {void}\n */\n\n/**\n * @param {UnhandledRejectionCallback} callback\n */\nfunction listenToUnhandledRejection(callback) {\n  window.addEventListener(\"unhandledrejection\", callback);\n  return function cleanup() {\n    window.removeEventListener(\"unhandledrejection\", callback);\n  };\n}\n\n\n//# sourceURL=webpack://web/./node_modules/webpack-dev-server/client/overlay/runtime-error.js?");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay/state-machine.js":
/*!*************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay/state-machine.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _fsm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fsm.js */ \"./node_modules/webpack-dev-server/client/overlay/fsm.js\");\n\n\n/**\n * @typedef {Object} ShowOverlayData\n * @property {'warning' | 'error'} level\n * @property {Array<string  | { moduleIdentifier?: string, moduleName?: string, loc?: string, message?: string }>} messages\n * @property {'build' | 'runtime'} messageSource\n */\n\n/**\n * @typedef {Object} CreateOverlayMachineOptions\n * @property {(data: ShowOverlayData) => void} showOverlay\n * @property {() => void} hideOverlay\n */\n\n/**\n * @param {CreateOverlayMachineOptions} options\n */\nvar createOverlayMachine = function createOverlayMachine(options) {\n  var hideOverlay = options.hideOverlay,\n    showOverlay = options.showOverlay;\n  var overlayMachine = (0,_fsm_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n    initial: \"hidden\",\n    context: {\n      level: \"error\",\n      messages: [],\n      messageSource: \"build\"\n    },\n    states: {\n      hidden: {\n        on: {\n          BUILD_ERROR: {\n            target: \"displayBuildError\",\n            actions: [\"setMessages\", \"showOverlay\"]\n          },\n          RUNTIME_ERROR: {\n            target: \"displayRuntimeError\",\n            actions: [\"setMessages\", \"showOverlay\"]\n          }\n        }\n      },\n      displayBuildError: {\n        on: {\n          DISMISS: {\n            target: \"hidden\",\n            actions: [\"dismissMessages\", \"hideOverlay\"]\n          },\n          BUILD_ERROR: {\n            target: \"displayBuildError\",\n            actions: [\"appendMessages\", \"showOverlay\"]\n          }\n        }\n      },\n      displayRuntimeError: {\n        on: {\n          DISMISS: {\n            target: \"hidden\",\n            actions: [\"dismissMessages\", \"hideOverlay\"]\n          },\n          RUNTIME_ERROR: {\n            target: \"displayRuntimeError\",\n            actions: [\"appendMessages\", \"showOverlay\"]\n          },\n          BUILD_ERROR: {\n            target: \"displayBuildError\",\n            actions: [\"setMessages\", \"showOverlay\"]\n          }\n        }\n      }\n    }\n  }, {\n    actions: {\n      dismissMessages: function dismissMessages() {\n        return {\n          messages: [],\n          level: \"error\",\n          messageSource: \"build\"\n        };\n      },\n      appendMessages: function appendMessages(context, event) {\n        return {\n          messages: context.messages.concat(event.messages),\n          level: event.level || context.level,\n          messageSource: event.type === \"RUNTIME_ERROR\" ? \"runtime\" : \"build\"\n        };\n      },\n      setMessages: function setMessages(context, event) {\n        return {\n          messages: event.messages,\n          level: event.level || context.level,\n          messageSource: event.type === \"RUNTIME_ERROR\" ? \"runtime\" : \"build\"\n        };\n      },\n      hideOverlay: hideOverlay,\n      showOverlay: showOverlay\n    }\n  });\n  return overlayMachine;\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createOverlayMachine);\n\n//# sourceURL=webpack://web/./node_modules/webpack-dev-server/client/overlay/state-machine.js?");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay/styles.js":
/*!******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay/styles.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"containerStyle\": () => (/* binding */ containerStyle),\n/* harmony export */   \"dismissButtonStyle\": () => (/* binding */ dismissButtonStyle),\n/* harmony export */   \"headerStyle\": () => (/* binding */ headerStyle),\n/* harmony export */   \"iframeStyle\": () => (/* binding */ iframeStyle),\n/* harmony export */   \"msgStyles\": () => (/* binding */ msgStyles),\n/* harmony export */   \"msgTextStyle\": () => (/* binding */ msgTextStyle),\n/* harmony export */   \"msgTypeStyle\": () => (/* binding */ msgTypeStyle)\n/* harmony export */ });\n// styles are inspired by `react-error-overlay`\n\nvar msgStyles = {\n  error: {\n    backgroundColor: \"rgba(206, 17, 38, 0.1)\",\n    color: \"#fccfcf\"\n  },\n  warning: {\n    backgroundColor: \"rgba(251, 245, 180, 0.1)\",\n    color: \"#fbf5b4\"\n  }\n};\nvar iframeStyle = {\n  position: \"fixed\",\n  top: 0,\n  left: 0,\n  right: 0,\n  bottom: 0,\n  width: \"100vw\",\n  height: \"100vh\",\n  border: \"none\",\n  \"z-index\": 9999999999\n};\nvar containerStyle = {\n  position: \"fixed\",\n  boxSizing: \"border-box\",\n  left: 0,\n  top: 0,\n  right: 0,\n  bottom: 0,\n  width: \"100vw\",\n  height: \"100vh\",\n  fontSize: \"large\",\n  padding: \"2rem 2rem 4rem 2rem\",\n  lineHeight: \"1.2\",\n  whiteSpace: \"pre-wrap\",\n  overflow: \"auto\",\n  backgroundColor: \"rgba(0, 0, 0, 0.9)\",\n  color: \"white\"\n};\nvar headerStyle = {\n  color: \"#e83b46\",\n  fontSize: \"2em\",\n  whiteSpace: \"pre-wrap\",\n  fontFamily: \"sans-serif\",\n  margin: \"0 2rem 2rem 0\",\n  flex: \"0 0 auto\",\n  maxHeight: \"50%\",\n  overflow: \"auto\"\n};\nvar dismissButtonStyle = {\n  color: \"#ffffff\",\n  lineHeight: \"1rem\",\n  fontSize: \"1.5rem\",\n  padding: \"1rem\",\n  cursor: \"pointer\",\n  position: \"absolute\",\n  right: 0,\n  top: 0,\n  backgroundColor: \"transparent\",\n  border: \"none\"\n};\nvar msgTypeStyle = {\n  color: \"#e83b46\",\n  fontSize: \"1.2em\",\n  marginBottom: \"1rem\",\n  fontFamily: \"sans-serif\"\n};\nvar msgTextStyle = {\n  lineHeight: \"1.5\",\n  fontSize: \"1rem\",\n  fontFamily: \"Menlo, Consolas, monospace\"\n};\n\n\n//# sourceURL=webpack://web/./node_modules/webpack-dev-server/client/overlay/styles.js?");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/socket.js":
/*!**********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/socket.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"client\": () => (/* binding */ client),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clients/WebSocketClient.js */ \"./node_modules/webpack-dev-server/client/clients/WebSocketClient.js\");\n/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/log.js */ \"./node_modules/webpack-dev-server/client/utils/log.js\");\n/* provided dependency */ var __webpack_dev_server_client__ = __webpack_require__(/*! ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js */ \"./node_modules/webpack-dev-server/client/clients/WebSocketClient.js\");\n/* global __webpack_dev_server_client__ */\n\n\n\n\n// this WebsocketClient is here as a default fallback, in case the client is not injected\n/* eslint-disable camelcase */\nvar Client =\n// eslint-disable-next-line no-nested-ternary\ntypeof __webpack_dev_server_client__ !== \"undefined\" ? typeof __webpack_dev_server_client__.default !== \"undefined\" ? __webpack_dev_server_client__.default : __webpack_dev_server_client__ : _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n/* eslint-enable camelcase */\n\nvar retries = 0;\nvar maxRetries = 10;\n\n// Initialized client is exported so external consumers can utilize the same instance\n// It is mutable to enforce singleton\n// eslint-disable-next-line import/no-mutable-exports\nvar client = null;\n\n/**\n * @param {string} url\n * @param {{ [handler: string]: (data?: any, params?: any) => any }} handlers\n * @param {number} [reconnect]\n */\nvar socket = function initSocket(url, handlers, reconnect) {\n  client = new Client(url);\n  client.onOpen(function () {\n    retries = 0;\n    if (typeof reconnect !== \"undefined\") {\n      maxRetries = reconnect;\n    }\n  });\n  client.onClose(function () {\n    if (retries === 0) {\n      handlers.close();\n    }\n\n    // Try to reconnect.\n    client = null;\n\n    // After 10 retries stop trying, to prevent logspam.\n    if (retries < maxRetries) {\n      // Exponentially increase timeout to reconnect.\n      // Respectfully copied from the package `got`.\n      // eslint-disable-next-line no-restricted-properties\n      var retryInMs = 1000 * Math.pow(2, retries) + Math.random() * 100;\n      retries += 1;\n      _utils_log_js__WEBPACK_IMPORTED_MODULE_1__.log.info(\"Trying to reconnect...\");\n      setTimeout(function () {\n        socket(url, handlers, reconnect);\n      }, retryInMs);\n    }\n  });\n  client.onMessage(\n  /**\n   * @param {any} data\n   */\n  function (data) {\n    var message = JSON.parse(data);\n    if (handlers[message.type]) {\n      handlers[message.type](message.data, message.params);\n    }\n  });\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (socket);\n\n//# sourceURL=webpack://web/./node_modules/webpack-dev-server/client/socket.js?");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/createSocketURL.js":
/*!*************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/createSocketURL.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/**\n * @param {{ protocol?: string, auth?: string, hostname?: string, port?: string, pathname?: string, search?: string, hash?: string, slashes?: boolean }} objURL\n * @returns {string}\n */\nfunction format(objURL) {\n  var protocol = objURL.protocol || \"\";\n  if (protocol && protocol.substr(-1) !== \":\") {\n    protocol += \":\";\n  }\n  var auth = objURL.auth || \"\";\n  if (auth) {\n    auth = encodeURIComponent(auth);\n    auth = auth.replace(/%3A/i, \":\");\n    auth += \"@\";\n  }\n  var host = \"\";\n  if (objURL.hostname) {\n    host = auth + (objURL.hostname.indexOf(\":\") === -1 ? objURL.hostname : \"[\".concat(objURL.hostname, \"]\"));\n    if (objURL.port) {\n      host += \":\".concat(objURL.port);\n    }\n  }\n  var pathname = objURL.pathname || \"\";\n  if (objURL.slashes) {\n    host = \"//\".concat(host || \"\");\n    if (pathname && pathname.charAt(0) !== \"/\") {\n      pathname = \"/\".concat(pathname);\n    }\n  } else if (!host) {\n    host = \"\";\n  }\n  var search = objURL.search || \"\";\n  if (search && search.charAt(0) !== \"?\") {\n    search = \"?\".concat(search);\n  }\n  var hash = objURL.hash || \"\";\n  if (hash && hash.charAt(0) !== \"#\") {\n    hash = \"#\".concat(hash);\n  }\n  pathname = pathname.replace(/[?#]/g,\n  /**\n   * @param {string} match\n   * @returns {string}\n   */\n  function (match) {\n    return encodeURIComponent(match);\n  });\n  search = search.replace(\"#\", \"%23\");\n  return \"\".concat(protocol).concat(host).concat(pathname).concat(search).concat(hash);\n}\n\n/**\n * @param {URL & { fromCurrentScript?: boolean }} parsedURL\n * @returns {string}\n */\nfunction createSocketURL(parsedURL) {\n  var hostname = parsedURL.hostname;\n\n  // Node.js module parses it as `::`\n  // `new URL(urlString, [baseURLString])` parses it as '[::]'\n  var isInAddrAny = hostname === \"0.0.0.0\" || hostname === \"::\" || hostname === \"[::]\";\n\n  // why do we need this check?\n  // hostname n/a for file protocol (example, when using electron, ionic)\n  // see: https://github.com/webpack/webpack-dev-server/pull/384\n  if (isInAddrAny && self.location.hostname && self.location.protocol.indexOf(\"http\") === 0) {\n    hostname = self.location.hostname;\n  }\n  var socketURLProtocol = parsedURL.protocol || self.location.protocol;\n\n  // When https is used in the app, secure web sockets are always necessary because the browser doesn't accept non-secure web sockets.\n  if (socketURLProtocol === \"auto:\" || hostname && isInAddrAny && self.location.protocol === \"https:\") {\n    socketURLProtocol = self.location.protocol;\n  }\n  socketURLProtocol = socketURLProtocol.replace(/^(?:http|.+-extension|file)/i, \"ws\");\n  var socketURLAuth = \"\";\n\n  // `new URL(urlString, [baseURLstring])` doesn't have `auth` property\n  // Parse authentication credentials in case we need them\n  if (parsedURL.username) {\n    socketURLAuth = parsedURL.username;\n\n    // Since HTTP basic authentication does not allow empty username,\n    // we only include password if the username is not empty.\n    if (parsedURL.password) {\n      // Result: <username>:<password>\n      socketURLAuth = socketURLAuth.concat(\":\", parsedURL.password);\n    }\n  }\n\n  // In case the host is a raw IPv6 address, it can be enclosed in\n  // the brackets as the brackets are needed in the final URL string.\n  // Need to remove those as url.format blindly adds its own set of brackets\n  // if the host string contains colons. That would lead to non-working\n  // double brackets (e.g. [[::]]) host\n  //\n  // All of these web socket url params are optionally passed in through resourceQuery,\n  // so we need to fall back to the default if they are not provided\n  var socketURLHostname = (hostname || self.location.hostname || \"localhost\").replace(/^\\[(.*)\\]$/, \"$1\");\n  var socketURLPort = parsedURL.port;\n  if (!socketURLPort || socketURLPort === \"0\") {\n    socketURLPort = self.location.port;\n  }\n\n  // If path is provided it'll be passed in via the resourceQuery as a\n  // query param so it has to be parsed out of the querystring in order for the\n  // client to open the socket to the correct location.\n  var socketURLPathname = \"/ws\";\n  if (parsedURL.pathname && !parsedURL.fromCurrentScript) {\n    socketURLPathname = parsedURL.pathname;\n  }\n  return format({\n    protocol: socketURLProtocol,\n    auth: socketURLAuth,\n    hostname: socketURLHostname,\n    port: socketURLPort,\n    pathname: socketURLPathname,\n    slashes: true\n  });\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createSocketURL);\n\n//# sourceURL=webpack://web/./node_modules/webpack-dev-server/client/utils/createSocketURL.js?");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js":
/*!********************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/**\n * @returns {string}\n */\nfunction getCurrentScriptSource() {\n  // `document.currentScript` is the most accurate way to find the current script,\n  // but is not supported in all browsers.\n  if (document.currentScript) {\n    return document.currentScript.getAttribute(\"src\");\n  }\n\n  // Fallback to getting all scripts running in the document.\n  var scriptElements = document.scripts || [];\n  var scriptElementsWithSrc = Array.prototype.filter.call(scriptElements, function (element) {\n    return element.getAttribute(\"src\");\n  });\n  if (scriptElementsWithSrc.length > 0) {\n    var currentScript = scriptElementsWithSrc[scriptElementsWithSrc.length - 1];\n    return currentScript.getAttribute(\"src\");\n  }\n\n  // Fail as there was no script to use.\n  throw new Error(\"[webpack-dev-server] Failed to get current script source.\");\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getCurrentScriptSource);\n\n//# sourceURL=webpack://web/./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js?");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/log.js":
/*!*************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/log.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"log\": () => (/* binding */ log),\n/* harmony export */   \"logEnabledFeatures\": () => (/* binding */ logEnabledFeatures),\n/* harmony export */   \"setLogLevel\": () => (/* binding */ setLogLevel)\n/* harmony export */ });\n/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/logger/index.js */ \"./node_modules/webpack-dev-server/client/modules/logger/index.js\");\n/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__);\n\nvar name = \"webpack-dev-server\";\n// default level is set on the client side, so it does not need\n// to be set by the CLI or API\nvar defaultLevel = \"info\";\n\n// options new options, merge with old options\n/**\n * @param {false | true | \"none\" | \"error\" | \"warn\" | \"info\" | \"log\" | \"verbose\"} level\n * @returns {void}\n */\nfunction setLogLevel(level) {\n  _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().configureDefaultLogger({\n    level: level\n  });\n}\nsetLogLevel(defaultLevel);\nvar log = _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().getLogger(name);\nvar logEnabledFeatures = function logEnabledFeatures(features) {\n  var enabledFeatures = Object.keys(features);\n  if (!features || enabledFeatures.length === 0) {\n    return;\n  }\n  var logString = \"Server started:\";\n\n  // Server started: Hot Module Replacement enabled, Live Reloading enabled, Overlay disabled.\n  for (var i = 0; i < enabledFeatures.length; i++) {\n    var key = enabledFeatures[i];\n    logString += \" \".concat(key, \" \").concat(features[key] ? \"enabled\" : \"disabled\", \",\");\n  }\n  // replace last comma with a period\n  logString = logString.slice(0, -1).concat(\".\");\n  log.info(logString);\n};\n\n\n//# sourceURL=webpack://web/./node_modules/webpack-dev-server/client/utils/log.js?");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/parseURL.js":
/*!******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/parseURL.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _getCurrentScriptSource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getCurrentScriptSource.js */ \"./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js\");\n\n\n/**\n * @param {string} resourceQuery\n * @returns {{ [key: string]: string | boolean }}\n */\nfunction parseURL(resourceQuery) {\n  /** @type {{ [key: string]: string }} */\n  var options = {};\n  if (typeof resourceQuery === \"string\" && resourceQuery !== \"\") {\n    var searchParams = resourceQuery.slice(1).split(\"&\");\n    for (var i = 0; i < searchParams.length; i++) {\n      var pair = searchParams[i].split(\"=\");\n      options[pair[0]] = decodeURIComponent(pair[1]);\n    }\n  } else {\n    // Else, get the url from the <script> this file was called with.\n    var scriptSource = (0,_getCurrentScriptSource_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n    var scriptSourceURL;\n    try {\n      // The placeholder `baseURL` with `window.location.href`,\n      // is to allow parsing of path-relative or protocol-relative URLs,\n      // and will have no effect if `scriptSource` is a fully valid URL.\n      scriptSourceURL = new URL(scriptSource, self.location.href);\n    } catch (error) {\n      // URL parsing failed, do nothing.\n      // We will still proceed to see if we can recover using `resourceQuery`\n    }\n    if (scriptSourceURL) {\n      options = scriptSourceURL;\n      options.fromCurrentScript = true;\n    }\n  }\n  return options;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parseURL);\n\n//# sourceURL=webpack://web/./node_modules/webpack-dev-server/client/utils/parseURL.js?");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/reloadApp.js":
/*!*******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/reloadApp.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack/hot/emitter.js */ \"./node_modules/webpack/hot/emitter.js\");\n/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./log.js */ \"./node_modules/webpack-dev-server/client/utils/log.js\");\n\n\n\n/** @typedef {import(\"../index\").Options} Options\n/** @typedef {import(\"../index\").Status} Status\n\n/**\n * @param {Options} options\n * @param {Status} status\n */\nfunction reloadApp(_ref, status) {\n  var hot = _ref.hot,\n    liveReload = _ref.liveReload;\n  if (status.isUnloading) {\n    return;\n  }\n  var currentHash = status.currentHash,\n    previousHash = status.previousHash;\n  var isInitial = currentHash.indexOf( /** @type {string} */previousHash) >= 0;\n  if (isInitial) {\n    return;\n  }\n\n  /**\n   * @param {Window} rootWindow\n   * @param {number} intervalId\n   */\n  function applyReload(rootWindow, intervalId) {\n    clearInterval(intervalId);\n    _log_js__WEBPACK_IMPORTED_MODULE_1__.log.info(\"App updated. Reloading...\");\n    rootWindow.location.reload();\n  }\n  var search = self.location.search.toLowerCase();\n  var allowToHot = search.indexOf(\"webpack-dev-server-hot=false\") === -1;\n  var allowToLiveReload = search.indexOf(\"webpack-dev-server-live-reload=false\") === -1;\n  if (hot && allowToHot) {\n    _log_js__WEBPACK_IMPORTED_MODULE_1__.log.info(\"App hot update...\");\n    webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default().emit(\"webpackHotUpdate\", status.currentHash);\n    if (typeof self !== \"undefined\" && self.window) {\n      // broadcast update to window\n      self.postMessage(\"webpackHotUpdate\".concat(status.currentHash), \"*\");\n    }\n  }\n  // allow refreshing the page only if liveReload isn't disabled\n  else if (liveReload && allowToLiveReload) {\n    var rootWindow = self;\n\n    // use parent window for reload (in case we're in an iframe with no valid src)\n    var intervalId = self.setInterval(function () {\n      if (rootWindow.location.protocol !== \"about:\") {\n        // reload immediately if protocol is valid\n        applyReload(rootWindow, intervalId);\n      } else {\n        rootWindow = rootWindow.parent;\n        if (rootWindow.parent === rootWindow) {\n          // if parent equals current window we've reached the root which would continue forever, so trigger a reload anyways\n          applyReload(rootWindow, intervalId);\n        }\n      }\n    });\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reloadApp);\n\n//# sourceURL=webpack://web/./node_modules/webpack-dev-server/client/utils/reloadApp.js?");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/sendMessage.js":
/*!*********************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/sendMessage.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* global __resourceQuery WorkerGlobalScope */\n\n// Send messages to the outside, so plugins can consume it.\n/**\n * @param {string} type\n * @param {any} [data]\n */\nfunction sendMsg(type, data) {\n  if (typeof self !== \"undefined\" && (typeof WorkerGlobalScope === \"undefined\" || !(self instanceof WorkerGlobalScope))) {\n    self.postMessage({\n      type: \"webpack\".concat(type),\n      data: data\n    }, \"*\");\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendMsg);\n\n//# sourceURL=webpack://web/./node_modules/webpack-dev-server/client/utils/sendMessage.js?");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/stripAnsi.js":
/*!*******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/stripAnsi.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar ansiRegex = new RegExp([\"[\\\\u001B\\\\u009B][[\\\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\\\d\\\\/#&.:=?%@~_]+)*|[a-zA-Z\\\\d]+(?:;[-a-zA-Z\\\\d\\\\/#&.:=?%@~_]*)*)?\\\\u0007)\", \"(?:(?:\\\\d{1,4}(?:;\\\\d{0,4})*)?[\\\\dA-PR-TZcf-nq-uy=><~]))\"].join(\"|\"), \"g\");\n\n/**\n *\n * Strip [ANSI escape codes](https://en.wikipedia.org/wiki/ANSI_escape_code) from a string.\n * Adapted from code originally released by Sindre Sorhus\n * Licensed the MIT License\n *\n * @param {string} string\n * @return {string}\n */\nfunction stripAnsi(string) {\n  if (typeof string !== \"string\") {\n    throw new TypeError(\"Expected a `string`, got `\".concat(typeof string, \"`\"));\n  }\n  return string.replace(ansiRegex, \"\");\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stripAnsi);\n\n//# sourceURL=webpack://web/./node_modules/webpack-dev-server/client/utils/stripAnsi.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/dev-server.js":
/*!************************************************!*\
  !*** ./node_modules/webpack/hot/dev-server.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n/* globals __webpack_hash__ */\nif (true) {\n\tvar lastHash;\n\tvar upToDate = function upToDate() {\n\t\treturn lastHash.indexOf(__webpack_require__.h()) >= 0;\n\t};\n\tvar log = __webpack_require__(/*! ./log */ \"./node_modules/webpack/hot/log.js\");\n\tvar check = function check() {\n\t\tmodule.hot\n\t\t\t.check(true)\n\t\t\t.then(function (updatedModules) {\n\t\t\t\tif (!updatedModules) {\n\t\t\t\t\tlog(\n\t\t\t\t\t\t\"warning\",\n\t\t\t\t\t\t\"[HMR] Cannot find update. \" +\n\t\t\t\t\t\t\t(typeof window !== \"undefined\"\n\t\t\t\t\t\t\t\t? \"Need to do a full reload!\"\n\t\t\t\t\t\t\t\t: \"Please reload manually!\")\n\t\t\t\t\t);\n\t\t\t\t\tlog(\n\t\t\t\t\t\t\"warning\",\n\t\t\t\t\t\t\"[HMR] (Probably because of restarting the webpack-dev-server)\"\n\t\t\t\t\t);\n\t\t\t\t\tif (typeof window !== \"undefined\") {\n\t\t\t\t\t\twindow.location.reload();\n\t\t\t\t\t}\n\t\t\t\t\treturn;\n\t\t\t\t}\n\n\t\t\t\tif (!upToDate()) {\n\t\t\t\t\tcheck();\n\t\t\t\t}\n\n\t\t\t\t__webpack_require__(/*! ./log-apply-result */ \"./node_modules/webpack/hot/log-apply-result.js\")(updatedModules, updatedModules);\n\n\t\t\t\tif (upToDate()) {\n\t\t\t\t\tlog(\"info\", \"[HMR] App is up to date.\");\n\t\t\t\t}\n\t\t\t})\n\t\t\t.catch(function (err) {\n\t\t\t\tvar status = module.hot.status();\n\t\t\t\tif ([\"abort\", \"fail\"].indexOf(status) >= 0) {\n\t\t\t\t\tlog(\n\t\t\t\t\t\t\"warning\",\n\t\t\t\t\t\t\"[HMR] Cannot apply update. \" +\n\t\t\t\t\t\t\t(typeof window !== \"undefined\"\n\t\t\t\t\t\t\t\t? \"Need to do a full reload!\"\n\t\t\t\t\t\t\t\t: \"Please reload manually!\")\n\t\t\t\t\t);\n\t\t\t\t\tlog(\"warning\", \"[HMR] \" + log.formatError(err));\n\t\t\t\t\tif (typeof window !== \"undefined\") {\n\t\t\t\t\t\twindow.location.reload();\n\t\t\t\t\t}\n\t\t\t\t} else {\n\t\t\t\t\tlog(\"warning\", \"[HMR] Update failed: \" + log.formatError(err));\n\t\t\t\t}\n\t\t\t});\n\t};\n\tvar hotEmitter = __webpack_require__(/*! ./emitter */ \"./node_modules/webpack/hot/emitter.js\");\n\thotEmitter.on(\"webpackHotUpdate\", function (currentHash) {\n\t\tlastHash = currentHash;\n\t\tif (!upToDate() && module.hot.status() === \"idle\") {\n\t\t\tlog(\"info\", \"[HMR] Checking for updates on the server...\");\n\t\t\tcheck();\n\t\t}\n\t});\n\tlog(\"info\", \"[HMR] Waiting for update signal from WDS...\");\n} else {}\n\n\n//# sourceURL=webpack://web/./node_modules/webpack/hot/dev-server.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/emitter.js":
/*!*********************************************!*\
  !*** ./node_modules/webpack/hot/emitter.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var EventEmitter = __webpack_require__(/*! events */ \"./node_modules/events/events.js\");\nmodule.exports = new EventEmitter();\n\n\n//# sourceURL=webpack://web/./node_modules/webpack/hot/emitter.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!******************************************************!*\
  !*** ./node_modules/webpack/hot/log-apply-result.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\nmodule.exports = function (updatedModules, renewedModules) {\n\tvar unacceptedModules = updatedModules.filter(function (moduleId) {\n\t\treturn renewedModules && renewedModules.indexOf(moduleId) < 0;\n\t});\n\tvar log = __webpack_require__(/*! ./log */ \"./node_modules/webpack/hot/log.js\");\n\n\tif (unacceptedModules.length > 0) {\n\t\tlog(\n\t\t\t\"warning\",\n\t\t\t\"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)\"\n\t\t);\n\t\tunacceptedModules.forEach(function (moduleId) {\n\t\t\tlog(\"warning\", \"[HMR]  - \" + moduleId);\n\t\t});\n\t}\n\n\tif (!renewedModules || renewedModules.length === 0) {\n\t\tlog(\"info\", \"[HMR] Nothing hot updated.\");\n\t} else {\n\t\tlog(\"info\", \"[HMR] Updated modules:\");\n\t\trenewedModules.forEach(function (moduleId) {\n\t\t\tif (typeof moduleId === \"string\" && moduleId.indexOf(\"!\") !== -1) {\n\t\t\t\tvar parts = moduleId.split(\"!\");\n\t\t\t\tlog.groupCollapsed(\"info\", \"[HMR]  - \" + parts.pop());\n\t\t\t\tlog(\"info\", \"[HMR]  - \" + moduleId);\n\t\t\t\tlog.groupEnd(\"info\");\n\t\t\t} else {\n\t\t\t\tlog(\"info\", \"[HMR]  - \" + moduleId);\n\t\t\t}\n\t\t});\n\t\tvar numberIds = renewedModules.every(function (moduleId) {\n\t\t\treturn typeof moduleId === \"number\";\n\t\t});\n\t\tif (numberIds)\n\t\t\tlog(\n\t\t\t\t\"info\",\n\t\t\t\t'[HMR] Consider using the optimization.moduleIds: \"named\" for module names.'\n\t\t\t);\n\t}\n};\n\n\n//# sourceURL=webpack://web/./node_modules/webpack/hot/log-apply-result.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!*****************************************!*\
  !*** ./node_modules/webpack/hot/log.js ***!
  \*****************************************/
/***/ ((module) => {

eval("var logLevel = \"info\";\n\nfunction dummy() {}\n\nfunction shouldLog(level) {\n\tvar shouldLog =\n\t\t(logLevel === \"info\" && level === \"info\") ||\n\t\t([\"info\", \"warning\"].indexOf(logLevel) >= 0 && level === \"warning\") ||\n\t\t([\"info\", \"warning\", \"error\"].indexOf(logLevel) >= 0 && level === \"error\");\n\treturn shouldLog;\n}\n\nfunction logGroup(logFn) {\n\treturn function (level, msg) {\n\t\tif (shouldLog(level)) {\n\t\t\tlogFn(msg);\n\t\t}\n\t};\n}\n\nmodule.exports = function (level, msg) {\n\tif (shouldLog(level)) {\n\t\tif (level === \"info\") {\n\t\t\tconsole.log(msg);\n\t\t} else if (level === \"warning\") {\n\t\t\tconsole.warn(msg);\n\t\t} else if (level === \"error\") {\n\t\t\tconsole.error(msg);\n\t\t}\n\t}\n};\n\n/* eslint-disable node/no-unsupported-features/node-builtins */\nvar group = console.group || dummy;\nvar groupCollapsed = console.groupCollapsed || dummy;\nvar groupEnd = console.groupEnd || dummy;\n/* eslint-enable node/no-unsupported-features/node-builtins */\n\nmodule.exports.group = logGroup(group);\n\nmodule.exports.groupCollapsed = logGroup(groupCollapsed);\n\nmodule.exports.groupEnd = logGroup(groupEnd);\n\nmodule.exports.setLogLevel = function (level) {\n\tlogLevel = level;\n};\n\nmodule.exports.formatError = function (err) {\n\tvar message = err.message;\n\tvar stack = err.stack;\n\tif (!stack) {\n\t\treturn message;\n\t} else if (stack.indexOf(message) < 0) {\n\t\treturn message + \"\\n\" + stack;\n\t} else {\n\t\treturn stack;\n\t}\n};\n\n\n//# sourceURL=webpack://web/./node_modules/webpack/hot/log.js?");

/***/ }),

/***/ "./node_modules/three/build/three.cjs":
/*!********************************************!*\
  !*** ./node_modules/three/build/three.cjs ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		try {
/******/ 			var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 			__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 			module = execOptions.module;
/******/ 			execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 		} catch(e) {
/******/ 			module.error = e;
/******/ 			throw e;
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("main." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("da2c4bc5d665bab335ee")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "web:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises = 0;
/******/ 		var blockingPromisesWaiting = [];
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		// eslint-disable-next-line no-unused-vars
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId) {
/******/ 				return trackBlockingPromise(require.e(chunkId));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results);
/******/ 		}
/******/ 		
/******/ 		function unblock() {
/******/ 			if (--blockingPromises === 0) {
/******/ 				setStatus("ready").then(function () {
/******/ 					if (blockingPromises === 0) {
/******/ 						var list = blockingPromisesWaiting;
/******/ 						blockingPromisesWaiting = [];
/******/ 						for (var i = 0; i < list.length; i++) {
/******/ 							list[i]();
/******/ 						}
/******/ 					}
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 				/* fallthrough */
/******/ 				case "prepare":
/******/ 					blockingPromises++;
/******/ 					promise.then(unblock, unblock);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises === 0) return fn();
/******/ 			return new Promise(function (resolve) {
/******/ 				blockingPromisesWaiting.push(function () {
/******/ 					resolve(fn());
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							},
/******/ 							[])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								} else {
/******/ 									return setStatus("ready").then(function () {
/******/ 										return updatedModules;
/******/ 									});
/******/ 								}
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error(
/******/ 						"apply() is only allowed in ready status (state: " +
/******/ 							currentStatus +
/******/ 							")"
/******/ 					);
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 				// handle errors in accept handlers and self accepted module load
/******/ 				if (error) {
/******/ 					return setStatus("fail").then(function () {
/******/ 						throw error;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				if (queuedInvalidatedModules) {
/******/ 					return internalApply(options).then(function (list) {
/******/ 						outdatedModules.forEach(function (moduleId) {
/******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 						});
/******/ 						return list;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				return setStatus("idle").then(function () {
/******/ 					return outdatedModules;
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		var currentUpdatedModulesList;
/******/ 		var waitingUpdateResolves = {};
/******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
/******/ 			currentUpdatedModulesList = updatedModulesList;
/******/ 			return new Promise((resolve, reject) => {
/******/ 				waitingUpdateResolves[chunkId] = resolve;
/******/ 				// start update chunk loading
/******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				var loadingEnded = (event) => {
/******/ 					if(waitingUpdateResolves[chunkId]) {
/******/ 						waitingUpdateResolves[chunkId] = undefined
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realSrc = event && event.target && event.target.src;
/******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 						error.name = 'ChunkLoadError';
/******/ 						error.type = errorType;
/******/ 						error.request = realSrc;
/******/ 						reject(error);
/******/ 					}
/******/ 				};
/******/ 				__webpack_require__.l(url, loadingEnded);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		self["webpackHotUpdateweb"] = (chunkId, moreModules, runtime) => {
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = moreModules[moduleId];
/******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 			if(waitingUpdateResolves[chunkId]) {
/******/ 				waitingUpdateResolves[chunkId]();
/******/ 				waitingUpdateResolves[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.jsonp = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				} else {
/******/ 					currentUpdateChunks[chunkId] = false;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						!currentUpdateChunks[chunkId]
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = () => {
/******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
/******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then((response) => {
/******/ 				if(response.status === 404) return; // no update available
/******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
/******/ 				return response.json();
/******/ 			});
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__("./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=9999&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true");
/******/ 	__webpack_require__("./node_modules/webpack/hot/dev-server.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./index.ts");
/******/ 	
/******/ })()
;