(function () {
  var toggle = document.querySelector('.header__toggle')
  var nav = document.getElementById('main-nav')

  if (toggle && nav) {
    var setOpen = function (open) {
      nav.classList.toggle('nav--open', open)
      toggle.setAttribute('aria-expanded', String(open))
      toggle.textContent = open ? 'Bağla' : 'Menyu'
    }
    toggle.addEventListener('click', function () {
      setOpen(!nav.classList.contains('nav--open'))
    })
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false)
    })
  }

  var reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  var narrowQuery = window.matchMedia('(max-width: 720px)')
  var layers = []

  document.querySelectorAll('.px[data-px-speed]').forEach(function (frame) {
    var inner = frame.querySelector('.px__inner')
    if (!inner) return
    layers.push({
      frame: frame,
      inner: inner,
      speed: parseFloat(frame.getAttribute('data-px-speed')) || 0,
      bleed: frame.classList.contains('px--bleed'),
      visible: false,
    })
  })

  if (!layers.length) return

  var frameRequested = false

  function factor() {
    return narrowQuery.matches ? 0.55 : 1
  }

  function measure(layer) {
    if (!layer.bleed) return
    var travel = reducedQuery.matches
      ? 0
      : Math.abs(layer.speed) * factor() * (window.innerHeight / 2 + layer.frame.offsetHeight / 2)
    layer.frame.style.setProperty('--px-bleed', Math.ceil(travel) + 2 + 'px')
  }

  function paint() {
    frameRequested = false
    var half = window.innerHeight / 2
    layers.forEach(function (layer) {
      if (!layer.visible) return
      var rect = layer.frame.getBoundingClientRect()
      var offset = rect.top + rect.height / 2 - half
      layer.inner.style.transform = 'translate3d(0,' + (-offset * layer.speed * factor()).toFixed(1) + 'px,0)'
    })
  }

  function request() {
    if (frameRequested || reducedQuery.matches) return
    frameRequested = true
    window.requestAnimationFrame(paint)
  }

  function sync() {
    layers.forEach(function (layer) {
      measure(layer)
      if (reducedQuery.matches) layer.inner.style.transform = ''
    })
    request()
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        for (var i = 0; i < layers.length; i++) {
          if (layers[i].frame === entry.target) layers[i].visible = entry.isIntersecting
        }
      })
      request()
    },
    { rootMargin: '20% 0px' },
  )

  layers.forEach(function (layer) {
    observer.observe(layer.frame)
  })

  window.addEventListener('scroll', request, { passive: true })
  window.addEventListener('resize', sync, { passive: true })
  reducedQuery.addEventListener('change', sync)
  sync()
})()

;(function () {
  var items = document.querySelectorAll('[data-reveal]')
  if (!items.length) return
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) {
      el.classList.add('is-in')
    })
    return
  }
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  )
  items.forEach(function (el) {
    observer.observe(el)
  })
})()
