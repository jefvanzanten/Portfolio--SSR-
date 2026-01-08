import { ssr, ssrHydrationKey, ssrStyleProperty, createComponent, NoHydration, escape, HydrationScript, ssrAttribute, mergeProps, Dynamic, isServer, ssrElement, spread, useAssets } from "solid-js/web";
import * as Solid from "solid-js";
import { Show, lazy, For, createSignal, createMemo, createResource, createContext, sharedConfig, onMount, onCleanup, createUniqueId, useContext, createRenderEffect } from "solid-js";
import { R as RouterCore, O as Outlet, w as warning, u as useRouter, a as useRouterState, h as isModuleNotFoundError, g as dummyMatchContext, m as matchContext, i as invariant, e as exactPathTest, c as removeTrailingSlash, d as deepEqual$1, b as useIntersectionObserver, f as functionalUpdate, r as rootRouteId, t as trimPathLeft, j as joinPaths } from "./server.mjs";
import "node:async_hooks";
import "node:stream/web";
const preloadWarning = "Error preloading route! ☝️";
class BaseRoute {
  constructor(options) {
    this.init = (opts) => {
      this.originalIndex = opts.originalIndex;
      const options2 = this.options;
      const isRoot = !options2?.path && !options2?.id;
      this.parentRoute = this.options.getParentRoute?.();
      if (isRoot) {
        this._path = rootRouteId;
      } else if (!this.parentRoute) {
        invariant(
          false,
          `Child Route instances must pass a 'getParentRoute: () => ParentRoute' option that returns a Route instance.`
        );
      }
      let path = isRoot ? rootRouteId : options2?.path;
      if (path && path !== "/") {
        path = trimPathLeft(path);
      }
      const customId = options2?.id || path;
      let id = isRoot ? rootRouteId : joinPaths([
        this.parentRoute.id === rootRouteId ? "" : this.parentRoute.id,
        customId
      ]);
      if (path === rootRouteId) {
        path = "/";
      }
      if (id !== rootRouteId) {
        id = joinPaths(["/", id]);
      }
      const fullPath = id === rootRouteId ? "/" : joinPaths([this.parentRoute.fullPath, path]);
      this._path = path;
      this._id = id;
      this._fullPath = fullPath;
      this._to = fullPath;
    };
    this.addChildren = (children) => {
      return this._addFileChildren(children);
    };
    this._addFileChildren = (children) => {
      if (Array.isArray(children)) {
        this.children = children;
      }
      if (typeof children === "object" && children !== null) {
        this.children = Object.values(children);
      }
      return this;
    };
    this._addFileTypes = () => {
      return this;
    };
    this.updateLoader = (options2) => {
      Object.assign(this.options, options2);
      return this;
    };
    this.update = (options2) => {
      Object.assign(this.options, options2);
      return this;
    };
    this.lazy = (lazyFn) => {
      this.lazyFn = lazyFn;
      return this;
    };
    this.options = options || {};
    this.isRoot = !options?.getParentRoute;
    if (options?.id && options?.path) {
      throw new Error(`Route cannot have both an 'id' and a 'path' option.`);
    }
  }
  get to() {
    return this._to;
  }
  get id() {
    return this._id;
  }
  get path() {
    return this._path;
  }
  get fullPath() {
    return this._fullPath;
  }
}
class BaseRootRoute extends BaseRoute {
  constructor(options) {
    super(options);
  }
}
function chain(callbacks) {
  return (...args) => {
    for (const callback of callbacks)
      callback && callback(...args);
  };
}
function mergeRefs(...refs) {
  return chain(refs);
}
var _tmpl$$3 = ["<svg", ">", "</svg>"];
function useLinkProps(options) {
  const router2 = useRouter();
  const [isTransitioning, setIsTransitioning] = Solid.createSignal(false);
  let hasRenderFetched = false;
  const [local, rest] = Solid.splitProps(Solid.mergeProps({
    activeProps: () => ({
      class: "active"
    }),
    inactiveProps: () => ({})
  }, options), ["activeProps", "inactiveProps", "activeOptions", "to", "preload", "preloadDelay", "hashScrollIntoView", "replace", "startTransition", "resetScroll", "viewTransition", "target", "disabled", "style", "class", "onClick", "onFocus", "onMouseEnter", "onMouseLeave", "onMouseOver", "onMouseOut", "onTouchStart", "ignoreBlocker"]);
  const [_, propsSafeToSpread] = Solid.splitProps(rest, ["params", "search", "hash", "state", "mask", "reloadDocument", "unsafeRelative"]);
  const currentSearch = useRouterState({
    select: (s) => s.location.searchStr
  });
  const from = options.from;
  const _options = () => {
    return {
      ...options,
      from
    };
  };
  const next = Solid.createMemo(() => {
    currentSearch();
    return router2.buildLocation(_options());
  });
  const hrefOption = Solid.createMemo(() => {
    if (_options().disabled) {
      return void 0;
    }
    let href;
    const maskedLocation = next().maskedLocation;
    if (maskedLocation) {
      href = maskedLocation.url.href;
    } else {
      href = next().url.href;
    }
    let external = false;
    if (router2.origin) {
      if (href.startsWith(router2.origin)) {
        href = router2.history.createHref(href.replace(router2.origin, ""));
      } else {
        external = true;
      }
    }
    return {
      href,
      external
    };
  });
  const externalLink = Solid.createMemo(() => {
    const _href = hrefOption();
    if (_href?.external) {
      return _href.href;
    }
    try {
      new URL(_options().to);
      return _options().to;
    } catch {
    }
    return void 0;
  });
  const preload = Solid.createMemo(() => {
    if (_options().reloadDocument || externalLink()) {
      return false;
    }
    return local.preload ?? router2.options.defaultPreload;
  });
  const preloadDelay = () => local.preloadDelay ?? router2.options.defaultPreloadDelay ?? 0;
  const isActive = useRouterState({
    select: (s) => {
      if (externalLink()) return false;
      if (local.activeOptions?.exact) {
        const testExact = exactPathTest(s.location.pathname, next().pathname, router2.basepath);
        if (!testExact) {
          return false;
        }
      } else {
        const currentPathSplit = removeTrailingSlash(s.location.pathname, router2.basepath).split("/");
        const nextPathSplit = removeTrailingSlash(next()?.pathname, router2.basepath)?.split("/");
        const pathIsFuzzyEqual = nextPathSplit?.every((d, i) => d === currentPathSplit[i]);
        if (!pathIsFuzzyEqual) {
          return false;
        }
      }
      if (local.activeOptions?.includeSearch ?? true) {
        const searchTest = deepEqual$1(s.location.search, next().search, {
          partial: !local.activeOptions?.exact,
          ignoreUndefined: !local.activeOptions?.explicitUndefined
        });
        if (!searchTest) {
          return false;
        }
      }
      if (local.activeOptions?.includeHash) {
        return s.location.hash === next().hash;
      }
      return true;
    }
  });
  const doPreload = () => router2.preloadRoute(_options()).catch((err) => {
    console.warn(err);
    console.warn(preloadWarning);
  });
  const preloadViewportIoCallback = (entry) => {
    if (entry?.isIntersecting) {
      doPreload();
    }
  };
  const [ref, setRef] = Solid.createSignal(null);
  useIntersectionObserver(ref, preloadViewportIoCallback, {
    rootMargin: "100px"
  }, {
    disabled: !!local.disabled || !(preload() === "viewport")
  });
  Solid.createEffect(() => {
    if (hasRenderFetched) {
      return;
    }
    if (!local.disabled && preload() === "render") {
      doPreload();
      hasRenderFetched = true;
    }
  });
  if (externalLink()) {
    return Solid.mergeProps(propsSafeToSpread, {
      ref: mergeRefs(setRef, _options().ref),
      href: externalLink()
    }, Solid.splitProps(local, ["target", "disabled", "style", "class", "onClick", "onFocus", "onMouseEnter", "onMouseLeave", "onMouseOut", "onMouseOver", "onTouchStart"])[0]);
  }
  const handleClick = (e) => {
    const elementTarget = e.currentTarget.getAttribute("target");
    const effectiveTarget = local.target !== void 0 ? local.target : elementTarget;
    if (!local.disabled && !isCtrlEvent(e) && !e.defaultPrevented && (!effectiveTarget || effectiveTarget === "_self") && e.button === 0) {
      e.preventDefault();
      setIsTransitioning(true);
      const unsub = router2.subscribe("onResolved", () => {
        unsub();
        setIsTransitioning(false);
      });
      router2.navigate({
        ..._options(),
        replace: local.replace,
        resetScroll: local.resetScroll,
        hashScrollIntoView: local.hashScrollIntoView,
        startTransition: local.startTransition,
        viewTransition: local.viewTransition,
        ignoreBlocker: local.ignoreBlocker
      });
    }
  };
  const handleFocus = (_2) => {
    if (local.disabled) return;
    if (preload()) {
      doPreload();
    }
  };
  const handleTouchStart = handleFocus;
  const handleEnter = (e) => {
    if (local.disabled) return;
    const eventTarget = e.currentTarget || {};
    if (preload()) {
      if (eventTarget.preloadTimeout) {
        return;
      }
      eventTarget.preloadTimeout = setTimeout(() => {
        eventTarget.preloadTimeout = null;
        doPreload();
      }, preloadDelay());
    }
  };
  const handleLeave = (e) => {
    if (local.disabled) return;
    const eventTarget = e.currentTarget || {};
    if (eventTarget.preloadTimeout) {
      clearTimeout(eventTarget.preloadTimeout);
      eventTarget.preloadTimeout = null;
    }
  };
  function callHandler(event, handler) {
    if (handler) {
      if (typeof handler === "function") {
        handler(event);
      } else {
        handler[0](handler[1], event);
      }
    }
    return event.defaultPrevented;
  }
  function composeEventHandlers(handlers) {
    return (event) => {
      for (const handler of handlers) {
        callHandler(event, handler);
      }
    };
  }
  const resolvedActiveProps = () => isActive() ? functionalUpdate(local.activeProps, {}) ?? {} : {};
  const resolvedInactiveProps = () => isActive() ? {} : functionalUpdate(local.inactiveProps, {});
  const resolvedClassName = () => [local.class, resolvedActiveProps().class, resolvedInactiveProps().class].filter(Boolean).join(" ");
  const resolvedStyle = () => ({
    ...local.style,
    ...resolvedActiveProps().style,
    ...resolvedInactiveProps().style
  });
  return Solid.mergeProps(propsSafeToSpread, resolvedActiveProps, resolvedInactiveProps, () => {
    return {
      href: hrefOption()?.href,
      ref: mergeRefs(setRef, _options().ref),
      onClick: composeEventHandlers([local.onClick, handleClick]),
      onFocus: composeEventHandlers([local.onFocus, handleFocus]),
      onMouseEnter: composeEventHandlers([local.onMouseEnter, handleEnter]),
      onMouseOver: composeEventHandlers([local.onMouseOver, handleEnter]),
      onMouseLeave: composeEventHandlers([local.onMouseLeave, handleLeave]),
      onMouseOut: composeEventHandlers([local.onMouseOut, handleLeave]),
      onTouchStart: composeEventHandlers([local.onTouchStart, handleTouchStart]),
      disabled: !!local.disabled,
      target: local.target,
      ...(() => {
        const s = resolvedStyle();
        return Object.keys(s).length ? {
          style: s
        } : {};
      })(),
      ...(() => {
        const c = resolvedClassName();
        return c ? {
          class: c
        } : {};
      })(),
      ...local.disabled && {
        role: "link",
        "aria-disabled": true
      },
      ...isActive() && {
        "data-status": "active",
        "aria-current": "page"
      },
      ...isTransitioning() && {
        "data-transitioning": "transitioning"
      }
    };
  });
}
const Link$1 = (props) => {
  const [local, rest] = Solid.splitProps(props, ["_asChild", "children"]);
  const [_, linkProps] = Solid.splitProps(useLinkProps(rest), ["type"]);
  const children = Solid.createMemo(() => {
    const ch = local.children;
    if (typeof ch === "function") {
      return ch({
        get isActive() {
          return linkProps["data-status"] === "active";
        },
        get isTransitioning() {
          return linkProps["data-transitioning"] === "transitioning";
        }
      });
    }
    return ch;
  });
  if (local._asChild === "svg") {
    const [_2, svgLinkProps] = Solid.splitProps(linkProps, ["class"]);
    return ssr(_tmpl$$3, ssrHydrationKey(), ssrElement("a", svgLinkProps, () => escape(children()), false));
  }
  return createComponent(Dynamic, mergeProps({
    get component() {
      return local._asChild ? local._asChild : "a";
    }
  }, linkProps, {
    get children() {
      return children();
    }
  }));
};
function isCtrlEvent(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function useMatch(opts) {
  const nearestMatchId = Solid.useContext(opts.from ? dummyMatchContext : matchContext);
  const matchState = useRouterState({
    select: (state) => {
      const match = state.matches.find((d) => opts.from ? opts.from === d.routeId : d.id === nearestMatchId());
      if (match === void 0) {
        const pendingMatch = state.pendingMatches?.find((d) => opts.from ? opts.from === d.routeId : d.id === nearestMatchId());
        const shouldThrowError = !pendingMatch && !state.isTransitioning && (opts.shouldThrow ?? true);
        return {
          match: void 0,
          shouldThrowError
        };
      }
      return {
        match: opts.select ? opts.select(match) : match,
        shouldThrowError: false
      };
    }
  });
  Solid.createEffect(() => {
    const state = matchState();
    if (state.shouldThrowError) {
      invariant(false, `Could not find ${opts.from ? `an active match from "${opts.from}"` : "a nearest match!"}`);
    }
  });
  return Solid.createMemo(() => matchState().match);
}
function useLoaderData(opts) {
  return useMatch({
    from: opts.from,
    strict: opts.strict,
    select: (s) => {
      return opts.select ? opts.select(s.loaderData) : s.loaderData;
    }
  });
}
function useLoaderDeps(opts) {
  const {
    select,
    ...rest
  } = opts;
  return useMatch({
    ...rest,
    select: (s) => {
      return select ? select(s.loaderDeps) : s.loaderDeps;
    }
  });
}
function useParams(opts) {
  return useMatch({
    from: opts.from,
    shouldThrow: opts.shouldThrow,
    strict: opts.strict,
    select: (match) => {
      const params = opts.strict === false ? match.params : match._strictParams;
      return opts.select ? opts.select(params) : params;
    }
  });
}
function useSearch(opts) {
  return useMatch({
    from: opts.from,
    strict: opts.strict,
    shouldThrow: opts.shouldThrow,
    select: (match) => {
      return opts.select ? opts.select(match.search) : match.search;
    }
  });
}
function useNavigate(_defaultOpts) {
  const router2 = useRouter();
  return (options) => {
    return router2.navigate({
      ...options,
      from: options.from ?? _defaultOpts?.from
    });
  };
}
let Route$3 = class Route extends BaseRoute {
  /**
   * @deprecated Use the `createRoute` function instead.
   */
  constructor(options) {
    super(options);
    this.useMatch = (opts) => {
      return useMatch({
        select: opts?.select,
        from: this.id
      });
    };
    this.useRouteContext = (opts) => {
      return useMatch({
        ...opts,
        from: this.id,
        select: (d) => opts?.select ? opts.select(d.context) : d.context
      });
    };
    this.useSearch = (opts) => {
      return useSearch({
        select: opts?.select,
        from: this.id
      });
    };
    this.useParams = (opts) => {
      return useParams({
        select: opts?.select,
        from: this.id
      });
    };
    this.useLoaderDeps = (opts) => {
      return useLoaderDeps({
        ...opts,
        from: this.id
      });
    };
    this.useLoaderData = (opts) => {
      return useLoaderData({
        ...opts,
        from: this.id
      });
    };
    this.useNavigate = () => {
      return useNavigate({
        from: this.fullPath
      });
    };
    this.Link = (props) => {
      const _self$ = this;
      return createComponent(Link$1, mergeProps({
        get from() {
          return _self$.fullPath;
        }
      }, props));
    };
  }
};
function createRoute(options) {
  return new Route$3(options);
}
function createRootRouteWithContext() {
  return (options) => {
    return createRootRoute(options);
  };
}
class RootRoute extends BaseRootRoute {
  /**
   * @deprecated `RootRoute` is now an internal implementation detail. Use `createRootRoute()` instead.
   */
  constructor(options) {
    super(options);
    this.useMatch = (opts) => {
      return useMatch({
        select: opts?.select,
        from: this.id
      });
    };
    this.useRouteContext = (opts) => {
      return useMatch({
        ...opts,
        from: this.id,
        select: (d) => opts?.select ? opts.select(d.context) : d.context
      });
    };
    this.useSearch = (opts) => {
      return useSearch({
        select: opts?.select,
        from: this.id
      });
    };
    this.useParams = (opts) => {
      return useParams({
        select: opts?.select,
        from: this.id
      });
    };
    this.useLoaderDeps = (opts) => {
      return useLoaderDeps({
        ...opts,
        from: this.id
      });
    };
    this.useLoaderData = (opts) => {
      return useLoaderData({
        ...opts,
        from: this.id
      });
    };
    this.useNavigate = () => {
      return useNavigate({
        from: this.fullPath
      });
    };
    this.Link = (props) => {
      const _self$2 = this;
      return createComponent(Link$1, mergeProps({
        get from() {
          return _self$2.fullPath;
        }
      }, props));
    };
  }
}
function createRootRoute(options) {
  return new RootRoute(options);
}
function createFileRoute(path) {
  if (typeof path === "object") {
    return new FileRoute(path, {
      silent: true
    }).createRoute(path);
  }
  return new FileRoute(path, {
    silent: true
  }).createRoute;
}
class FileRoute {
  constructor(path, _opts) {
    this.path = path;
    this.createRoute = (options) => {
      warning(this.silent, "FileRoute is deprecated and will be removed in the next major version. Use the createFileRoute(path)(options) function instead.");
      const route = createRoute(options);
      route.isRoot = false;
      return route;
    };
    this.silent = _opts?.silent;
  }
}
class LazyRoute {
  constructor(opts) {
    this.useMatch = (opts2) => {
      return useMatch({
        select: opts2?.select,
        from: this.options.id
      });
    };
    this.useRouteContext = (opts2) => {
      return useMatch({
        from: this.options.id,
        select: (d) => opts2?.select ? opts2.select(d.context) : d.context
      });
    };
    this.useSearch = (opts2) => {
      return useSearch({
        select: opts2?.select,
        from: this.options.id
      });
    };
    this.useParams = (opts2) => {
      return useParams({
        select: opts2?.select,
        from: this.options.id
      });
    };
    this.useLoaderDeps = (opts2) => {
      return useLoaderDeps({ ...opts2, from: this.options.id });
    };
    this.useLoaderData = (opts2) => {
      return useLoaderData({ ...opts2, from: this.options.id });
    };
    this.useNavigate = () => {
      const router2 = useRouter();
      return useNavigate({ from: router2.routesById[this.options.id].fullPath });
    };
    this.options = opts;
  }
}
function createLazyFileRoute(id) {
  if (typeof id === "object") {
    return new LazyRoute(id);
  }
  return (opts) => new LazyRoute({ id, ...opts });
}
function lazyRouteComponent(importer, exportName) {
  let loadPromise;
  let comp;
  let error;
  const load = () => {
    if (!loadPromise) {
      loadPromise = importer().then((res) => {
        loadPromise = void 0;
        comp = res[exportName];
        return comp;
      }).catch((err) => {
        error = err;
      });
    }
    return loadPromise;
  };
  const lazyComp = function Lazy(props) {
    if (error) {
      if (isModuleNotFoundError(error)) {
        if (error instanceof Error && typeof window !== "undefined" && typeof sessionStorage !== "undefined") {
          const storageKey = `tanstack_router_reload:${error.message}`;
          if (!sessionStorage.getItem(storageKey)) {
            sessionStorage.setItem(storageKey, "1");
            window.location.reload();
            return {
              default: () => null
            };
          }
        }
      }
      throw error;
    }
    if (!comp) {
      const [compResource] = createResource(load, {
        initialValue: comp,
        ssrLoadFrom: "initial"
      });
      return createComponent(Dynamic, mergeProps({
        get component() {
          return compResource();
        }
      }, props));
    }
    return createComponent(Dynamic, mergeProps({
      component: comp
    }, props));
  };
  lazyComp.preload = load;
  return lazyComp;
}
const createRouter = (options) => {
  return new Router(options);
};
class Router extends RouterCore {
  constructor(options) {
    super(options);
  }
}
if (typeof globalThis !== "undefined") {
  globalThis.createFileRoute = createFileRoute;
  globalThis.createLazyFileRoute = createLazyFileRoute;
} else if (typeof window !== "undefined") {
  window.createFileRoute = createFileRoute;
  window.createLazyFileRoute = createLazyFileRoute;
}
function useLocation(opts) {
  return useRouterState({
    select: (state) => state.location
  });
}
const MetaContext = createContext();
const cascadingTags = ["title", "meta"];
const titleTagProperties = [];
const metaTagProperties = (
  // https://html.spec.whatwg.org/multipage/semantics.html#the-meta-element
  ["name", "http-equiv", "content", "charset", "media"].concat(["property"])
);
const getTagKey = (tag, properties) => {
  const tagProps = Object.fromEntries(Object.entries(tag.props).filter(([k]) => properties.includes(k)).sort());
  if (Object.hasOwn(tagProps, "name") || Object.hasOwn(tagProps, "property")) {
    tagProps.name = tagProps.name || tagProps.property;
    delete tagProps.property;
  }
  return tag.tag + JSON.stringify(tagProps);
};
function initClientProvider() {
  if (!sharedConfig.context) {
    const ssrTags = document.head.querySelectorAll(`[data-sm]`);
    Array.prototype.forEach.call(ssrTags, (ssrTag) => ssrTag.parentNode.removeChild(ssrTag));
  }
  const cascadedTagInstances = /* @__PURE__ */ new Map();
  function getElement(tag) {
    if (tag.ref) {
      return tag.ref;
    }
    let el = document.querySelector(`[data-sm="${tag.id}"]`);
    if (el) {
      if (el.tagName.toLowerCase() !== tag.tag) {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
        el = document.createElement(tag.tag);
      }
      el.removeAttribute("data-sm");
    } else {
      el = document.createElement(tag.tag);
    }
    return el;
  }
  return {
    addTag(tag) {
      if (cascadingTags.indexOf(tag.tag) !== -1) {
        const properties = tag.tag === "title" ? titleTagProperties : metaTagProperties;
        const tagKey = getTagKey(tag, properties);
        if (!cascadedTagInstances.has(tagKey)) {
          cascadedTagInstances.set(tagKey, []);
        }
        let instances = cascadedTagInstances.get(tagKey);
        let index = instances.length;
        instances = [...instances, tag];
        cascadedTagInstances.set(tagKey, instances);
        let element2 = getElement(tag);
        tag.ref = element2;
        spread(element2, tag.props);
        let lastVisited = null;
        for (var i = index - 1; i >= 0; i--) {
          if (instances[i] != null) {
            lastVisited = instances[i];
            break;
          }
        }
        if (element2.parentNode != document.head) {
          document.head.appendChild(element2);
        }
        if (lastVisited && lastVisited.ref && lastVisited.ref.parentNode) {
          document.head.removeChild(lastVisited.ref);
        }
        return index;
      }
      let element = getElement(tag);
      tag.ref = element;
      spread(element, tag.props);
      if (element.parentNode != document.head) {
        document.head.appendChild(element);
      }
      return -1;
    },
    removeTag(tag, index) {
      const properties = tag.tag === "title" ? titleTagProperties : metaTagProperties;
      const tagKey = getTagKey(tag, properties);
      if (tag.ref) {
        const t = cascadedTagInstances.get(tagKey);
        if (t) {
          if (tag.ref.parentNode) {
            tag.ref.parentNode.removeChild(tag.ref);
            for (let i = index - 1; i >= 0; i--) {
              if (t[i] != null) {
                document.head.appendChild(t[i].ref);
              }
            }
          }
          t[index] = null;
          cascadedTagInstances.set(tagKey, t);
        } else {
          if (tag.ref.parentNode) {
            tag.ref.parentNode.removeChild(tag.ref);
          }
        }
      }
    }
  };
}
function initServerProvider() {
  const tags = [];
  useAssets(() => ssr(renderTags(tags)));
  return {
    addTag(tagDesc) {
      if (cascadingTags.indexOf(tagDesc.tag) !== -1) {
        const properties = tagDesc.tag === "title" ? titleTagProperties : metaTagProperties;
        const tagDescKey = getTagKey(tagDesc, properties);
        const index = tags.findIndex((prev) => prev.tag === tagDesc.tag && getTagKey(prev, properties) === tagDescKey);
        if (index !== -1) {
          tags.splice(index, 1);
        }
      }
      tags.push(tagDesc);
      return tags.length;
    },
    removeTag(tag, index) {
    }
  };
}
const MetaProvider = (props) => {
  const actions = !isServer ? initClientProvider() : initServerProvider();
  return createComponent(MetaContext.Provider, {
    value: actions,
    get children() {
      return props.children;
    }
  });
};
const MetaTag = (tag, props, setting) => {
  useHead({
    tag,
    props,
    setting,
    id: createUniqueId(),
    get name() {
      return props.name || props.property;
    }
  });
  return null;
};
function useHead(tagDesc) {
  const c = useContext(MetaContext);
  if (!c) throw new Error("<MetaProvider /> should be in the tree");
  createRenderEffect(() => {
    const index = c.addTag(tagDesc);
    onCleanup(() => c.removeTag(tagDesc, index));
  });
}
function renderTags(tags) {
  return tags.map((tag) => {
    const keys = Object.keys(tag.props);
    const props = keys.map((k) => k === "children" ? "" : ` ${k}="${// @ts-expect-error
    escape(tag.props[k], true)}"`).join("");
    let children = tag.props.children;
    if (Array.isArray(children)) {
      children = children.join("");
    }
    if (tag.setting?.close) {
      return `<${tag.tag} data-sm="${tag.id}"${props}>${// @ts-expect-error
      tag.setting?.escape ? escape(children) : children || ""}</${tag.tag}>`;
    }
    return `<${tag.tag} data-sm="${tag.id}"${props}/>`;
  }).join("");
}
const Title = (props) => MetaTag("title", props, {
  escape: true,
  close: true
});
const Style = (props) => MetaTag("style", props, {
  close: true
});
const Meta = (props) => MetaTag("meta", props);
const Link = (props) => MetaTag("link", props);
function Asset({
  tag,
  attrs,
  children
}) {
  switch (tag) {
    case "title":
      return createComponent(Title, mergeProps(attrs, {
        children
      }));
    case "meta":
      return createComponent(Meta, attrs);
    case "link":
      return createComponent(Link, attrs);
    case "style":
      return createComponent(Style, mergeProps(attrs, {
        innerHTML: children
      }));
    case "script":
      return createComponent(Script, {
        attrs,
        children
      });
    default:
      return null;
  }
}
function Script({
  attrs,
  children
}) {
  const router2 = useRouter();
  onMount(() => {
    if (attrs?.src) {
      const normSrc = (() => {
        try {
          const base = document.baseURI || window.location.href;
          return new URL(attrs.src, base).href;
        } catch {
          return attrs.src;
        }
      })();
      const existingScript = Array.from(document.querySelectorAll("script[src]")).find((el) => el.src === normSrc);
      if (existingScript) {
        return;
      }
      const script = document.createElement("script");
      for (const [key, value] of Object.entries(attrs)) {
        if (value !== void 0 && value !== false) {
          script.setAttribute(key, typeof value === "boolean" ? "" : String(value));
        }
      }
      document.head.appendChild(script);
      onCleanup(() => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    }
    if (typeof children === "string") {
      const typeAttr = typeof attrs?.type === "string" ? attrs.type : "text/javascript";
      const nonceAttr = typeof attrs?.nonce === "string" ? attrs.nonce : void 0;
      const existingScript = Array.from(document.querySelectorAll("script:not([src])")).find((el) => {
        if (!(el instanceof HTMLScriptElement)) return false;
        const sType = el.getAttribute("type") ?? "text/javascript";
        const sNonce = el.getAttribute("nonce") ?? void 0;
        return el.textContent === children && sType === typeAttr && sNonce === nonceAttr;
      });
      if (existingScript) {
        return;
      }
      const script = document.createElement("script");
      script.textContent = children;
      if (attrs) {
        for (const [key, value] of Object.entries(attrs)) {
          if (value !== void 0 && value !== false) {
            script.setAttribute(key, typeof value === "boolean" ? "" : String(value));
          }
        }
      }
      document.head.appendChild(script);
      onCleanup(() => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    }
  });
  if (!router2.isServer) {
    return null;
  }
  if (attrs?.src && typeof attrs.src === "string") {
    return ssrElement("script", attrs, void 0, true);
  }
  if (typeof children === "string") {
    return ssrElement("script", mergeProps(attrs, {
      innerHTML: children
    }), void 0, true);
  }
  return null;
}
const useTags = () => {
  const router2 = useRouter();
  const nonce = router2.options.ssr?.nonce;
  const routeMeta = useRouterState({
    select: (state) => {
      return state.matches.map((match) => match.meta).filter(Boolean);
    }
  });
  const meta = Solid.createMemo(() => {
    const resultMeta = [];
    const metaByAttribute = {};
    let title;
    const routeMetasArray = routeMeta();
    for (let i = routeMetasArray.length - 1; i >= 0; i--) {
      const metas = routeMetasArray[i];
      for (let j = metas.length - 1; j >= 0; j--) {
        const m = metas[j];
        if (!m) continue;
        if (m.title) {
          if (!title) {
            title = {
              tag: "title",
              children: m.title
            };
          }
        } else {
          const attribute = m.name ?? m.property;
          if (attribute) {
            if (metaByAttribute[attribute]) {
              continue;
            } else {
              metaByAttribute[attribute] = true;
            }
          }
          resultMeta.push({
            tag: "meta",
            attrs: {
              ...m,
              nonce
            }
          });
        }
      }
    }
    if (title) {
      resultMeta.push(title);
    }
    if (router2.options.ssr?.nonce) {
      resultMeta.push({
        tag: "meta",
        attrs: {
          property: "csp-nonce",
          content: router2.options.ssr.nonce
        }
      });
    }
    resultMeta.reverse();
    return resultMeta;
  });
  const links = useRouterState({
    select: (state) => {
      const constructed = state.matches.map((match) => match.links).filter(Boolean).flat(1).map((link) => ({
        tag: "link",
        attrs: {
          ...link,
          nonce
        }
      }));
      const manifest = router2.ssr?.manifest;
      const assets = state.matches.map((match) => manifest?.routes[match.routeId]?.assets ?? []).filter(Boolean).flat(1).filter((asset) => asset.tag === "link").map((asset) => ({
        tag: "link",
        attrs: {
          ...asset.attrs,
          nonce
        }
      }));
      return [...constructed, ...assets];
    }
  });
  const preloadLinks = useRouterState({
    select: (state) => {
      const preloadLinks2 = [];
      state.matches.map((match) => router2.looseRoutesById[match.routeId]).forEach((route) => router2.ssr?.manifest?.routes[route.id]?.preloads?.filter(Boolean).forEach((preload) => {
        preloadLinks2.push({
          tag: "link",
          attrs: {
            rel: "modulepreload",
            href: preload,
            nonce
          }
        });
      }));
      return preloadLinks2;
    }
  });
  const styles2 = useRouterState({
    select: (state) => state.matches.map((match) => match.styles).flat(1).filter(Boolean).map(({
      children,
      ...style
    }) => ({
      tag: "style",
      attrs: {
        ...style,
        nonce
      },
      children
    }))
  });
  const headScripts = useRouterState({
    select: (state) => state.matches.map((match) => match.headScripts).flat(1).filter(Boolean).map(({
      children,
      ...script
    }) => ({
      tag: "script",
      attrs: {
        ...script,
        nonce
      },
      children
    }))
  });
  return () => uniqBy([...meta(), ...preloadLinks(), ...links(), ...styles2(), ...headScripts()], (d) => {
    return JSON.stringify(d);
  });
};
function HeadContent() {
  const tags = useTags();
  return createComponent(MetaProvider, {
    get children() {
      return createComponent(For, {
        get each() {
          return tags();
        },
        children: (tag) => createComponent(Asset, tag)
      });
    }
  });
}
function uniqBy(arr, fn) {
  const seen = /* @__PURE__ */ new Set();
  return arr.filter((item) => {
    const key = fn(item);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}
const Scripts = () => {
  const router2 = useRouter();
  const nonce = router2.options.ssr?.nonce;
  const assetScripts = useRouterState({
    select: (state) => {
      const assetScripts2 = [];
      const manifest = router2.ssr?.manifest;
      if (!manifest) {
        return [];
      }
      state.matches.map((match) => router2.looseRoutesById[match.routeId]).forEach((route) => manifest.routes[route.id]?.assets?.filter((d) => d.tag === "script").forEach((asset) => {
        assetScripts2.push({
          tag: "script",
          attrs: {
            ...asset.attrs,
            nonce
          },
          children: asset.children
        });
      }));
      return assetScripts2;
    }
  });
  const scripts = useRouterState({
    select: (state) => ({
      scripts: state.matches.map((match) => match.scripts).flat(1).filter(Boolean).map(({
        children,
        ...script
      }) => ({
        tag: "script",
        attrs: {
          ...script,
          nonce
        },
        children
      }))
    })
  });
  let serverBufferedScript = void 0;
  if (router2.serverSsr) {
    serverBufferedScript = router2.serverSsr.takeBufferedScripts();
  }
  const allScripts = [...scripts().scripts, ...assetScripts()];
  if (serverBufferedScript) {
    allScripts.unshift(serverBufferedScript);
  }
  return allScripts.map((asset, i) => createComponent(Asset, asset));
};
const styleCss = "/assets/styles-iNglfdEo.css";
const navcontainer = "_navcontainer_1wzlq_1";
const pageName = "_pageName_1wzlq_27";
const nav = "_nav_1wzlq_1";
const logo = "_logo_1wzlq_57";
const navlink = "_navlink_1wzlq_71";
const navlist = "_navlist_1wzlq_91";
const active = "_active_1wzlq_109";
const open$1 = "_open_1wzlq_199";
const styles$1 = {
  navcontainer,
  pageName,
  nav,
  logo,
  navlink,
  navlist,
  active,
  open: open$1
};
const hamburger = "_hamburger_45ndw_1";
const line = "_line_45ndw_29";
const open = "_open_45ndw_49";
const styles = {
  hamburger,
  line,
  open
};
var _tmpl$$2 = ["<button", ' class="', '" aria-label="Menu"><span', "></span><span", "></span><span", "></span></button>"];
const Hamburger = (props) => {
  return ssr(_tmpl$$2, ssrHydrationKey(), `${escape(styles.hamburger, true)} ${props.isOpen ? escape(styles.open, true) : ""}`, ssrAttribute("class", escape(styles.line, true), false), ssrAttribute("class", escape(styles.line, true), false), ssrAttribute("class", escape(styles.line, true), false));
};
var _tmpl$$1 = ["<div", "><nav", "><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", '<!--/--><div class="', '">', "</div></nav></div>"];
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = createSignal(false);
  const navItems = [{
    to: "/projects",
    name: "Projecten"
  }, {
    to: "/contact",
    name: "Contact"
  }];
  const location = useLocation();
  const activeItem = createMemo(() => {
    const currentPath = location().pathname;
    if (currentPath === "/") return null;
    const exactMatch = navItems.find((item) => item.to === currentPath);
    if (exactMatch) return exactMatch;
    const prefixMatch = navItems.find((item) => currentPath.startsWith(item.to));
    return prefixMatch ?? null;
  });
  const toggleMenu = () => setIsMenuOpen((isOpen2) => !isOpen2);
  const closeMenu = () => setIsMenuOpen(false);
  return ssr(_tmpl$$1, ssrHydrationKey() + ssrAttribute("class", escape(styles$1.navcontainer, true), false), ssrAttribute("class", escape(styles$1.nav, true), false), escape(createComponent(Hamburger, {
    get isOpen() {
      return isMenuOpen();
    },
    onClick: toggleMenu
  })), escape(createComponent(Link$1, {
    to: "/",
    get ["class"]() {
      return `${styles$1.navlink} ${styles$1.logo}`;
    },
    onClick: closeMenu,
    children: "JEFVANZANTEN.DEV"
  })), escape(createComponent(Show, {
    get when() {
      return activeItem();
    },
    children: (item) => createComponent(Link$1, {
      get to() {
        return item().to;
      },
      get ["class"]() {
        return styles$1.pageName;
      },
      get children() {
        return item().name;
      }
    })
  })), `${escape(styles$1.navlist, true)} ${isMenuOpen() ? escape(styles$1.open, true) : ""}`, escape(createComponent(For, {
    each: navItems,
    children: (item) => createComponent(Link$1, {
      get to() {
        return item.to;
      },
      get activeOptions() {
        return {
          exact: item.to === "/"
        };
      },
      get activeProps() {
        return {
          class: `${styles$1.navlink} ${styles$1.active}`
        };
      },
      get inactiveProps() {
        return {
          class: styles$1.navlink
        };
      },
      onClick: closeMenu,
      get children() {
        return item.name;
      }
    })
  })));
};
const [imageUrl, setImageUrl] = createSignal("");
const [isOpen, setIsOpen] = createSignal(false);
let dialogRef;
const useImageViewModal = () => {
  const setDialog = (el) => {
    dialogRef = el;
  };
  const openModal = () => {
    setIsOpen(true);
    dialogRef?.showModal();
  };
  const closeModal = () => {
    setIsOpen(false);
    dialogRef?.close();
  };
  return {
    imageUrl,
    setImageUrl,
    setDialog,
    openModal,
    closeModal,
    isOpen
  };
};
var _tmpl$ = ["<head>", "<style>html, body { background-color: #0a0a0a; color: white; margin: 0; }</style></head>"], _tmpl$2 = ["<html", ' style="', '">', '<body style="', '"><!--$-->', "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--></body></html>"];
const ImageViewModal = lazy(() => import("./ImageViewModal-BkMmvuKC.mjs"));
const TanStackRouterDevtools = () => null;
const Route$2 = createRootRouteWithContext()({
  head: () => ({
    links: [{
      rel: "stylesheet",
      href: styleCss
    }],
    meta: [{
      name: "viewport",
      content: "width=device-width, initial-scale=1.0"
    }]
  }),
  shellComponent: RootComponent
});
function RootComponent() {
  const {
    isOpen: isOpen2
  } = useImageViewModal();
  return ssr(_tmpl$2, ssrHydrationKey(), ssrStyleProperty("background-color:", "#0a0a0a"), createComponent(NoHydration, {
    get children() {
      return ssr(_tmpl$, escape(createComponent(HydrationScript, {})));
    }
  }), ssrStyleProperty("background-color:", "#0a0a0a") + ssrStyleProperty(";color:", "white"), escape(createComponent(HeadContent, {})), escape(createComponent(Navigation, {})), escape(createComponent(Outlet, {})), escape(createComponent(Show, {
    get when() {
      return isOpen2();
    },
    get children() {
      return createComponent(ImageViewModal, {});
    }
  })), escape(createComponent(TanStackRouterDevtools, {})), escape(createComponent(Scripts, {})));
}
const $$splitComponentImporter$1 = () => import("./index-BuAZpDWv.mjs");
const Route$1 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-BuhxlWK0.mjs");
const Route2 = createFileRoute("/projects/")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$2
});
const ProjectsIndexRoute = Route2.update({
  id: "/projects/",
  path: "/projects/",
  getParentRoute: () => Route$2
});
const rootRouteChildren = {
  IndexRoute,
  ProjectsIndexRoute
};
const routeTree = Route$2._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Link$1 as L,
  router as r,
  useImageViewModal as u
};
